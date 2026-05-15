"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
  { href: "/admin/reviews", label: "Reviews", icon: "⭐" },
  { href: "/admin/blog", label: "Blog", icon: "📝" },
  { href: "/admin/subscribers", label: "Subscribers", icon: "📧" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="admin-hamburger"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileOpen ? "admin-sidebar--open" : ""}`}>
        {/* Close button - mobile only */}
        <button
          className="admin-sidebar-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        >
          ✕
        </button>

        <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
          <Link href="/admin" style={{ textDecoration: "none" }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                fontStyle: "italic",
                color: "var(--parchment)",
              }}
            >
              Kaash
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Admin
            </p>
          </Link>
        </div>

        <nav style={{ display: "flex", flexDirection: "column" }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${
                pathname === item.href ? "active" : ""
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: "auto", padding: "2rem 1.5rem" }}>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>

        <div
          style={{
            padding: "1rem 1.5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            ← View Site
          </Link>
        </div>
      </aside>
    </>
  );
}
