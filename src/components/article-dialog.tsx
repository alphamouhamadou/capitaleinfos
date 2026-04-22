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
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto p-0 sm:rounded-2xl border-border/50">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Close button */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 hover:text-white rounded-xl"
              onClick={onClose}
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Category badge on image */}
          <div className="absolute bottom-4 left-5">
            <Badge className={`${categoryColors[article.category]} border-0 text-[11px] font-bold px-3 py-1 shadow-lg`}>
              {article.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6">
          {/* Back button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </button>

          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-4 tracking-tight">
            {article.title}
          </h1>

          {/* Author info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-5 pb-5 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {article.author.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <span className="font-semibold text-foreground block text-sm">{article.author.name}</span>
                <span className="text-xs text-muted-foreground">{article.author.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground ml-auto">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime} min de lecture
              </span>
            </div>
          </div>

          {/* Article body */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-[1.8] text-foreground/85 mb-5 first-letter:text-4xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2 first-letter:mt-0.5">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share */}
          <Separator className="my-6" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Share2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground">Partager :</span>
              <div className="flex gap-1.5">
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors" aria-label="Partager sur Facebook">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors" aria-label="Partager sur Twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-colors" aria-label="Partager sur LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <>
              <Separator className="my-6" />
              <h3 className="text-lg font-bold mb-4">Articles connexes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((related: Article) => (
                  <div
                    key={related.id}
                    className="group cursor-pointer"
                    onClick={() => onArticleClick(related.id)}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-2.5 shadow-sm">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="200px"
                      />
                    </div>
                    <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {related.title}
                    </h4>
                    <span className="text-xs text-muted-foreground mt-1 block">
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
