"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const chapterText = `The evening light filtered through the classroom window like it had something to prove — all gold and amber, the kind that made everything look like a memory even while it was still happening. Prisha sat in the second-to-last row, her notebook open but untouched, watching dust motes drift in the slanted light.

She didn't hear him come in. Nobody ever heard Anvay come in. He moved through rooms the way weather moved through open windows — sudden, uninvited, impossible to ignore once you noticed.

"You're still here," he said, not asking. He dropped his bag on the desk beside hers — the one nobody sat in, the one she'd silently claimed as buffer space between herself and the rest of the world.

She didn't look up. "So are you."

He smiled. She knew because she could feel it — that particular shift in the air that happened when Anvay decided to be present. Not just physically. But fully, entirely, recklessly present.`;

export function ChapterGlimpse() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [revealedWords, setRevealedWords] = useState(0);
  const words = chapterText.split(/(\s+)/);

  useEffect(() => {
    if (!isInView) return;

    let wordIndex = 0;
    const interval = setInterval(() => {
      wordIndex += 1;
      setRevealedWords(wordIndex);
      if (wordIndex >= words.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isInView, words.length]);

  return (
    <section
      className="section-padding"
      style={{
        background: "var(--ink)",
        position: "relative",
      }}
    >
      <div className="container container-narrow">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "var(--saffron)",
            textAlign: "center",
            marginBottom: "0.5rem",
          }}
        >
          Chapter One
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            fontStyle: "italic",
            textAlign: "center",
            color: "var(--parchment)",
            marginBottom: "3rem",
          }}
        >
          The way things begin
        </motion.h2>

        <div ref={ref} className="chapter-fade" style={{ position: "relative" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-lg)",
              fontStyle: "italic",
              lineHeight: 1.8,
              color: "var(--parchment)",
              opacity: 0.9,
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  display: "inline",
                  opacity: i < revealedWords ? 1 : 0.05,
                  transition: "opacity 0.3s ease",
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
          style={{
            textAlign: "center",
            marginTop: "3rem",
          }}
        >
          <a href="/chapter-one" className="btn btn-ghost">
            Continue reading →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
