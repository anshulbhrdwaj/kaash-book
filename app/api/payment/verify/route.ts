import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/resend";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await req.json();

    // Server-side signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Update order status
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "PAID",
        paymentId: razorpay_payment_id,
      },
    });

    // Send confirmation email
    try {
      await sendOrderConfirmation(order.email, order.customerName, order.id, order.total);
    } catch (emailError) {
      console.error("Email send error:", emailError);
      // Don't fail the payment verification if email fails
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
