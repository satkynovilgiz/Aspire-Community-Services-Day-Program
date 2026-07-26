import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact | Aspire Community Services Day Program',
  description: 'Get in touch with Aspire Community Services Day Program in San Jose, CA — by phone, email, or the form below.',
};

const FAQS = [
  {
    q: 'Who is ACSDP a good fit for?',
    a: 'Adults with developmental disabilities who are authorized for community-based day services through their Regional Center IPP, and are interested in community-based, non-facility programming.',
  },
  {
    q: 'How do I start services?',
    a: 'Reach out below or by phone — we\u2019ll walk you through intake, coordinate with your Regional Center service coordinator, and schedule an initial visit.',
  },
  {
    q: 'Do you provide transportation?',
    a: 'Transportation planning and mobility training are part of the program; specifics are arranged individually based on each IPP.',
  },
  {
    q: 'What are your hours?',
    a: 'Monday through Friday, 9:00 AM to 3:00 PM, with part-time (3\u20134 days) and flexible options available with Regional Center approval.',
  },
];

export default function ContactPage() {
  const { contact } = getContent();
  return (
    <>
      <section className="contact-hero">
        <div className="wrap contact-grid">
          <Reveal>
            <span className="eyebrow eyebrow-light">Get in touch</span>
            <h1>Let&apos;s talk about what a good day could look like.</h1>
            <p className="lead">
              Whether you&apos;re a family, a Regional Center service coordinator, or an individual exploring
              options — we&apos;d love to walk you through the program and answer every question.
            </p>
            <div className="contact-cta">
              <a href={contact.phoneHref} className="btn btn-gold">Call {contact.phoneDisplay}</a>
              <a href={`mailto:${contact.email}`} className="btn btn-outline-light">Email Us</a>
            </div>
          </Reveal>
          <Reveal className="contact-info">
            <div className="info-row">
              <span className="eyebrow eyebrow-light">Administrative Address</span>
              <div>{contact.addressLine1}<br />{contact.addressLine2}</div>
            </div>
            <div className="info-row">
              <span className="eyebrow eyebrow-light">Phone</span>
              <div><a href={contact.phoneHref}>{contact.phoneDisplay}</a></div>
            </div>
            <div className="info-row">
              <span className="eyebrow eyebrow-light">Email</span>
              <div><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
            </div>
            <div className="info-row">
              <span className="eyebrow eyebrow-light">Hours</span>
              <div>{contact.hours}<br />Part-time &amp; flexible schedules available</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="form-section">
        <div className="wrap form-shell">
          <Reveal>
            <span className="eyebrow">Send a message</span>
            <h2 style={{ marginTop: 18, fontSize: 'clamp(26px,3vw,36px)' }}>Tell us where to start.</h2>
            <div style={{ marginTop: 34 }}>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal>
            <span className="eyebrow">Good to know</span>
            <div className="faq-list" style={{ marginTop: 26 }}>
              {FAQS.map((f) => (
                <div className="faq-item" key={f.q}>
                  <h5>{f.q}</h5>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
