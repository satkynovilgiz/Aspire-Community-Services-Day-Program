'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/program', label: 'Our Program' },
  { href: '/services', label: 'What We Do' },
  { href: '/community', label: 'Community' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" className="brand">
          <svg width="38" height="38" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="21" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
            <path d="M22 8C22 8 30 14 30 22C30 30 22 36 22 36C22 36 14 30 14 22C14 14 22 8 22 8Z" fill="#DFA23A" />
            <path d="M22 8V36" stroke="#243629" strokeWidth="1.1" />
          </svg>
          <span>
            Aspire Community
            <small>Services Day Program</small>
          </span>
        </Link>

        <div className={`navlinks ${open ? 'open' : ''}`} style={{ display: 'flex', gap: 34, alignItems: 'center' }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-gold">
            Schedule a Visit
          </Link>
        </div>

        <button className="hamburger" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
}
