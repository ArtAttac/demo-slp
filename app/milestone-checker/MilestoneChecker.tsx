'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import { ageGroups, answerOptions, domainLabels } from './milestone-data';
import { createCheckInResult } from './result-engine';
import type { AgeGroup, AgeKey, AnswerValue, CheckInState, ProfessionalType } from './milestone-types';

type EmailStatus = 'idle' | 'submitting' | 'success' | 'error';

const initialState: CheckInState = {
  version: 2,
  status: 'intro',
  currentStep: 0,
  answers: { ageKey: '24m', milestones: {} },
};

const professionalLabels: Record<ProfessionalType, string> = {
  speechLanguagePathologist: 'Speech-language pathologist',
};

const answerOrder: AnswerValue[] = ['consistently', 'sometimes', 'not_yet', 'unsure', 'not_applicable'];

export default function MilestoneChecker() {
  const [checkIn, setCheckIn] = useState<CheckInState>(initialState);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [email, setEmail] = useState('');
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');
  const [emailMessage, setEmailMessage] = useState('');
  const [showAnswerGuidance, setShowAnswerGuidance] = useState(false);
  const activeHeadingRef = useRef<HTMLHeadingElement>(null);
  const answerGuidanceButtonRef = useRef<HTMLButtonElement>(null);
  const answerGuidanceCloseRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const ageGroup = ageGroups[checkIn.answers.ageKey];
  const milestoneQuestion = ageGroup.questions[checkIn.currentStep];
  const result = useMemo(() => createCheckInResult(checkIn.answers), [checkIn.answers]);

  useEffect(() => {
    if (checkIn.status === 'intro') return;
    const frame = window.requestAnimationFrame(() => activeHeadingRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [checkIn.status, checkIn.currentStep]);

  useEffect(() => {
    if (!showAnswerGuidance) return;
    answerGuidanceCloseRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowAnswerGuidance(false);
        window.requestAnimationFrame(() => answerGuidanceButtonRef.current?.focus());
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        answerGuidanceCloseRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showAnswerGuidance]);

  const transition = prefersReducedMotion
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };

  const selectAge = (ageKey: AgeKey) => setCheckIn((current) => ({
    ...current,
    answers: { ...current.answers, ageKey },
  }));

  const start = () => {
    if (!hasAcceptedTerms) return;
    setCheckIn((current) => ({
      version: 2,
      status: 'milestones',
      currentStep: 0,
      answers: { ageKey: current.answers.ageKey, milestones: {} },
    }));
  };

  const selectMilestoneAnswer = (value: AnswerValue) => {
    setCheckIn((current) => {
      const answers = {
        ...current.answers,
        milestones: { ...current.answers.milestones, [milestoneQuestion.id]: value },
      };
      return current.currentStep < ageGroup.questions.length - 1
        ? { ...current, currentStep: current.currentStep + 1, answers }
        : { ...current, status: 'results', currentStep: 0, answers };
    });
  };

  const back = () => {
    setCheckIn((current) => {
      if (current.status === 'milestones') return current.currentStep === 0
        ? { ...current, status: 'intro', currentStep: 0 }
        : { ...current, currentStep: current.currentStep - 1 };
      return current;
    });
  };

  const reset = () => {
    setCheckIn(initialState);
    setHasAcceptedTerms(false);
    setEmail('');
    setEmailOptIn(false);
    setEmailStatus('idle');
    setEmailMessage('');
    setShowAnswerGuidance(false);
  };

  const closeAnswerGuidance = () => {
    setShowAnswerGuidance(false);
    window.requestAnimationFrame(() => answerGuidanceButtonRef.current?.focus());
  };

  const submitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim();
    if (!emailOptIn) {
      setEmailStatus('error');
      setEmailMessage('Check the box if you would like to join the email list, or skip this optional step.');
      return;
    }
    if (!normalizedEmail) {
      setEmailStatus('error');
      setEmailMessage('Enter an email address, or simply skip this optional step.');
      return;
    }
    setEmailStatus('submitting');
    setEmailMessage('');
    try {
      const response = await fetch('/api/milestone-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, emailConsent: true }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'We could not save your email right now.');
      setEmailStatus('success');
      setEmailMessage('You’re all set! We’ll send occasional updates about workshops and events.');
    } catch (error) {
      setEmailStatus('error');
      setEmailMessage(error instanceof Error ? error.message : 'We could not save your email right now.');
    }
  };

  const progressMax = ageGroup.questions.length;
  const progress = ((checkIn.currentStep + 1) / progressMax) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-cream via-white to-brand-bluePurple/10">
      <main className="relative overflow-hidden px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-brand-yellow/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-52 h-72 w-72 rounded-full bg-brand-pink/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <header className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
            <span className="inline-flex rounded-full bg-brand-yellow/30 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-darkBlue sm:text-sm">Free educational tool</span>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-brand-darkBlue sm:text-4xl lg:text-5xl">Communication Milestone <span className="whitespace-nowrap">Check-In</span></h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-700 sm:text-lg">Take 2–3 minutes to reflect on the communication skills you notice in your child and get practical next steps.</p>
          </header>

          <section aria-label="Communication milestone check-in" className="min-h-[31rem] overflow-hidden rounded-[2rem] border border-brand-darkBlue/10 bg-white shadow-2xl shadow-brand-darkBlue/10">
            {checkIn.status !== 'intro' && <div className="border-b border-brand-darkBlue/20 bg-brand-darkBlue px-5 py-3 text-center text-xs font-bold text-white sm:px-8 sm:text-sm">Educational check-in only — not a standardized screening, evaluation, or diagnosis.</div>}
            {checkIn.status === 'milestones' && (
              <div className="h-2 overflow-hidden bg-brand-bluePurple/15" role="progressbar" aria-label="Question progress" aria-valuemin={1} aria-valuemax={progressMax} aria-valuenow={checkIn.currentStep + 1}>
                <motion.div className="h-full bg-gradient-to-r from-brand-bluePurple to-brand-pink" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: prefersReducedMotion ? 0 : 0.35 }} />
              </div>
            )}

            <AnimatePresence mode="wait" initial={false}>
              {checkIn.status === 'intro' && <IntroScreen checkIn={checkIn} hasAcceptedTerms={hasAcceptedTerms} onAge={selectAge} onTerms={setHasAcceptedTerms} onStart={start} transition={transition} />}

              {checkIn.status === 'milestones' && milestoneQuestion && (
                <motion.div key={`milestone-${milestoneQuestion.id}`} {...transition} className="p-6 sm:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-gray-500">
                    <span>{ageGroup.label}</span>
                    <span>Question {checkIn.currentStep + 1} of {ageGroup.questions.length} · {domainLabels[milestoneQuestion.domain]}</span>
                  </div>
                  <button
                    ref={answerGuidanceButtonRef}
                    type="button"
                    onClick={() => setShowAnswerGuidance(true)}
                    aria-haspopup="dialog"
                    aria-controls="answer-guidance-dialog"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-bluePurple/40 bg-brand-bluePurple/10 px-4 py-2 text-sm font-bold text-brand-darkBlue transition hover:border-brand-bluePurple focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-bluePurple/25"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs" aria-hidden="true">i</span>
                    How to answer
                  </button>
                  <fieldset className="mt-7" aria-describedby={milestoneQuestion.helpText ? 'milestone-question-help' : undefined}>
                    <legend className="sr-only">{milestoneQuestion.text}</legend>
                    <h2 ref={activeHeadingRef} tabIndex={-1} className="max-w-3xl font-body text-2xl font-bold leading-snug tracking-normal text-brand-darkBlue outline-none [word-spacing:normal] sm:text-4xl">{milestoneQuestion.text}</h2>
                    {milestoneQuestion.helpText && <p id="milestone-question-help" className="mt-3 leading-relaxed text-gray-600">{milestoneQuestion.helpText}</p>}
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {answerOrder.filter((value) => value !== 'not_applicable' || milestoneQuestion.allowNotApplicable).map((value) => (
                        <Choice key={value} name={milestoneQuestion.id} value={value} selected={checkIn.answers.milestones[milestoneQuestion.id] === value} onChange={() => selectMilestoneAnswer(value)} label={answerOptions[value].label} description={answerOptions[value].description} />
                      ))}
                    </div>
                  </fieldset>
                  <QuizNavigation onBack={back} onReset={reset} />
                </motion.div>
              )}

              {checkIn.status === 'results' && (
                <ResultsScreen
                  result={result}
                  headingRef={activeHeadingRef}
                  email={email}
                  emailOptIn={emailOptIn}
                  emailStatus={emailStatus}
                  emailMessage={emailMessage}
                  transition={transition}
                  onReset={reset}
                  onEmail={setEmail}
                  onOptIn={setEmailOptIn}
                  clearEmailStatus={() => { setEmailStatus('idle'); setEmailMessage(''); }}
                  onSubmit={submitEmail}
                />
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>
      {showAnswerGuidance && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-darkBlue/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeAnswerGuidance();
          }}
        >
          <section
            id="answer-guidance-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="answer-guidance-title"
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="answer-guidance-title" className="text-2xl font-bold text-brand-darkBlue">How to answer</h2>
              <button
                ref={answerGuidanceCloseRef}
                type="button"
                onClick={closeAnswerGuidance}
                aria-label="Close answer guidance"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-brand-darkBlue/20 text-xl font-bold text-brand-darkBlue hover:bg-brand-cream focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-bluePurple/25"
              >
                ×
              </button>
            </div>
            <p className="mt-5 leading-relaxed text-gray-700">
              Answer based on what you usually notice during everyday activities. For language questions, consider all languages and communication systems your child uses. Questions specifically about speech sounds or how understandable speech is refer to spoken speech.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

function IntroScreen({ checkIn, hasAcceptedTerms, onAge, onTerms, onStart, transition }: {
  checkIn: CheckInState;
  hasAcceptedTerms: boolean;
  onAge: (age: AgeKey) => void;
  onTerms: (accepted: boolean) => void;
  onStart: () => void;
  transition: Record<string, unknown>;
}) {
  return <motion.div key="intro" {...transition} className="p-5 sm:p-8">
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-bluePurple sm:text-sm">Step one</p>
    <fieldset className="mt-2">
      <legend className="text-2xl font-bold text-brand-darkBlue sm:text-3xl">How old is your child?</legend>
      <p id="age-help" className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">Choose the most recently completed age band. For example, choose 24 months for a child who is 2 years and 8 months old.</p>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3" aria-describedby="age-help">
        {(Object.entries(ageGroups) as [AgeKey, AgeGroup][]).map(([key, group]) => <Choice key={key} name="age" value={key} selected={checkIn.answers.ageKey === key} onChange={() => onAge(key)} label={group.shortLabel} centered />)}
      </div>
    </fieldset>
    <div className="mt-6 rounded-2xl border border-brand-yellow/60 bg-brand-yellow/15 p-4 text-sm leading-relaxed text-gray-700 sm:p-5">
      <p className="font-bold text-brand-darkBlue">Before you begin</p>
      <p className="mt-2">This communication milestone check-in is an educational tool, not a standardized screening, speech-language evaluation, medical opinion, or diagnosis. Answer based on everyday behavior rather than asking your child to perform a skill now. It does not create a therapist-client relationship.</p>
      <label htmlFor="milestone-terms" className="mt-4 flex cursor-pointer items-start gap-3 font-semibold text-brand-darkBlue"><input id="milestone-terms" type="checkbox" checked={hasAcceptedTerms} onChange={(event) => onTerms(event.target.checked)} className="mt-0.5 h-5 w-5 flex-none accent-brand-bluePurple" /><span>I have read and understand the above.</span></label>
      <p className="mt-3 text-xs text-gray-600 sm:text-sm">Read our <Link href="/milestone-checker/privacy" className="font-semibold text-brand-bluePurple underline underline-offset-2 hover:text-brand-darkBlue">milestone check-in privacy notice</Link>.</p>
    </div>
    <button type="button" onClick={onStart} disabled={!hasAcceptedTerms} className="mt-5 w-full rounded-full bg-brand-darkBlue px-7 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-brand-bluePurple focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-bluePurple/30 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-lg">Begin the check-in</button>
  </motion.div>;
}

function Choice({ name, value, selected, onChange, label, description, centered = false }: {
  name: string; value: string; selected: boolean; onChange: () => void; label: string; description?: string; centered?: boolean;
}) {
  return <label className={`cursor-pointer rounded-2xl border-2 p-4 transition focus-within:ring-4 focus-within:ring-brand-bluePurple/30 ${centered ? 'text-center' : ''} ${selected ? 'border-brand-bluePurple bg-brand-bluePurple text-white' : 'border-brand-darkBlue/15 bg-brand-cream text-brand-darkBlue hover:border-brand-bluePurple/50'}`}>
    <input type="radio" name={name} value={value} checked={selected} onChange={onChange} className="sr-only" />
    <span className="block font-bold">{label}</span>
    {description && <span className={`mt-1 block text-sm leading-relaxed ${selected ? 'text-white/85' : 'text-gray-600'}`}>{description}</span>}
  </label>;
}

function QuizNavigation({ onBack, onReset }: { onBack: () => void; onReset: () => void }) {
  return <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"><button type="button" onClick={onBack} className="font-semibold text-gray-600 underline underline-offset-4 hover:text-brand-darkBlue focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-bluePurple/25">Back</button><button type="button" onClick={onReset} className="font-semibold text-brand-darkBlue underline underline-offset-4 hover:text-brand-bluePurple focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-bluePurple/25">Start over</button></div>;
}

function ResultsScreen({ result, headingRef, email, emailOptIn, emailStatus, emailMessage, transition, onReset, onEmail, onOptIn, clearEmailStatus, onSubmit }: {
  result: ReturnType<typeof createCheckInResult>;
  headingRef: React.RefObject<HTMLHeadingElement>;
  email: string; emailOptIn: boolean; emailStatus: EmailStatus; emailMessage: string;
  transition: Record<string, unknown>;
  onReset: () => void; onEmail: (value: string) => void; onOptIn: (value: boolean) => void; clearEmailStatus: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return <motion.div key="results" {...transition} className="p-6 sm:p-10">
    <div className={`rounded-3xl border p-6 sm:p-8 ${result.overview.panel}`}><span className={`inline-flex rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] ${result.overview.accent}`}>{result.overview.eyebrow}</span><h2 ref={headingRef} tabIndex={-1} className="mt-5 text-3xl font-bold leading-tight text-brand-darkBlue outline-none sm:text-4xl">{result.overview.title}</h2><p className="mt-4 text-lg leading-relaxed text-gray-700">{result.overview.body}</p></div>
    <ResultList title="Communication strengths" items={result.strengths} dotClass="bg-brand-yellow" />
    <ResultList title="Skills that may still be emerging" items={result.skillsToWatch.length ? result.skillsToWatch : ['You did not mark any of these check-in skills as sometimes, not yet, or unsure.']} dotClass="bg-brand-bluePurple" />
    <section className="mt-8 rounded-3xl bg-brand-cream p-6 sm:p-7"><h3 className="text-2xl font-bold text-brand-darkBlue">Ideas to try during everyday routines</h3><p className="mt-2 leading-relaxed text-gray-600">These are low-pressure ways to create communication opportunities. Your child does not need to repeat or perform on demand.</p><ul className="mt-5 space-y-3">{result.personalizedIdeas.map((idea) => <ResultItem key={idea} text={idea} dotClass="bg-brand-pink" />)}</ul></section>
    <section className="mt-8" aria-labelledby="next-step-heading"><h3 id="next-step-heading" className="text-2xl font-bold text-brand-darkBlue">Your next step</h3>{result.nextSteps.length ? <div className="mt-4 grid gap-4">{result.nextSteps.map((action, index) => <article key={action.id} className={`rounded-2xl border p-5 ${index === 0 && action.priority === 'prompt' ? 'border-2 border-brand-pink bg-brand-pink/10' : 'border-brand-darkBlue/15 bg-white'}`}><p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-bluePurple">{professionalLabels[action.professional]} · {action.priority}</p><h4 className="mt-2 text-xl font-bold text-brand-darkBlue">{action.title}</h4><p className="mt-2 leading-relaxed text-gray-700">{action.reason}</p>{action.ctaHref ? <a href={action.ctaHref} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-brand-darkBlue px-6 py-3 font-bold text-white transition hover:bg-brand-bluePurple focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-bluePurple/30">{action.ctaLabel}</a> : action.ctaLabel ? <p className="mt-4 font-bold text-brand-darkBlue">{action.ctaLabel}</p> : null}</article>)}</div> : <div className="mt-4 rounded-2xl border border-brand-yellow/60 bg-brand-yellow/15 p-5"><h4 className="text-xl font-bold text-brand-darkBlue">Keep noticing and building together</h4><p className="mt-2 leading-relaxed text-gray-700">Use the ideas above during familiar routines, and contact a speech-language pathologist if you would like individualized guidance.</p></div>}</section>
    <EmailSignup email={email} emailOptIn={emailOptIn} status={emailStatus} message={emailMessage} onEmailChange={(value) => { onEmail(value); clearEmailStatus(); }} onOptInChange={(value) => { onOptIn(value); clearEmailStatus(); }} onSubmit={onSubmit} />
    <section className="mt-8 rounded-3xl border border-brand-darkBlue/10 bg-gray-50 p-6 sm:p-7" aria-labelledby="about-results"><h3 id="about-results" className="text-2xl font-bold text-brand-darkBlue">About this summary</h3><p className="mt-3 leading-relaxed text-gray-700">{result.disclaimer}</p><p className="mt-4 text-sm leading-relaxed text-gray-600">The questions are informed by public ASHA and CDC communication milestones. Their selection, grouping, response choices, and routing have not been clinically validated for sensitivity or specificity.</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold"><a href="https://www.asha.org/public/developmental-milestones/communication-milestones/" target="_blank" rel="noreferrer" className="text-brand-bluePurple underline underline-offset-4 hover:text-brand-darkBlue">ASHA communication milestones</a><a href="https://www.cdc.gov/act-early/milestones/index.html" target="_blank" rel="noreferrer" className="text-brand-bluePurple underline underline-offset-4 hover:text-brand-darkBlue">CDC developmental milestones</a></div></section>
    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-brand-darkBlue/10 pt-6"><button type="button" onClick={onReset} className="font-semibold text-brand-darkBlue underline underline-offset-4 hover:text-brand-bluePurple">Restart the check-in</button><Link href="/" className="font-semibold text-gray-500 underline underline-offset-4 hover:text-brand-darkBlue">Return home</Link></div>
  </motion.div>;
}

function ResultList({ title, items, dotClass }: { title: string; items: string[]; dotClass: string }) {
  return <section className="mt-8"><h3 className="text-2xl font-bold text-brand-darkBlue">{title}</h3><ul className="mt-4 space-y-3">{items.map((item) => <ResultItem key={item} text={item} dotClass={dotClass} />)}</ul></section>;
}

function ResultItem({ text, dotClass }: { text: string; dotClass: string }) {
  return <li className="flex gap-3 leading-relaxed text-gray-700"><span className={`mt-2 h-2 w-2 flex-none rounded-full ${dotClass}`} aria-hidden="true" /><span>{text}</span></li>;
}

function EmailSignup({ email, emailOptIn, status, message, onEmailChange, onOptInChange, onSubmit }: { email: string; emailOptIn: boolean; status: EmailStatus; message: string; onEmailChange: (value: string) => void; onOptInChange: (value: boolean) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <section className="mt-8 rounded-3xl bg-brand-cream p-6 sm:p-7" aria-labelledby="email-signup-heading"><p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-bluePurple">Optional email signup</p><h3 id="email-signup-heading" className="mt-2 text-2xl font-bold text-brand-darkBlue">Want occasional updates about workshops and events?</h3><p className="mt-2 leading-relaxed text-gray-600">Sign up to receive updates from Speech on the Slope about upcoming workshops, classes, events, and speech &amp; language tips!</p>{status === 'success' ? <p className="mt-5 rounded-2xl bg-white px-5 py-4 font-semibold text-brand-darkBlue" role="status">{message}</p> : <form onSubmit={onSubmit} className="mt-5" noValidate><label htmlFor="milestone-email-opt-in" className="flex cursor-pointer items-start gap-3 font-semibold text-brand-darkBlue"><input id="milestone-email-opt-in" type="checkbox" checked={emailOptIn} onChange={(event) => onOptInChange(event.target.checked)} className="mt-1 h-5 w-5 flex-none accent-brand-bluePurple" /><span>Yes, add me to the Speech on the Slope email list.</span></label><label htmlFor="milestone-email" className="mt-4 block text-sm font-bold text-brand-darkBlue">Email address <span className="font-normal text-gray-500">(optional)</span></label><div className="mt-2 flex flex-col gap-3 sm:flex-row"><input id="milestone-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => onEmailChange(event.target.value)} aria-describedby="milestone-email-note milestone-email-status" className="min-w-0 flex-1 rounded-full border-2 border-brand-darkBlue/15 bg-white px-5 py-3 text-gray-900 outline-none transition focus:border-brand-bluePurple focus:ring-4 focus:ring-brand-bluePurple/15" /><button type="submit" disabled={status === 'submitting'} className="rounded-full bg-brand-bluePurple px-6 py-3 font-bold text-white transition hover:bg-brand-darkBlue disabled:cursor-wait disabled:opacity-60">{status === 'submitting' ? 'Saving…' : 'Join the email list'}</button></div><p id="milestone-email-note" className="mt-3 text-xs leading-relaxed text-gray-500">You can <a href="mailto:hello@speechontheslope.com?subject=Unsubscribe%20from%20Speech%20on%20the%20Slope%20email%20list" className="font-semibold underline underline-offset-2 hover:text-brand-darkBlue">unsubscribe at any time</a>. See our <Link href="/privacy-policy" className="font-semibold underline underline-offset-2 hover:text-brand-darkBlue">Privacy Policy</Link>.</p><p id="milestone-email-status" className={`mt-3 text-sm font-semibold ${status === 'error' ? 'text-red-700' : 'text-brand-darkBlue'}`} role="status">{message}</p></form>}</section>;
}
