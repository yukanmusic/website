import { NavLink, Outlet, useLocation } from "react-router-dom";
import { navLinks, socials } from "../data/siteContent";

export default function SiteLayout() {
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <NavLink className="wordmark" to="/">
          yukanmusic
        </NavLink>

        <nav className="main-nav" aria-label="Primary navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `main-nav-link${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-actions">
          <NavLink className="nav-pill nav-pill-ghost" to="/music">
            Listen
          </NavLink>
          <NavLink className="nav-pill" to="/join">
            Join the list
          </NavLink>
        </div>
      </header>

      <main className={onHome ? "" : "inner-main"}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <p className="footer-kicker">Yukan Music</p>
            <p className="footer-brand">Stay close to the drop.</p>
            <p className="footer-copy">
              Private drops, early access, and direct updates for the first listeners.
            </p>
          </div>

          <div className="footer-column">
            <p className="footer-label">Navigate</p>
            <div className="footer-links">
              {navLinks.map((item) => (
                <NavLink key={item.to} to={item.to} className="footer-link">
                  {item.label}
                </NavLink>
              ))}
              <NavLink to="/join" className="footer-link">Join the list</NavLink>
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-label">Platforms</p>
            <div className="footer-links footer-links-social">
              {socials.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="footer-link footer-social-link">
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
