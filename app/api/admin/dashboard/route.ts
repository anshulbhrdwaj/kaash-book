import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const [totalOrders, revenue, pendingShipments, subscribers, recentOrders] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] } } }),
      prisma.order.count({ where: { status: { in: ["PAID", "PROCESSING"] } } }),
      prisma.subscriber.count(),
      prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    ]);

    return NextResponse.json({
      totalOrders,
      revenue: revenue._sum.total || 0,
      pendingShipments,
      subscribers,
      recentOrders,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ totalOrders: 0, revenue: 0, pendingShipments: 0, subscribers: 0, recentOrders: [] });
  }
}
