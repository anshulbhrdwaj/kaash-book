"use client";

import { useEffect, useState, useCallback } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({ bookPrice: 39900, mrp: 45000, stockEnabled: true, launchOfferActive: true, announcementBar: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSettings = useCallback(async () => {
    const res = await fetch("/api/admin/settings");
    const data = await res.json();
    if (data) setSettings(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const saveSettings = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="skeleton" style={{ height: "400px" }} />;

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontStyle: "italic", color: "var(--parchment)", marginBottom: "2rem" }}>Site Settings</h1>

      <div className="admin-card">
        <div style={{ marginBottom: "1.5rem" }}>
          <label className="form-label">Book Price (in paise, e.g. 39900 = ₹399)</label>
          <input type="number" value={settings.bookPrice} onChange={(e) => setSettings({ ...settings, bookPrice: parseInt(e.target.value) })} className="form-input" />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label className="form-label">MRP (in paise)</label>
          <input type="number" value={settings.mrp} onChange={(e) => setSettings({ ...settings, mrp: parseInt(e.target.value) })} className="form-input" />
        </div>

        <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <label style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--fg)" }}>
            <input type="checkbox" checked={settings.launchOfferActive} onChange={(e) => setSettings({ ...settings, launchOfferActive: e.target.checked })} style={{ marginRight: "0.5rem" }} />
            Launch Offer Active
          </label>
        </div>

        <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <label style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--fg)" }}>
            <input type="checkbox" checked={settings.stockEnabled} onChange={(e) => setSettings({ ...settings, stockEnabled: e.target.checked })} style={{ marginRight: "0.5rem" }} />
            Stock Available (unchecked = shows &ldquo;Temporarily Unavailable&rdquo;)
          </label>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label className="form-label">Announcement Bar Text (leave empty to hide)</label>
          <input value={settings.announcementBar || ""} onChange={(e) => setSettings({ ...settings, announcementBar: e.target.value })} className="form-input" placeholder="🎉 Launch Offer: Get Kaash at ₹399..." />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={saveSettings} className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save Settings"}</button>
          {saved && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--teal)" }}>✓ Saved</span>}
        </div>
      </div>
    </div>
  );
}
