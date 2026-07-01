import PageHero from "../components/PageHero";

export default function MusicPage() {
  return (
    <>
      <PageHero
        eyebrow="Music"
        title="Current sound, private links, and the next release window."
        body="Use this page to hold the main streaming embed, highlight the latest single, and point fans toward early-access signup."
      />

      <section className="page-grid page-grid-wide">
        <article className="info-card info-card-large">
          <div className="player-shell">
            <img
              title="Yukan latest artwork"
              className="player-image"
              src="/assets/yukan2.png"
              alt="Yukan latest release artwork"
            />
          </div>
        </article>
        <article className="info-card">
          <div className="player-shell">
            <img
              title="Yukan latest artwork detail"
              className="player-image player-image-small"
              src="/assets/yukan2.png"
              alt="Yukan latest release artwork detail"
            />
          </div>
        </article>
      </section>
    </>
  );
}
