import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'A Day in the Community | Aspire Community Services Day Program',
  description: 'Hours of operation, staffing ratio, and the real San Jose neighborhood route that shapes every day at ACSDP.',
};

const STOPS = [
  { tag: 'Transit training', name: 'Santa Teresa VTA Station', body: 'Practicing bus and light-rail routes toward independent travel.' },
  { tag: 'Literacy & resources', name: 'Martin Luther King Library', body: 'Research, quiet study, and community programming downtown.' },
  { tag: 'Budgeting & shopping', name: 'Safeway, Cottle Road', body: 'Comparing prices, making a list, and managing money in real time.' },
  { tag: 'Wellness & recreation', name: 'Hellyer Park, Coyote Creek Trail', body: 'Movement, fresh air, and time in nature every week.' },
  { tag: 'Local commerce', name: 'Evergreen Farmers Market', body: 'Meal planning and nutrition, sourced straight from the stall.' },
  { tag: 'Gathering & belonging', name: 'Seven Trees Community Center', body: 'Clubs, events, and natural relationships with neighbors.' },
];

export default function CommunityPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow eyebrow-light">Not a facility — a neighborhood</span>
            <h1>A day in the community follows a real route.</h1>
            <p>
              ACSDP doesn&apos;t operate out of a fixed building. Each day is built around actual San Jose
              destinations, chosen with each individual, so skills are practiced where they&apos;ll actually be
              used.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="route-section">
        <div className="wrap route-head">
          <Reveal>
            <span className="eyebrow eyebrow-light">The Neighborhood Route</span>
            <h2>Six stops, chosen with every individual</h2>
            <p>A sample week can move between any of these — always guided by personal goals and preferences.</p>
          </Reveal>
        </div>
        <Reveal className="route-strip">
          <div className="route-track">
            <div className="route-line"></div>
            {STOPS.map((s) => (
              <div className="stop" key={s.name}>
                <div className="pin"></div>
                <span className="stop-tag">{s.tag}</span>
                <h4>{s.name}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="wrap">
          <span className="route-hint">← scroll to follow the route →</span>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: 'var(--paper)' }}>
        <div className="wrap hours-grid">
          <div>
            <Reveal className="eyebrow">Hours of Operation</Reveal>
            <Reveal style={{ marginTop: 26 }}>
              <div className="schedule-row">
                <div>
                  <h4>Full-Time</h4>
                  <p>Standard weekday programming, five days of full engagement and skill-building.</p>
                </div>
                <div className="when">Mon–Fri · 9AM–3PM</div>
              </div>
              <div className="schedule-row">
                <div>
                  <h4>Part-Time</h4>
                  <p>The same full-day programming, scaled to three or four days per week.</p>
                </div>
                <div className="when">3–4 Days · 9AM–3PM</div>
              </div>
              <div className="schedule-row">
                <div>
                  <h4>Flexible Scheduling</h4>
                  <p>Adjusted schedules available with Regional Center approval to match each IPP.</p>
                </div>
                <div className="when">By Arrangement</div>
              </div>
            </Reveal>
          </div>
          <Reveal className="detail-cards">
            <div className="detail-card">
              <span className="num">1:4</span>
              <div>
                <h5>Staffing Ratio</h5>
                <p>Small-group learning and exploration, sized so every individual gets real, direct support.</p>
              </div>
            </div>
            <div className="detail-card">
              <span className="num">531</span>
              <div>
                <h5>Regional Center Service Code</h5>
                <p>ACSDP is a vendorized community-based day program provider serving individuals through their Regional Center.</p>
              </div>
            </div>
            <div className="detail-card">
              <span className="num">IPP</span>
              <div>
                <h5>Built Around Your Plan</h5>
                <p>Activities, locations, and pace are drawn directly from each individual&apos;s Individual Program Plan — never a fixed curriculum.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
