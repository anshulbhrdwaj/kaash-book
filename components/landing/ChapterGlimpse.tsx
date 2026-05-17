"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const chapterText = `8th January 2026

Anvay Dubey stood shirtless in his rented apartment, the hum of Jaipur slipping through the open windows. At twenty-eight, his body still carried traces of what it used to be. The chest was broad, the shoulders familiar, but the sharpness had dulled. He gets tired faster now. Stretching in the mornings took longer than it should have, like his body needed convincing.

He walked to the balcony the way he always did, without thinking. The chair waited in its usual spot, legs scraping faintly as he dragged it back. He propped his heels on the railing where the paint had chipped away long ago and lit a cigarette. He took one drag and let the rest burn slowly between his fingers. Inside the room, his phone lay face down on the table. No sound. No light. It stayed there.

Smoke curled upward, softening the crescent moon until its edges blurred. The night felt thicker than usual.`;

export function ChapterGlimpse() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
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
      className="pb-16! section-padding"
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
