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

  // -----------------------------------------------------------------------
  // This logs the inquiry to the server console. To actually deliver these
  // messages to jgwanan@aol.com, wire up an email provider here — for
  // example Resend (https://resend.com):
  //
  //   import { Resend } from 'resend';
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: 'ACSDP Website <onboarding@resend.dev>',
  //     to: 'jgwanan@aol.com',
  //     subject: `New inquiry from ${name}`,
  //     text: `${name} (${email}, ${phone || 'no phone'}) — ${relationship}\n\n${message}`,
  //   });
  //
  // Add RESEND_API_KEY as an Environment Variable in the Vercel project
  // settings once you have a provider set up.
  // -----------------------------------------------------------------------
  console.log('New ACSDP contact inquiry:', { name, email, relationship, phone, message });

  return Response.json({ success: true });
}
