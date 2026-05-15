"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const bookRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bookRef.current) return;
    const rect = bookRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="hero-gradient"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(2rem, 5vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "clamp(2rem, 5vw, 6rem)",
          flexWrap: "wrap",
        }}
      >
        {/* Left text */}
        <motion.div
          style={{ maxWidth: "560px", flex: "1 1 320px" }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "var(--saffron)",
              marginBottom: "1rem",
            }}
          >
            A Coming-of-Age Love Story
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-hero)",
              fontStyle: "italic",
              fontWeight: 700,
              lineHeight: 0.9,
              color: "var(--parchment)",
              marginBottom: "0.5rem",
            }}
          >
            Kaash
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              fontStyle: "italic",
              color: "var(--parchment)",
              opacity: 0.7,
              marginBottom: "0.5rem",
              lineHeight: 1.2,
            }}
          >
            You Could Love Me Someday
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-lg)",
              color: "var(--muted)",
              marginBottom: "2rem",
            }}
          >
            by Aashray
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            className="hero-cta"
          >
            <a href="#buy" className="btn btn-primary btn-lg">
              Buy Now — ₹399
            </a>
            <a href="/chapter-one" className="btn btn-ghost btn-lg">
              Read First Chapter →
            </a>
          </motion.div>
        </motion.div>

        {/* Book cover */}
        <motion.div
          ref={bookRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            perspective: 1000,
            flex: "0 0 auto",
          }}
        >
          <motion.div
            className="book-cover-wrapper"
            style={{
              rotateX,
              rotateY,
              width: "clamp(240px, 30vw, 360px)",
              height: "clamp(360px, 45vw, 540px)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              position: "relative",
              transformStyle: "preserve-3d",
            }}
          >
            <Image src="/cover.jpeg" alt="Book Cover" fill />
            {/* Book cover visual - CSS art matching the description */}
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(3)].map((_, i) => (
            <span key={i}>
              GROWTH &nbsp;·&nbsp; LOSS &nbsp;·&nbsp; LOVE &nbsp;·&nbsp;
              SILENCE &nbsp;·&nbsp; BELONGING &nbsp;·&nbsp; CHANGE
              &nbsp;·&nbsp;
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {[...Array(3)].map((_, i) => (
            <span key={i}>
              GROWTH &nbsp;·&nbsp; LOSS &nbsp;·&nbsp; LOVE &nbsp;·&nbsp;
              SILENCE &nbsp;·&nbsp; BELONGING &nbsp;·&nbsp; CHANGE
              &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
