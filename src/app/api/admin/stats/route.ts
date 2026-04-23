import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    const total = await db.article.count();
    const published = await db.article.count({ where: { published: true } });
    const draft = await db.article.count({ where: { published: false } });

    const categoryStats = await db.article.groupBy({
      by: ["category"],
      _count: true,
    });

    const recentArticles = await db.article.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return NextResponse.json({
      total,
      published,
      draft,
      categories: categoryStats.map((c) => ({
        name: c.category,
        count: c._count,
      })),
      recentArticles,
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

