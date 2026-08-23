import { NextResponse } from 'next/server';

import { redis } from '@/lib/redis';

const milestoneInterestKey = 'milestone:email-signups:v1';

type MilestoneInterestRecord = {
  email: string;
  consentedAt: string;
  source: 'milestone-checker';
};

function isValidEmail(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : body.email;

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (body.emailConsent !== true) {
      return NextResponse.json({ error: 'Email signup consent is required.' }, { status: 400 });
    }

    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      console.error('Upstash Redis is not configured for milestone email signups');
      return NextResponse.json({ error: 'Email signup is not configured.' }, { status: 500 });
    }

    const record: MilestoneInterestRecord = {
      email,
      consentedAt: new Date().toISOString(),
      source: 'milestone-checker',
    };
    const wasAdded = await redis.hsetnx<MilestoneInterestRecord>(milestoneInterestKey, email, record);

    return NextResponse.json({ success: true, alreadySubscribed: wasAdded === 0 });
  } catch (error) {
    console.error('Milestone email signup error:', error);
    return NextResponse.json({ error: 'We could not save your email right now.' }, { status: 500 });
  }
}
