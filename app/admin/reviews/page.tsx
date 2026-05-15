"use client";

import { useEffect, useState, useCallback } from "react";

interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  approved: boolean;
  featured: boolean;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", city: "", rating: 5, text: "" });

  const fetchReviews = useCallback(async () => {
    const res = await fetch("/api/admin/reviews");
    const data = await res.json();
    setReviews(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const toggleApproval = async (id: string, approved: boolean) => {
    await fetch("/api/admin/reviews", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, approved }) });
    fetchReviews();
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    await fetch("/api/admin/reviews", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, featured }) });
    fetchReviews();
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await fetch("/api/admin/reviews", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    fetchReviews();
  };

  const addReview = async () => {
    await fetch("/api/admin/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, approved: true }) });
    setForm({ name: "", city: "", rating: 5, text: "" });
    setShowAdd(false);
    fetchReviews();
  };

  const featuredCount = reviews.filter((r) => r.featured).length;

  return (
    <div>
      <div className="admin-page-header">
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontStyle: "italic", color: "var(--parchment)" }}>Reviews ({reviews.length})</h1>
        <button onClick={() => setShowAdd(!showAdd)} className="btn btn-primary btn-sm">{showAdd ? "Cancel" : "Add Review"}</button>
      </div>

      {showAdd && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "2rem" }}>
          <div className="admin-form-grid-3" style={{ marginBottom: "1rem" }}>
            <div><label className="form-label">Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input" /></div>
            <div><label className="form-label">City</label><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="form-input" /></div>
            <div><label className="form-label">Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} className="form-input" /></div>
          </div>
          <div style={{ marginBottom: "1rem" }}><label className="form-label">Review Text</label><textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className="form-input" rows={3} /></div>
          <button onClick={addReview} className="btn btn-primary btn-sm">Add Review</button>
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>City</th><th>Rating</th><th>Text</th><th>Approved</th><th>Featured</th><th>Actions</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>Loading...</td></tr>
            ) : reviews.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.city}</td>
                <td>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</td>
                <td style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.text}</td>
                <td>
                  <button onClick={() => toggleApproval(r.id, !r.approved)} className={`btn btn-sm ${r.approved ? "btn-primary" : "btn-ghost"}`}>
                    {r.approved ? "Yes" : "No"}
                  </button>
                </td>
                <td>
                  <button onClick={() => toggleFeatured(r.id, !r.featured)} className={`btn btn-sm ${r.featured ? "btn-primary" : "btn-ghost"}`} disabled={!r.featured && featuredCount >= 3}>
                    {r.featured ? "Yes" : "No"}
                  </button>
                </td>
                <td><button onClick={() => deleteReview(r.id)} className="btn btn-ghost btn-sm" style={{ color: "#EF4444" }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
