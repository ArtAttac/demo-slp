import { ageGroups, bookingUrl, domainLabels, resultContent, resultDisclaimer } from './milestone-data';
import type {
  AnswerValue,
  CheckInAnswers,
  CheckInResult,
  CommunicationDomain,
  DomainResult,
  DomainStatus,
  MilestoneQuestion,
  ResultAction,
  ResultTier,
} from './milestone-types';

type DomainCounts = {
  consistently: number;
  sometimes: number;
  notYet: number;
  unsure: number;
  notApplicable: number;
};

export function deriveDomainStatus(counts: DomainCounts): DomainStatus {
  const observed = counts.consistently + counts.sometimes + counts.notYet;

  if (observed === 0) return 'insufficient_information';
  if (counts.notYet === 0 && counts.sometimes === 0) return 'many_observed';
  if (counts.notYet >= 2 || counts.notYet / observed >= 0.5) return 'several_not_yet';
  return 'mixed';
}

function domainSummary(domain: CommunicationDomain, status: DomainStatus): string {
  const label = domainLabels[domain];
  const summaries: Record<DomainStatus, string> = {
    many_observed: `Many ${label.toLowerCase()} skills were marked as showing up consistently.`,
    mixed: `${label} skills were marked as showing up with a mix of consistency.`,
    several_not_yet: `Several ${label.toLowerCase()} skills were marked as not observed yet.`,
    insufficient_information: `There was not enough information to summarize ${label.toLowerCase()}.`,
  };
  return summaries[status];
}

export function aggregateDomainResults(
  questions: MilestoneQuestion[],
  answers: CheckInAnswers['milestones'],
): DomainResult[] {
  const domains = [...new Set(questions.map((question) => question.domain))];

  return domains.map((domain) => {
    const values = questions
      .filter((question) => question.domain === domain)
      .map((question) => answers[question.id])
      .filter((value): value is AnswerValue => Boolean(value));
    const counts: DomainCounts = {
      consistently: values.filter((value) => value === 'consistently').length,
      sometimes: values.filter((value) => value === 'sometimes').length,
      notYet: values.filter((value) => value === 'not_yet').length,
      unsure: values.filter((value) => value === 'unsure').length,
      notApplicable: values.filter((value) => value === 'not_applicable').length,
    };
    const status = deriveDomainStatus(counts);

    return {
      domain,
      status,
      consistentlyCount: counts.consistently,
      sometimesCount: counts.sometimes,
      notYetCount: counts.notYet,
      unsureCount: counts.unsure,
      notApplicableCount: counts.notApplicable,
      summary: domainSummary(domain, status),
    };
  });
}

export function deriveResultTier(
  domainResults: DomainResult[],
  answers: CheckInAnswers['milestones'],
): ResultTier {
  const domainsWithSeveralNotYet = domainResults.filter(
    (result) => result.status === 'several_not_yet',
  ).length;
  const values = Object.values(answers);
  const notYetCount = values.filter((value) => value === 'not_yet').length;
  const sometimesCount = values.filter((value) => value === 'sometimes').length;

  if (
    notYetCount >= 4 ||
    domainsWithSeveralNotYet >= 2
  ) {
    return 'connect';
  }

  if (
    notYetCount >= 1 ||
    sometimesCount >= 3 ||
    domainsWithSeveralNotYet === 1
  ) {
    return 'conversation';
  }

  return 'building';
}

export function derivePriorityActions(
  tier: ResultTier,
): ResultAction[] {
  return tier === 'building'
    ? []
    : [{
      id: 'talk-with-slp',
      professional: 'speechLanguagePathologist',
      title: 'Talk with a speech-language pathologist',
      reason:
        'An SLP can review the full communication picture and help determine whether monitoring, home strategies, or an evaluation would be useful.',
      priority: tier === 'connect' ? 'recommended' : 'routine',
      ctaLabel: 'Schedule a consultation',
      ctaHref: bookingUrl,
    }];
}

function questionClause(text: string): string {
  const clause = text
    .replace(/^(Does|Can|Is) your child(?:’s)?\s+/i, '')
    .replace(/\?$/, '');
  return clause.charAt(0).toLowerCase() + clause.slice(1);
}

export function deriveStrengths(
  questions: MilestoneQuestion[],
  answers: CheckInAnswers['milestones'],
): string[] {
  const consistent = questions.filter((question) => answers[question.id] === 'consistently');
  if (consistent.length < 2) {
    return [
      'You identified communication skills that are beginning to show up. The summary reflects where you are seeing them most often.',
    ];
  }

  const domains = [...new Set(consistent.map((question) => question.domain))];
  return domains.slice(0, 3).map((domain) => {
    const examples = consistent
      .filter((question) => question.domain === domain)
      .slice(0, 2)
      .map((question) => questionClause(question.text));
    return `In ${domainLabels[domain].toLowerCase()}, examples you marked consistently include “${examples.join('” and “')}.”`;
  });
}

export function deriveSkillsToWatch(
  questions: MilestoneQuestion[],
  answers: CheckInAnswers['milestones'],
): string[] {
  const labels: Partial<Record<AnswerValue, string>> = {
    not_yet: 'not yet',
    sometimes: 'something you notice sometimes',
    unsure: 'something you are still observing',
  };

  return (['not_yet', 'sometimes', 'unsure'] as AnswerValue[])
    .flatMap((value) =>
      questions
        .filter((question) => answers[question.id] === value)
        .map((question) => `You marked “${questionClause(question.text)}” as ${labels[value]}.`),
    )
    .slice(0, 3);
}

function normalizedIdea(idea: string): string {
  return idea.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function derivePersonalizedIdeas(
  questions: MilestoneQuestion[],
  answers: CheckInAnswers['milestones'],
  fallbackIdeas: string[],
): string[] {
  const candidates = (['not_yet', 'sometimes'] as AnswerValue[])
    .flatMap((value) =>
      questions.filter((question) => answers[question.id] === value).map((question) => question.idea),
    )
    .concat(fallbackIdeas);
  const seen = new Set<string>();

  return candidates
    .filter((idea) => {
      const normalized = normalizedIdea(idea);
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .slice(0, 3);
}

export function createCheckInResult(answers: CheckInAnswers): CheckInResult {
  const ageGroup = ageGroups[answers.ageKey];
  const domainResults = aggregateDomainResults(ageGroup.questions, answers.milestones);
  const tier = deriveResultTier(domainResults, answers.milestones);

  return {
    tier,
    overview: resultContent[tier],
    domainResults,
    strengths: deriveStrengths(ageGroup.questions, answers.milestones),
    skillsToWatch: deriveSkillsToWatch(ageGroup.questions, answers.milestones),
    personalizedIdeas: derivePersonalizedIdeas(
      ageGroup.questions,
      answers.milestones,
      ageGroup.ideas,
    ),
    nextSteps: derivePriorityActions(tier),
    disclaimer: resultDisclaimer,
  };
}
