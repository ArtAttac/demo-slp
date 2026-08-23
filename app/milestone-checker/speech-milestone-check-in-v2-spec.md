# Communication Milestone Check-In v2

## Technical implementation specification

**Status:** Ready for implementation  
**Audience:** Coding LLM or engineer working in the existing Speech on the Slope website repository  
**Primary objective:** Improve the existing brief milestone checker without turning it into a clinical intake, formal screener, or long assessment.

---

## 1. Instructions to the implementation model

Inspect the existing repository before changing code. Reuse the current framework, routing, component patterns, design system, analytics conventions, and Tailwind brand tokens. Do not replatform the application or replace unrelated code.

Implement the requirements in this document as a small, client-side enhancement to the existing checker. Preserve its current route, visual identity, and simple flow. Do not add a backend, account system, report generator, dynamic question tree, or new analytics provider.

Before completing the implementation:

1. Run the repository's existing formatter, linter, type checker, unit tests, and build.
2. Add focused tests for the result engine and critical user flows.
3. Fix errors introduced by this work.
4. Summarize changed files, behavior, and any assumptions.

If an existing type or component name conflicts with this specification, adapt the names while preserving the behavior described here.

---

## 2. Product positioning

The feature is an **educational communication milestone check-in**. It is not:

- a standardized or validated developmental screening tool;
- a speech-language evaluation;
- a medical opinion;
- a diagnostic instrument;
- a method for ruling out a speech, language, communication, developmental, or hearing condition;
- an ASHA-approved scoring system.

The questions are informed by publicly available ASHA and CDC communication milestones, but the selection, grouping, answer choices, and routing logic in this product have not been clinically validated for sensitivity or specificity.

Never describe the experience as a test that a child can pass or fail. Never generate a diagnosis, probability of a disorder, clinical risk score, or statement that an evaluation is unnecessary.

### Approved terminology

- communication milestone check-in
- skills showing up consistently
- skills showing up sometimes
- skills not observed yet
- skills that may still be emerging
- a conversation may be useful
- consider connecting with a professional
- based on the information you shared

### Prohibited terminology

- passed / failed
- normal / abnormal
- delayed / disordered as a result conclusion
- low risk / high risk
- likely has / does not have
- diagnosis / diagnostic result
- ASHA score / ASHA-approved result
- no evaluation is needed
- guaranteed peace of mind

---

## 3. Goals and non-goals

### Goals

1. Capture whether a skill is consistent, occasional, not observed, or uncertain. Offer “Not applicable” only on spoken-speech questions.
2. Tag questions by communication domain so the result can identify patterns without displaying a clinical score.
3. Ask only three context questions: caregiver concern, loss of a previously used skill, and hearing concerns.
4. Generate a compact result that shows:
   - observed strengths;
   - skills that may still be emerging;
   - personalized home ideas;
   - why a professional conversation is being suggested;
   - one clear next step and, when relevant, which professional may be useful.
5. Use explicit routing rules rather than an opaque or LLM-generated conclusion.
6. Keep the interaction to approximately 2–3 minutes.
7. Meet WCAG 2.2 AA interaction requirements.

### Non-goals

1. Do not diagnose or screen for autism, language disorder, speech sound disorder, childhood apraxia of speech, stuttering, hearing loss, or any other condition.
2. Do not recreate or approximate a proprietary standardized screener.
3. Do not calculate clinical percentiles, age equivalents, severity labels, or disorder probabilities.
4. Do not replace consultation with a pediatrician, audiologist, early-intervention program, or speech-language pathologist.
5. Do not use a runtime LLM to interpret answers or write clinical-sounding conclusions.
6. Do not add user accounts, server-side answer storage, a downloadable report, or a multi-page clinical intake.

---

## 4. Recommended user flow

1. **Introduction**
   - Explain that the experience takes approximately 2–3 minutes.
   - Display the educational-purpose disclaimer before starting.
   - State that caregivers should answer based on everyday behavior, not a one-time performance.
2. **Age selection**
   - Available groups: 12 months, 18 months, 24 months, 3 years, 4 years, and 5 years.
   - If the child falls between groups, instruct the caregiver to choose the most recently completed age band.
3. **Context questions**
   - Ask the three context questions defined below.
   - These questions must not add points to a clinical-style score.
4. **Age-based milestone questions**
   - Show one question per screen unless the existing UI has a proven accessible grouped pattern.
   - Use the five response choices defined below.
5. **Results**
   - Show the overall guidance tier.
   - Summarize strengths and skills that may still be emerging.
   - Show three personalized ideas.
   - Show context-specific professional actions.
   - Repeat the disclaimer.
The checker should remain a single lightweight client-side flow. Do not require sign-in or collect the child’s name, date of birth, diagnosis, or contact information to display a result.

---

## 5. TypeScript data model

Use or adapt the following types.

