import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/blog/[slug] — Public: get single published post
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post || !post.published) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Blog post fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
