"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
  { href: "/admin/reviews", label: "Reviews", icon: "⭐" },
  { href: "/admin/subscribers", label: "Subscribers", icon: "📧" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
        <Link href="/admin" style={{ textDecoration: "none" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontStyle: "italic", color: "var(--parchment)" }}>Kaash</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Admin</p>
        </Link>
      </div>

      <nav style={{ display: "flex", flexDirection: "column" }}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`admin-nav-item ${pathname === item.href ? "active" : ""}`}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div style={{ marginTop: "auto", padding: "2rem 1.5rem" }}>
        <button onClick={() => signOut({ callbackUrl: "/admin/login" })} style={{ background: "none", border: "none", color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer" }}>
          Sign Out
        </button>
      </div>

      <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)" }}>
        <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--muted)", textDecoration: "none" }}>← View Site</Link>
      </div>
    </aside>
  );
}
