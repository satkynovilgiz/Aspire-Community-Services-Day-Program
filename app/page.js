import Link from 'next/link';
import Reveal from '@/components/Reveal';

export default function Home() {
  return (
    <>
      <section className="hero" id="top">
        <svg className="hero-path" viewBox="0 0 500 500" fill="none">
          <path
            d="M20 420C120 420 100 300 200 300C300 300 280 160 420 140"
            stroke="#F0C878"
            strokeWidth="1.4"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
          <circle cx="20" cy="420" r="5" fill="#D3684B" />
          <circle cx="200" cy="300" r="5" fill="#DFA23A" />
          <circle cx="420" cy="140" r="5" fill="#D3684B" />
        </svg>
        <div className="wrap hero-inner">
          <div>
            <span className="eyebrow eyebrow-light">Regional Center Vendor · Service Code 531 · San Jose, CA</span>
            <h1>
              Community isn&apos;t a room
              <br />
              we sit in — it&apos;s <em>where
              <br />
              we live.</em>
            </h1>
            <p className="hero-sub">
              Aspire Community Services Day Program supports adults with developmental disabilities out in the
              real world — libraries, transit lines, farmers markets, trails — building the skills, choices, and
              connections that make a self-directed life possible.
            </p>
            <div className="hero-cta">
              <Link href="/contact" className="btn btn-gold">Schedule a Visit</Link>
              <Link href="/community" className="btn btn-outline-light">See How a Day Unfolds</Link>
            </div>
          </div>
          <div className="hero-facts">
            <div className="hero-fact">
              <b>1:4</b>
              <span>Staffing ratio, so every individual is genuinely seen and supported.</span>
            </div>
            <div className="hero-fact">
              <b>9AM–3PM</b>
              <span>Monday through Friday, with part-time and flexible schedules available.</span>
            </div>
            <div className="hero-fact">
              <b>Zero</b>
              <span>Fixed facility. Every day happens in an integrated community setting.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="belief">
        <Reveal className="wrap">
          <span className="eyebrow">Statement of Purpose</span>
          <blockquote>
            &ldquo;Person-centered, community-based services that empower individuals to lead{' '}
            <span>self-directed lives</span> — with dignity, autonomy, and full participation in the community
            they call home.&rdquo;
          </blockquote>
          <p className="belief-note">
            ACSDP was built around the HCBS Final Rule from the ground up: services delivered in the most
            integrated, least restrictive settings available, guided entirely by each person&apos;s own goals,
            preferences, and pace.
          </p>
        </Reveal>
      </section>

      <section style={{ background: 'var(--sage-tint)', padding: '110px 0' }}>
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Get to know the program</h2>
            <p>Three quick ways in — the philosophy, the services, and a real day in the neighborhood.</p>
          </Reveal>
          <div className="teaser-grid">
            <Reveal as={Link} href="/program" className="teaser-card" style={{ display: 'flex' }}>
              <span className="eyebrow eyebrow-light">01 · Purpose &amp; People</span>
              <h3>Our Program</h3>
              <span className="go">Meet the mission →</span>
            </Reveal>
            <Reveal as={Link} href="/services" className="teaser-card" style={{ display: 'flex' }}>
              <span className="eyebrow eyebrow-light">02 · Six Focus Areas</span>
              <h3>What We Do</h3>
              <span className="go">See the services →</span>
            </Reveal>
            <Reveal as={Link} href="/community" className="teaser-card" style={{ display: 'flex' }}>
              <span className="eyebrow eyebrow-light">03 · Hours &amp; Places</span>
              <h3>A Day in the Community</h3>
              <span className="go">Follow the route →</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ padding: '110px 0', background: 'var(--forest)', color: 'var(--cream)', textAlign: 'center' }}>
        <Reveal className="wrap">
          <span className="eyebrow eyebrow-light" style={{ justifyContent: 'center' }}>Ready when you are</span>
          <h2 style={{ color: 'var(--cream)', fontSize: 'clamp(28px,3.6vw,44px)', marginTop: 18, maxWidth: '20ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Let&apos;s talk about what a good day could look like.
          </h2>
          <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-gold">Schedule a Visit</Link>
            <a href="tel:14083166418" className="btn btn-outline-light">Call (408) 316-6418</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
