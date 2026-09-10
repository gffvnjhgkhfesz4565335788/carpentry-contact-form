import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { FORM_TOKEN, API_BASE_URL, FORM_ID } = process.env;

  if (!FORM_TOKEN || !API_BASE_URL || !FORM_ID) {
    return NextResponse.json({ error: 'Environment variables missing' }, { status: 500 });
  }

  const data = await request.json();

  const response = await fetch(`${API_BASE_URL}/api/public/forms/${FORM_ID}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: FORM_TOKEN, data })
  });

  if (response.ok) {
    return NextResponse.json({ ok: true });
  } else {
    return NextResponse.json({ error: 'Upstream submission failed' }, { status: response.status });
  }
}
