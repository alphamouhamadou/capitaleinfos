import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { articles } from '@/lib/data'

const SETUP_TOKEN = 'capitale-setup-2026'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    if (token !== SETUP_TOKEN) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 403 })
    }

    const results: string[] = []

    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Admin" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'admin',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)
    results.push('Table Admin OK')

    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Article" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "excerpt" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "authorName" TEXT NOT NULL,
        "authorRole" TEXT NOT NULL,
        "image" TEXT NOT NULL,
        "readTime" INTEGER NOT NULL,
        "isFeatured" BOOLEAN NOT NULL DEFAULT false,
        "isTrending" BOOLEAN NOT NULL DEFAULT false,
        "published" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)
    results.push('Table Article OK')

    const hashedPassword = await bcrypt.hash('Admin@2026', 10)
    try {
      await db.admin.upsert({
        where: { email: 'admin@capitaleinfos.sn' },
        update: {},
        create: {
          email: 'admin@capitaleinfos.sn',
          password: hashedPassword,
          name: 'Administrateur',
          role: 'admin',
        },
      })
      results.push('Admin cree')
    } catch (e: any) {
      if (e.code === 'P2002') { results.push('Admin existe deja') } else { throw e }
    }

    const articleCount = await db.article.count()
    if (articleCount === 0) {
      for (const article of articles) {
        await db.article.create({
          data: {
            title: article.title, excerpt: article.excerpt, content: article.content,
            category: article.category, authorName: article.author.name,
            authorRole: article.author.role, image: article.image,
            readTime: article.readTime, isFeatured: article.isFeatured,
            isTrending: article.isTrending, published: true,
          },
        })
      }
      results.push(articles.length + ' articles crees')
    } else {
      results.push(articleCount + ' articles existent deja')
    }

    return NextResponse.json({ success: true, message: 'Base initialisee !', details: results })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}