```ts
type AgeKey = '12m' | '18m' | '24m' | '3y' | '4y' | '5y';

type ResultTier = 'building' | 'conversation' | 'connect';

type AnswerValue =
  | 'consistently'
  | 'sometimes'
  | 'not_yet'
  | 'unsure'
  | 'not_applicable';

type CommunicationDomain =
  | 'receptiveLanguage'
  | 'expressiveLanguage'
  | 'socialCommunication'
  | 'speechSounds'
  | 'fluency'
  | 'earlyLiteracy';

type MilestoneQuestion = {
  id: string;
  text: string;
  domain: CommunicationDomain;
  helpText?: string;
  allowNotApplicable?: boolean;
  idea: string;
};

type AgeGroup = {
  shortLabel: string;
  label: string;
  questions: MilestoneQuestion[];
  ideas: string[];
};

type ContextQuestion = {
  id: ContextQuestionId;
  question: string;
  options: Array<{
    value: string;
    label: string;
  }>;
};

type ContextQuestionId =
  | 'caregiver_concern'
  | 'skill_loss'
  | 'hearing_concern';

type DomainStatus =
  | 'many_observed'
  | 'mixed'
  | 'several_not_yet'
  | 'insufficient_information';

type ProfessionalType =
  | 'speechLanguagePathologist'
  | 'audiologist'
  | 'pediatrician';

type ResultAction = {
  id: string;
  professional: ProfessionalType;
  title: string;
  reason: string;
  priority: 'routine' | 'recommended' | 'prompt';
  ctaLabel?: string;
  ctaHref?: string;
};

type DomainResult = {
  domain: CommunicationDomain;
  status: DomainStatus;
  consistentlyCount: number;
  sometimesCount: number;
  notYetCount: number;
  unsureCount: number;
  notApplicableCount: number;
  summary: string;
};

type CheckInAnswers = {
  ageKey: AgeKey;
  milestones: Record<string, AnswerValue>;
  context: Partial<Record<ContextQuestionId, string>>;
};

type CheckInResult = {
  tier: ResultTier;
  overview: {
    eyebrow: string;
    title: string;
    body: string;
    panel: string;
    accent: string;
  };
  domainResults: DomainResult[];
  strengths: string[];
  skillsToWatch: string[];
  personalizedIdeas: string[];
  nextSteps: ResultAction[];
  notices: {
    skillLoss?: string;
    hearing?: string;
  };
  disclaimer: string;
};
```

---

## 6. Response options

```ts
const answerOptions: Record<
  AnswerValue,
  { label: string; description: string }
> = {
  consistently: {
    label: 'Yes, consistently',
    description: 'I notice this regularly in everyday situations.',
  },
  sometimes: {
    label: 'Sometimes',
    description: 'I have seen this, but not consistently.',
  },
  not_yet: {
    label: 'Not yet',
    description: 'I have not noticed this skill yet.',
  },
  unsure: {
    label: 'I’m not sure',
    description: 'I have not had enough opportunities to observe this.',
  },
  not_applicable: {
    label: 'Not applicable',
    description: 'This question does not fit how my child communicates.',
  },
};
```

Rules:

- Do not treat `unsure` or `not_applicable` as `not_yet`.
- Show `not_applicable` only when `allowNotApplicable` is true. For all other questions, show the first four choices.
- Do not require the caregiver to make the child demonstrate the skill during the quiz.
- Add this helper text near the first milestone question:

> Answer based on what you usually notice during everyday activities. For language questions, consider all languages and communication systems your child uses. Questions specifically about speech sounds or how understandable speech is refer to spoken speech.

---

## 7. Context questions

```ts
const contextQuestions: ContextQuestion[] = [
  {
    id: 'caregiver_concern',
    question:
      'Before taking this check-in, how concerned were you about your child’s communication?',
    options: [
      { value: 'not_concerned', label: 'Not concerned' },
      { value: 'a_little', label: 'A little concerned' },
      { value: 'concerned', label: 'Concerned' },
      { value: 'very_concerned', label: 'Very concerned' },
    ],
  },
  {
    id: 'skill_loss',
    question:
      'Has your child stopped using any communication skill they previously used regularly?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'Yes' },
      { value: 'unsure', label: 'I’m not sure' },
    ],
  },
  {
    id: 'hearing_concern',
    question:
      'Do you have concerns about your child’s hearing, response to sounds, or history of frequent ear problems?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'yes', label: 'Yes' },
      { value: 'unsure', label: 'I’m not sure' },
    ],
  },
];
```

Context answers provide routing and explanatory notices. They do not produce a medical conclusion and should not be converted into a numerical clinical score.

---

## 8. Complete age-based question bank

The following data replaces the old `string[]` questions. IDs must remain stable after release because they may be referenced by analytics, saved sessions, and tests.

