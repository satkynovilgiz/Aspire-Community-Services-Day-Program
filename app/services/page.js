import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'What We Do | Aspire Community Services Day Program',
  description: 'Six person-centered service areas, from independent living skills to community integration, delivered at a 1:4 staffing ratio.',
};

const SERVICES = [
  {
    title: 'Independent Living & Daily Life Skills',
    body: 'Budgeting, shopping, meal planning, and navigating public transportation, libraries, and recreation centers.',
    outcome: 'Greater confidence and self-sufficiency in daily life.',
    icon: (
      <>
        <path d="M8 20L22 9L36 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 18V35H31V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 35V26H25V35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: 'Pre-Vocational & Volunteer Skills',
    body: 'Coaching for volunteer placements and inclusive work environments, building task readiness and workplace confidence.',
    outcome: 'Pride and purpose through community contribution.',
    icon: (
      <>
        <path d="M14 22C14 22 17 26 22 26C27 26 30 22 30 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="14" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M9 34C9 28 15 26 22 26C29 26 35 28 35 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Social & Interpersonal Skills',
    body: 'Conversation, active listening, conflict resolution, and relationship-building practiced in real social settings.',
    outcome: 'Meaningful, lasting connections with peers.',
    icon: (
      <path
        d="M11 12H33C34.6569 12 36 13.3431 36 15V24C36 25.6569 34.6569 27 33 27H19L12 33V27H11C9.34315 27 8 25.6569 8 24V15C8 13.3431 9.34315 12 11 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Self-Advocacy & Rights Education',
    body: 'Understanding rights under HCBS, expressing personal goals, and knowing how and where to ask for support.',
    outcome: 'Individuals who advocate confidently for themselves.',
    icon: (
      <path d="M22 6L27 16L38 17.5L30 25L32 36L22 30.5L12 36L14 25L6 17.5L17 16L22 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Health & Wellness',
    body: 'Fitness, recreation, nutrition, and stress management woven into everyday community activities.',
    outcome: 'Better well-being, higher quality of life.',
    icon: (
      <path
        d="M22 37C22 37 6 27.5 6 16.5C6 10.7 10.7 7 15.4 7C18.4 7 21 8.7 22 11C23 8.7 25.6 7 28.6 7C33.3 7 38 10.7 38 16.5C38 27.5 22 37 22 37Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Community Integration',
    body: 'Non-segregated participation in local businesses, faith groups, fitness classes, and civic organizations.',
    outcome: 'Full inclusion and self-determined participation.',
    icon: (
      <>
        <path
          d="M22 38C22 38 34 27.4 34 18C34 11.4 28.6 6 22 6C15.4 6 10 11.4 10 18C10 27.4 22 38 22 38Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="18" r="4.5" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
];

const RESOURCES = [
  { name: 'Seven Trees Community Center', detail: '3590 Cas Drive, San Jose, 95111' },
  { name: 'Seven Trees Branch Library', detail: '3590 Cas Drive, San Jose, 95111' },
  { name: 'Santa Teresa Branch Library', detail: '290 International Circle, San Jose, 95119' },
  { name: 'Santa Teresa VTA Bus/Light Rail', detail: '6360 Santa Teresa Blvd, San Jose, 95119' },
  { name: 'Hellyer County Park', detail: 'Coyote Creek Trail · 985 Hellyer Ave, San Jose, 95111' },
  { name: 'Martin Luther King Library', detail: '150 E Fernando St, San Jose, 95112' },
  { name: 'Safeway', detail: '5670 Cottle Rd, San Jose, 95123' },
  { name: 'Evergreen Farmers Market', detail: '4055 Evergreen Village Sq, San Jose, 95135' },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow eyebrow-light">What We Do</span>
            <h1>Six areas of growth, one person-centered plan.</h1>
            <p>
              Every individual&apos;s Individual Program Plan (IPP) shapes which of these areas we focus on, and
              how — never the other way around. All services are delivered at a 1:4 staffing ratio in real
              community settings.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '110px 0' }}>
        <div className="wrap card-grid">
          {SERVICES.map((s) => (
            <Reveal className="card" key={s.title}>
              <svg className="icon" viewBox="0 0 44 44" fill="none">
                {s.icon}
              </svg>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="outcome">
                <b>Outcome →</b> {s.outcome}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--sage-tint)', padding: '110px 0' }}>
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Places we go</h2>
            <p>A sample of the real San Jose locations woven into weekly programming.</p>
          </Reveal>
          <Reveal className="resource-grid">
            {RESOURCES.map((r) => (
              <div className="resource-item" key={r.name}>
                <span className="dot"></span>
                <div>
                  <b>{r.name}</b>
                  <span>{r.detail}</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
