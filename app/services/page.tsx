'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Evaluations',
    description:
      "Understanding your child\u2019s communication is the first step in helping them thrive. Our speech and language evaluations give a full picture of how your child speaks, understands, and interacts in everyday situations.",
    details: [
      "During the evaluation, we\u2019ll review your child\u2019s developmental history, talk with you about your goals and concerns, observe them in play, and use age-appropriate activities to see how they communicate. Standardized testing may also be included if it will help us understand their skills more clearly.",
      "Afterward, you\u2019ll receive a written report summarizing your child\u2019s strengths, areas to work on, and recommendations for next steps. If therapy is recommended, we\u2019ll create a personalized plan with clear goals tailored to your child\u2019s unique needs, so you feel confident about the path forward.",
    ],
    bgColor: 'bg-brand-pink',
    textColor: 'text-gray-800',
  },
  {
    title: 'Speech & Language Therapy',
    description:
      "Speech therapy is all about helping children communicate clearly and confidently. Each session is designed around your child\u2019s strengths, interests, and learning style, so practicing speech and language skills feels engaging and fun.",
    details: [
      "Speech sessions may include learning how sounds are made, practicing them in words and sentences, listening for differences in sounds, and playing games that reinforce new skills. Families receive practical strategies to continue practicing at home, so progress carries over into everyday life.",
      "Language therapy helps children understand and use words and sentences effectively. Sessions may focus on building vocabulary, improving sentence structure, asking and answering questions, storytelling, and supporting social communication. Everything we do is interactive, playful, and designed to help children use their skills with confidence at home, in school, and beyond.",
    ],
    bgColor: 'bg-brand-yellow',
    textColor: 'text-gray-800',
  },
  {
    title: 'Reading & Writing Support',
    description:
      "Strong speech and language skills are the foundation for reading and writing success. Our literacy support helps children strengthen the skills they need to become confident readers and writers.",
    details: [
      "Sessions may focus on phonological and phonemic awareness (hearing and working with sounds in words), connecting sounds to letters, decoding and early reading skills, spelling patterns, reading comprehension, and organizing ideas for writing.",
      "All activities are playful, hands-on, and tailored to your child\u2019s interests, so learning feels engaging. By connecting what children know about speech and language to reading and writing, we help them build the confidence and skills they need to shine academically and creatively.",
    ],
    bgColor: 'bg-brand-cream',
    textColor: 'text-gray-800',
  },
  {
    title: 'Myofunctional Therapy',
    description:
      "Sometimes, speech challenges are linked to how the mouth and tongue move or habits like mouth breathing or tongue thrust. Myofunctional therapy helps children build the oral muscle coordination they need to support clear speech, healthy swallowing, and proper oral development.",
    details: [
      "Sessions include fun, age-appropriate exercises designed to strengthen the tongue, lips, and jaw, while teaching proper tongue posture, nasal breathing, and swallowing patterns. These skills often work hand-in-hand with speech therapy, helping children produce sounds more accurately and confidently while supporting overall oral health.",
    ],
    bgColor: 'bg-brand-darkBlue',
    textColor: 'text-white',
  },
  {
    title: 'Community Events + Workshops',
    description:
      "We love connecting with families in our community! Our workshops and group classes take place at local play spaces and centers, giving children opportunities to practice speech, language, and early literacy skills in a playful, social setting.",
    details: [
      "Each class focuses on specific skills like speech sound awareness, language development, storytelling, or early reading and writing. Activities are hands-on, interactive, and designed to keep children engaged while learning.",
      "We also host parent workshops to answer questions in-person (no constant Googling) and provide simple strategies and tools to support your child\u2019s communication at home. By giving parents practical guidance and children fun, meaningful practice, our community events help everyone feel empowered and supported in their journey toward clear, confident communication.",
    ],
    bgColor: 'bg-brand-pink',
    textColor: 'text-gray-800',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation back */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-brand-darkBlue hover:text-brand-bluePurple font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <Link href="/#contact" className="px-5 py-2 bg-brand-bluePurple text-white text-sm font-semibold rounded-full hover:bg-brand-darkBlue transition-colors">
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-brand-bluePurple py-16 sm:py-24"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive, play-based services tailored to your child&apos;s unique communication needs
          </p>
        </div>
      </motion.div>

      {/* Services List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`rounded-3xl ${service.bgColor} p-8 sm:p-10 shadow-lg`}
            >
              <h2 className={`text-2xl sm:text-3xl font-bold ${service.textColor} mb-4`}>
                {service.title}
              </h2>
              <p className={`text-base sm:text-lg ${service.textColor} leading-relaxed mb-6`}>
                {service.description}
              </p>
              <div className="space-y-4">
                {service.details.map((detail, i) => (
                  <p key={i} className={`text-sm sm:text-base ${service.textColor} leading-relaxed`}>
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to get started? We&apos;d love to hear from you.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Book a Free Consultation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
