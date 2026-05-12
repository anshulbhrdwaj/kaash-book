"use client";

import { useEffect, useState, useCallback } from "react";

interface Subscriber { id: string; email: string; source: string; createdAt: string; }

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const fetchSubscribers = useCallback(async () => {
    const res = await fetch("/api/admin/subscribers");
    const data = await res.json();
    setSubscribers(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const selectAll = () => {
    if (selected.size === subscribers.length) setSelected(new Set());
    else setSelected(new Set(subscribers.map((s) => s.id)));
  };

  const bulkDelete = async () => {
    if (!confirm(`Delete ${selected.size} subscribers?`)) return;
    await fetch("/api/admin/subscribers", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids: Array.from(selected) }) });
    setSelected(new Set());
    fetchSubscribers();
  };

  const exportCSV = () => {
    const csv = ["Email,Source,Date", ...subscribers.map((s) => `${s.email},${s.source},${new Date(s.createdAt).toLocaleDateString()}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "subscribers.csv"; a.click();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontStyle: "italic", color: "var(--parchment)" }}>Subscribers ({subscribers.length})</h1>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {selected.size > 0 && <button onClick={bulkDelete} className="btn btn-ghost btn-sm" style={{ color: "#EF4444" }}>Delete ({selected.size})</button>}
          <button onClick={exportCSV} className="btn btn-ghost btn-sm">Export CSV</button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead><tr><th><input type="checkbox" checked={selected.size === subscribers.length && subscribers.length > 0} onChange={selectAll} /></th><th>Email</th><th>Source</th><th>Date</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ textAlign: "center", padding: "2rem" }}>Loading...</td></tr>
            ) : subscribers.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: "center", padding: "2rem", color: "var(--muted)" }}>No subscribers yet</td></tr>
            ) : subscribers.map((s) => (
              <tr key={s.id}>
                <td><input type="checkbox" checked={selected.has(s.id)} onChange={() => toggleSelect(s.id)} /></td>
                <td>{s.email}</td>
                <td><span className="badge badge-paid">{s.source}</span></td>
                <td>{new Date(s.createdAt).toLocaleDateString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
