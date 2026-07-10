import { useState } from "react";
import { countries } from "../data/siteContent";

function encodeForm(data) {
  return new URLSearchParams(data).toString();
}

export default function JoinForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    city: "",
    updates: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodeForm({
          "form-name": "fan-capture",
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus({
        type: "success",
        message: "You are on the list. We will send early access updates when the next drop is ready.",
      });
      setFormData({
        fullName: "",
        email: "",
        country: "",
        city: "",
        updates: true,
      });
    } catch {
      setStatus({
        type: "error",
        message: "We could not save your details right now. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="capture-form"
      name="fan-capture"
      method="POST"
      data-netlify="true"
     data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="fan-capture" />
      <input type="hidden" name="bot-field" />

      <label>
        <span>Full name</span>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your full name"
          required
        />
      </label>

      <label>
        <span>Email address</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </label>

      <div className="inline-fields">
        <label>
          <span>Country</span>
          <select name="country" value={formData.country} onChange={handleChange} required>
            <option value="" disabled>
              Select country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>City</span>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Your city"
            required
          />
        </label>
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          name="updates"
          checked={formData.updates}
          onChange={handleChange}
        />
        <span>Send me unreleased music, early drop alerts, and private links.</span>
      </label>

      <button type="submit" className="submit-button" disabled={submitting}>
        {submitting ? "Joining…" : "Join the list"}
      </button>

      {status.message ? (
        <p className={`form-status ${status.type === "success" ? "is-success" : "is-error"}`}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
