import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Page Not Found | Aspire Community Services Day Program',
};

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="wrap" style={{ textAlign: 'center' }}>
        <Reveal>
          <span className="eyebrow eyebrow-light" style={{ justifyContent: 'center' }}>
            Not on today&apos;s route
          </span>
          <h1 style={{ margin: '18px auto 0', maxWidth: '18ch' }}>
            404: this stop doesn&apos;t exist.
          </h1>
          <p style={{ margin: '20px auto 0', maxWidth: '52ch' }}>
            We looked between the library, the farmers market, and the transit station &mdash;
            this page just isn&apos;t anywhere on the map. Every other stop is still exactly
            where you left it, though.
          </p>
          <div style={{ marginTop: 34, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-gold">Back to Home</Link>
            <Link href="/community" className="btn btn-outline-light">See How a Day Unfolds</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
