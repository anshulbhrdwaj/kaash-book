"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useCartStore } from "@/lib/store";

interface BuySectionProps {
  bookPrice: number;
  mrp: number;
  stockEnabled: boolean;
  launchOfferActive: boolean;
}

export function BuySection({
  bookPrice,
  mrp,
  stockEnabled,
  launchOfferActive,
}: BuySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [qty, setQty] = useState(1);
  const [format, setFormat] = useState("Paperback");
  const { addItem, openCart } = useCartStore();

  const priceInRupees = bookPrice / 100;
  const mrpInRupees = mrp / 100;
  const discount = Math.round(((mrpInRupees - priceInRupees) / mrpInRupees) * 100);

  const handleAddToCart = () => {
    addItem(
      {
        title: "Kaash — You Could Love Me Someday",
        format,
        price: bookPrice,
      },
      qty
    );
    openCart();
  };

  return (
    <section
      id="buy"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--surface)" }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "center",
          }}
        >
          {/* Book cover - large */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "clamp(260px, 35vw, 380px)",
                height: "clamp(390px, 52vw, 570px)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                boxShadow: "var(--shadow-book)",
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
                padding: "2.5rem",
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
                  opacity: 0.12,
                }}
              >
                <svg viewBox="0 0 200 160" fill="currentColor" style={{ color: "var(--ink)" }}>
                  <rect x="70" y="40" width="60" height="120" rx="2" />
                  <rect x="80" y="20" width="40" height="140" rx="2" />
                  <rect x="90" y="5" width="20" height="155" rx="2" />
                  <ellipse cx="100" cy="5" rx="12" ry="5" />
                  <ellipse cx="85" cy="20" rx="8" ry="4" />
                  <ellipse cx="115" cy="20" rx="8" ry="4" />
                  <ellipse cx="75" cy="40" rx="6" ry="3" />
                  <ellipse cx="125" cy="40" rx="6" ry="3" />
                </svg>
              </div>

              {/* Two figures */}
              <div
                style={{
                  position: "absolute",
                  bottom: "22%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "2.5rem",
                  opacity: 0.2,
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

              <div style={{ position: "relative", zIndex: 2 }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.2rem",
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
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    color: "var(--parchment)",
                    opacity: 0.8,
                    marginTop: "0.3rem",
                  }}
                >
                  You Could Love Me Someday
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    color: "var(--gold)",
                    marginTop: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                  }}
                >
                  Aashray
                </p>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "40%",
                  background: "linear-gradient(transparent, rgba(13,10,7,0.5))",
                }}
              />
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
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
              Buy the Book
            </p>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-3xl)",
                fontStyle: "italic",
                color: "var(--parchment)",
                marginBottom: "0.25rem",
                lineHeight: 1.2,
              }}
            >
              Kaash — You Could Love Me Someday
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                color: "var(--muted)",
                marginBottom: "1.5rem",
              }}
            >
              by Aashray
            </p>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-3xl)",
                  color: "var(--saffron)",
                  fontWeight: 700,
                }}
              >
                ₹{priceInRupees}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-base)",
                  color: "var(--muted)",
                  textDecoration: "line-through",
                }}
              >
                ₹{mrpInRupees}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--teal)",
                  background: "rgba(26, 107, 114, 0.15)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {discount}% OFF
              </span>
            </div>

            {launchOfferActive && (
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--gold)",
                  marginBottom: "2rem",
                }}
              >
                🎉 Launch Offer Ends Soon
              </p>
            )}

            {/* Format selector */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label className="form-label">Format</label>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => setFormat("Paperback")}
                  className={format === "Paperback" ? "btn btn-primary btn-sm" : "btn btn-ghost btn-sm"}
                >
                  Paperback
                </button>
                <button
                  className="btn btn-ghost btn-sm"
                  disabled
                  style={{ opacity: 0.3 }}
                >
                  E-Book (Coming Soon)
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: "2rem" }}>
              <label className="form-label">Quantity</label>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "var(--surface-hover)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  padding: "0.25rem",
                }}
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="btn btn-ghost btn-sm"
                  style={{ border: "none", padding: "0.5rem 0.75rem" }}
                >
                  −
                </button>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-base)",
                    minWidth: "2rem",
                    textAlign: "center",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(5, qty + 1))}
                  className="btn btn-ghost btn-sm"
                  style={{ border: "none", padding: "0.5rem 0.75rem" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            {stockEnabled ? (
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg"
                style={{
                  width: "100%",
                  marginBottom: "1.5rem",
                  animation: "pulse-glow 2s infinite",
                }}
              >
                Add to Cart — ₹{priceInRupees * qty}
              </button>
            ) : (
              <button
                className="btn btn-primary btn-lg"
                disabled
                style={{ width: "100%", marginBottom: "1.5rem" }}
              >
                Temporarily Unavailable
              </button>
            )}

            {/* Delivery info */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--muted)",
                marginBottom: "1.5rem",
              }}
            >
              📦 Free shipping above ₹499 · Ships in 3–5 days
            </p>

            {/* Trust badges */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <div className="trust-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Genuine Copy
              </div>
              <div className="trust-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure Payment
              </div>
              <div className="trust-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 0 18 0 9 9 0 0 0-18 0z" />
                  <path d="M12 8v4l3 3" />
                </svg>
                Easy Returns
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
