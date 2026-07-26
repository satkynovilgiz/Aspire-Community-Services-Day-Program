import Reveal from '@/components/Reveal';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Our Team | Aspire Community Services Day Program',
  description: 'Meet the staff behind Aspire Community Services Day Program’s person-centered, community-based services in San Jose, CA.',
};

function initialsFor(name) {
  return name
    .split(' ')
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export default function TeamPage() {
  const { team } = getContent();
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow eyebrow-light">Our Team</span>
            <h1>The people who make community integration real.</h1>
            <p>
              Every individual at ACSDP is supported by a small, consistent team — the same
              staff, building the same trusted relationships, day after day.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '110px 0 120px', background: 'var(--paper)' }}>
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Meet the staff</h2>
            <p>Placeholder profiles — swap in real names, titles, photos, and bios before launch.</p>
          </Reveal>
          <Reveal className="team-grid">
            {team.map((member) => (
              <div className="team-card" key={member.id}>
                <div className="team-avatar">
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span className="initials">{initialsFor(member.name)}</span>
                  )}
                </div>
                <h4>{member.name}</h4>
                <span className="role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
