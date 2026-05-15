"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
}

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`star ${i > count ? "empty" : ""}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, var(--saffron), var(--ember))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        fontWeight: 700,
        color: "var(--ink)",
      }}
    >
      {initials}
    </div>
  );
}

export function Reviews({ reviews }: { reviews: Review[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="pt-0! section-padding"
      style={{ background: "var(--ink)" }}
    >
      <div className="container">
        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          {[
            { label: "A story about", value: "Growth & Love" },
            { label: "Set in the heart of", value: "Rajasthan" },
            { label: "Published by", value: "Astitva Prakashan" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              style={{
                background: "var(--ink)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "2rem",
                position: "relative",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--muted)",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xl)",
                  fontStyle: "italic",
                  color: "var(--saffron)",
                }}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "var(--saffron)",
              marginBottom: "0.5rem",
            }}
          >
            Reader Reviews
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              fontStyle: "italic",
              color: "var(--parchment)",
            }}
          >
            What readers are saying
          </h2>
        </motion.div>

        {/* Review cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15 }}
            >
              <Stars count={review.rating} />
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-base)",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "var(--parchment)",
                  marginBottom: "1.5rem",
                  opacity: 0.9,
                }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <InitialsAvatar name={review.name} />
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-sm)",
                      color: "var(--parchment)",
                    }}
                  >
                    {review.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--muted)",
                    }}
                  >
                    {review.city}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
