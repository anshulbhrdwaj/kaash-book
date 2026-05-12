import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { OrderConfirmationClient } from "./OrderConfirmationClient";

export default async function OrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  
  let order;
  try {
    order = await prisma.order.findUnique({ where: { id: orderId } });
  } catch {
    // DB not connected fallback
    order = null;
  }

  if (!order) return notFound();

  return <OrderConfirmationClient order={{
    id: order.id,
    customerName: order.customerName,
    email: order.email,
    total: order.total,
    status: order.status,
    items: order.items as Array<{ title: string; qty: number; price: number }>,
    createdAt: order.createdAt.toISOString(),
  }} />;
}
