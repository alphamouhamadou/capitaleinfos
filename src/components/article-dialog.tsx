'use client';

import Image from 'next/image';
import { Calendar, Clock, User, X, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  getArticleById,
  getRelatedArticles,
  categoryColors,
  type Article,
} from '@/lib/data';

interface ArticleDialogProps {
  articleId: string | null;
  open: boolean;
  onClose: () => void;
  onArticleClick: (id: string) => void;
}

export function ArticleDialog({
  articleId,
  open,
  onClose,
  onArticleClick,
}: ArticleDialogProps) {
  const article = articleId ? getArticleById(articleId) : null;

  if (!article) return null;

  const relatedArticles = getRelatedArticles(article);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto p-0 sm:rounded-2xl border-border/40 shadow-2xl">
        <DialogTitle className="sr-only">
          {article.title}
        </DialogTitle>

        {/* Hero image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Close */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-black/30 backdrop-blur-md text-white hover:bg-black/50 hover:text-white rounded-xl border border-white/10"
              onClick={onClose}
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Category badge */}
          <div className="absolute bottom-4 left-5">
            <Badge className={`${categoryColors[article.category]} border-0 text-[10px] font-bold px-3 py-1 shadow-lg`}>
              {article.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6">
          {/* Back */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[12px] text-muted-foreground/70 hover:text-foreground transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour aux articles
          </button>

          {/* Title */}
          <h1 className="text-[22px] sm:text-[1.75rem] font-extrabold leading-tight mb-4 tracking-tight text-foreground">
            {article.title}
          </h1>

          {/* Author info */}
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground mb-5 pb-5 border-b border-border/40">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {article.author.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <span className="font-semibold text-foreground text-[13px]">{article.author.name}</span>
                <span className="text-[10.5px] text-muted-foreground/60 block">{article.author.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground/60 ml-auto">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readTime} min
              </span>
            </div>
          </div>

          {/* Article body */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-[14px] leading-[1.85] text-foreground/80 mb-5 first-letter:text-3xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2 first-letter:mt-0.5 first-letter:leading-none">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share */}
          <Separator className="my-6" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Share2 className="h-3.5 w-3.5 text-muted-foreground/60" />
              <span className="text-[12px] font-semibold text-muted-foreground/70">Partager :</span>
              <div className="flex gap-1.5">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors" aria-label="Facebook">
                  <Facebook className="h-3.5 w-3.5" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors" aria-label="Twitter">
                  <Twitter className="h-3.5 w-3.5" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <>
              <Separator className="my-6" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-5">
                Articles connexes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((related: Article) => (
                  <div
                    key={related.id}
                    className="group cursor-pointer"
                    onClick={() => onArticleClick(related.id)}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-2.5 shadow-sm card-lift">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover img-zoom"
                        sizes="200px"
                      />
                    </div>
                    <h4 className="text-[12.5px] font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {related.title}
                    </h4>
                    <span className="text-[10.5px] text-muted-foreground/60 mt-1 block">
                      {new Date(related.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
