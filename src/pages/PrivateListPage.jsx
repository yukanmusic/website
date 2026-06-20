import { useMemo, useState } from "react";
import PageHero from "../components/PageHero";

function formatDate(value) {
  if (!value) return "—";

  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function PrivateListPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const totalLabel = useMemo(
    () => `${submissions.length} signup${submissions.length === 1 ? "" : "s"}`,
    [submissions.length]
  );

  const handleCredentialChange = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/.netlify/functions/list-signups", {
        headers: {
          Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`,
        },
      });

      if (response.status === 401) {
        throw new Error("Access denied. Check the private page credentials.");
      }

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Could not load submissions.");
      }

      setSubmissions(payload.submissions || []);
      setStatus({
        type: "success",
        message: "Private list loaded successfully.",
      });
    } catch (error) {
      setSubmissions([]);
      setStatus({
        type: "error",
        message: error.message || "Could not load submissions.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Private List"
        title="Secure access to Yukan list signups."
        body="This page is intentionally not linked in the public navigation. Use private credentials to view Netlify form submissions."
      />

      <section className="page-grid page-grid-centered">
        <article className="capture-card capture-card-focused">
          <div className="section-heading">
            <p className="eyebrow">Protected Access</p>
            <h3>Load signups</h3>
          </div>

          <form className="capture-form" onSubmit={handleSubmit}>
            <div className="inline-fields">
              <label>
                <span>Username</span>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleCredentialChange}
                  autoComplete="username"
                  required
                />
              </label>

              <label>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleCredentialChange}
                  autoComplete="current-password"
                  required
                />
              </label>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Loading…" : "Load private list"}
            </button>

            {status.message ? (
              <p className={`form-status ${status.type === "success" ? "is-success" : "is-error"}`}>
                {status.message}
              </p>
            ) : null}
          </form>
        </article>
      </section>

      <section className="page-grid page-grid-centered">
        <article className="private-list-card">
          <div className="private-list-header">
            <div>
              <p className="eyebrow">Captured Entries</p>
              <h3>{totalLabel}</h3>
            </div>
          </div>

          {submissions.length === 0 ? (
            <p className="section-copy">No submissions loaded yet.</p>
          ) : (
            <div className="private-list-table-wrap">
              <table className="private-list-table">
                <thead>
                  <tr>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.fullName || "—"}</td>
                      <td>{entry.email || "—"}</td>
                      <td>{entry.country || "—"}</td>
                      <td>{entry.city || "—"}</td>
                      <td>{formatDate(entry.submittedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      </section>
    </>
  );
}
