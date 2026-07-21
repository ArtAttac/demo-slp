import { NextResponse } from 'next/server';

const ageGroups = new Set(['12m', '18m', '24m', '3y', '4y', '5y']);
const resultTiers = new Set(['building', 'conversation', 'connect']);

function isValidEmail(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);

  if (requestUrl.searchParams.get('testquiz') !== '1') {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim() : body.email;

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!ageGroups.has(body.ageGroup) || !resultTiers.has(body.resultTier)) {
      return NextResponse.json({ error: 'Invalid milestone response.' }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY is not set');
      return NextResponse.json({ error: 'Email signup is not configured.' }, { status: 500 });
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'New Milestone Checker Email Signup',
        from_name: 'Speech on the Slope Milestone Checker',
        email,
        'Child age group': body.ageGroup,
        'Guidance path': body.resultTier,
        Consent: 'Requested occasional communication tips by email.',
      }),
    });

    const data = await response.json();
    if (data.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: data.message || 'We could not save your email right now.' }, { status: 502 });
  } catch (error) {
    console.error('Milestone email signup error:', error);
    return NextResponse.json({ error: 'We could not save your email right now.' }, { status: 500 });
  }
}
