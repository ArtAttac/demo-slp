'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How do I know if my child needs speech therapy?',
    answer:
      "This is a question many families ask! We provide guidance through an initial call and free screening. This allows us to begin building a relationship with your child and your family, hear your observations and make our own, and determine if our practice is the best fit!",
  },
  {
    question: 'Do you support every area of speech and language therapy?',
    answer:
      'Speech on the Slope specializes in speech sound production, myofunctional therapy, literacy (reading and writing), and fluency. If your child\'s needs fall outside our scope, we\'ll help connect you with the right provider.',
  },
  {
    question: 'Where is therapy provided?',
    answer:
      "We offer in-home therapy throughout Brooklyn and Manhattan, so your child can learn in a space where they're most comfortable. We also provide therapy in schools when appropriate and approved.",
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
    answer:
      "We are currently an out-of-network provider. We can provide you with a superbill (a detailed receipt) that you can submit to your insurance company for potential reimbursement. We're happy to walk you through the process!",
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
