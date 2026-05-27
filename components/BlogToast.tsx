'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const DISMISS_KEY = 'blog-toast-dismissed';

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
          className="fixed bottom-6 right-6 z-40 max-w-sm w-[calc(100vw-3rem)] sm:w-auto"
        >
          <div className="relative flex items-start gap-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-brand-bluePurple/20 px-5 py-4 pr-10">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand-bluePurple to-brand-pink flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-darkBlue">
                New on the blog!
              </p>
              <p className="text-sm text-gray-600 mt-0.5">
                Tips & insights for your child&apos;s communication journey.
              </p>
              <Link
                href="/blog"
                onClick={dismiss}
                className="inline-block mt-2 text-sm font-semibold text-brand-bluePurple hover:text-brand-darkBlue transition-colors"
              >
                Check out our blog &rarr;
              </Link>
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
