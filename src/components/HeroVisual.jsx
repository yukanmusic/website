import { useState } from "react";

export default function HeroVisual() {
  const [photoLoaded, setPhotoLoaded] = useState(false);

  return (
    <div className="hero-visual">
      <div className="visual-stage">
        <div className="artist-card">
          <div className="artist-photo-shell">
            <img
              className="artist-photo"
              src="/assets/pic1.png"
              alt="Yukan promo visual"
              onLoad={() => setPhotoLoaded(true)}
              onError={() => setPhotoLoaded(false)}
            />
            <div className={`artist-photo-fallback${photoLoaded ? " is-hidden" : ""}`}>
              <span>Drop `yukan1.png` into `public/assets`</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
