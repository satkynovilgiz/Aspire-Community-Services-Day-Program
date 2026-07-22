import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Our Program | Aspire Community Services Day Program',
  description: "Mission, vision, and program design behind Aspire Community Services Day Program's HCBS-aligned, person-centered model.",
};

const DESIGN_POINTS = [
  {
    title: 'Person-Centered Services & Community Integration',
    body: 'Services are individualized and guided by each person\u2019s IPP, delivered in real-world community settings that build skills, independence, and meaningful participation.',
  },
  {
    title: 'Individual Choice & Self-Determination',
    body: 'Individuals have autonomy over their daily activities, goals, and service preferences, with staff supporting decision-making through accessible communication and advocacy.',
  },
  {
    title: 'Skill Development for Independence',
    body: 'Focus on daily living skills, social engagement, mobility training, and self-advocacy so individuals can navigate their community safely and confidently.',
  },
  {
    title: 'Volunteer Support',
    body: 'Individuals are encouraged to explore pre-vocational training and volunteer work, building readiness for inclusive work environments.',
  },
  {
    title: 'Transportation & Mobility Training',
    body: 'Training in public transportation and other mobility options, with staff support for safe, independent travel planning.',
  },
  {
    title: 'Health, Safety & Well-Being',
    body: 'Individuals are supported to access necessary community resources safely, with emergency preparedness training for both individuals and staff.',
  },
  {
    title: 'Natural Supports & Community Engagement',
    body: 'The program fosters connections with family, friends, and community resources, with partnerships that open access to inclusive activities and local services.',
  },
  {
    title: 'Ongoing Assessment & Progress Tracking',
    body: 'Progress toward IPP goals is documented regularly through person-centered data collection, with continuous evaluation through feedback and performance review.',
  },
];

const OUTCOMES = [
  { title: 'Enhanced Independence', body: 'Greater self-sufficiency in daily living, personal care, and mobility.' },
  { title: 'Improved Social Skills', body: 'Stronger, more positive interactions with peers, staff, and the community.' },
  { title: 'Confident Self-Advocacy', body: 'Individuals who can identify needs and speak up for themselves.' },
  { title: 'Deeper Community Ties', body: 'Real, natural relationships built outside the program itself.' },
];

export default function ProgramPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow eyebrow-light">Our Program</span>
            <h1>Built on choice, dignity, and full community participation.</h1>
            <p>
              Aspire Community Services Day Program (ACSDP) exists to help adults with developmental
              disabilities lead self-directed lives — not inside a facility, but out in the community they
              already belong to.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="belief">
        <Reveal className="wrap">
          <span className="eyebrow">Our Vision</span>
          <blockquote>
            &ldquo;To serve as a <span>beacon of excellence</span> in community integration — a trusted resource
            where individuals celebrate their individuality and live life to the fullest.&rdquo;
          </blockquote>
          <p className="belief-note">
            At ACSDP, we are not just a program; we are a community. Together, we work with individuals and
            their families to identify desired life goals and provide the services and resources to meet their
            needs and preferences.
          </p>
        </Reveal>
      </section>

      <section style={{ background: 'var(--sage-tint)', padding: '110px 0' }}>
        <div className="wrap">
          <Reveal className="section-head">
            <h2>The Program Design Statement</h2>
            <p>
              Written by Dr. Janet Gwananji, Ed.D., Program Director — eight core commitments that guide every
              service ACSDP delivers.
            </p>
          </Reveal>
          <Reveal className="point-list" style={{ background: 'var(--paper)', borderRadius: 22, padding: '10px 34px', border: '1px solid var(--line)' }}>
            {DESIGN_POINTS.map((p, i) => (
              <div className="point" key={p.title}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h5>{p.title}</h5>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: 'var(--paper)' }}>
        <div className="wrap director-grid">
          <Reveal>
            <div className="director-photo">
              <span className="initials">JG</span>
            </div>
          </Reveal>
          <Reveal>
            <span className="eyebrow">A note from the Program Director</span>
            <blockquote style={{ marginTop: 22 }}>
              &ldquo;My mission is to lead with a commitment that advances the principles of inclusion,
              autonomy, dignity, and independence — so that when individuals walk through our doors, they feel
              a sense of belonging, and find joy in being part of our program.&rdquo;
            </blockquote>
            <div className="director-name">
              <b>Dr. Janet Gwananji, Ed.D.</b>
              <span>Program Director &amp; Licensee, Aspire Community Services Day Program</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '100px 0 120px', background: 'var(--paper)' }}>
        <div className="wrap">
          <Reveal className="section-head">
            <h2>What families can expect</h2>
            <p>Anticipated outcomes, tracked against each individual&apos;s IPP goals and reviewed regularly.</p>
          </Reveal>
          <Reveal className="outcomes-grid">
            {OUTCOMES.map((o) => (
              <div className="outcome-cell" key={o.title}>
                <h5>{o.title}</h5>
                <p>{o.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
