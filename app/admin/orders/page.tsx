"use client";

import { useEffect, useState, useCallback } from "react";

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  status: string;
  total: number;
  items: Array<{ title: string; qty: number; price: number; format: string }>;
  address: { line1: string; line2: string; city: string; state: string; pin: string; notes: string };
  razorpayId: string;
  trackingId: string | null;
  createdAt: string;
}

const statuses = ["ALL", "PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: page.toString() });
    if (status !== "ALL") params.set("status", status);
    if (search) params.set("search", search);

    const res = await fetch(`/api/admin/orders?${params}`);
    const data = await res.json();
    setOrders(data.orders || []);
    setTotal(data.total || 0);
    setPages(data.pages || 1);
    setLoading(false);
  }, [page, status, search]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateOrder = async (orderId: string, updates: Record<string, string>) => {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, ...updates }),
    });
    fetchOrders();
  };

  const exportCSV = () => {
    const csv = [
      "ID,Name,Email,Phone,Status,Total,Date",
      ...orders.map((o) => `${o.id},${o.customerName},${o.email},${o.phone},${o.status},${(o.total / 100).toFixed(0)},${new Date(o.createdAt).toLocaleDateString()}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontStyle: "italic", color: "var(--parchment)" }}>Orders ({total})</h1>
        <button onClick={exportCSV} className="btn btn-ghost btn-sm">Export CSV</button>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="form-input" style={{ maxWidth: "200px" }}>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="form-input" placeholder="Search by name or email..." style={{ maxWidth: "300px" }} />
        <button onClick={() => { setPage(1); fetchOrders(); }} className="btn btn-primary btn-sm">Search</button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Status</th><th>Total</th><th>Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>Loading...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "var(--muted)" }}>No orders found</td></tr>
            ) : orders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>{order.id.slice(0, 8)}...</td>
                <td>{order.customerName}</td>
                <td>{order.email}</td>
                <td>
                  <select value={order.status} onChange={(e) => updateOrder(order.id, { status: e.target.value })} style={{ background: "transparent", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--fg)", padding: "0.25rem 0.5rem", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>
                    {statuses.filter((s) => s !== "ALL").map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ color: "var(--saffron)" }}>₹{(order.total / 100).toFixed(0)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                <td>
                  <button onClick={() => setSelectedOrder(order)} className="btn btn-ghost btn-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          <button onClick={() => setPage(Math.max(1, page - 1))} className="btn btn-ghost btn-sm" disabled={page <= 1}>Prev</button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--muted)", padding: "0.5rem" }}>{page} / {pages}</span>
          <button onClick={() => setPage(Math.min(pages, page + 1))} className="btn btn-ghost btn-sm" disabled={page >= pages}>Next</button>
        </div>
      )}

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="cart-overlay" onClick={() => setSelectedOrder(null)} style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "2rem", maxWidth: "600px", width: "90%", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontStyle: "italic", color: "var(--parchment)" }}>Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: "1.2rem" }}>✕</button>
            </div>
            <div className="admin-form-grid-2" style={{ marginBottom: "1rem" }}>
              <div><p className="form-label">Order ID</p><p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", wordBreak: "break-all" }}>{selectedOrder.id}</p></div>
              <div><p className="form-label">Razorpay ID</p><p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>{selectedOrder.razorpayId || "—"}</p></div>
              <div><p className="form-label">Name</p><p>{selectedOrder.customerName}</p></div>
              <div><p className="form-label">Email</p><p>{selectedOrder.email}</p></div>
              <div><p className="form-label">Phone</p><p>{selectedOrder.phone}</p></div>
              <div><p className="form-label">Total</p><p style={{ color: "var(--saffron)", fontFamily: "var(--font-display)", fontSize: "var(--text-lg)" }}>₹{(selectedOrder.total / 100).toFixed(0)}</p></div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <p className="form-label">Address</p>
              <p style={{ fontSize: "var(--text-sm)" }}>{selectedOrder.address?.line1}, {selectedOrder.address?.line2}<br />{selectedOrder.address?.city}, {selectedOrder.address?.state} - {selectedOrder.address?.pin}</p>
              {selectedOrder.address?.notes && <p style={{ fontSize: "var(--text-xs)", color: "var(--muted)", marginTop: "0.25rem" }}>Notes: {selectedOrder.address.notes}</p>}
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <p className="form-label">Tracking ID</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input id="trackingInput" defaultValue={selectedOrder.trackingId || ""} className="form-input" placeholder="Enter tracking ID" />
                <button onClick={() => { const input = document.getElementById("trackingInput") as HTMLInputElement; updateOrder(selectedOrder.id, { trackingId: input.value }); setSelectedOrder(null); }} className="btn btn-primary btn-sm">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