```ts
const ageGroups: Record<AgeKey, AgeGroup> = {
  '12m': {
    shortLabel: '12 mo',
    label: '12 months',
    questions: [
      {
        id: '12m_responds_to_name',
        text: 'Does your child look toward you when you call their name?',
        domain: 'receptiveLanguage',
        idea: 'Call your child’s name during a calm moment, then warmly respond when they look toward you.',
      },
      {
        id: '12m_responds_to_no',
        text: 'Does your child pause briefly or respond when you say “no”?',
        domain: 'receptiveLanguage',
        idea: 'Pair short, familiar words with consistent gestures during everyday routines.',
      },
      {
        id: '12m_babbles_strings',
        text: 'Does your child babble long strings of sounds, such as “mamamama” or “babababa”?',
        domain: 'expressiveLanguage',
        idea: 'Copy your child’s sounds, then pause to invite them to take another turn.',
      },
      {
        id: '12m_recognizes_names',
        text: 'Does your child recognize the names of familiar people or objects?',
        domain: 'receptiveLanguage',
        idea: 'Name familiar people and objects naturally during play and daily routines.',
      },
      {
        id: '12m_uses_gestures',
        text: 'Does your child point, wave, reach, or raise their arms to communicate?',
        domain: 'socialCommunication',
        idea: 'Model simple gestures such as waving, reaching, and raising your arms while saying the matching word.',
      },
      {
        id: '12m_shows_or_gives',
        text: 'Does your child show or give you objects to share interest?',
        domain: 'socialCommunication',
        idea: 'Show your child an interesting object, name it, and give them time to look, reach, show, or respond.',
      },
      {
        id: '12m_social_games',
        text: 'Does your child copy or initiate gestures during social games such as peekaboo?',
        domain: 'socialCommunication',
        idea: 'Play short, repetitive social games and pause before the familiar next action.',
      },
      {
        id: '12m_copies_sounds',
        text: 'Does your child try to copy sounds that you make?',
        domain: 'expressiveLanguage',
        idea: 'Use playful animal, vehicle, and everyday sounds and celebrate any attempt to join in.',
      },
      {
        id: '12m_familiar_phrases',
        text: 'Does your child respond to simple, familiar phrases such as “come here” or “bye-bye”?',
        domain: 'receptiveLanguage',
        idea: 'Use the same short phrases during predictable routines and pair them with meaningful actions.',
      },
      {
        id: '12m_meaningful_words',
        text: 'Does your child use one or two meaningful words or consistent word approximations, such as “mama,” “dada,” “hi,” or “bye”?',
        domain: 'expressiveLanguage',
        idea: 'Model short, useful words during motivating routines without requiring your child to repeat them.',
      },
    ],
    ideas: [
      'Copy your child’s sounds and gestures, then pause to invite another turn.',
      'Name people, objects, and actions during familiar routines such as meals and bath time.',
      'Read, sing, and play social games in the language or languages your family uses most comfortably.',
    ],
  },

  '18m': {
    shortLabel: '18 mo',
    label: '18 months',
    questions: [
      {
        id: '18m_where_questions',
        text: 'Does your child look around for a familiar person or object when you ask where it is?',
        domain: 'receptiveLanguage',
        idea: 'Ask simple “where” questions about visible or familiar objects, then point and name the answer together.',
      },
      {
        id: '18m_one_step_direction',
        text: 'Does your child follow a familiar one-step direction, such as “give me the ball”?',
        domain: 'receptiveLanguage',
        idea: 'Use short directions during play and routines, allowing several seconds for your child to respond.',
      },
      {
        id: '18m_points_for_purposes',
        text: 'Does your child point to request something, share interest, or ask for information?',
        domain: 'socialCommunication',
        idea: 'Point out interesting things, name them, and pause to let your child share attention in their own way.',
      },
      {
        id: '18m_social_gestures',
        text: 'Does your child use gestures such as nodding, shaking their head, clapping, or giving a high-five?',
        domain: 'socialCommunication',
        idea: 'Pair everyday words such as “yes,” “no,” and “more” with simple gestures.',
      },
      {
        id: '18m_understands_familiar_words',
        text: 'Does your child understand words for familiar people, objects, or actions?',
        domain: 'receptiveLanguage',
        idea: 'Name familiar people, objects, and actions as they naturally occur throughout the day.',
      },
      {
        id: '18m_uses_familiar_words',
        text: 'Does your child use words or consistent word approximations for familiar people, objects, or actions?',
        domain: 'expressiveLanguage',
        idea: 'Model one useful word at a time and respond positively to words, approximations, signs, or gestures.',
      },
      {
        id: '18m_body_part',
        text: 'Can your child identify at least one body part when you name it?',
        domain: 'receptiveLanguage',
        idea: 'Name body parts during dressing, bath time, and songs without turning the activity into a test.',
      },
      {
        id: '18m_speech_like_strings',
        text: 'Does your child combine sounds, syllables, and some real words with speech-like expression?',
        domain: 'expressiveLanguage',
        idea: 'Imitate your child’s speech-like strings and respond as though you are having a conversation.',
      },
      {
        id: '18m_three_words',
        text: 'Does your child try to say at least three words besides names for caregivers?',
        domain: 'expressiveLanguage',
        idea: 'Repeat a small set of useful words during favorite activities and allow attempts to be imperfect.',
      },
      {
        id: '18m_imitates_words',
        text: 'Does your child try to copy new sounds or words during everyday activities?',
        domain: 'expressiveLanguage',
        idea: 'Use playful sound effects and short words, then pause without pressuring your child to imitate.',
      },
    ],
    ideas: [
      'Offer two choices and name both, such as “Do you want milk or water?”',
      'Add a word or detail to what your child communicates—if they say “car,” you might say “big car.”',
      'Talk about pictures during book time and model the words without requiring your child to repeat them.',
    ],
  },

  '24m': {
    shortLabel: '24 mo',
    label: '24 months',
    questions: [
      {
        id: '24m_understands_variety',
        text: 'Does your child understand words for many familiar foods, toys, animals, actions, and body parts?',
        domain: 'receptiveLanguage',
        idea: 'Name objects and actions during routines and show what unfamiliar words mean.',
      },
      {
        id: '24m_uses_variety',
        text: 'Does your child use a growing variety of words for familiar people, objects, and actions?',
        domain: 'expressiveLanguage',
        idea: 'Model useful words from different categories during play, meals, dressing, and outings.',
      },
      {
        id: '24m_two_word_combinations',
        text: 'Does your child combine two or more words, such as “more milk” or “doggie running”?',
        domain: 'expressiveLanguage',
        helpText: 'Consider messages expressed in any language or communication system your child uses.',
        idea: 'Repeat your child’s message and add one detail—for example, “Dog running. Yes, the dog is running fast!”',
      },
      {
        id: '24m_two_part_direction',
        text: 'Does your child follow a two-part direction, such as “get the spoon and put it on the table”?',
        domain: 'receptiveLanguage',
        idea: 'Practice two related steps within familiar routines, using short and clear language.',
      },
      {
        id: '24m_asks_for_help',
        text: 'Does your child use words to ask for help?',
        domain: 'expressiveLanguage',
        idea: 'Model a short phrase such as “help me” when your child needs assistance, then respond to any clear attempt.',
      },
      {
        id: '24m_pronouns',
        text: 'Does your child use words such as “me,” “mine,” or “you”?',
        domain: 'expressiveLanguage',
        idea: 'Naturally emphasize words such as “my,” “your,” and “me” during turn-taking games.',
      },
      {
        id: '24m_possessives',
        text: 'Does your child use possessive combinations, such as “Daddy’s shoe”?',
        domain: 'expressiveLanguage',
        idea: 'Talk about who familiar objects belong to during cleanup and dressing.',
      },
      {
        id: '24m_points_to_named_items',
        text: 'Does your child point to familiar objects or pictures when you name them?',
        domain: 'receptiveLanguage',
        idea: 'Look at simple books together and point to pictures while naming them.',
      },
      {
        id: '24m_names_objects',
        text: 'Does your child name familiar objects in books or during everyday routines?',
        domain: 'expressiveLanguage',
        idea: 'Name a picture yourself if your child does not answer; avoid repeatedly quizzing them.',
      },
      {
        id: '24m_words_and_gestures',
        text: 'Does your child use gestures together with words to make their wants or ideas clear?',
        domain: 'socialCommunication',
        idea: 'Respond to the full message your child communicates through words, sounds, facial expressions, and gestures.',
      },
    ],
    ideas: [
      'Repeat your child’s phrase and add one detail—for example, “Dog running. Yes, the dog is running fast!”',
      'Use pretend play to model short, useful phrases about actions, people, and objects.',
      'Pause during familiar songs and routines to give your child an opportunity to communicate.',
    ],
  },

  '3y': {
    shortLabel: '3 yr',
    label: '3 years',
    questions: [
      {
        id: '3y_word_combinations',
        text: 'Does your child frequently combine words to share wants, ideas, or experiences?',
        domain: 'expressiveLanguage',
        idea: 'Repeat and expand your child’s message without requiring them to copy the longer sentence.',
      },
      {
        id: '3y_conversation_turns',
        text: 'Can your child participate in a short conversation with at least two back-and-forth exchanges?',
        domain: 'socialCommunication',
        idea: 'Follow your child’s interest, make a comment, and pause long enough for another conversational turn.',
      },
      {
        id: '3y_gets_attention',
        text: 'Does your child use words to get your attention, such as “look at me”?',
        domain: 'socialCommunication',
        idea: 'Model phrases such as “look,” “watch me,” and “come see” during exciting moments.',
      },
      {
        id: '3y_first_name',
        text: 'Can your child say their first name when asked?',
        domain: 'expressiveLanguage',
        idea: 'Use your child’s name naturally in songs, family photos, and playful introductions.',
      },
      {
        id: '3y_plurals',
        text: 'Does your child use some plural words, such as “dogs” or “toys”?',
        domain: 'expressiveLanguage',
        idea: 'Contrast one and more than one during play: “one block” and “two blocks.”',
      },
      {
        id: '3y_ing_actions',
        text: 'Does your child use action words ending in “-ing,” such as “running” or “eating”?',
        domain: 'expressiveLanguage',
        idea: 'Describe what people, animals, and toys are doing during play and book sharing.',
      },
      {
        id: '3y_gives_reasons',
        text: 'Does your child use words to explain simple reasons, such as needing a coat because it is cold?',
        domain: 'expressiveLanguage',
        idea: 'Model simple cause-and-effect language such as “It is raining, so we need an umbrella.”',
      },
      {
        id: '3y_asks_questions',
        text: 'Does your child ask questions using words such as who, what, where, why, or how?',
        domain: 'expressiveLanguage',
        idea: 'Welcome questions and model short question forms during play and daily routines.',
      },
      {
        id: '3y_answers_situational_questions',
        text: 'Can your child answer simple questions about familiar situations or activities?',
        domain: 'receptiveLanguage',
        idea: 'Talk through familiar situations and give your child time to answer without rushing.',
      },
      {
        id: '3y_understood_by_others',
        text: 'Can other people understand your child’s speech most of the time, while some sound errors may still occur?',
        domain: 'speechSounds',
        helpText: 'Choose “Not applicable” if your child does not currently use spoken speech.',
        allowNotApplicable: true,
        idea: 'Respond to your child’s message first, then model the word clearly without requiring repetition.',
      },
    ],
    ideas: [
      'Repeat and expand what your child says without requiring them to copy the longer sentence.',
      'Talk about family photos and take turns describing what happened.',
      'Read together and ask a mix of comments and open questions, giving your child plenty of time to respond.',
    ],
  },

  '4y': {
    shortLabel: '4 yr',
    label: '4 years',
    questions: [
      {
        id: '4y_compares',
        text: 'Does your child compare things using words such as bigger, smaller, longer, or shorter?',
        domain: 'expressiveLanguage',
        idea: 'Compare objects during play and routines using size, length, color, and shape words.',
      },
      {
        id: '4y_retells_story',
        text: 'Can your child tell you about something that happened or retell a simple story?',
        domain: 'expressiveLanguage',
        idea: 'Use family photos or a short book to talk about what happened first, next, and last.',
      },
      {
        id: '4y_location_words',
        text: 'Does your child understand and use location words such as in, on, under, and inside?',
        domain: 'receptiveLanguage',
        idea: 'Use location words during hide-and-seek, scavenger hunts, and cleanup.',
      },
      {
        id: '4y_four_word_sentences',
        text: 'Does your child usually use sentences containing four or more words?',
        domain: 'expressiveLanguage',
        idea: 'Expand shorter messages by adding one meaningful detail rather than asking for repetition.',
      },
      {
        id: '4y_articles',
        text: 'Does your child use words such as “a” and “the” when speaking?',
        domain: 'expressiveLanguage',
        idea: 'Model complete sentences naturally while describing books, play, and everyday activities.',
      },
      {
        id: '4y_pretend_read_write',
        text: 'Does your child pretend to read, write, or make up stories while looking at books?',
        domain: 'earlyLiteracy',
        idea: 'Provide books, paper, and drawing tools and join your child’s pretend reading or writing.',
      },
      {
        id: '4y_symbols_letters',
        text: 'Does your child recognize familiar signs, symbols, logos, or some letters?',
        domain: 'earlyLiteracy',
        idea: 'Point out meaningful signs, labels, and letters during walks, errands, and book sharing.',
      },
      {
        id: '4y_all_syllables',
        text: 'Does your child usually say all the syllables in longer words?',
        domain: 'speechSounds',
        helpText: 'Choose “Not applicable” if your child does not currently use spoken speech.',
        allowNotApplicable: true,
        idea: 'Clap or tap the beats in long, playful words without correcting or drilling speech.',
      },
      {
        id: '4y_understood_by_unfamiliar',
        text: 'Can people outside your immediate family understand most of what your child says?',
        domain: 'speechSounds',
        helpText: 'Some later-developing sound errors can still occur at this age.',
        allowNotApplicable: true,
        idea: 'Acknowledge the message, then repeat it back clearly and naturally.',
      },
      {
        id: '4y_speaks_smoothly',
        text: 'Does your child speak smoothly most of the time without frequently repeating sounds, stretching sounds, or appearing stuck?',
        domain: 'fluency',
        helpText: 'Occasional repetition can occur. Answer based on what you usually notice.',
        allowNotApplicable: true,
        idea: 'Give your child time to finish, maintain natural eye contact, and focus on what they are saying rather than how they say it.',
      },
    ],
    ideas: [
      'Retell or act out familiar stories and let your child help decide what happens next.',
      'Use location, comparison, and describing words during play, scavenger hunts, and cleanup.',
      'Play with rhymes and silly words while keeping the activity playful rather than correcting speech sounds.',
    ],
  },

  '5y': {
    shortLabel: '5 yr',
    label: '5 years',
    questions: [
      {
        id: '5y_complete_sentences',
        text: 'Does your child use longer, mostly grammatically complete sentences to explain their ideas?',
        domain: 'expressiveLanguage',
        idea: 'Model connected sentences while discussing plans, play, and events from the day.',
      },
      {
        id: '5y_connected_story',
        text: 'Can your child tell a connected story that includes characters, a setting, and events in an understandable order?',
        domain: 'expressiveLanguage',
        idea: 'Tell stories together and talk about the characters, setting, sequence, and ending.',
      },
      {
        id: '5y_irregular_plurals',
        text: 'Does your child use at least some irregular plural words, such as “feet” or “children”?',
        domain: 'expressiveLanguage',
        idea: 'Model irregular plurals naturally while comparing one item with several items.',
      },
      {
        id: '5y_advanced_location',
        text: 'Does your child understand and use location words such as behind, beside, and between?',
        domain: 'receptiveLanguage',
        idea: 'Use location words during building, drawing, scavenger hunts, and obstacle courses.',
      },
      {
        id: '5y_time_words',
        text: 'Does your child use time words such as yesterday and tomorrow meaningfully?',
        domain: 'expressiveLanguage',
        idea: 'Talk about one thing that happened yesterday and one thing that will happen tomorrow.',
      },
      {
        id: '5y_game_rules',
        text: 'Can your child follow simple directions and rules while playing a game?',
        domain: 'receptiveLanguage',
        idea: 'Play simple games and take turns explaining or demonstrating one rule at a time.',
      },
      {
        id: '5y_book_concepts',
        text: 'Can your child identify the front of a book and understand that a book has a title?',
        domain: 'earlyLiteracy',
        idea: 'Before reading, look at the cover, point out the title, and predict what the book may be about.',
      },
      {
        id: '5y_letters_name',
        text: 'Does your child recognize several letters and attempt to write their name?',
        domain: 'earlyLiteracy',
        idea: 'Use meaningful letters, especially those in your child’s name, in playful drawing and writing activities.',
      },
      {
        id: '5y_rhymes',
        text: 'Can your child recognize or make simple rhymes, such as “cat” and “hat”?',
        domain: 'earlyLiteracy',
        idea: 'Play short rhyming and silly-word games without turning them into drills.',
      },
      {
        id: '5y_conversation_understood',
        text: 'Is your child’s speech understandable during everyday conversation, even if a few sound errors remain?',
        domain: 'speechSounds',
        helpText: 'Choose “Not applicable” if your child does not currently use spoken speech.',
        allowNotApplicable: true,
        idea: 'Focus on the meaning of your child’s message and model words clearly in your natural response.',
      },
    ],
    ideas: [
      'Tell stories together and talk about the characters, setting, sequence, and what might happen next.',
      'Play simple rhyming, word-part, sound-matching, and “I Spy” games.',
      'Ask your child to explain the steps of a familiar activity while you follow their directions.',
    ],
  },
};
```

