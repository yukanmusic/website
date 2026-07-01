import PageHero from "../components/PageHero";
import { updateItems } from "../data/siteContent";

export default function OverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Overview"
        title="A direct channel between Yukan and the first listeners."
        body="This site is built to capture early interest, deliver private links, and keep the audience close to each new release."
      />

      <section className="page-grid">
        {updateItems.map((item) => (
          <article key={item.title} className="info-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
