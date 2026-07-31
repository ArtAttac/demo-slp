'use client';

import { useEffect, useRef, useState } from 'react';

const SAWYER_EMBED_ID = 'SA_Rx-ONEen46NUk7msYILkAEWPhrnZ_wj1';
const SAWYER_EMBED_SRC =
  'https://www.hisawyer.com/embed/Rx-ONEen46NUk7msYILkAEWPhrnZ_wj1.js';
const SAWYER_SCHEDULE_URL =
  'https://www.hisawyer.com/speech-on-the-slope/schedules?location_id%5B%5D=300453&schedule_id=drop-ins';

export default function SawyerWorkshopsEmbed() {
  const embedRootRef = useRef<HTMLDivElement>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const embedRoot = embedRootRef.current;

    if (!embedRoot) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'application/javascript';
    script.dataset.sawyertools = 'sawyertools';
    script.async = true;
    script.id = SAWYER_EMBED_ID;
    script.src = SAWYER_EMBED_SRC;
    script.addEventListener('error', () => setLoadFailed(true));
    embedRoot.appendChild(script);

    return () => {
      embedRoot.replaceChildren();
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div ref={embedRootRef} className="min-h-[600px] w-full" />

      {loadFailed && (
        <div className="mx-auto max-w-xl px-6 py-12 text-center">
          <p className="mb-4 text-gray-700">
            The class schedule could not be loaded here.
          </p>
          <a
            href={SAWYER_SCHEDULE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-brand-bluePurple px-6 py-3 font-semibold text-white"
          >
            View Classes/Workshops
          </a>
        </div>
      )}
    </main>
  );
}
