"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.div
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1.5rem",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xl)",
                  fontStyle: "italic",
                }}
              >
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--muted)",
                  fontSize: "1.5rem",
                  fontFamily: "var(--font-mono)",
                }}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>
              {items.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3rem 0",
                    color: "var(--muted)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: "var(--text-lg)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Your cart is empty
                  </p>
                  <p style={{ fontSize: "var(--text-sm)" }}>
                    Add the book to begin your journey
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {items.map((item) => (
                    <motion.div
                      key={item.title}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        padding: "1rem",
                        background: "var(--surface-hover)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {/* Book thumbnail */}
                      <div
                        style={{
                          width: "60px",
                          height: "80px",
                          borderRadius: "var(--radius-sm)",
                          background:
                            "linear-gradient(135deg, var(--ember), var(--saffron), var(--gold))",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "0.6rem",
                            fontStyle: "italic",
                            color: "var(--ink)",
                            textAlign: "center",
                            lineHeight: 1.2,
                          }}
                        >
                          Kaash
                        </span>
                      </div>

                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "var(--text-sm)",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-xs)",
                            color: "var(--muted)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {item.format}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              background: "var(--surface)",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            <button
                              onClick={() => updateQty(item.title, item.qty - 1)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "var(--fg)",
                                padding: "0.25rem 0.5rem",
                                fontFamily: "var(--font-mono)",
                                fontSize: "var(--text-sm)",
                              }}
                            >
                              −
                            </button>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "var(--text-sm)",
                                minWidth: "1.5rem",
                                textAlign: "center",
                              }}
                            >
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.title, item.qty + 1)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "var(--fg)",
                                padding: "0.25rem 0.5rem",
                                fontFamily: "var(--font-mono)",
                                fontSize: "var(--text-sm)",
                              }}
                            >
                              +
                            </button>
                          </div>

                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "var(--text-sm)",
                              color: "var(--saffron)",
                            }}
                          >
                            ₹{((item.price * item.qty) / 100).toFixed(0)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.title)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--muted)",
                          fontSize: "0.75rem",
                          alignSelf: "flex-start",
                        }}
                        aria-label={`Remove ${item.title}`}
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: "1.5rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-sm)",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Order Total
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-xl)",
                      color: "var(--saffron)",
                    }}
                  >
                    ₹{(total() / 100).toFixed(0)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Proceed to Checkout →
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
