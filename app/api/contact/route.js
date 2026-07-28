import nodemailer from 'nodemailer';

const CONTACT_RECIPIENT = 'satkynovilgiz2008@gmail.com';

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

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('GMAIL_USER / GMAIL_APP_PASSWORD are not set — contact inquiry was logged but not emailed.');
    return Response.json({ success: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `ACSDP Website <${process.env.GMAIL_USER}>`,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `${name} (${email}, ${phone || 'no phone'}) — ${relationship || 'no relationship given'}\n\n${message}`,
    });
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return Response.json({ error: 'Message received but email delivery failed.' }, { status: 502 });
  }

  return Response.json({ success: true });
}
