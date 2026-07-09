import PageHero from "../components/PageHero";

const bioSections = [
  {
    heading: "Early Rise",
    body: "Yukan is a 18-year-old emerging rapper from London, UK, known for his energetic, bouncing sound and fast rise within the underground scene. He began releasing music in early 2025 and quickly built momentum through viral traction on platforms like TikTok and streaming services.",
  },
  {
    heading: "Breakout Tracks",
    body: "His breakout tracks include \"Fake ID\", which has surpassed millions of streams, alongside other releases such as \"5 mins\", \"emo\", and \"Arcade\" (2026). His 2025 EP love me while yukan helped establish his early identity, followed by a steady run of singles that continued to grow his audience into 2026.",
  },
  {
    heading: "Sound & Style",
    body: "Yukan's music sits in the UK underground rap space, often blending high-energy production with a youthful, emotionally charged tone. His breakout success has been driven by strong online engagement, particularly through short-form video platforms, where his sound has found a growing fanbase.",
  },
  {
    heading: "Live & Collaborations",
    body: "He has performed live at venues including 229 London, marking his debut stage appearances in 2025. Alongside his solo work, he has collaborated with artists such as 2muchmotion and Vat6ré, further embedding him within the London underground rap network.",
  },
  {
    heading: "Online Presence",
    body: "Active on Instagram under @lovemewhileyukan and across streaming platforms like Spotify and SoundCloud, Yukan continues to expand his presence with a steady release of new music and growing live performance experience.",
  },
  {
    heading: "The Bigger Picture",
    body: "Overall, Yukan is part of a new wave of young UK artists shaping the underground rap sound through internet-driven growth, high-energy production, and a rapidly expanding listener base.",
  },
];

export default function BiographyPage() {
  return (
    <>
      <PageHero
        eyebrow="Biography"
        title="18. London. Underground."
        body="From early 2025 to millions of streams — the story behind the sound."
      />

      <section className="page-grid bio-grid">
        {bioSections.map((section) => (
          <article key={section.heading} className="info-card">
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}