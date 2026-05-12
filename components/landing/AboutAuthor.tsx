"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AboutAuthor() {

  return (
    <section className="section-padding" style={{ background: "var(--surface)" }}>
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
          <motion.div initial={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "280px", height: "340px", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "radial-gradient(ellipse at 50% 30%, var(--saffron) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, var(--dusk) 0%, transparent 50%), var(--ink)", position: "relative" }}>
              <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontStyle: "italic", color: "var(--parchment)", opacity: 0.6 }}>Aashray</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--saffron)", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: "0.25rem" }}>Writer · Storyteller</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--saffron)", marginBottom: "0.5rem" }}>About the Author</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontStyle: "italic", color: "var(--parchment)", marginBottom: "1.5rem" }}>Aashray</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", lineHeight: 1.8, color: "var(--parchment)", opacity: 0.85, marginBottom: "1rem" }}>
              Aashray writes about the spaces between people — the things left unsaid, the love that transforms quietly, and the memories that refuse to fade. <em>Kaash</em> is his debut novel, published by Astitva Prakashan.
            </p>
            <a href="https://instagram.com/Aashray.y" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--saffron)", textDecoration: "none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg>
              @Aashray.y
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
