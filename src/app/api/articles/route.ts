import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const trending = searchParams.get("trending");
    const search = searchParams.get("search");
    const id = searchParams.get("id");

    // If a single ID is requested, return that article only
    if (id) {
      const article = await db.article.findUnique({
        where: { id, published: true },
      });

      if (!article) {
        return NextResponse.json(
          { error: "Article non trouvé" },
          { status: 404 }
        );
      }

      const mapped = mapArticleToFrontend(article);
      return NextResponse.json(mapped);
    }

    // Build where clause — always filter by published
    const where: Record<string, unknown> = { published: true };

    if (category) {
      where.category = category;
    }

    if (featured !== null && featured !== undefined) {
      where.isFeatured = featured === "true";
    }

    if (trending !== null && trending !== undefined) {
      where.isTrending = trending === "true";
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

    const mapped = articles.map(mapArticleToFrontend);
    return NextResponse.json(mapped);
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

/** Map DB article fields to the frontend Article format */
function mapArticleToFrontend(article: {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  authorName: string;
  authorRole: string;
  image: string;
  readTime: number;
  isFeatured: boolean;
  isTrending: boolean;
  createdAt: Date;
}) {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    author: {
      name: article.authorName,
      role: article.authorRole,
    },
    date: article.createdAt.toISOString(),
    image: article.image,
    readTime: article.readTime,
    isFeatured: article.isFeatured,
    isTrending: article.isTrending,
  };
}
