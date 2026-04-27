import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import type { Metadata } from 'next';

const SITE_URL = 'https://www.capitaleinfos.sn';

interface Props {
  params: Promise<{ id: string }>;
}

/* ── Open Graph + Twitter meta tags (lus par WhatsApp, Facebook, X, etc.) ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const article = await db.article.findUnique({ where: { id } });

    if (!article || !article.published) {
      return { title: 'Article introuvable — Capitale Infos' };
    }

    const ogImage = article.image.startsWith('http')
      ? article.image
      : `${SITE_URL}${article.image}`;

    return {
      title: `${article.title} — Capitale Infos`,
      description: article.excerpt || article.content.substring(0, 160),
      openGraph: {
        title: article.title,
        description: article.excerpt || article.content.substring(0, 160),
        url: `${SITE_URL}/article/${article.id}`,
        siteName: 'Capitale Infos',
        type: 'article',
        publishedTime: article.createdAt,
        modifiedTime: article.updatedAt,
        authors: [article.authorName || 'Capitale Infos'],
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt || article.content.substring(0, 160),
        images: [ogImage],
      },
    };
  } catch {
    return { title: 'Capitale Infos — Le Journal du Sénégal' };
  }
}

/* ── Simple Markdown → HTML ── */
function renderMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-extrabold mt-10 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^[-*] (.+)$/gm, '<li class="ml-5 list-disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-5">')
    .replace(/\n/g, '<br/>');
}

/* ── Page ── */
export default async function ArticlePage({ params }: Props) {
  const { id } = await params;

  try {
    const article = await db.article.findUnique({ where: { id } });

    if (!article || !article.published) notFound();

    const htmlContent = renderMarkdown(article.content);

    return (
      <div className="min-h-screen flex flex-col bg-background">
        {/* ── Top bar ── */}
        <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Retour à l&apos;accueil
            </Link>
            <Link href="/" className="text-sm font-black tracking-tight text-foreground hover:text-red-600 transition-colors">
              Capitale Infos
            </Link>
          </div>
        </header>

        {/* ── Article ── */}
        <article className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
          {/* Category */}
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-red-600 mb-4 bg-red-50 px-3 py-1 rounded-full">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold leading-[1.15] mb-6 text-foreground">
            {article.title}
          </h1>

          {/* Author · Date · Read time */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-8 pb-8 border-b border-border/40">
            <span className="font-semibold text-foreground">{article.authorName || 'Capitale Infos'}</span>
            {article.authorRole && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-xs">{article.authorRole}</span>
              </>
            )}
            <span className="text-muted-foreground/40">·</span>
            <time dateTime={article.createdAt}>
              {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span className="text-muted-foreground/40">·</span>
            <span>{article.readTime} min de lecture</span>
          </div>

          {/* Featured image */}
          <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-10 shadow-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              unoptimized
              priority
            />
          </figure>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg sm:text-xl font-medium leading-relaxed text-foreground/70 mb-10 border-l-4 border-red-500 pl-5">
              {article.excerpt}
            </p>
          )}

          {/* Content */}
          <div
            className="max-w-none text-base sm:text-[17px] leading-[1.8] text-foreground/85"
            dangerouslySetInnerHTML={{ __html: `<p class="mb-5">${htmlContent}</p>` }}
          />

          {/* Bottom CTA */}
          <div className="mt-14 pt-8 border-t border-border/40 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Vous avez aimé cet article ? Retrouvez-en d&apos;autres sur Capitale Infos.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-md"
            >
              Lire plus d&apos;articles
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </article>

        {/* ── Footer ── */}
        <footer className="border-t border-border/40 mt-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Capitale Infos — Le Journal du Sénégal</span>
            <Link href="/" className="hover:text-red-600 transition-colors font-medium">
              www.capitaleinfos.sn
            </Link>
          </div>
        </footer>
      </div>
    );
  } catch {
    notFound();
  }
}