---

## 9. Result content

```ts
const resultContent: Record<
  ResultTier,
  {
    eyebrow: string;
    title: string;
    body: string;
    panel: string;
    accent: string;
  }
> = {
  building: {
    eyebrow: 'Keep building together',
    title: 'Many communication skills are showing up',
    body:
      'Your answers suggest that many of the communication skills included in this age range are showing up during everyday activities. Keep supporting connection through talking, listening, reading, and play.',
    panel: 'bg-brand-yellow/20 border-brand-yellow/60',
    accent: 'bg-brand-yellow text-brand-darkBlue',
  },
  conversation: {
    eyebrow: 'Consider a conversation',
    title: 'A professional check-in may be helpful',
    body:
      'Your answers show communication strengths as well as some skills that may not be showing up consistently yet. A conversation with a speech-language pathologist can help you discuss what you are observing and decide whether monitoring, practical strategies, or an evaluation would be useful.',
    panel: 'bg-brand-bluePurple/15 border-brand-bluePurple/50',
    accent: 'bg-brand-bluePurple text-white',
  },
  connect: {
    eyebrow: 'Consider connecting with a professional',
    title: 'More information could provide clarity',
    body:
      'Several communication skills in this age range were marked as not yet or not consistently. This does not establish that your child has a delay or disorder, but it is a reasonable reason to speak with a qualified professional about what you are observing.',
    panel: 'bg-brand-pink/20 border-brand-pink/60',
    accent: 'bg-brand-pink text-brand-darkBlue',
  },
};

const resultDisclaimer =
  'This milestone check-in summarizes the information you provided. It is educational and is not a standardized screening, evaluation, medical opinion, or diagnosis. It cannot determine whether a child has or does not have a communication, developmental, or hearing condition. If your child has lost a skill, you are concerned, or their hearing seems different, contact an appropriate qualified professional regardless of this result.';
```

