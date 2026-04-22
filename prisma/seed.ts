import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { articles } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default admin
  const hashedPassword = await bcrypt.hash("Admin@2026", 10);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@capitaleinfos.sn" },
    update: {},
    create: {
      email: "admin@capitaleinfos.sn",
      password: hashedPassword,
      name: "Administrateur",
      role: "admin",
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // Seed articles
  const articleCount = await prisma.article.count();
  if (articleCount === 0) {
    for (const article of articles) {
      await prisma.article.create({
        data: {
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          authorName: article.author.name,
          authorRole: article.author.role,
          image: article.image,
          readTime: article.readTime,
          isFeatured: article.isFeatured,
          isTrending: article.isTrending,
          published: true,
        },
      });
    }
    console.log(`✅ Seeded ${articles.length} articles`);
  } else {
    console.log(`ℹ️  ${articleCount} articles already exist, skipping`);
  }

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
