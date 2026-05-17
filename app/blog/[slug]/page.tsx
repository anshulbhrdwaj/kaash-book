import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";

export const revalidate = 1800;

// Fallback content for demo
const fallbackPosts: Record<string, { title: string; excerpt: string; content: string; tags: string[]; author: string; readingTime: number; createdAt: Date }> = {
  "why-i-wrote-kaash": {
    title: "Why I Wrote Kaash",
    excerpt: "Every book begins with a feeling you can't shake.",
    content: `Every book begins with a feeling you can't shake. Kaash started with the ache of unspoken words — the kind that sit heavy in your chest long after the person is gone.

I didn't set out to write a love story. I set out to understand one. My own. Or maybe not even mine — but the version of it that lives in everyone who has ever loved someone they couldn't keep.

## The Seed

It started with a single scene in my head: two people sitting in an empty classroom, saying nothing, yet somehow saying everything. That image haunted me for months before I finally sat down and gave those two people names.

Prisha. Anvay. They weren't meant to be perfect. They were meant to be painfully, beautifully, devastatingly **human**.

## The Process

Writing Kaash was not a linear experience. I wrote the ending first. Then the middle. Then I rewrote the ending three more times because the characters kept surprising me — the way real people do.

> "The best stories aren't written. They're discovered. You just have to be brave enough to follow where the characters lead."

Some days the words came like water. Other days, I sat with a blank page and nothing but the weight of what I was trying to say. But even on those days, I knew this story needed to exist.

## Why It Matters

Because we don't talk about the loves that don't work out — not honestly, not without bitterness. Kaash is my attempt at telling a love story with honesty. With tenderness. With the understanding that sometimes the most transformative relationships are the ones that don't last forever.

If you've ever loved someone and lost them — not to tragedy, but to life, to timing, to the quiet inevitability of growing apart — this book is for you.`,
    tags: ["behind-the-scenes", "writing"],
    author: "Aashray",
    readingTime: 6,
    createdAt: new Date("2025-04-10"),
  },
  "the-city-that-shaped-the-story": {
    title: "The City That Shaped the Story",
    excerpt: "Jaipur isn't just a setting in Kaash — it's a character.",
    content: `Jaipur isn't just a setting in Kaash — it's a character. The pink walls, the evening light, the way old streets hold memories like cupped hands.

## Why Jaipur

I chose Jaipur because it's a city of contradictions — ancient yet alive, quiet yet pulsing with energy. It's the kind of place where the past and present exist simultaneously, and that duality mirrors the story of Prisha and Anvay perfectly.

The Hawa Mahal at sunset. The narrow lanes of the old city. The university campus where everything begins. These aren't just backdrops — they're witnesses to a love story that unfolds in the spaces between classes, in chai stalls, and on rooftops under Rajasthani skies.

## The Sensory World

Writing Kaash meant immersing myself in the sensory world of Jaipur:

- The smell of jasmine garlands in the evening market
- The sound of temple bells mixing with traffic
- The warmth of sandstone walls that have absorbed decades of sunlight
- The way the city turns golden at dusk, as if the light itself is nostalgic

Every detail in the book is drawn from real moments — real places I've walked through, real conversations I've overheard, real feelings I've felt standing on the edge of something beautiful and knowing it won't last.`,
    tags: ["rajasthan", "inspiration"],
    author: "Aashray",
    readingTime: 5,
    createdAt: new Date("2025-04-20"),
  },
  "on-writing-silence-into-love-stories": {
    title: "On Writing Silence Into Love Stories",
    excerpt: "The most powerful moments in love aren't declarations — they're pauses.",
    content: `The most powerful moments in love aren't declarations — they're pauses. The unfinished sentences. The look that says everything a voice cannot.

## The Art of What's Left Unsaid

In Kaash, silence is a language. Prisha speaks it fluently — she carries entire conversations in the spaces between her words. Anvay, on the other hand, fills silence with noise because the quiet terrifies him.

Their dynamic isn't built on grand romantic gestures. It's built on:

- A hand that almost reaches out but doesn't
- A text drafted and deleted
- A name whispered to an empty room
- Eyes that meet across a crowded place and hold just a beat too long

## Why Silence Matters

Modern love stories are often loud. They're full of declarations, dramatic revelations, and climactic confessions. And while those have their place, I believe the **real** texture of love lives in the quiet moments.

> "The silence between two people who understand each other is different from the silence between two people who don't. One is peace. The other is war."

In writing Kaash, I wanted to honor that distinction. To show that sometimes, not saying "I love you" is the most loving thing a person can do.`,
    tags: ["craft", "writing"],
    author: "Aashray",
    readingTime: 4,
    createdAt: new Date("2025-05-01"),
  },
};

