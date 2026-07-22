import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-col">
          <span className="eyebrow eyebrow-light">Aspire Community Services</span>
          <h4>Day Program</h4>
          <p>Person-centered, community-based services for adults with developmental disabilities in San Jose, CA.</p>
        </div>
        <div className="footer-col">
          <span className="eyebrow eyebrow-light">Explore</span>
          <div style={{ marginTop: 16 }}>
            <Link href="/program">Our Program</Link>
            <Link href="/services">What We Do</Link>
            <Link href="/community">Community</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-col">
          <span className="eyebrow eyebrow-light">Reach Us</span>
          <div style={{ marginTop: 16 }}>
            <a href="tel:14083166418">(408) 316-6418</a>
            <a href="mailto:jgwanan@aol.com">jgwanan@aol.com</a>
            <a href="https://maps.google.com/?q=1007+Niguel+Lane+San+Jose+CA+95138" target="_blank" rel="noreferrer">
              1007 Niguel Lane, San Jose, CA
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
