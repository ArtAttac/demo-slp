'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useMemo, useState } from 'react';

type AgeKey = '12m' | '18m' | '24m' | '3y' | '4y' | '5y';
type Stage = 'intro' | 'questions' | 'result';
type ResultTier = 'building' | 'conversation' | 'connect';
type EmailStatus = 'idle' | 'submitting' | 'success' | 'error';

type AgeGroup = {
  shortLabel: string;
  label: string;
  questions: string[];
  ideas: string[];
};

const bookingUrl =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2eEDub4YSqXnOCQkSqXDlFi00LpdbQGgk2aDcKoR3APT8d3B2eiX6J5HyoqsUDiIABCj_8onap?gv=true';

const ageGroups: Record<AgeKey, AgeGroup> = {
  '12m': {
    shortLabel: '12 mo',
    label: '12 months',
    questions: [
      'Does your child turn or look when they hear their name or a familiar voice?',
      'Does your child notice and react to everyday sounds around them?',
      'Does your child babble using different strings of sounds, such as “bababa” or “mamama”?',
      'Does your child take turns making sounds with you?',
      'Does your child use gestures such as waving, reaching, lifting their arms, or shaking their head?',
      'Does your child point, show, or give you things to share interest or ask for help?',
      'Does your child try to copy sounds, facial expressions, or gestures?',
      'Does your child pause or respond when they hear “no” or another familiar phrase?',
      'Does your child use “mama,” “dada,” or another special name for a caregiver?',
      'Does your child enjoy social games such as peekaboo or pat-a-cake?',
    ],
    ideas: [
      'Copy your child’s sounds, then pause to invite another turn.',
      'Name familiar objects during everyday routines like meals and bath time.',
      'Pair simple words with gestures in songs and social games.',
    ],
  },
  '18m': {
    shortLabel: '18 mo',
    label: '18 months',
    questions: [
      'Does your child point to request something or show you something interesting?',
      'Does your child follow a familiar one-step direction, such as “give me the ball”?',
      'Does your child look around when you ask a “where” question about a familiar person or object?',
      'Does your child try to say at least a few words besides names for caregivers?',
      'Does your child understand words for familiar people, objects, or actions?',
      'Can your child point to at least one body part when you name it?',
      'Does your child use gestures such as nodding yes, shaking no, clapping, or giving a high-five?',
      'Does your child mix sounds, syllables, and real words with speech-like expression?',
      'Does your child look at or point to pictures with you during book time?',
      'Does your child try to imitate new words or sounds they hear?',
    ],
    ideas: [
      'Offer two choices and name both: “Do you want milk or water?”',
      'Add one word to what your child says—if they say “car,” try “big car.”',
      'Point to and name pictures together without asking your child to perform.',
    ],
  },
  '24m': {
    shortLabel: '24 mo',
    label: '24 months',
    questions: [
      'Does your child use words for a variety of people, foods, toys, actions, and body parts?',
      'Does your child put two or more words together, such as “more milk” or “go outside”?',
      'Does your child follow a two-part direction, such as “get the spoon and put it on the table”?',
      'Does your child use words to ask for help?',
      'Does your child point to familiar objects or pictures when you name them?',
      'Does your child regularly try new words?',
      'Does your child use both words and gestures to make their wants or ideas clear?',
      'Does your child use pretend play, such as feeding a doll or making a toy animal talk?',
      'Does your child respond to simple questions during familiar routines?',
      'Can familiar adults understand at least some of what your child says?',
    ],
    ideas: [
      'Repeat your child’s phrase and add a detail: “Dog running—yes, the dog is running fast!”',
      'Use pretend play to model short, useful phrases.',
      'Pause during favorite songs and routines so your child can fill in a sound or word.',
    ],
  },
  '3y': {
    shortLabel: '3 yr',
    label: '3 years',
    questions: [
      'Does your child use word combinations often to share wants, ideas, or experiences?',
      'Can your child have a short conversation with at least two back-and-forth turns?',
      'Does your child use words to get your attention, such as “look at me”?',
      'Can your child say their name when asked?',
      'Does your child use some plural words, such as “dogs” or “toys”?',
      'Does your child use action words ending in “-ing,” such as “running” or “eating”?',
      'Does your child ask questions such as what, where, why, or how?',
      'Can your child answer simple questions about everyday situations?',
      'Can your child follow directions with two related steps?',
      'Can familiar adults understand much of what your child says?',
    ],
    ideas: [
      'Ask open questions about play, then give your child plenty of time to answer.',
      'Expand short phrases into slightly longer sentences without asking for repetition.',
      'Look at family photos and take turns telling what happened.',
    ],
  },
  '4y': {
    shortLabel: '4 yr',
    label: '4 years',
    questions: [
      'Does your child compare things using words such as bigger, smaller, longer, or shorter?',
      'Can your child tell you a simple story from a book, video, or personal experience?',
      'Does your child understand and use location words such as in, on, under, and inside?',
      'Does your child usually speak in sentences with several words?',
      'Does your child pretend to read or make up a story while looking at a book?',
      'Does your child recognize familiar signs, symbols, or logos?',
      'Does your child say all the syllables in longer words most of the time?',
      'Can people outside your immediate family understand most of what your child says?',
      'Does your child usually speak smoothly without frequently repeating sounds or getting stuck?',
      'Does your child use language to join play, take turns, or solve small problems with other children?',
    ],
    ideas: [
      'Act out familiar stories and let your child choose what happens next.',
      'Use location and describing words during scavenger hunts or cleanup.',
      'Play with rhymes and silly words without correcting speech sounds.',
    ],
  },
  '5y': {
    shortLabel: '5 yr',
    label: '5 years',
    questions: [
      'Does your child use longer, mostly complete sentences to explain their ideas?',
      'Can your child tell a story with characters, a setting, and events in an understandable order?',
      'Does your child use words such as feet or children as well as regular plurals?',
      'Does your child understand and use location words such as behind, beside, and between?',
      'Does your child use time words such as yesterday and tomorrow in a meaningful way?',
      'Can your child follow simple directions and rules during a game?',
      'Does your child recognize several letters and attempt to write their name?',
      'Can your child notice or make simple rhymes, such as cat and hat?',
      'Is your child’s speech understandable during everyday conversation?',
      'Can your child answer who, what, where, and why questions about a story or recent event?',
    ],
    ideas: [
      'Tell stories together and ask what might happen next.',
      'Play simple rhyming, sound-matching, and “I Spy” games.',
      'Let your child explain the steps of a familiar activity while you follow along.',
    ],
  },
};