---

## 10. Deterministic result engine

Implement the result engine as pure, testable functions. Do not use an LLM or probabilistic model.

### 10.1 Domain aggregation

For each domain represented in the selected age group:

1. Count `consistently`, `sometimes`, `not_yet`, `unsure`, and `not_applicable` answers.
2. Exclude `unsure` and `not_applicable` from the denominator used for descriptive routing.
3. Do not display a percentage as a clinical score.

Recommended product heuristic:

```ts
function deriveDomainStatus(counts: {
  consistently: number;
  sometimes: number;
  notYet: number;
  unsure: number;
  notApplicable: number;
}): DomainStatus {
  const observed = counts.consistently + counts.sometimes + counts.notYet;

  if (observed === 0) return 'insufficient_information';

  if (counts.notYet === 0 && counts.sometimes === 0) {
    return 'many_observed';
  }

  if (counts.notYet >= 2 || counts.notYet / observed >= 0.5) {
    return 'several_not_yet';
  }

  return 'mixed';
}
```

This is a transparent product-routing heuristic, not a validated clinical cutoff. Keep it isolated in a configuration or pure function so an SLP reviewer can revise it later.

### 10.2 Overall tier routing

Apply overrides before general milestone routing.

```ts
function deriveResultTier(
  domainResults: DomainResult[],
  answers: CheckInAnswers['milestones'],
  context: CheckInAnswers['context'],
): ResultTier {
  const concern = context.caregiver_concern;
  const skillLoss = context.skill_loss;
  const hearingConcern = context.hearing_concern;

  const domainsWithSeveralNotYet = domainResults.filter(
    (result) => result.status === 'several_not_yet',
  ).length;

  const answerValues = Object.values(answers);
  const notYetCount = answerValues.filter((value) => value === 'not_yet').length;
  const sometimesCount = answerValues.filter(
    (value) => value === 'sometimes',
  ).length;

  if (
    skillLoss === 'yes' ||
    concern === 'very_concerned' ||
    notYetCount >= 4 ||
    domainsWithSeveralNotYet >= 2
  ) {
    return 'connect';
  }

  if (
    hearingConcern === 'yes' ||
    concern === 'a_little' ||
    concern === 'concerned' ||
    notYetCount >= 1 ||
    sometimesCount >= 3 ||
    domainsWithSeveralNotYet === 1
  ) {
    return 'conversation';
  }

  return 'building';
}
```

