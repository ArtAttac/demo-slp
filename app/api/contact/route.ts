import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, email, phone, contactTime } = body;

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY is not set');
      return NextResponse.json({ error: 'Form service not configured.' }, { status: 500 });
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New Inquiry from ${firstName}`,
        from_name: 'Speech on the Slope Website',
        name: firstName,
        email,
        phone: phone || 'Not provided',
        'Preferred Contact Time': contactTime || 'Not specified',
      }),
    });

    const data = await response.json();
    console.log('Web3Forms response:', data);

    if (data.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: data.message || 'Failed to send message.' }, { status: 500 });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