async function getPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (post && post.published) return post;
    // Try fallback
    if (fallbackPosts[slug]) return { slug, ...fallbackPosts[slug], id: slug, coverImage: null, published: true, featured: false, updatedAt: fallbackPosts[slug].createdAt };
    return null;
  } catch {
    if (fallbackPosts[slug]) return { slug, ...fallbackPosts[slug], id: slug, coverImage: null, published: true, featured: false, updatedAt: fallbackPosts[slug].createdAt };
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Kaash Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author],
      tags: post.tags,
      ...(post.coverImage && {
        images: [{ url: post.coverImage }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.coverImage && {
        images: [post.coverImage],
      }),
    },
  };
}

// Simple markdown-to-HTML renderer
function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const html: string[] = [];
  let inList = false;
  let listType = "";

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      if (inList) { html.push(`</${listType}>`); inList = false; }
      html.push(`<h2>${trimmed.slice(3)}</h2>`);
    } else if (trimmed.startsWith("### ")) {
      if (inList) { html.push(`</${listType}>`); inList = false; }
      html.push(`<h3>${trimmed.slice(4)}</h3>`);
    } else if (trimmed.startsWith("> ")) {
      if (inList) { html.push(`</${listType}>`); inList = false; }
      html.push(`<blockquote><p>${formatInline(trimmed.slice(2))}</p></blockquote>`);
    } else if (trimmed.startsWith("- ")) {
      if (!inList || listType !== "ul") {
        if (inList) html.push(`</${listType}>`);
        html.push("<ul>");
        inList = true;
        listType = "ul";
      }
      html.push(`<li>${formatInline(trimmed.slice(2))}</li>`);
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (!inList || listType !== "ol") {
        if (inList) html.push(`</${listType}>`);
        html.push("<ol>");
        inList = true;
        listType = "ol";
      }
      html.push(`<li>${formatInline(trimmed.replace(/^\d+\.\s/, ""))}</li>`);
    } else if (trimmed === "") {
      if (inList) { html.push(`</${listType}>`); inList = false; }
    } else {
      if (inList) { html.push(`</${listType}>`); inList = false; }
      html.push(`<p>${formatInline(trimmed)}</p>`);
    }
  }

  if (inList) html.push(`</${listType}>`);
  return html.join("\n");
}

function formatInline(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <>
      <main
        className="section-padding"
        style={{ background: "var(--ink)", minHeight: "100vh" }}
      >
        <div className="container container-narrow">
          {/* Back link */}
          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--saffron)",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "inline-block",
              marginBottom: "3rem",
            }}
          >
            ← All Posts
          </Link>

          {/* Header */}
          <div className="blog-post-header">
            <div className="blog-card-tags" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
              {post.tags.map((tag: string) => (
                <span key={tag} className="blog-tag">{tag}</span>
              ))}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-4xl)",
                fontStyle: "italic",
                color: "var(--parchment)",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              {post.title}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                flexWrap: "wrap",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              <span>By {post.author}</span>
              <span>{formatDate(post.createdAt)}</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Cover */}
          {post.coverImage && (
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                marginBottom: "3rem",
              }}
            >
              <img
                src={post.coverImage}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Content */}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* CTA */}
          <div
            style={{
              textAlign: "center",
              marginTop: "5rem",
              padding: "3rem",
              background: "var(--surface)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-2xl)",
                fontStyle: "italic",
                color: "var(--parchment)",
                marginBottom: "1rem",
              }}
            >
              Read the story that started it all
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                color: "var(--muted)",
                marginBottom: "2rem",
              }}
            >
              Kaash — You Could Love Me Someday
            </p>
            <Link href="/#buy" className="btn btn-primary btn-lg">
              Buy the Book — ₹399
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