const resultContent: Record<
  ResultTier,
  { eyebrow: string; title: string; body: string; panel: string; accent: string }
> = {
  building: {
    eyebrow: 'Keep building together',
    title: 'Lots of communication skills are showing up',
    body:
      'Based on the answers you shared, many of these age-based skills are part of your child’s communication right now. Children grow in their own ways and at their own pace. Keep making room for talking, listening, reading, and playful connection.',
    panel: 'bg-brand-yellow/20 border-brand-yellow/60',
    accent: 'bg-brand-yellow text-brand-darkBlue',
  },
  conversation: {
    eyebrow: 'A conversation could be useful',
    title: 'Your child is doing a lot of things well',
    body:
      'A few of your answers suggest it might be worth chatting with a speech-language pathologist just to get a clearer picture. A brief conversation can help you understand what you’re noticing and give you practical ideas for home.',
    panel: 'bg-brand-bluePurple/15 border-brand-bluePurple/50',
    accent: 'bg-brand-bluePurple text-white',
  },
  connect: {
    eyebrow: 'A little clarity can go a long way',
    title: 'A quick check-in may bring peace of mind',
    body:
      'Every child develops differently. Based on what you shared, a quick consultation with a speech-language pathologist could give you a clearer picture of where things stand and help you decide whether any next step would be useful.',
    panel: 'bg-brand-pink/20 border-brand-pink/60',
    accent: 'bg-brand-pink text-brand-darkBlue',
  },
};

