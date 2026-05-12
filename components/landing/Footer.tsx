export function Footer() {
  return (
    <footer style={{ background: "var(--ink)", borderTop: "1px solid var(--border)", padding: "3rem 0" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontStyle: "italic", color: "var(--parchment)" }}>Kaash</p>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
          {["About", "Privacy", "Refund Policy", "Contact"].map((link) => (
            <a key={link} href="#" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--muted)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}>{link}</a>
          ))}
        </div>
        <a href="https://instagram.com/Aashray.y" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg>
        </a>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--muted)" }}>© 2025 Kaash — The Book. All rights reserved.</p>
      </div>
    </footer>
  );
}
