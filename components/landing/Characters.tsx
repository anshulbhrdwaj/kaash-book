"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Characters() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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

        <div className="characters-grid">
          {/* Prisha */}
          <motion.div
            className="character-card"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Abstract portrait - CSS gradient */}
            <Image
              src="/prisha.png"
              alt="Prisha - Character portrait from Kaash You Could Love Me Someday"
              height={360}
              width={360}
              className="rounded-lg h-102 object-cover"
            />

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
            className="characters-divider"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
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
            <Image
              src="/anvay.png"
              alt="Anvay - Character portrait from Kaash You Could Love Me Someday"
              height={360}
              width={360}
              className="rounded-lg h-102 object-cover"
            />

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
    </section>
  );
}
