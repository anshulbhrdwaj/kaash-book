import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Chapter One — Kaash by Aashray",
  description: "Read the opening chapter of Kaash — You Could Love Me Someday. A coming-of-age love story set in Rajasthan.",
};

export default function ChapterOnePage() {
  return (
    <>
      <main className="section-padding" style={{ background: "var(--ink)", minHeight: "100vh" }}>
        <div className="container container-narrow">
          <a href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--saffron)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}>← Back to Home</a>
          <div style={{ marginTop: "2rem", marginBottom: "3rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--saffron)", marginBottom: "0.5rem" }}>Chapter One</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontStyle: "italic", color: "var(--parchment)", marginBottom: "0.5rem" }}>The Way Things Begin</h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--muted)" }}>from <em>Kaash — You Could Love Me Someday</em> by Aashray</p>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontStyle: "italic", lineHeight: 2, color: "var(--parchment)", opacity: 0.9 }}>
            <p style={{ marginBottom: "1.5rem" }}>The evening light filtered through the classroom window like it had something to prove — all gold and amber, the kind that made everything look like a memory even while it was still happening. Prisha sat in the second-to-last row, her notebook open but untouched, watching dust motes drift in the slanted light.</p>
            <p style={{ marginBottom: "1.5rem" }}>She didn&apos;t hear him come in. Nobody ever heard Anvay come in. He moved through rooms the way weather moved through open windows — sudden, uninvited, impossible to ignore once you noticed.</p>
            <p style={{ marginBottom: "1.5rem" }}>&ldquo;You&apos;re still here,&rdquo; he said, not asking. He dropped his bag on the desk beside hers — the one nobody sat in, the one she&apos;d silently claimed as buffer space between herself and the rest of the world.</p>
            <p style={{ marginBottom: "1.5rem" }}>She didn&apos;t look up. &ldquo;So are you.&rdquo;</p>
            <p style={{ marginBottom: "1.5rem" }}>He smiled. She knew because she could feel it — that particular shift in the air that happened when Anvay decided to be present. Not just physically. But fully, entirely, recklessly present.</p>
            <p style={{ marginBottom: "1.5rem" }}>&ldquo;I was thinking,&rdquo; he started, pulling out the chair with the kind of carelessness that made everything he did look intentional. &ldquo;About what you said yesterday. About how people don&apos;t really change — they just learn which parts of themselves to hide.&rdquo;</p>
            <p style={{ marginBottom: "1.5rem" }}>Prisha closed her notebook. Not because she was interested — she told herself that, at least. But because Anvay had the unfortunate ability to make even bad ideas sound like revelations.</p>
            <p style={{ marginBottom: "1.5rem" }}>&ldquo;I didn&apos;t say that exactly.&rdquo;</p>
            <p style={{ marginBottom: "1.5rem" }}>&ldquo;You said something close enough. And I disagree.&rdquo; He leaned forward, elbows on the desk, chin in his hands. &ldquo;I think people change all the time. They just don&apos;t notice because change doesn&apos;t feel like change when you&apos;re in the middle of it. It feels like Tuesday.&rdquo;</p>
            <p style={{ marginBottom: "1.5rem" }}>She almost laughed. Almost. The corner of her mouth twitched — the most she ever allowed herself when she was still deciding whether someone was worth her attention.</p>
            <p style={{ marginBottom: "1.5rem" }}>Outside, the light was changing. The gold had softened to something closer to rust, the kind of light that made Jaipur look like it was painted by someone who loved it too much to be objective. The Hawa Mahal in the distance caught the last of it, its honeycombed facade glowing like a lantern left on by accident.</p>
            <p style={{ marginBottom: "1.5rem" }}>Neither of them said anything for a while. That was the thing about silences with Anvay — they weren&apos;t empty. They were full of all the things he was deciding not to say, which somehow made them louder than words.</p>
            <p style={{ marginBottom: "1.5rem" }}>&ldquo;Walk with me,&rdquo; he said eventually.</p>
            <p style={{ marginBottom: "1.5rem" }}>It wasn&apos;t a question. With Anvay, very few things were.</p>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem", marginTop: "3rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontStyle: "italic", color: "var(--parchment)", marginBottom: "1rem" }}>Want to know what happens next?</p>
            <a href="/#buy" className="btn btn-primary btn-lg">Get the Full Book — ₹399</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
