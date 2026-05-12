"use client";

import { useEffect, useState } from "react";

interface DashboardStats {
  totalOrders: number;
  revenue: number;
  pendingShipments: number;
  subscribers: number;
  recentOrders: Array<{
    id: string;
    customerName: string;
    email: string;
    status: string;
    total: number;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontStyle: "italic", color: "var(--parchment)", marginBottom: "2rem" }}>Dashboard</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "1rem" }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton" style={{ height: "120px" }} />
          ))}
        </div>
      </div>
    );
  }

  const data = stats || { totalOrders: 0, revenue: 0, pendingShipments: 0, subscribers: 0, recentOrders: [] };

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontStyle: "italic", color: "var(--parchment)", marginBottom: "2rem" }}>Dashboard</h1>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "1rem", marginBottom: "3rem" }}>
        {[
          { label: "Total Orders", value: data.totalOrders, color: "var(--saffron)" },
          { label: "Revenue", value: `₹${(data.revenue / 100).toLocaleString()}`, color: "var(--gold)" },
          { label: "Pending Shipments", value: data.pendingShipments, color: "var(--dusk)" },
          { label: "Subscribers", value: data.subscribers, color: "var(--teal)" },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "0.5rem" }}>{stat.label}</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontStyle: "italic", color: "var(--parchment)", marginBottom: "1rem" }}>Recent Orders</h2>
      <div style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.recentOrders.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--muted)" }}>No orders yet</td></tr>
            ) : (
              data.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>{order.id.slice(0, 8)}...</td>
                  <td>{order.customerName}</td>
                  <td>{order.email}</td>
                  <td><span className={`badge badge-${order.status.toLowerCase()}`}>{order.status}</span></td>
                  <td style={{ color: "var(--saffron)" }}>₹{(order.total / 100).toFixed(0)}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
