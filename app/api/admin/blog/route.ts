import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/admin/blog — List all posts (including drafts)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Admin blog fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST /api/admin/blog — Create a new post
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, published, featured, tags, author, readingTime } = body;

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: coverImage || null,
        published: published ?? false,
        featured: featured ?? false,
        tags: tags || [],
        author: author || "Aashray",
        readingTime: readingTime || Math.ceil(content.split(/\s+/).length / 200),
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Admin blog create error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
