import { NavLink } from "react-router-dom";
import HeroVisual from "../components/HeroVisual";
import { perks, socials } from "../data/siteContent";

export default function HomePage() {
  const musicLinks = socials.filter((item) =>
    ["Instagram", "TikTok", "YouTube", "Spotify", "SoundCloud"].includes(
      item.label
    )
  );

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Yukan Music</p>
          <h1>
            Private drops,
            <br />
            early access.
          </h1>
          <p className="hero-text">
            Join the list for unreleased music, private streaming links, and first access to the
            next Yukan release before the public rollout.
          </p>

          <div className="perk-row">
            {perks.map((perk) => (
              <div key={perk} className="perk-pill">
                <span className="perk-dot" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </section>

      <section className="trust-strip">
        <p></p>
      </section>

      <section className="music-links-panel">
        <div className="music-links-visual">
          <img
            src="/assets/yukan1.png"
            alt="Yukan portrait"
            className="music-links-image"
          />
        </div>

        <aside className="listen-card listen-card-wide">
          <div className="section-heading">
            <p className="eyebrow">Connect</p>
            <h3>Find Yukan everywhere that matters</h3>
          </div>

          <p className="player-note">
            Tap through to stay close to the music, the visuals, and every new release across the
            main platforms.
          </p>

          <div className="social-stack social-stack-long">
            {musicLinks.map((item) => (
              <a
                key={item.label}
                className="social-card social-card-long"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{item.label}</span>
                <span className="social-caption">Open platform</span>
                <span className="arrow">↗</span>
              </a>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
