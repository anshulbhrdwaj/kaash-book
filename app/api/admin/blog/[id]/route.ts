import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// PUT /api/admin/blog/[id] — Update a post
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, published, featured, tags, author, readingTime } = body;

    // Check slug uniqueness if slug changed
    if (slug) {
      const existing = await prisma.blogPost.findFirst({
        where: { slug, NOT: { id } },
      });
      if (existing) {
        return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(excerpt && { excerpt }),
        ...(content && { content }),
        ...(coverImage !== undefined && { coverImage: coverImage || null }),
        ...(published !== undefined && { published }),
        ...(featured !== undefined && { featured }),
        ...(tags && { tags }),
        ...(author && { author }),
        ...(readingTime && { readingTime }),
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Admin blog update error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/admin/blog/[id] — Delete a post
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin blog delete error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