Requirements:

- Skill loss must always create a prominent, prompt pediatrician action even if the overall milestone pattern is otherwise strong.
- A hearing concern must always create an audiologist/pediatrician action.
- Caregiver concern must be respected even when many milestone skills are observed.
- Strength in one domain must not erase several `not_yet` observations in another domain.
- `unsure` answers should create observation guidance, not negative scoring.
- A `building` result must not say or imply that no evaluation is needed.

### 10.3 Professional actions

```ts
function derivePriorityActions(
  context: CheckInAnswers['context'],
  tier: ResultTier,
): ResultAction[] {
  const actions: ResultAction[] = [];

  if (context.skill_loss === 'yes') {
    actions.push({
      id: 'discuss-skill-loss',
      professional: 'pediatrician',
      title: 'Discuss the change promptly',
      reason:
        'You reported that your child stopped using a communication skill they previously used regularly.',
      priority: 'prompt',
      ctaLabel: 'Contact your child’s pediatrician',
    });
  }

  if (context.hearing_concern === 'yes') {
    actions.push({
      id: 'consider-hearing-evaluation',
      professional: 'audiologist',
      title: 'Consider a hearing evaluation',
      reason:
        'You reported a concern about hearing, responses to sounds, or frequent ear problems. Hearing can affect communication development.',
      priority: 'recommended',
      ctaLabel: 'Learn about hearing evaluations',
    });
  }

  if (
    tier !== 'building' ||
    context.caregiver_concern === 'concerned' ||
    context.caregiver_concern === 'very_concerned'
  ) {
    actions.push({
      id: 'talk-with-slp',
      professional: 'speechLanguagePathologist',
      title: 'Talk with a speech-language pathologist',
      reason:
        'An SLP can review the full communication picture and help determine whether monitoring, home strategies, or an evaluation would be useful.',
      priority: tier === 'connect' ? 'recommended' : 'routine',
      ctaLabel: 'Schedule a consultation',
    });
  }

  return deduplicateActions(actions);
}
```

