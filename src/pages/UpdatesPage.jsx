import PageHero from "../components/PageHero";
import { updateItems } from "../data/siteContent";

export default function UpdatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Updates"
        title="New drops, visuals, announcements, and rollout signals."
        body="This page gives Yukan a clean updates surface beyond social posts, with room for story, context, and direct audience capture."
      />

      <section className="page-grid">
        {updateItems.map((item) => (
          <article key={item.title} className="info-card">
            <p className="card-kicker">Latest signal</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
