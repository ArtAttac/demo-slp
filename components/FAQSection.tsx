'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: 'How do I know if my child needs speech therapy?',
    answer:
      "This is a question many families ask! We provide guidance through an initial call and free screening. This allows us to begin building a relationship with your child and your family, hear your observations and make our own, and determine if our practice is the best fit!",
  },
  {
    question: 'What areas do you treat?',
    answer:
      'Speech on the Slope specializes in speech sound production, myofunctional therapy and literacy (reading and writing). We provide free screenings to determine if your child\'s needs align with our areas of specialization. If not, we are more than happy to provide the names of other practices in the area!',
  },
  {
    question: 'Where is therapy provided?',
    answer:
      "We offer in-home therapy throughout South and Northwestern Brooklyn, including Park Slope, Carroll Gardens, Cobble Hill, Boerum Hill, Brooklyn Heights, Gowanus, Prospect Heights, Windsor Terrace, Downtown Brooklyn, Fort Greene, and Clinton Hill as well as Lower Manhattan. We also provide therapy in schools when appropriate and approved.",
  },
  {
    question: 'Do you require an evaluation to begin therapy?',
    answer:
      "An evaluation helps us understand your child's unique needs and set meaningful goals. If your child has been evaluated by another provider within the past 6 months, we're happy to review that report and use it to guide therapy.",
  },
  {
    question: 'Do you provide teletherapy?',
    answer:
      'At this time, all of our sessions are in person. We believe in the power of connection and play-based therapy, which we find is most effective face to face — especially for younger children.',
  },
  {
    question: 'Do you accept insurance?',
    answer: (
      <div className="space-y-4">
        <p>
          Speech on the Slope Speech-Language Therapy, PLLC is a private pay practice and an out-of-network provider. Payment for evaluations and/or sessions is required in full at the end of each week. Out of network coverage varies from plan to plan. We will provide a Superbill and other documentation if needed to submit to your insurance company. Speech on the Slope does not guarantee reimbursement and we encourage you to call your insurance company prior to services to ensure you understand your plan&apos;s benefits. Knowing your out-of-network insurance benefits is your responsibility.
        </p>
        <div>
          <p className="font-semibold text-gray-900 mb-2">
            Helpful questions to ask your insurance company:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Does my plan have &quot;out-of-network&quot; coverage for speech &amp; language therapy &amp; evaluations?</li>
            <li>Is there an annual deductible for out-of-network speech therapy? If so, how much?</li>
            <li>Is there a limit on the number of sessions my plan will cover per year? If yes, how many?</li>
            <li>
              What CPT/service codes does my plan cover for speech therapy?
              <ul className="list-disc space-y-1 pl-5 mt-2">
                <li>92523 - Speech &amp; language evaluation</li>
                <li>92522 - Evaluation of speech production (articulation only)</li>
                <li>92507 - Speech therapy, individual</li>
                <li>92508 - Speech therapy, group</li>
              </ul>
            </li>
            <li>Does my plan require pre-authorization and/or referral for speech therapy? If so, what is required?</li>
            <li>Can I submit a Superbill? If so, what is the process for submitting a Superbill?</li>
            <li>How long does it take to process a claim?</li>
            <li>How do I appeal if a claim is denied?</li>
          </ul>
        </div>
      </div>
    ),
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 sm:py-28 bg-brand-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-bluePurple/20 transition-all duration-200 flex items-center justify-between gap-4"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-bluePurple/10 flex items-center justify-center text-brand-bluePurple text-xl font-light"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
