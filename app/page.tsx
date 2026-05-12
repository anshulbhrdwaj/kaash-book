import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/landing/Hero";
import { TheFeeling } from "@/components/landing/TheFeeling";
import { Characters } from "@/components/landing/Characters";
import { ChapterGlimpse } from "@/components/landing/ChapterGlimpse";
import { Reviews } from "@/components/landing/Reviews";
import { BuySection } from "@/components/landing/BuySection";
import { AboutAuthor } from "@/components/landing/AboutAuthor";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { AnnouncementBar } from "@/components/ui/AnnouncementBar";

export const revalidate = 3600; // ISR: revalidate every hour

async function getPageData() {
  try {
    const [reviews, settings] = await Promise.all([
      prisma.review.findMany({
        where: { approved: true, featured: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
    ]);
    return { reviews, settings };
  } catch {
    // Fallback when DB is not connected
    return {
      reviews: [
        { id: "1", name: "Meera", city: "Jaipur", rating: 5, text: "This book broke me and healed me in the same breath. A masterpiece of quiet devastation." },
        { id: "2", name: "Rohan", city: "Delhi", rating: 5, text: "Anvay reminded me of every mistake I've made in love — and somehow made me grateful for all of them." },
        { id: "3", name: "Ananya", city: "Mumbai", rating: 4, text: "Not your typical love story. It's raw, real, and beautifully written." },
      ],
      settings: { bookPrice: 39900, mrp: 45000, stockEnabled: true, launchOfferActive: true, announcementBar: "🎉 Launch Offer: Get Kaash at ₹399 (MRP ₹450) — Limited Time!" },
    };
  }
}

export default async function HomePage() {
  const { reviews, settings } = await getPageData();

  return (
    <>
      {settings?.announcementBar && (
        <AnnouncementBar text={settings.announcementBar} />
      )}
      <CartDrawer />
      <main>
        <Hero />
        <TheFeeling />
        <Characters />
        <ChapterGlimpse />
        <Reviews reviews={reviews} />
        <BuySection
          bookPrice={settings?.bookPrice ?? 39900}
          mrp={settings?.mrp ?? 45000}
          stockEnabled={settings?.stockEnabled ?? true}
          launchOfferActive={settings?.launchOfferActive ?? true}
        />
        <AboutAuthor />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
