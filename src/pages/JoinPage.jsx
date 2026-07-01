import JoinForm from "../components/JoinForm";
import PageHero from "../components/PageHero";

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Join The List"
        title="Get the next Yukan release before the public does."
        body="Keep the form focused. Ask for email, location, and permission to send direct updates. That is the conversion point."
      />

      <section className="page-grid page-grid-centered">
        <article className="capture-card capture-card-focused">
          <div className="section-heading">
            <p className="eyebrow">Private Access</p>
            <h3>Join the list</h3>
          </div>
          <p className="section-copy">
            Sign up for unreleased music, early drop alerts, and private streaming links.
          </p>
          <JoinForm />
        </article>
      </section>
    </>
  );
}
