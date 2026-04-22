import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const articleSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  excerpt: z.string().min(1, "Le résumé est requis"),
  content: z.string().min(1, "Le contenu est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  authorName: z.string().min(1, "Le nom de l'auteur est requis"),
  authorRole: z.string().min(1, "Le rôle de l'auteur est requis"),
  image: z.string().default("/img/hero-dakar.jpg"),
  readTime: z.number().int().min(1).default(3),
  isFeatured: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  published: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const published = searchParams.get("published");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (category && category !== "all") {
      where.category = category;
    }

    if (published !== null && published !== undefined && published !== "all") {
      where.published = published === "true";
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { authorName: { contains: search } },
      ];
    }

    const articles = await db.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles);
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = articleSchema.parse(body);

    const article = await db.article.create({
      data: validated,
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
