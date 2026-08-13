import nodemailer from 'nodemailer';
import { getContent } from '@/lib/content';

const DEFAULT_CONTACT_RECIPIENT = 'jgwanan@aol.com';

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
    const { contact } = await getContent();
    const recipient = contact?.email || DEFAULT_CONTACT_RECIPIENT;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `Aspire Community Services <${process.env.GMAIL_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Hi,\n\nYou have a new message from the ACSDP website contact form.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'not provided'}\nRelationship: ${relationship || 'not provided'}\n\nMessage:\n${message}\n\n--\nYou can reply directly to this email to respond to ${name}.`,
    });
    console.log('Gmail SMTP response:', JSON.stringify(info, null, 2));
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return Response.json({ error: 'Message received but email delivery failed.' }, { status: 502 });
  }

  return Response.json({ success: true });
}
