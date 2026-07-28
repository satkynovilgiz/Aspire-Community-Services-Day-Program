import Link from 'next/link';

export default function Footer({ contact }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-col">
          <span className="eyebrow eyebrow-light">Aspire Community Services</span>
          <h4>Day Program</h4>
          <p>Person-centered, community-based services for individuals in San Jose, CA.</p>
        </div>
        <div className="footer-col">
          <span className="eyebrow eyebrow-light">Explore</span>
          <div style={{ marginTop: 16 }}>
            <Link href="/program">Our Program</Link>
            <Link href="/services">What We Do</Link>
            <Link href="/community">Community</Link>
            <Link href="/team">Our Team</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-col">
          <span className="eyebrow eyebrow-light">Reach Us</span>
          <div style={{ marginTop: 16 }}>
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${contact.addressLine1} ${contact.addressLine2}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              {contact.addressLine1}, {contact.addressLine2}
            </a>
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {year} Aspire Community Services Day Program · San Jose, CA</span>
        <span>Regional Center Vendor · Service Code 531</span>
      </div>
    </footer>
  );
}
