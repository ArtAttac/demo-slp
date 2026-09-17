'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    fbq?: (command: 'track', eventName: 'Lead') => void;
  }
}

export default function ContactSection() {
  const calendarRef = useRef<HTMLIFrameElement>(null);
  const hasTrackedLead = useRef(false);

  useEffect(() => {
    const calendar = calendarRef.current;

    if (!calendar) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const calendarIsVisible = entries.some(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5,
        );

        if (!calendarIsVisible || hasTrackedLead.current || typeof window.fbq !== 'function') {
          return;
        }

        window.fbq('track', 'Lead');
        hasTrackedLead.current = true;
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(calendar);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-20 bg-brand-yellow">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-900">
            Ready to start your journey? Contact us today for a free consultation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-2xl bg-brand-cream shadow-lg"
        >
          <iframe
            ref={calendarRef}
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2eEDub4YSqXnOCQkSqXDlFi00LpdbQGgk2aDcKoR3APT8d3B2eiX6J5HyoqsUDiIABCj_8onap?gv=true"
            title="Schedule an appointment with Speech on the Slope"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
          />
        </motion.div>
      </div>
    </section>
  );
}
