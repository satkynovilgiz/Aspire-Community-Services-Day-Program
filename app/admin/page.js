'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

async function uploadFile(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Upload failed.');
  return json.url;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then(setContent);
  }, []);

  async function saveSection(section, data) {
    setStatus('Saving…');
    const res = await fetch('/api/admin/content', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [section]: data }),
    });
    const json = await res.json();
    if (res.ok) {
      setContent(json);
      setStatus('Saved.');
    } else {
      setStatus(json.error || 'Save failed.');
    }
    setTimeout(() => setStatus(''), 2500);
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  if (!content) {
    return <section style={{ padding: '80px 24px', textAlign: 'center' }}>Loading…</section>;
  }

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'var(--font-display), serif', fontSize: 32 }}>Admin</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {status && <span style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>{status}</span>}
          <button onClick={handleLogout} className="btn btn-outline-light" style={{ color: 'var(--ink)', borderColor: 'var(--line)' }}>
            Log out
          </button>
        </div>
      </div>

      <ContactSection contact={content.contact} onSave={(data) => saveSection('contact', data)} />
      <DirectorSection director={content.director} onSave={(data) => saveSection('director', data)} />
      <HeroSection hero={content.hero} onSave={(data) => saveSection('hero', data)} />
      <TeamSection team={content.team} onSave={(data) => saveSection('team', data)} />
      <AccountSection />
    </section>
  );
}

function Card({ title, children }) {
  return (
    <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18, padding: 28, marginBottom: 28 }}>
      <h2 style={{ fontSize: 19, fontWeight: 600, marginBottom: 20 }}>{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, textarea, type = 'text' }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--ink-soft)', marginBottom: 14 }}>
      {label}
      <Tag
        type={textarea ? undefined : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={textarea ? 3 : undefined}
        style={{
          padding: '9px 11px',
          borderRadius: 8,
          border: '1px solid var(--line)',
          fontSize: 14.5,
          fontFamily: 'inherit',
          resize: textarea ? 'vertical' : undefined,
        }}
      />
    </label>
  );
}

function ContactSection({ contact, onSave }) {
  const [form, setForm] = useState(contact);
  useEffect(() => setForm(contact), [contact]);
  return (
    <Card title="Contact Info">
      <Field label="Phone (display)" value={form.phoneDisplay} onChange={(v) => setForm({ ...form, phoneDisplay: v })} />
      <Field label="Phone (tel: link, digits only e.g. tel:14085551234)" value={form.phoneHref} onChange={(v) => setForm({ ...form, phoneHref: v })} />
      <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
      <Field label="Address line 1" value={form.addressLine1} onChange={(v) => setForm({ ...form, addressLine1: v })} />
      <Field label="Address line 2" value={form.addressLine2} onChange={(v) => setForm({ ...form, addressLine2: v })} />
      <Field label="Hours" value={form.hours} onChange={(v) => setForm({ ...form, hours: v })} />
      <button className="btn btn-gold" onClick={() => onSave(form)}>Save Contact Info</button>
    </Card>
  );
}

function PhotoPicker({ photo, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const url = await uploadFile(file);
      onUploaded(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ marginBottom: 14 }}>
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10, marginBottom: 8, display: 'block' }} />
      ) : null}
      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} />
      {uploading && <span style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginLeft: 8 }}>Uploading…</span>}
      {error && <p style={{ color: '#b3413a', fontSize: 12.5 }}>{error}</p>}
    </div>
  );
}

function DirectorSection({ director, onSave }) {
  const [form, setForm] = useState(director);
  useEffect(() => setForm(director), [director]);
  return (
    <Card title="Program Director">
      <PhotoPicker photo={form.photo} onUploaded={(url) => setForm({ ...form, photo: url })} />
      <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
      <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
      <Field label="Quote" value={form.quote} onChange={(v) => setForm({ ...form, quote: v })} textarea />
      <button className="btn btn-gold" onClick={() => onSave(form)}>Save Director</button>
    </Card>
  );
}

function HeroSection({ hero, onSave }) {
  const [form, setForm] = useState(hero);
  useEffect(() => setForm(hero), [hero]);
  return (
    <Card title="Homepage Hero">
      <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} textarea />
      <Field label="Subtitle" value={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} textarea />
      <button className="btn btn-gold" onClick={() => onSave(form)}>Save Hero</button>
    </Card>
  );
}

function TeamSection({ team, onSave }) {
  const [members, setMembers] = useState(team);
  useEffect(() => setMembers(team), [team]);

  function updateMember(id, patch) {
    setMembers(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function addMember() {
    setMembers([
      ...members,
      { id: crypto.randomUUID(), name: 'Add Team Member Name', role: 'Role', bio: '', photo: '' },
    ]);
  }

  function removeMember(id) {
    setMembers(members.filter((m) => m.id !== id));
  }

  return (
    <Card title="Team">
      {members.map((m) => (
        <div key={m.id} style={{ borderTop: '1px solid var(--line)', paddingTop: 18, marginTop: 18 }}>
          <PhotoPicker photo={m.photo} onUploaded={(url) => updateMember(m.id, { photo: url })} />
          <Field label="Name" value={m.name} onChange={(v) => updateMember(m.id, { name: v })} />
          <Field label="Role" value={m.role} onChange={(v) => updateMember(m.id, { role: v })} />
          <Field label="Bio" value={m.bio} onChange={(v) => updateMember(m.id, { bio: v })} textarea />
          <button onClick={() => removeMember(m.id)} className="btn btn-outline-light" style={{ color: '#b3413a', borderColor: '#b3413a' }}>
            Remove
          </button>
        </div>
      ))}
      <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
        <button onClick={addMember} className="btn btn-outline-light" style={{ color: 'var(--ink)', borderColor: 'var(--line)' }}>
          + Add Team Member
        </button>
        <button className="btn btn-gold" onClick={() => onSave(members)}>Save Team</button>
      </div>
    </Card>
  );
}

function AccountSection() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit() {
    setError('');
    setMessage('');

    if (!currentPassword) {
      setError('Enter your current password to make changes.');
      return;
    }
    if (!newUsername && !newPassword) {
      setError('Enter a new username or a new password.');
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/credentials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newUsername: newUsername || undefined, newPassword: newPassword || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Update failed.');
        return;
      }
      setMessage(`Account updated. Username: ${data.username}`);
      setCurrentPassword('');
      setNewUsername('');
      setNewPassword('');
      setConfirmPassword('');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card title="Account (Change Username / Password)">
      <Field label="Current password" value={currentPassword} onChange={setCurrentPassword} type="password" />
      <Field label="New username (leave blank to keep current)" value={newUsername} onChange={setNewUsername} />
      <Field label="New password (leave blank to keep current)" value={newPassword} onChange={setNewPassword} type="password" />
      <Field label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} type="password" />
      {error && <p style={{ color: '#b3413a', fontSize: 13, marginBottom: 10 }}>{error}</p>}
      {message && <p style={{ color: 'var(--forest)', fontSize: 13, marginBottom: 10 }}>{message}</p>}
      <button className="btn btn-gold" onClick={handleSubmit} disabled={saving}>
        {saving ? 'Saving…' : 'Update Account'}
      </button>
    </Card>
  );
}
