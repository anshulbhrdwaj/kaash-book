import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Blog — Kaash | Stories, Thoughts & Behind the Pages",
  description:
    "Explore stories, reflections, and behind-the-scenes moments from the world of Kaash — You Could Love Me Someday by Aashray.",
};

export const revalidate = 1800; // ISR: every 30 min

// Fallback posts for when DB is unavailable
const fallbackPosts = [
  {
    id: "1",
    title: "Why I Wrote Kaash",
    slug: "why-i-wrote-kaash",
    excerpt:
      "Every book begins with a feeling you can't shake. Kaash started with the ache of unspoken words — the kind that sit heavy in your chest long after the person is gone.",
    coverImage: null,
    tags: ["behind-the-scenes", "writing"],
    author: "Aashray",
    readingTime: 6,
    createdAt: new Date("2025-04-10"),
    featured: true,
  },
  {
    id: "2",
    title: "The City That Shaped the Story",
    slug: "the-city-that-shaped-the-story",
    excerpt:
      "Jaipur isn't just a setting in Kaash — it's a character. The pink walls, the evening light, the way old streets hold memories like cupped hands.",
    coverImage: null,
    tags: ["rajasthan", "inspiration"],
    author: "Aashray",
    readingTime: 5,
    createdAt: new Date("2025-04-20"),
    featured: false,
  },
  {
    id: "3",
    title: "On Writing Silence Into Love Stories",
    slug: "on-writing-silence-into-love-stories",
    excerpt:
      "The most powerful moments in love aren't declarations — they're pauses. The unfinished sentences. The look that says everything a voice cannot.",
    coverImage: null,
    tags: ["craft", "writing"],
    author: "Aashray",
    readingTime: 4,
    createdAt: new Date("2025-05-01"),
    featured: false,
  },
];

async function getBlogPosts() {
  try {
    const [posts, featuredPost] = await Promise.all([
      prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 12,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          tags: true,
          author: true,
          readingTime: true,
          createdAt: true,
          featured: true,
        },
      }),
      prisma.blogPost.findFirst({
        where: { published: true, featured: true },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          tags: true,
          author: true,
          readingTime: true,
          createdAt: true,
          featured: true,
        },
      }),
    ]);
    return { posts, featuredPost };
  } catch {
    return {
      posts: fallbackPosts,
      featuredPost: fallbackPosts[0],
    };
  }
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const { posts, featuredPost } = await getBlogPosts();
  const regularPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <>
      <main
        className="section-padding"
        style={{ background: "var(--ink)", minHeight: "100vh" }}
      >
        <div className="container">
          {/* Header */}
          <div className="blog-header">
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--saffron)",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                display: "inline-block",
                marginBottom: "2rem",
              }}
            >
              ← Back to Kaash
            </Link>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "var(--saffron)",
                marginBottom: "1rem",
              }}
            >
              The Blog
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-4xl)",
                fontStyle: "italic",
                color: "var(--parchment)",
                marginBottom: "1rem",
              }}
            >
              Stories & Reflections
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-lg)",
                color: "var(--muted)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Behind the pages, between the lines — thoughts on writing, love,
              and the stories that shape us.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="blog-featured"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  background: featuredPost.coverImage
                    ? `url(${featuredPost.coverImage}) center/cover`
                    : `radial-gradient(ellipse at 30% 40%, rgba(232, 135, 58, 0.3), transparent 60%),
                       radial-gradient(ellipse at 70% 60%, rgba(123, 79, 142, 0.2), transparent 50%),
                       var(--surface-hover)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "250px",
                }}
              >
                {!featuredPost.coverImage && (
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "4rem",
                      fontStyle: "italic",
                      color: "var(--parchment)",
                      opacity: 0.06,
                    }}
                  >
                    Kaash
                  </p>
                )}
              </div>
              <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div className="blog-card-tags">
                  <span className="blog-tag">Featured</span>
                  {featuredPost.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-2xl)",
                    fontStyle: "italic",
                    color: "var(--parchment)",
                    marginBottom: "1rem",
                    lineHeight: 1.3,
                  }}
                >
                  {featuredPost.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-base)",
                    color: "var(--muted)",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                  }}
                >
                  {featuredPost.excerpt}
                </p>
                <div className="blog-card-meta">
                  <span>{formatDate(featuredPost.createdAt)}</span>
                  <span>{featuredPost.readingTime} min read</span>
                </div>
              </div>
            </Link>
          )}

          {/* Post Grid */}
          {regularPosts.length > 0 && (
            <div className="blog-grid">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="blog-card"
                >
                  <div className="blog-card-cover">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} />
                    ) : (
                      <div className="blog-card-placeholder">
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "2rem",
                            fontStyle: "italic",
                            color: "var(--parchment)",
                            opacity: 0.06,
                          }}
                        >
                          Kaash
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-tags">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="blog-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-meta">
                      <span>{formatDate(post.createdAt)}</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
