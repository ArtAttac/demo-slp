'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const DISMISS_KEY = 'site-resources-toast-dismissed-v2';

export default function BlogToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.localStorage.getItem(DISMISS_KEY) === '1') return;

    const showTimer = window.setTimeout(() => setVisible(true), 3000);
    const hideTimer = window.setTimeout(() => setVisible(false), 13000);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DISMISS_KEY, '1');
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-40 w-[calc(100vw-3rem)] max-w-md"
        >
          <div className="relative rounded-2xl border border-brand-bluePurple/20 bg-white/95 px-5 py-4 pr-10 shadow-2xl backdrop-blur-md">
            <p className="text-base font-bold text-brand-darkBlue">Helpful resources for families</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-brand-bluePurple/10 p-3">
                <p className="text-sm font-semibold text-brand-darkBlue">Speech &amp; language blog</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">Tips and insights for your child&apos;s communication journey.</p>
                <Link
                  href="/blog"
                  onClick={dismiss}
                  className="mt-2 inline-block text-sm font-semibold text-brand-bluePurple transition-colors hover:text-brand-darkBlue"
                >
                  Explore the blog &rarr;
                </Link>
              </div>
              <div className="rounded-xl bg-brand-yellow/20 p-3">
                <p className="text-sm font-semibold text-brand-darkBlue">Milestone checker</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">A free educational check-in for children ages 1 to 5.</p>
                <Link
                  href="/milestone-checker"
                  onClick={dismiss}
                  className="mt-2 inline-block text-sm font-semibold text-brand-bluePurple transition-colors hover:text-brand-darkBlue"
                >
                  Try the milestone checker &rarr;
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss notification"
              className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
