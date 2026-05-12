import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Seed SiteSettings
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      bookPrice: 39900,
      mrp: 45000,
      stockEnabled: true,
      launchOfferActive: true,
      announcementBar: "🎉 Launch Offer: Get Kaash at ₹399 (MRP ₹450) — Limited Time!",
    },
  });

  // Seed featured reviews
  const reviews = [
    {
      name: "Meera",
      city: "Jaipur",
      rating: 5,
      text: "This book broke me and healed me in the same breath. Prisha's silence spoke louder than any dialogue I've ever read. A masterpiece of quiet devastation.",
      approved: true,
      featured: true,
    },
    {
      name: "Rohan",
      city: "Delhi",
      rating: 5,
      text: "Anvay reminded me of every mistake I've made in love — and somehow made me grateful for all of them. Aashray writes with a tenderness that stays with you long after the last page.",
      approved: true,
      featured: true,
    },
    {
      name: "Ananya",
      city: "Mumbai",
      rating: 4,
      text: "Not your typical love story. It's raw, it's real, and it doesn't give you the ending you want — it gives you the ending you need. Beautifully written.",
      approved: true,
      featured: true,
    },
  ];

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  console.log("✅ Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
