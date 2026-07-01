import PageHero from "../components/PageHero";
import { travelMoments } from "../data/siteContent";

export default function TravelPage() {
  return (
    <>
      <PageHero
        eyebrow="Travel"
        title="Where the sound moves next."
        body="Use this page for city movement, tour diary moments, travel notes, and location-based updates that give listeners a sense of momentum."
      />

      <section className="page-grid">
        {travelMoments.map((item) => (
          <article key={item} className="info-card">
            <h3>{item}</h3>
            <p>
              Keep this section fresh with short updates, visuals, or city-based notes that make
              the project feel alive.
            </p>
          </article>
        ))}
      </section>
    </>
  );
}