function getResult(answers: boolean[]): ResultTier {
  const observed = answers.filter(Boolean).length;
  if (observed >= 8) return 'building';
  if (observed >= 5) return 'conversation';
  return 'connect';
}

export default function MilestoneChecker() {
  const [stage, setStage] = useState<Stage>('intro');
  const [selectedAge, setSelectedAge] = useState<AgeKey>('24m');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');
  const [emailMessage, setEmailMessage] = useState('');

  const ageGroup = ageGroups[selectedAge];
  const result = useMemo(() => getResult(answers), [answers]);
  const resultCopy = resultContent[result];
  const progress = ((questionIndex + 1) / ageGroup.questions.length) * 100;

  const start = () => {
    setAnswers([]);
    setQuestionIndex(0);
    setStage('questions');
  };

  const answerQuestion = (answer: boolean) => {
    const nextAnswers = [...answers, answer];
    setAnswers(nextAnswers);
    if (questionIndex === ageGroup.questions.length - 1) {
      setStage('result');
    } else {
      setQuestionIndex((current) => current + 1);
    }
  };

  const goBack = () => {
    if (questionIndex === 0) {
      setStage('intro');
      return;
    }
    setAnswers((current) => current.slice(0, -1));
    setQuestionIndex((current) => current - 1);
  };

  const reset = () => {
    setAnswers([]);
    setQuestionIndex(0);
    setEmail('');
    setEmailStatus('idle');
    setEmailMessage('');
    setStage('intro');
  };

  const submitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setEmailStatus('error');
      setEmailMessage('Enter an email address, or simply skip this optional step.');
      return;
    }

    setEmailStatus('submitting');
    setEmailMessage('');

    try {
      const response = await fetch(`/api/milestone-interest${window.location.search}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: normalizedEmail,
          ageGroup: selectedAge,
          resultTier: result,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'We could not save your email right now.');
      }

      setEmailStatus('success');
      setEmailMessage('You’re all set! We’ll send occasional, practical communication tips.');
    } catch (error) {
      setEmailStatus('error');
      setEmailMessage(error instanceof Error ? error.message : 'We could not save your email right now.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-cream via-white to-brand-bluePurple/10">
      <nav className="border-b border-brand-darkBlue/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center font-semibold text-brand-darkBlue transition-colors hover:text-brand-bluePurple"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand-bluePurple px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-darkBlue"
          >
            Free Consultation
          </a>
        </div>
      </nav>

      <main className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-brand-yellow/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-52 h-72 w-72 rounded-full bg-brand-pink/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <span className="inline-flex rounded-full bg-brand-yellow/30 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-darkBlue">
              Free educational tool
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-brand-darkBlue sm:text-5xl lg:text-6xl">
              Speech &amp; Language Milestone Checker
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 sm:text-xl">
              Take two minutes to reflect on the communication skills you notice in your child and get a gentle, practical next step.
            </p>
          </header>

          <div className="mb-6 rounded-3xl border border-brand-yellow/60 bg-brand-yellow/15 p-5 text-sm leading-relaxed text-gray-700 sm:p-6 sm:text-base">
            <p className="font-bold text-brand-darkBlue">A quick note before you begin</p>
            <p className="mt-2">
              This milestone checker is for education and reflection only. It is not a clinical assessment, evaluation, diagnosis, or substitute for advice from your child’s pediatrician or a licensed speech-language pathologist. Children develop at different rates, and communication can look different across languages, cultures, and communication styles. Your answers create a general suggestion—not a clinical finding.
            </p>
          </div>

          <section className="min-h-[31rem] overflow-hidden rounded-[2rem] border border-brand-darkBlue/10 bg-white shadow-2xl shadow-brand-darkBlue/10">
            <AnimatePresence mode="wait">
              {stage === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="p-6 sm:p-10"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-bluePurple">Step one</p>
                  <h2 className="mt-3 text-3xl font-bold text-brand-darkBlue">How old is your child?</h2>
                  <p className="mt-3 text-gray-600">Choose the closest age. If your child is between ages, starting with the younger group can offer useful context.</p>

                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Child's age">
                    {(Object.entries(ageGroups) as [AgeKey, AgeGroup][]).map(([key, group]) => {
                      const selected = selectedAge === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setSelectedAge(key)}
                          className={`rounded-2xl border-2 px-4 py-5 text-lg font-bold transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-bluePurple/30 ${
                            selected
                              ? 'border-brand-bluePurple bg-brand-bluePurple text-white shadow-lg'
                              : 'border-brand-darkBlue/10 bg-brand-cream text-brand-darkBlue hover:border-brand-bluePurple/50'
                          }`}
                        >
                          {group.shortLabel}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={start}
                    className="mt-8 w-full rounded-full bg-brand-darkBlue px-7 py-4 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-bluePurple focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-bluePurple/30 sm:w-auto"
                  >
                    Begin the milestone checker
                  </button>
                </motion.div>
              )}

              {stage === 'questions' && (
                <motion.div
                  key={`question-${questionIndex}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  className="p-6 sm:p-10"
                >
                  <div className="flex items-center justify-between gap-4 text-sm font-semibold text-gray-500">
                    <span>{ageGroup.label}</span>
                    <span>Question {questionIndex + 1} of {ageGroup.questions.length}</span>
                  </div>
                  <div
                    className="mt-4 h-2 overflow-hidden rounded-full bg-brand-bluePurple/15"
                    role="progressbar"
                    aria-label="Question progress"
                    aria-valuemin={1}
                    aria-valuemax={ageGroup.questions.length}
                    aria-valuenow={questionIndex + 1}
                  >
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand-bluePurple to-brand-pink"
                      animate={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex min-h-64 flex-col justify-center py-10 text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-pink">Thinking about everyday moments...</p>
                    <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-bold leading-snug text-brand-darkBlue sm:text-4xl">
                      {ageGroup.questions[questionIndex]}
                    </h2>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => answerQuestion(true)}
                      className="rounded-2xl bg-brand-bluePurple px-6 py-4 text-lg font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-darkBlue focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-bluePurple/30"
                    >
                      Yes, I notice this
                    </button>
                    <button
                      type="button"
                      onClick={() => answerQuestion(false)}
                      className="rounded-2xl border-2 border-brand-darkBlue/15 bg-brand-cream px-6 py-4 text-lg font-bold text-brand-darkBlue transition-all hover:border-brand-pink hover:bg-brand-pink/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-pink/30"
                    >
                      Not yet / not sure
                    </button>
                  </div>

                  <button type="button" onClick={goBack} className="mt-6 text-sm font-semibold text-gray-500 underline underline-offset-4 hover:text-brand-darkBlue">
                    Back to the previous question
                  </button>
                </motion.div>
              )}

              {stage === 'result' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-10"
                  aria-live="polite"
                >
                  <div className={`rounded-3xl border p-6 sm:p-8 ${resultCopy.panel}`}>
                    <span className={`inline-flex rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] ${resultCopy.accent}`}>
                      {resultCopy.eyebrow}
                    </span>
                    <h2 className="mt-5 text-3xl font-bold leading-tight text-brand-darkBlue sm:text-4xl">{resultCopy.title}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-gray-700">{resultCopy.body}</p>
                  </div>

                  <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                      <h3 className="text-xl font-bold text-brand-darkBlue">Playful ways to keep building</h3>
                      <ul className="mt-4 space-y-3">
                        {ageGroup.ideas.map((idea) => (
                          <li key={idea} className="flex gap-3 text-gray-700">
                            <span className="mt-2 h-2 w-2 flex-none rounded-full bg-brand-pink" aria-hidden="true" />
                            <span>{idea}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex justify-center rounded-full bg-brand-darkBlue px-7 py-4 text-center font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-bluePurple focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-bluePurple/30"
                    >
                      Book a free consultation
                    </a>
                  </div>

                  <div className="mt-8 rounded-3xl bg-brand-cream p-6 sm:p-7">
                    <div className="max-w-2xl">
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-bluePurple">Completely optional</p>
                      <h3 className="mt-2 text-2xl font-bold text-brand-darkBlue">Want friendly tips for building communication at home?</h3>
                      <p className="mt-2 leading-relaxed text-gray-600">
                        Leave your email for occasional ideas from Speech on the Slope. Your result is already complete, and you can skip this without missing anything.
                      </p>
                    </div>

                    {emailStatus === 'success' ? (
                      <div className="mt-5 rounded-2xl bg-white px-5 py-4 font-semibold text-brand-darkBlue" role="status">
                        {emailMessage}
                      </div>
                    ) : (
                      <form onSubmit={submitEmail} className="mt-5" noValidate>
                        <label htmlFor="milestone-email" className="block text-sm font-bold text-brand-darkBlue">
                          Email address <span className="font-normal text-gray-500">(optional)</span>
                        </label>
                        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                          <input
                            id="milestone-email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => {
                              setEmail(event.target.value);
                              if (emailStatus === 'error') {
                                setEmailStatus('idle');
                                setEmailMessage('');
                              }
                            }}
                            placeholder="you@example.com"
                            aria-describedby="milestone-email-note milestone-email-status"
                            className="min-w-0 flex-1 rounded-full border-2 border-brand-darkBlue/15 bg-white px-5 py-3 text-gray-900 outline-none transition focus:border-brand-bluePurple focus:ring-4 focus:ring-brand-bluePurple/15"
                          />
                          <button
                            type="submit"
                            disabled={emailStatus === 'submitting'}
                            className="rounded-full bg-brand-bluePurple px-6 py-3 font-bold text-white transition-colors hover:bg-brand-darkBlue disabled:cursor-wait disabled:opacity-60"
                          >
                            {emailStatus === 'submitting' ? 'Saving…' : 'Send me tips'}
                          </button>
                        </div>
                        <p id="milestone-email-note" className="mt-3 text-xs leading-relaxed text-gray-500">
                          By submitting, you agree to receive occasional emails from Speech on the Slope. You can unsubscribe at any time. See our{' '}
                          <Link href="/privacy-policy" className="font-semibold underline underline-offset-2 hover:text-brand-darkBlue">
                            Privacy Policy
                          </Link>
                          .
                        </p>
                        <p
                          id="milestone-email-status"
                          className={`mt-3 text-sm font-semibold ${emailStatus === 'error' ? 'text-red-700' : 'text-brand-darkBlue'}`}
                          role="status"
                        >
                          {emailMessage}
                        </p>
                      </form>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-brand-darkBlue/10 pt-6">
                    <button type="button" onClick={reset} className="font-semibold text-brand-darkBlue underline underline-offset-4 hover:text-brand-bluePurple">
                      Check another age
                    </button>
                    <Link href="/" className="font-semibold text-gray-500 underline underline-offset-4 hover:text-brand-darkBlue">
                      Return home
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <aside className="mt-8 rounded-3xl bg-brand-darkBlue p-6 text-white sm:p-8">
            <h2 className="text-xl font-bold">About these questions</h2>
            <p className="mt-3 leading-relaxed text-white/80">
              The prompts are informed by public communication milestone guidance from the American Speech-Language-Hearing Association and the CDC. They are presented here as an educational conversation starter, not a validated questionnaire.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
              <a href="https://www.asha.org/public/developmental-milestones/communication-milestones/" target="_blank" rel="noreferrer" className="text-brand-yellow underline underline-offset-4">
                ASHA communication milestones
              </a>
              <a href="https://www.cdc.gov/act-early/milestones/index.html" target="_blank" rel="noreferrer" className="text-brand-yellow underline underline-offset-4">
                CDC developmental milestones
              </a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
