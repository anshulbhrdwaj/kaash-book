import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(
  email: string,
  customerName: string,
  orderId: string,
  total: number
) {
  const formattedTotal = `₹${(total / 100).toFixed(0)}`;

  await resend.emails.send({
    from: process.env.FROM_EMAIL || "orders@kaashthebook.com",
    to: email,
    subject: `Order Confirmed — Kaash by Aashray 🌙`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0D0A07; color: #F5ECD7; padding: 40px;">
        <h1 style="font-size: 28px; color: #E8873A; margin-bottom: 8px;">Thank you, ${customerName}!</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #F5ECD7cc;">
          Your order for <strong>Kaash — You Could Love Me Someday</strong> has been confirmed.
        </p>
        <div style="border-top: 1px solid #E8873A33; margin: 24px 0; padding-top: 24px;">
          <p style="margin: 4px 0; color: #F5ECD7aa;"><strong>Order ID:</strong> ${orderId}</p>
          <p style="margin: 4px 0; color: #F5ECD7aa;"><strong>Total:</strong> ${formattedTotal}</p>
          <p style="margin: 4px 0; color: #F5ECD7aa;"><strong>Estimated Delivery:</strong> 3–5 business days</p>
        </div>
        <p style="font-size: 14px; color: #F5ECD7aa; margin-top: 32px;">
          We'll send you tracking details once your book ships. Until then, may your story begin. 🌙
        </p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E8873A22; font-size: 12px; color: #F5ECD766;">
          <p>Kaash — The Book | Published by Astitva Prakashan</p>
        </div>
      </div>
    `,
  });
}
