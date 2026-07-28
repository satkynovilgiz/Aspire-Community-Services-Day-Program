import { Resend } from 'resend';

const CONTACT_RECIPIENT = 'jgwanan@aol.com';

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, relationship, phone, message } = data || {};

  if (!name || !email || !message) {
    return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  console.log('New ACSDP contact inquiry:', { name, email, relationship, phone, message });

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set — contact inquiry was logged but not emailed.');
    return Response.json({ success: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error: sendError } = await resend.emails.send({
    from: 'ACSDP Website <onboarding@resend.dev>',
    to: CONTACT_RECIPIENT,
    replyTo: email,
    subject: `New inquiry from ${name}`,
    text: `${name} (${email}, ${phone || 'no phone'}) — ${relationship || 'no relationship given'}\n\n${message}`,
  });

  if (sendError) {
    console.error('Failed to send contact email:', sendError);
    return Response.json({ error: 'Message received but email delivery failed.' }, { status: 502 });
  }

  return Response.json({ success: true });
}
