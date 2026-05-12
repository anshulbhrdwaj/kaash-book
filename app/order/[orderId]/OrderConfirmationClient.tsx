"use client";

import { motion } from "framer-motion";

interface OrderData {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: string;
  items: Array<{ title: string; qty: number; price: number }>;
  createdAt: string;
}

export function OrderConfirmationClient({ order }: { order: OrderData }) {
  const shareText = encodeURIComponent("I just ordered Kaash — You Could Love Me Someday by Aashray! 🌙📖");
  const shareUrl = encodeURIComponent("https://kaashthebook.com");

  return (
    <main className="section-padding" style={{ background: "var(--ink)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="container container-narrow" style={{ textAlign: "center" }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10, delay: 0.2 }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(26, 107, 114, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round">
              <motion.path d="M20 6L9 17l-5-5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
            </svg>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontStyle: "italic", color: "var(--parchment)", marginBottom: "0.5rem" }}>Order Confirmed!</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", color: "var(--muted)", marginBottom: "2rem" }}>Thank you, {order.customerName}. Your story begins soon.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "2rem", marginBottom: "2rem", textAlign: "left" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Order ID</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--parchment)", wordBreak: "break-all" }}>{order.id}</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--saffron)" }}>₹{(order.total / 100).toFixed(0)}</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Status</p>
              <span className="badge badge-paid">{order.status}</span>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Estimated Delivery</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--parchment)" }}>3–5 business days</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">Share on X</a>
          <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">Share on WhatsApp</a>
          <a href="/" className="btn btn-primary btn-sm">Back to Home</a>
        </motion.div>
      </div>
    </main>
  );
}
