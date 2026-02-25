'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Jennifer Adams',
      role: 'Parent',
      text: 'Our son has made incredible progress in just 6 months. The therapists at Bright Voices are patient, creative, and genuinely care about each child.',
      rating: 5,
    },
    {
      name: 'Robert Thompson',
      role: 'Adult Client',
      text: 'After my stroke, I thought I would never speak clearly again. Thanks to the dedicated team here, I have regained my confidence and communication skills.',
      rating: 5,
    },
    {
      name: 'Maria Gonzalez',
      role: 'Parent',
      text: 'The personalized approach and evidence-based techniques have helped my daughter overcome her stutter. We are so grateful!',
      rating: 5,
    },
    {
      name: 'David Park',
      role: 'Adult Client',
      text: 'Professional, compassionate, and effective. The voice therapy I received has transformed my career as a teacher.',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-brand-pink">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="relative bg-brand-cream rounded-2xl shadow-2xl p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-brand-yellow"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xl text-gray-700 mb-6 italic">
                &quot;{testimonials[currentIndex].text}&quot;
              </p>
              <p className="text-lg font-bold text-gray-800">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-gray-600">{testimonials[currentIndex].role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-brand-bluePurple hover:bg-brand-darkBlue transition-colors text-white"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-brand-darkBlue' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-brand-bluePurple hover:bg-brand-darkBlue transition-colors text-white"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