Use the existing website consultation URL for the SLP CTA. Do not invent a scheduling link. If none exists, use a standard contact route.

### 10.4 Personalized strengths

Generate up to three strengths from questions answered `consistently`.

- Group by domain.
- Use deterministic templates.
- Do not say that the domain is normal or complete.
- Example: “You’re consistently noticing several receptive-language skills, including responding to familiar words and directions.”

If fewer than two answers are `consistently`, use neutral language such as:

> You identified communication skills that are beginning to show up. The summary below reflects where you are seeing them most often.

### 10.5 Skills to watch

Generate up to three items, prioritizing:

1. `not_yet` answers;
2. `sometimes` answers;
3. `unsure` answers.

Convert question wording into observational wording. Do not state that the missing skill proves a delay.

Examples:

- Question: “Does your child combine two or more words?”
- Result: “Combining two or more words was marked as not yet.”

- Question: “Does your child follow a familiar one-step direction?”
- Result: “Following a familiar one-step direction was marked as something you notice sometimes.”

### 10.6 Personalized home ideas

Return exactly three ideas when possible:

1. Pull the `idea` from `not_yet` questions first.
2. Then use `sometimes` questions.
3. Then use the age-group fallback ideas.
4. Deduplicate identical or substantially similar ideas.
5. Never describe these as treatment or a substitute for evaluation.

Heading:

> Ideas to try during everyday routines

Supporting copy:

> These are low-pressure ways to create communication opportunities. Your child does not need to repeat or perform on demand.

---

## 11. Result page information architecture

Render result sections in this order:

1. **Overall guidance panel**
   - Eyebrow, title, and body from `resultContent[tier]`.
   - Do not display a numerical score.
2. **Important context notices**
   - Skill loss first.
   - Hearing concern second.
   - Other notices after those.
3. **Communication strengths**
   - Show up to three concise observations.
4. **Skills that may still be emerging**
   - Show up to three concise observations.
5. **Three ideas to try during everyday routines**
6. **One primary next step**
   - A second action may appear only for skill loss or a hearing concern.
7. **Educational disclaimer**

Do not add domain dashboards, charts, percentages, downloadable reports, or a separate results route. Domain tags are primarily internal and help the engine avoid allowing one area to obscure another.

Do not use alarming red danger styling for routine guidance. A skill-loss notice may use higher visual priority, but the copy should remain calm and direct.

---

## 12. Context-specific notices

```ts
function deriveNotices(
  context: CheckInAnswers['context'],
): CheckInResult['notices'] {
  return {
    skillLoss:
      context.skill_loss === 'yes'
        ? 'You shared that your child stopped using a communication skill they previously used regularly. Contact their pediatrician promptly to discuss the change, regardless of the rest of this result.'
        : undefined,
    hearing:
      context.hearing_concern === 'yes'
        ? 'You shared a concern about hearing, responses to sounds, or frequent ear problems. Consider discussing a hearing evaluation with your child’s pediatrician or an audiologist.'
        : undefined,
  };
}
```

---

## 13. Explicitly out of scope

- Conditional follow-up questions
- Free-text answers
- Accounts or saved child profiles
- Server-side answer storage
- Downloadable or shareable reports
- Charts or detailed domain dashboards
- A new analytics vendor
- Appointment intake fields inside the checker

---

## 14. State management and privacy

Recommended state shape:

```ts
type CheckInState = {
  version: 2;
  status: 'intro' | 'context' | 'milestones' | 'results';
  currentStep: number;
  answers: CheckInAnswers;
};
```

Requirements:

- Include a schema version so old saved data does not break the new flow.
- Do not place answers in URL query parameters.
- Prefer in-memory state. Use session storage only if the current checker already restores progress.
- Provide a restart control that clears only this checker’s state.
- Do not collect the child’s full name, exact date of birth, address, diagnosis, or medical record information for this check-in.
- Do not send individual answers to third-party analytics.

---

## 15. Analytics

If the site already has analytics, optionally track only `check_in_started`, `check_in_completed`, and `result_cta_clicked`. Do not send exact answers, child identifiers, or an answer profile. If the site does not already have analytics, add none.

---

## 16. Accessibility requirements

Meet WCAG 2.2 AA and preserve the repository’s accessibility patterns.

1. Use semantic `fieldset` and `legend` elements for each radio or checkbox group.
2. Associate descriptions and helper text with controls using `aria-describedby` when needed.
3. Ensure all controls work with keyboard input.
4. Move focus to the new question heading after navigation.
5. Announce progress in text, not color alone.
6. Do not auto-advance immediately after a radio selection; allow review and provide a clear Next button.
7. Provide visible focus indicators with sufficient contrast.
8. Ensure tier meaning is not communicated by pink, yellow, or purple alone.
9. Respect reduced-motion preferences.
10. Make validation messages specific and programmatically associated with the unanswered group.

