'use client';

import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  phone: '',
  relationship: 'Family member',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle'); // idle | sending | ok | err
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('ok');
      setForm(initialState);
    } catch (err) {
      setStatus('err');
      setErrorMsg(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" required value={form.name} onChange={update('name')} placeholder="Jordan Rivera" />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={update('email')}
          placeholder="you@example.com"
        />
      </div>

      <div className="field">
        <label htmlFor="phone">Phone (optional)</label>
        <input id="phone" value={form.phone} onChange={update('phone')} placeholder="(408) 555-0132" />
      </div>

      <div className="field">
        <label htmlFor="relationship">I&apos;m reaching out as a</label>
        <select id="relationship" value={form.relationship} onChange={update('relationship')}>
          <option>Family member</option>
          <option>Regional Center service coordinator</option>
          <option>Prospective individual</option>
          <option>Community partner</option>
          <option>Other</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          required
          value={form.message}
          onChange={update('message')}
          placeholder="Tell us a bit about what you're looking for..."
        />
      </div>

      <div className="submit-row">
        <button type="submit" className="btn btn-outline-dark" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        <span className="form-note">We usually reply within one business day.</span>
      </div>

      {status === 'ok' && (
        <p className="form-status ok">Thank you — your message is on its way. We&apos;ll be in touch soon.</p>
      )}
      {status === 'err' && <p className="form-status err">{errorMsg}</p>}
    </form>
  );
}
