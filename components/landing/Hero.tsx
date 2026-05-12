"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
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
            {/* Book cover visual - CSS art matching the description */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `
                  linear-gradient(180deg, 
                    #D4A853 0%, 
                    #E8873A 25%, 
                    #C84B11 45%, 
                    #7B4F8E 65%, 
                    #1A6B72 80%, 
                    #0D0A07 100%
                  )`,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "2rem",
              }}
            >
              {/* Hawa Mahal silhouette */}
              <div
                style={{
                  position: "absolute",
                  bottom: "30%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: "40%",
                  opacity: 0.15,
                }}
              >
                <svg viewBox="0 0 200 160" fill="currentColor" style={{ color: "var(--ink)" }}>
                  {/* Simplified Hawa Mahal silhouette */}
                  <rect x="70" y="40" width="60" height="120" rx="2" />
                  <rect x="80" y="20" width="40" height="140" rx="2" />
                  <rect x="90" y="5" width="20" height="155" rx="2" />
                  {/* Windows */}
                  <rect x="75" y="50" width="10" height="12" rx="5" fill="#E8873A" opacity="0.3" />
                  <rect x="115" y="50" width="10" height="12" rx="5" fill="#E8873A" opacity="0.3" />
                  <rect x="75" y="70" width="10" height="12" rx="5" fill="#E8873A" opacity="0.3" />
                  <rect x="115" y="70" width="10" height="12" rx="5" fill="#E8873A" opacity="0.3" />
                  <rect x="85" y="30" width="8" height="10" rx="4" fill="#E8873A" opacity="0.3" />
                  <rect x="107" y="30" width="8" height="10" rx="4" fill="#E8873A" opacity="0.3" />
                  {/* Dome tops */}
                  <ellipse cx="100" cy="5" rx="12" ry="5" />
                  <ellipse cx="85" cy="20" rx="8" ry="4" />
                  <ellipse cx="115" cy="20" rx="8" ry="4" />
                  <ellipse cx="75" cy="40" rx="6" ry="3" />
                  <ellipse cx="125" cy="40" rx="6" ry="3" />
                </svg>
              </div>

              {/* Two figures silhouette */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "2rem",
                  opacity: 0.25,
                }}
              >
                <svg width="30" height="60" viewBox="0 0 30 60" fill="var(--ink)">
                  <circle cx="15" cy="8" r="6" />
                  <path d="M8 16 Q15 14 22 16 L24 45 Q15 48 6 45 Z" />
                  <rect x="8" y="45" width="6" height="15" rx="2" />
                  <rect x="16" y="45" width="6" height="15" rx="2" />
                </svg>
                <svg width="30" height="60" viewBox="0 0 30 60" fill="var(--ink)">
                  <circle cx="15" cy="8" r="6" />
                  <path d="M8 16 Q15 14 22 16 L22 35 Q15 38 8 35 Z" />
                  <path d="M6 35 Q15 40 24 35 L26 55 Q15 58 4 55 Z" />
                  <rect x="9" y="53" width="5" height="7" rx="2" />
                  <rect x="16" y="53" width="5" height="7" rx="2" />
                </svg>
              </div>

              {/* Title on cover */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    fontStyle: "italic",
                    fontWeight: 800,
                    color: "var(--parchment)",
                    lineHeight: 1,
                    textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  Kaash
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.65rem",
                    fontStyle: "italic",
                    color: "var(--parchment)",
                    opacity: 0.8,
                    marginTop: "0.25rem",
                    textShadow: "0 1px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  You Could Love Me Someday
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    color: "var(--gold)",
                    marginTop: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                  }}
                >
                  Aashray
                </p>
              </div>

              {/* Glow effect at bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "40%",
                  background:
                    "linear-gradient(transparent, rgba(13, 10, 7, 0.6))",
                }}
              />
            </div>
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
