"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  featured: boolean;
  tags: string[];
  author: string;
  readingTime: number;
  createdAt: string;
}

const emptyPost: Omit<BlogPost, "id" | "createdAt"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: null,
  published: false,
  featured: false,
  tags: [],
  author: "Aashray",
  readingTime: 5,
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyPost);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch {
      console.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const openCreate = () => {
    setForm(emptyPost);
    setTagsInput("");
    setCreating(true);
    setEditing(null);
    setError("");
  };

  const openEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      published: post.published,
      featured: post.featured,
      tags: post.tags,
      author: post.author,
      readingTime: post.readingTime,
    });
    setTagsInput(post.tags.join(", "));
    setEditing(post);
    setCreating(false);
    setError("");
  };

  const closeEditor = () => {
    setEditing(null);
    setCreating(false);
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = { ...form, tags };

    try {
      let res;
      if (editing) {
        res = await fetch(`/api/admin/blog/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        await fetchPosts();
        closeEditor();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save");
      }
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch {
      console.error("Delete failed");
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      if (res.ok) {
        setPosts(
          posts.map((p) =>
            p.id === post.id ? { ...p, published: !p.published } : p
          )
        );
      }
    } catch {
      console.error("Toggle failed");
    }
  };

  const isEditorOpen = editing || creating;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              fontStyle: "italic",
              color: "var(--parchment)",
            }}
          >
            Blog Posts
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--muted)",
              marginTop: "0.25rem",
            }}
          >
            {posts.length} posts · {posts.filter((p) => p.published).length}{" "}
            published
          </p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          + New Post
        </button>
      </div>

      {/* Posts Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
            Loading...
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            background: "var(--surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              fontStyle: "italic",
              color: "var(--parchment)",
              marginBottom: "0.5rem",
            }}
          >
            No blog posts yet
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              color: "var(--muted)",
              marginBottom: "1.5rem",
            }}
          >
            Create your first post to start sharing stories
          </p>
          <button className="btn btn-primary" onClick={openCreate}>
            Create First Post
          </button>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Tags</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontStyle: "italic",
                          fontSize: "var(--text-base)",
                          color: "var(--parchment)",
                        }}
                      >
                        {post.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-xs)",
                          color: "var(--muted)",
                          marginTop: "0.2rem",
                        }}
                      >
                        /blog/{post.slug}
                      </p>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        post.published ? "badge-delivered" : "badge-pending"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    {post.featured && (
                      <span
                        className="badge badge-paid"
                        style={{ marginLeft: "0.5rem" }}
                      >
                        Featured
                      </span>
                    )}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.25rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="blog-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {new Date(post.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => openEdit(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => togglePublish(post)}
                        style={{
                          color: post.published
                            ? "var(--gold)"
                            : "var(--teal)",
                        }}
                      >
                        {post.published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleDelete(post.id)}
                        style={{ color: "#E85D5D" }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Drawer */}
      <AnimatePresence>
        {isEditorOpen && (
          <>
            <motion.div
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEditor}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(700px, 95vw)",
                background: "var(--surface)",
                borderLeft: "1px solid var(--border)",
                zIndex: 1001,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Editor Header */}
              <div
                style={{
                  padding: "1.5rem",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-xl)",
                    fontStyle: "italic",
                  }}
                >
                  {editing ? "Edit Post" : "New Post"}
                </h2>
                <button
                  onClick={closeEditor}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--muted)",
                    fontSize: "1.5rem",
                    fontFamily: "var(--font-mono)",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Editor Body */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div>
                  <label className="form-label">Title</label>
                  <input
                    className="form-input"
                    value={form.title}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        title: e.target.value,
                        slug: form.slug || generateSlug(e.target.value),
                      });
                    }}
                    placeholder="Post title"
                  />
                </div>

                <div>
                  <label className="form-label">Slug</label>
                  <input
                    className="form-input"
                    value={form.slug}
                    onChange={(e) =>
                      setForm({ ...form, slug: e.target.value })
                    }
                    placeholder="url-slug"
                  />
                </div>

                <div>
                  <label className="form-label">Excerpt</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    value={form.excerpt}
                    onChange={(e) =>
                      setForm({ ...form, excerpt: e.target.value })
                    }
                    placeholder="Short summary for cards..."
                  />
                </div>

                <div>
                  <label className="form-label">Content (Markdown)</label>
                  <textarea
                    className="form-input"
                    rows={14}
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    placeholder="Write your post in markdown..."
                    style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}
                  />
                </div>

                <div>
                  <label className="form-label">Cover Image URL</label>
                  <input
                    className="form-input"
                    value={form.coverImage || ""}
                    onChange={(e) =>
                      setForm({ ...form, coverImage: e.target.value || null })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="form-label">Tags (comma-separated)</label>
                  <input
                    className="form-input"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="writing, behind-the-scenes, craft"
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label className="form-label">Author</label>
                    <input
                      className="form-input"
                      value={form.author}
                      onChange={(e) =>
                        setForm({ ...form, author: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="form-label">Reading Time (min)</label>
                    <input
                      className="form-input"
                      type="number"
                      value={form.readingTime}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          readingTime: parseInt(e.target.value) || 5,
                        })
                      }
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "2rem" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-sm)",
                      color: "var(--parchment)",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) =>
                        setForm({ ...form, published: e.target.checked })
                      }
                      style={{ accentColor: "var(--saffron)" }}
                    />
                    Published
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-sm)",
                      color: "var(--parchment)",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm({ ...form, featured: e.target.checked })
                      }
                      style={{ accentColor: "var(--gold)" }}
                    />
                    Featured
                  </label>
                </div>

                {error && (
                  <p className="form-error" style={{ margin: 0 }}>
                    {error}
                  </p>
                )}
              </div>

              {/* Editor Footer */}
              <div
                style={{
                  padding: "1.5rem",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  gap: "1rem",
                  flexShrink: 0,
                }}
              >
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={saving || !form.title || !form.slug || !form.excerpt || !form.content}
                  style={{ flex: 1 }}
                >
                  {saving
                    ? "Saving..."
                    : editing
                    ? "Update Post"
                    : "Create Post"}
                </button>
                <button className="btn btn-ghost" onClick={closeEditor}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