Recommended progress text:

> Question 4 of 10 · Understanding language

Use parent-friendly domain labels in the interface:

```ts
const domainLabels: Record<CommunicationDomain, string> = {
  receptiveLanguage: 'Understanding language',
  expressiveLanguage: 'Sharing words and ideas',
  socialCommunication: 'Connecting with others',
  speechSounds: 'Speech clarity and sounds',
  fluency: 'Speech flow',
  earlyLiteracy: 'Early reading and writing skills',
};
```

---

## 17. Testing requirements

### Unit tests

Add tests for:

1. `unsure` and `not_applicable` do not count as `not_yet`.
2. A domain with only `consistently` answers returns `many_observed`.
3. A domain with mixed consistent and sometimes answers returns `mixed`.
4. Two `not_yet` answers in a domain return `several_not_yet` under the configured heuristic.
5. Skill loss routes to `connect` and adds the prompt pediatrician action.
6. Hearing concern adds an audiologist action even when the tier would otherwise be `building`.
7. Very concerned caregiver context routes to `connect`.
8. Concerned caregiver context routes to at least `conversation`.
9. Personalized ideas prioritize `not_yet`, then `sometimes`, and deduplicate output.
10. No result returns more than three strengths, three skills to watch, or three ideas.
11. The result always includes the disclaimer.
12. Result copy contains none of the prohibited terminology in Section 2.

### Component/integration tests

Add tests for:

1. keyboard navigation through answer choices;
2. a user cannot continue without selecting a required response;
3. changing a previous answer updates downstream results;
4. progress text updates correctly;
5. restarting removes the checker’s state;
6. result CTAs use existing valid site destinations;
7. results do not expose answers in the URL.

### Accessibility tests

- Run the repository’s automated accessibility tooling, such as axe, if already available.
- Verify radio groups, checkbox groups, focus order, headings, error announcements, color contrast, and reduced motion manually.

---

## 18. Migration plan

1. Preserve the current check-in route and visual identity.
2. Replace `questions: string[]` with `questions: MilestoneQuestion[]`.
3. Add stable IDs, domains, help text, home ideas, and question-specific `allowNotApplicable` flags.
4. Add the context section before milestone questions.
5. Replace binary state with `AnswerValue`.
6. If the existing checker saves progress, add a schema version and invalidate incompatible v1 state.
7. Implement pure result-engine functions.
8. Build the richer result page.
9. Add tests and verify existing routes.

Do not silently migrate old yes/no results into the new five-option model. Old incomplete sessions should restart with a brief message explaining that the check-in was updated.

---

## 19. Definition of done

The feature is complete when:

- all six age groups use the new question object structure;
- all questions have stable IDs, domain tags, and home ideas;
- the four standard response options work correctly, with “Not applicable” limited to configured spoken-speech questions;
- all three context questions are implemented;
- result generation is deterministic and independently tested;
- skill loss and hearing concern produce the required actions;
- results show up to three strengths, up to three emerging skills, three ideas, a clear next step, and the disclaimer;
- no result displays a numerical score, pass/fail state, diagnosis, or disorder probability;
- no individual answers are placed in URLs or third-party analytics;
- keyboard and screen-reader flows are usable;
- the existing formatter, linter, type checker, tests, and production build pass.

---

## 20. Source basis and review note

The content and product boundaries in this specification are informed by:

- ASHA Communication Milestones: Birth to 1 Year  
  https://www.asha.org/public/developmental-milestones/communication-milestones-birth-to-1-year/
- ASHA Communication Milestones: 13 to 18 Months  
  https://www.asha.org/public/developmental-milestones/communication-milestones-13-to-18-months/
- ASHA Communication Milestones: 19 to 24 Months  
  https://www.asha.org/public/developmental-milestones/communication-milestones-19-to-24-months/
- ASHA Communication Milestones: 2 to 3 Years  
  https://www.asha.org/public/developmental-milestones/communication-milestones-2-to-3-years/
- ASHA Communication Milestones: 3 to 4 Years  
  https://www.asha.org/public/developmental-milestones/communication-milestones-3-to-4-years/
- ASHA Communication Milestones: 4 to 5 Years  
  https://www.asha.org/public/developmental-milestones/communication-milestones-4-to-5-years/
- ASHA Practice Portal: Spoken Language Disorders  
  https://www.asha.org/practice-portal/clinical-topics/spoken-language-disorders/
- ASHA Practice Portal: Late Language Emergence  
  https://www.asha.org/practice-portal/clinical-topics/late-language-emergence/
- CDC Developmental Milestones  
  https://www.cdc.gov/act-early/milestones/index.html
- CDC Developmental Monitoring and Screening  
  https://www.cdc.gov/act-early/about/developmental-monitoring-and-screening.html

ASHA states that screening does not result in a diagnosis and that further audiologic, language, or speech assessment may be indicated. CDC states that milestone checklists are not substitutes for standardized, validated developmental screening tools and advises caregivers to act when skills are lost or concerns are present.

Before public launch, have a licensed speech-language pathologist review the final in-product wording, routing thresholds, CTAs, and local referral information. If the business wants to call this a “screening,” use a properly licensed, standardized tool with appropriate administration, scoring, and professional oversight instead of relabeling this custom check-in.
