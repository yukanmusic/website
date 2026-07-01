export default function PageHero({ eyebrow, title, body }) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-hero-copy">{body}</p>
    </section>
  );
}
