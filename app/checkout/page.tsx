"use client";

import { useCartStore } from "@/lib/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Script from "next/script";

const shippingSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required").max(15),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pin: z.string().min(6, "Valid PIN required").max(6),
  notes: z.string().optional(),
});

type ShippingForm = z.infer<typeof shippingSchema>;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
  });

  const orderTotal = total();

  const onSubmit = async (data: ShippingForm) => {
    setLoading(true);
    setError("");

    try {
      // Create order
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: data.fullName,
          email: data.email,
          phone: data.phone,
          address: {
            line1: data.addressLine1,
            line2: data.addressLine2 || "",
            city: data.city,
            state: data.state,
            pin: data.pin,
            notes: data.notes || "",
          },
          items: items.map((i) => ({
            title: i.title,
            format: i.format,
            qty: i.qty,
            price: i.price,
          })),
          total: orderTotal,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.details || "Failed to create order");
      }

      const orderData = await res.json();

      // If in demo mode (no Razorpay order), skip payment and go to confirmation
      if (orderData.demoMode) {
        clearCart();
        router.push(`/order/${orderData.orderId}`);
        return;
      }

      // Open Razorpay
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Kaash — The Book",
        description: "Kaash — You Could Love Me Someday by Aashray",
        order_id: orderData.razorpayOrderId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async (response: any) => {
          // Verify payment
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderData.orderId,
            }),
          });

          if (verifyRes.ok) {
            clearCart();
            router.push(`/order/${orderData.orderId}`);
          } else {
            setError("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: data.fullName,
          email: data.email,
          contact: data.phone,
        },
        theme: { color: "#C84B11" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="section-padding" style={{ background: "var(--ink)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontStyle: "italic", color: "var(--parchment)", marginBottom: "1rem" }}>Your cart is empty</p>
          <a href="/" className="btn btn-primary">← Back to Book</a>
        </div>
      </main>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <main className="section-padding" style={{ background: "var(--ink)", minHeight: "100vh" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <a href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--saffron)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}>← Back</a>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontStyle: "italic", color: "var(--parchment)", margin: "2rem 0" }}>Checkout</h1>

          {/* Order summary */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "2rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "1rem" }}>Order Summary</p>
            {items.map((item) => (
              <div key={item.title} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--parchment)" }}>{item.title} × {item.qty}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--saffron)" }}>₹{(item.price * item.qty / 100).toFixed(0)}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: "1rem", paddingTop: "1rem", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--parchment)", fontWeight: 600 }}>Total</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--saffron)" }}>₹{(orderTotal / 100).toFixed(0)}</span>
            </div>
          </div>

          {/* Shipping form */}
          <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--saffron)", marginBottom: "1.5rem" }}>Shipping Details</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label className="form-label">Full Name</label>
                <input {...register("fullName")} className="form-input" placeholder="Your full name" />
                {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="form-label">Email</label>
                <input {...register("email")} type="email" className="form-input" placeholder="you@example.com" />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label className="form-label">Phone</label>
              <input {...register("phone")} className="form-input" placeholder="+91 XXXXX XXXXX" />
              {errors.phone && <p className="form-error">{errors.phone.message}</p>}
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label className="form-label">Address Line 1</label>
              <input {...register("addressLine1")} className="form-input" placeholder="House/Flat No., Street" />
              {errors.addressLine1 && <p className="form-error">{errors.addressLine1.message}</p>}
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label className="form-label">Address Line 2 (Optional)</label>
              <input {...register("addressLine2")} className="form-input" placeholder="Landmark, Area" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label className="form-label">City</label>
                <input {...register("city")} className="form-input" placeholder="City" />
                {errors.city && <p className="form-error">{errors.city.message}</p>}
              </div>
              <div>
                <label className="form-label">State</label>
                <input {...register("state")} className="form-input" placeholder="State" />
                {errors.state && <p className="form-error">{errors.state.message}</p>}
              </div>
              <div>
                <label className="form-label">PIN Code</label>
                <input {...register("pin")} className="form-input" placeholder="XXXXXX" />
                {errors.pin && <p className="form-error">{errors.pin.message}</p>}
              </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label className="form-label">Delivery Notes (Optional)</label>
              <textarea {...register("notes")} className="form-input" rows={3} placeholder="Any special instructions..." />
            </div>

            {error && (
              <div style={{ background: "rgba(232, 93, 93, 0.1)", border: "1px solid rgba(232, 93, 93, 0.3)", borderRadius: "var(--radius-md)", padding: "1rem", marginBottom: "1rem" }}>
                <p className="form-error" style={{ margin: 0 }}>{error}</p>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: "100%" }}>
              {loading ? "Processing..." : `Pay ₹${(orderTotal / 100).toFixed(0)} — Secure Checkout`}
            </button>
          </motion.form>
        </div>
      </main>
    </>
  );
}
