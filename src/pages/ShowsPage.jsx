import PageHero from "../components/PageHero";
import { showItems } from "../data/siteContent";

export default function ShowsPage() {
  return (
    <>
      <PageHero
        eyebrow="Shows"
        title="Upcoming rooms, listening events, and live moments."
        body="Use this page to surface dates, private sessions, and ticket or RSVP links when live activity is ready."
      />

      <section className="page-grid">
        {showItems.map((item) => (
          <article key={`${item.city}-${item.venue}`} className="info-card">
            <p className="card-kicker">{item.date}</p>
            <h3>{item.venue}</h3>
            <p>{item.city}</p>
          </article>
        ))}
      </section>
    </>
  );
}
