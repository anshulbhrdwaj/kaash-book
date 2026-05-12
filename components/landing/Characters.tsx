"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Characters() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{
        background: "var(--surface)",
        position: "relative",
      }}
    >
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "var(--saffron)",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Meet the Characters
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-3xl)",
            fontStyle: "italic",
            textAlign: "center",
            marginBottom: "3rem",
            color: "var(--parchment)",
          }}
        >
          Two souls, one story
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "2rem",
            alignItems: "stretch",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {/* Prisha */}
          <motion.div
            className="character-card"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Abstract portrait - CSS gradient */}
            <div
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "var(--radius-md)",
                marginBottom: "1.5rem",
                position: "relative",
                overflow: "hidden",
                background: `
                  radial-gradient(circle at 50% 30%, var(--dusk) 0%, transparent 60%),
                  radial-gradient(circle at 40% 70%, var(--teal) 0%, transparent 50%),
                  linear-gradient(180deg, var(--surface-hover), var(--ink))
                `,
              }}
            >
              {/* Abstract geometric silhouette */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: 0.3,
                }}
              >
                <svg width="80" height="120" viewBox="0 0 80 120">
                  <circle cx="40" cy="25" r="18" fill="var(--parchment)" opacity="0.4" />
                  <ellipse cx="40" cy="80" rx="25" ry="40" fill="var(--parchment)" opacity="0.2" />
                  {/* Hair flowing */}
                  <path d="M22 25 Q10 40 15 60" stroke="var(--parchment)" strokeWidth="2" fill="none" opacity="0.3" />
                  <path d="M58 25 Q70 40 65 60" stroke="var(--parchment)" strokeWidth="2" fill="none" opacity="0.3" />
                </svg>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "3rem",
                  fontStyle: "italic",
                  color: "var(--parchment)",
                  opacity: 0.08,
                  lineHeight: 1,
                }}
              >
                P
              </div>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                fontStyle: "italic",
                color: "var(--parchment)",
                marginBottom: "0.5rem",
              }}
            >
              Prisha
            </h3>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--saffron)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Thoughtful. Guarded. Feels everything. Says nothing.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              She hides vulnerability behind silence and composure. Every
              emotion she carries is a storm she&apos;s learned to contain — not
              because she doesn&apos;t feel, but because she feels too deeply to
              let anyone see.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "1px",
                flex: 1,
                background:
                  "linear-gradient(transparent, var(--saffron), transparent)",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-sm)",
                fontStyle: "italic",
                color: "var(--saffron)",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                padding: "1rem 0",
                letterSpacing: "0.1em",
              }}
            >
              Their story
            </p>
            <div
              style={{
                width: "1px",
                flex: 1,
                background:
                  "linear-gradient(transparent, var(--saffron), transparent)",
              }}
            />
          </motion.div>

          {/* Anvay */}
          <motion.div
            className="character-card"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Abstract portrait */}
            <div
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "var(--radius-md)",
                marginBottom: "1.5rem",
                position: "relative",
                overflow: "hidden",
                background: `
                  radial-gradient(circle at 50% 30%, var(--ember) 0%, transparent 60%),
                  radial-gradient(circle at 60% 70%, var(--saffron) 0%, transparent 50%),
                  linear-gradient(180deg, var(--surface-hover), var(--ink))
                `,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "10%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: 0.3,
                }}
              >
                <svg width="80" height="120" viewBox="0 0 80 120">
                  <circle cx="40" cy="25" r="16" fill="var(--parchment)" opacity="0.4" />
                  <rect x="20" y="42" width="40" height="55" rx="4" fill="var(--parchment)" opacity="0.2" />
                  {/* Shoulders broader */}
                  <path d="M20 50 Q10 52 8 65" stroke="var(--parchment)" strokeWidth="2" fill="none" opacity="0.2" />
                  <path d="M60 50 Q70 52 72 65" stroke="var(--parchment)" strokeWidth="2" fill="none" opacity="0.2" />
                </svg>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "3rem",
                  fontStyle: "italic",
                  color: "var(--parchment)",
                  opacity: 0.08,
                  lineHeight: 1,
                }}
              >
                A
              </div>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                fontStyle: "italic",
                color: "var(--parchment)",
                marginBottom: "0.5rem",
              }}
            >
              Anvay
            </h3>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--saffron)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Impulsive. Intense. Loves too much. Hurts too easily.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              He is flawed but deeply sincere — the kind of person who loves
              until he loses himself. His intensity is both his gift and his
              undoing, and he doesn&apos;t know how to love without burning.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Responsive override for mobile - stack the grid */}
      <style>{`
        @media (max-width: 768px) {
          .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
          .container > div:last-child > div:nth-child(2) {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
