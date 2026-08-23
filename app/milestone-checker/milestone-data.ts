import type {
  AgeGroup,
  AgeKey,
  AnswerValue,
  CommunicationDomain,
  ResultTier,
} from './milestone-types';

export const bookingUrl =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2eEDub4YSqXnOCQkSqXDlFi00LpdbQGgk2aDcKoR3APT8d3B2eiX6J5HyoqsUDiIABCj_8onap?gv=true';

export const domainLabels: Record<CommunicationDomain, string> = {
  receptiveLanguage: 'Understanding language',
  expressiveLanguage: 'Sharing words and ideas',
  socialCommunication: 'Connecting with others',
  speechSounds: 'Speech clarity and sounds',
  fluency: 'Speech flow',
  earlyLiteracy: 'Early reading and writing skills',
};

export const answerOptions: Record<AnswerValue, { label: string; description: string }> = {
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

export const ageGroups: Record<AgeKey, AgeGroup> = {
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
export const resultContent: Record<
  ResultTier,
  { eyebrow: string; title: string; body: string; panel: string; accent: string }
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

export const resultDisclaimer =
  'This milestone check-in summarizes the milestone responses you provided. It is educational and is not a standardized screening, evaluation, medical opinion, or diagnosis. It cannot determine whether a child has or does not have a communication or developmental condition. Contact an appropriate qualified professional if you would like individualized guidance regardless of this result.';
