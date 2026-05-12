import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Check if we have valid Razorpay credentials
const hasRazorpay = process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.includes("xxxxx");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, email, phone, address, items, total } = body;

    let order;
    let razorpayOrderId: string | null = null;

    // Try to create order in DB
    try {
      order = await prisma.order.create({
        data: {
          customerName,
          email,
          phone,
          address,
          items,
          total,
          status: "PENDING",
        },
      });
    } catch (dbError) {
      console.warn("DB not available, using demo order ID:", dbError instanceof Error ? dbError.message : dbError);
      // Generate a demo order ID when DB is unavailable
      order = {
        id: `demo_${crypto.randomBytes(8).toString("hex")}`,
        customerName,
        email,
        phone,
        address,
        items,
        total,
        status: "PENDING",
      };
    }

    // Try Razorpay if credentials exist
    if (hasRazorpay) {
      try {
        const { razorpay } = await import("@/lib/razorpay");
        const razorpayOrder = await razorpay.orders.create({
          amount: total,
          currency: "INR",
          receipt: order.id,
          notes: { orderId: order.id, customerName, email },
        });
        razorpayOrderId = razorpayOrder.id;

        // Update DB order with razorpay ID if DB is available
        try {
          await prisma.order.update({
            where: { id: order.id },
            data: { razorpayId: razorpayOrderId },
          });
        } catch {
          // DB unavailable, skip update
        }
      } catch (rzpError) {
        console.warn("Razorpay error:", rzpError instanceof Error ? rzpError.message : rzpError);
      }
    }

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrderId,
      amount: total,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
      demoMode: !razorpayOrderId,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
