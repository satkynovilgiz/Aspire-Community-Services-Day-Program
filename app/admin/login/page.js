'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed.');
        return;
      }
      router.push('/admin');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ maxWidth: 400, margin: '110px auto', padding: '0 24px' }}>
      <h1 style={{ fontFamily: 'var(--font-display), serif', fontSize: 30, marginBottom: 28 }}>Admin Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label style={labelStyle}>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            style={inputStyle}
          />
        </label>
        {error && <p style={{ color: '#b3413a', fontSize: 14 }}>{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-gold" style={{ marginTop: 8 }}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </section>
  );
}

const labelStyle = { display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13.5, color: 'var(--ink-soft)' };
const inputStyle = {
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid var(--line)',
  fontSize: 15,
  fontFamily: 'inherit',
};
