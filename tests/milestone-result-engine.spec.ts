import { expect, test } from '@playwright/test';

import { ageGroups, resultDisclaimer } from '../app/milestone-checker/milestone-data';
import {
  createCheckInResult,
  deriveDomainStatus,
  derivePersonalizedIdeas,
} from '../app/milestone-checker/result-engine';
import type { AnswerValue, CheckInAnswers, MilestoneQuestion } from '../app/milestone-checker/milestone-types';

function completedAnswers(
  value: AnswerValue = 'consistently',
): CheckInAnswers {
  return {
    ageKey: '24m',
    milestones: Object.fromEntries(ageGroups['24m'].questions.map((question) => [question.id, value])),
  };
}

test.describe('milestone result engine', () => {
  test('unsure and not applicable do not count as not yet', () => {
    expect(deriveDomainStatus({ consistently: 0, sometimes: 0, notYet: 0, unsure: 2, notApplicable: 1 })).toBe('insufficient_information');
  });

  test('derives domain status from the configured heuristic', () => {
    expect(deriveDomainStatus({ consistently: 3, sometimes: 0, notYet: 0, unsure: 0, notApplicable: 0 })).toBe('many_observed');
    expect(deriveDomainStatus({ consistently: 2, sometimes: 1, notYet: 0, unsure: 0, notApplicable: 0 })).toBe('mixed');
    expect(deriveDomainStatus({ consistently: 1, sometimes: 0, notYet: 2, unsure: 0, notApplicable: 0 })).toBe('several_not_yet');
  });

  test('routes tiers and actions from milestone responses only', () => {
    const building = createCheckInResult(completedAnswers('consistently'));
    const conversationAnswers = completedAnswers('consistently');
    conversationAnswers.milestones['24m_understands_variety'] = 'not_yet';
    const conversation = createCheckInResult(conversationAnswers);
    const connect = createCheckInResult(completedAnswers('not_yet'));

    expect(building.tier).toBe('building');
    expect(building.nextSteps).toEqual([]);
    expect(conversation.tier).toBe('conversation');
    expect(conversation.nextSteps).toContainEqual(expect.objectContaining({ professional: 'speechLanguagePathologist' }));
    expect(connect.tier).toBe('connect');
  });

  test('ideas prioritize not yet, then sometimes, and deduplicate', () => {
    const questions: MilestoneQuestion[] = [
      { id: 'a', text: 'A?', domain: 'expressiveLanguage', idea: 'First idea.' },
      { id: 'b', text: 'B?', domain: 'expressiveLanguage', idea: 'Second idea.' },
      { id: 'c', text: 'C?', domain: 'expressiveLanguage', idea: 'First idea.' },
    ];
    expect(derivePersonalizedIdeas(questions, { a: 'sometimes', b: 'not_yet', c: 'not_yet' }, ['Fallback idea.'])).toEqual([
      'Second idea.', 'First idea.', 'Fallback idea.',
    ]);
  });

  test('result output is limited, includes the disclaimer, and avoids prohibited conclusions', () => {
    const result = createCheckInResult(completedAnswers('not_yet'));
    expect(result.strengths.length).toBeLessThanOrEqual(3);
    expect(result.skillsToWatch.length).toBeLessThanOrEqual(3);
    expect(result.personalizedIdeas).toHaveLength(3);
    expect(result.disclaimer).toBe(resultDisclaimer);

    const conclusionCopy = JSON.stringify({
      overview: result.overview,
      strengths: result.strengths,
      skillsToWatch: result.skillsToWatch,
      nextSteps: result.nextSteps,
    });
    expect(conclusionCopy).not.toMatch(/\b(passed|failed|normal|abnormal|low risk|high risk)\b/i);
    expect(conclusionCopy).not.toMatch(/ASHA[- ]approved|no evaluation is needed|guaranteed peace of mind/i);
  });
});
