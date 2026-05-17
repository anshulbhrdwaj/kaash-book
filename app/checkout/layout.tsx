import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — Kaash by Aashray",
  description: "Secure checkout for Kaash — You Could Love Me Someday.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
