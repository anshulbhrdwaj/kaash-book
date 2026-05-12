import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export const metadata: Metadata = {
  title: "Kaash — You Could Love Me Someday | A Novel by Aashray",
  description:
    "Some love stories aren't about who stayed or who left. Kaash is a coming-of-age Indian love story about growth, loss, and the kind of love that changes you forever. Buy the book now.",
  keywords: [
    "Kaash",
    "You Could Love Me Someday",
    "Aashray",
    "Indian romance novel",
    "coming of age book",
    "Astitva Prakashan",
    "Rajasthan love story",
    "Prisha Anvay",
    "Hindi romance English",
    "new Indian fiction 2025",
  ],
  openGraph: {
    title: "Kaash — You Could Love Me Someday",
    description:
      "A coming-of-age love story about growth, loss, and love that doesn't last forever — but changes you forever.",
    url: "https://kaashthebook.com",
    siteName: "Kaash — The Book",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaash — You Could Love Me Someday",
    description: "A deeply human love story. Order your copy today.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Kaash — You Could Love Me Someday",
    author: { "@type": "Person", name: "Aashray" },
    publisher: { "@type": "Organization", name: "Astitva Prakashan" },
    genre: "Romance / Coming-of-Age Fiction",
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "399",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=DM+Serif+Text:ital@0;1&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <GrainOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
