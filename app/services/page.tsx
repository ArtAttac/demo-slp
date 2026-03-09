'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Free Consultations',
    description:
      "Schedule a complimentary 30-minute session to discuss your child's needs, answer questions, and explore how we can support your family's communication goals.",
    details: [
      'No-obligation introductory meeting',
      'Discuss your child\'s communication strengths and challenges',
      'Learn about our approach and therapy options',
      'Get answers to all your questions',
    ],
    bgColor: 'bg-brand-pink',
    textColor: 'text-gray-800',
  },
  {
    title: 'Preschool Services',
    description:
      'Engaging, play-based therapy sessions designed for ages 3-5. We work on speech sounds, language development, and social skills in a fun, supportive environment.',
    details: [
      'Designed for children ages 3-5',
      'Play-based speech sound therapy',
      'Language development and social skills',
      'Fun, child-led sessions tailored to interests',
    ],
    bgColor: 'bg-brand-yellow',
    textColor: 'text-gray-800',
  },
  {
    title: 'Academic Support',
    description:
      'Targeted intervention for reading comprehension, written expression, and verbal reasoning. We help students build the language foundation needed for academic achievement.',
    details: [
      'Reading comprehension strategies',
      'Written expression and composition',
      'Verbal reasoning and critical thinking',
      'Phonological and phonemic awareness',
    ],
    bgColor: 'bg-brand-cream',
    textColor: 'text-gray-800',
  },
  {
    title: 'IEP Consultation',
    description:
      'Expert guidance through the IEP process. We help you understand evaluations, write effective goals, and advocate for appropriate services in school settings.',
    details: [
      'Navigate the IEP process with confidence',
      'Understand evaluation reports and recommendations',
      'Develop effective, measurable goals',
      'Advocate for appropriate school-based services',
    ],
    bgColor: 'bg-brand-darkBlue',
    textColor: 'text-white',
  },
  {
    title: 'OT Evaluations',
    description:
      'Thorough assessments of fine motor skills, sensory processing, and daily living skills. Results include detailed recommendations and personalized intervention plans.',
    details: [
      'Comprehensive fine motor assessment',
      'Sensory processing evaluation',
      'Daily living skills screening',
      'Detailed report with personalized recommendations',
    ],
    bgColor: 'bg-brand-pink',
    textColor: 'text-gray-800',
  },
  {
    title: 'Early Intervention',
    description:
      'Specialized services for infants and toddlers (0-3 years). We coach parents on strategies to enhance communication during daily routines and play.',
    details: [
      'For infants and toddlers ages 0-3',
      'Parent coaching and strategy development',
      'Communication support during daily routines',
      'Play-based interaction techniques',
    ],
    bgColor: 'bg-brand-yellow',
    textColor: 'text-gray-800',
  },
  {
    title: 'Parent Coaching',
    description:
      "Learn hands-on techniques to support your child's communication at home. We provide customized strategies that fit your family's lifestyle and routines.",
    details: [
      'Personalized strategies for your family',
      'Hands-on coaching during sessions',
      'Techniques that integrate into daily routines',
      'Ongoing support and progress updates',
    ],
    bgColor: 'bg-brand-cream',
    textColor: 'text-gray-800',
  },
  {
    title: 'Feeding Therapy',
    description:
      'Address picky eating, oral motor difficulties, and mealtime behaviors. We use a responsive, family-centered approach to expand food variety and improve feeding skills.',
    details: [
      'Address picky eating and food refusal',
      'Oral motor skill development',
      'Mealtime behavior support',
      'Family-centered, responsive approach',
    ],
    bgColor: 'bg-brand-darkBlue',
    textColor: 'text-white',
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
              <ul className="space-y-3">
                {service.details.map((detail) => (
                  <li key={detail} className={`flex items-start gap-3 ${service.textColor}`}>
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm sm:text-base">{detail}</span>
                  </li>
                ))}
              </ul>
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
