"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import Image from "next/image";

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
  const [qty, setQty] = useState(1);
  const [format, setFormat] = useState("Paperback");
  const { addItem, openCart } = useCartStore();

  const priceInRupees = bookPrice / 100;
  const mrpInRupees = mrp / 100;
  const discount = Math.round(
    ((mrpInRupees - priceInRupees) / mrpInRupees) * 100,
  );

  const handleAddToCart = () => {
    addItem(
      {
        title: "Kaash — You Could Love Me Someday",
        format,
        price: bookPrice,
      },
      qty,
    );
    openCart();
  };

  return (
    <section
      id="buy"
      className="section-padding"
      style={{ background: "var(--surface)" }}
    >
      <div className="container">
        <div className="buy-section-grid">
          {/* Book cover - large */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="buy-cover-column"
          >
            <Image src="/cover.jpeg" alt="Book Cover" height={540} width={360} className="rounded-lg" />
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="buy-info-column"
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
              className="buy-title"
              style={{
                fontFamily: "var(--font-display)",
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
            <div className="buy-price-row">
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
              <div className="buy-format-buttons">
                <button
                  onClick={() => setFormat("Paperback")}
                  className={
                    format === "Paperback"
                      ? "btn btn-primary btn-sm"
                      : "btn btn-ghost btn-sm"
                  }
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
              <div className="buy-qty-control">
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
                className="btn btn-primary btn-lg buy-cta-btn"
                style={{
                  animation: "pulse-glow 2s infinite",
                }}
              >
                Add to Cart — ₹{priceInRupees * qty}
              </button>
            ) : (
              <button className="btn btn-primary btn-lg buy-cta-btn" disabled>
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
                marginTop: "1.5rem",
              }}
            >
              📦 Free shipping above ₹499 · Ships in 3–5 days
            </p>

            {/* Trust badges */}
            <div className="buy-trust-badges">
              <div className="trust-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Genuine Copy
              </div>
              <div className="trust-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure Payment
              </div>
              <div className="trust-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
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
