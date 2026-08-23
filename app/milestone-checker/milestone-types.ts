export type AgeKey = '12m' | '18m' | '24m' | '3y' | '4y' | '5y';

export type CheckInStage = 'intro' | 'milestones' | 'results';

export type ResultTier = 'building' | 'conversation' | 'connect';

export type AnswerValue =
  | 'consistently'
  | 'sometimes'
  | 'not_yet'
  | 'unsure'
  | 'not_applicable';

export type CommunicationDomain =
  | 'receptiveLanguage'
  | 'expressiveLanguage'
  | 'socialCommunication'
  | 'speechSounds'
  | 'fluency'
  | 'earlyLiteracy';

export type MilestoneQuestion = {
  id: string;
  text: string;
  domain: CommunicationDomain;
  helpText?: string;
  allowNotApplicable?: boolean;
  idea: string;
};

export type AgeGroup = {
  shortLabel: string;
  label: string;
  questions: MilestoneQuestion[];
  ideas: string[];
};

export type DomainStatus =
  | 'many_observed'
  | 'mixed'
  | 'several_not_yet'
  | 'insufficient_information';

export type ProfessionalType =
  | 'speechLanguagePathologist';

export type ResultAction = {
  id: string;
  professional: ProfessionalType;
  title: string;
  reason: string;
  priority: 'routine' | 'recommended' | 'prompt';
  ctaLabel?: string;
  ctaHref?: string;
};

export type DomainResult = {
  domain: CommunicationDomain;
  status: DomainStatus;
  consistentlyCount: number;
  sometimesCount: number;
  notYetCount: number;
  unsureCount: number;
  notApplicableCount: number;
  summary: string;
};

export type CheckInAnswers = {
  ageKey: AgeKey;
  milestones: Record<string, AnswerValue>;
};

export type CheckInState = {
  version: 2;
  status: CheckInStage;
  currentStep: number;
  answers: CheckInAnswers;
};

export type CheckInResult = {
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
  disclaimer: string;
};
