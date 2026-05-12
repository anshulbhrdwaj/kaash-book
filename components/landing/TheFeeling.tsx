"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function TheFeeling() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{
        background: "var(--ink)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Big quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-3xl)",
            fontStyle: "italic",
            color: "var(--parchment)",
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto 4rem",
            lineHeight: 1.4,
          }}
        >
          &ldquo;Some love stories aren&apos;t about who stayed or who left.
          <br />
          <span style={{ color: "var(--saffron)" }}>
            They&apos;re about who you became because of them.
          </span>
          &rdquo;
        </motion.blockquote>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "center",
          }}
        >
          {/* Left - atmospheric paragraph */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-lg)",
                lineHeight: 1.8,
                color: "var(--parchment)",
                opacity: 0.85,
              }}
            >
              Some people enter your life quietly, yet leave behind a storm you
              never truly recover from. <em>Kaash</em> follows Prisha and
              Anvay — two people shaped by different fears and expectations of
              love. Their story is not built on dramatic twists but on
              emotional tension: what people feel vs. what they dare to say
              aloud.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                lineHeight: 1.8,
                color: "var(--muted)",
                marginTop: "1rem",
              }}
            >
              Through attachment, vulnerability, insecurity, and the fear of
              being truly known, it explores how love reshapes people without
              them noticing. Written in an intimate, emotionally reflective
              style — silence speaks louder than words, and small moments leave
              the deepest impact.
            </p>
          </motion.div>

          {/* Right - emotion stamps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            {isInView && (
              <>
                <div className="emotion-stamp">Painfully Human</div>
                <div className="emotion-stamp">Quietly Devastating</div>
                <div className="emotion-stamp">Stays With You</div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
