'use client';

import Image from 'next/image';
import { Calendar, Clock, User, X, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 sm:rounded-xl">
        <DialogTitle className="sr-only">
          {article.title}
        </DialogTitle>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl sm:rounded-t-xl">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-9 w-9 bg-black/40 text-white hover:bg-black/60 hover:text-white"
            onClick={onClose}
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-3">
            <Badge className={categoryColors[article.category]}>
              {article.category}
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span className="font-medium">{article.author.name}</span>
              <span className="text-muted-foreground">&mdash; {article.author.role}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(article.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime} min de lecture
            </span>
          </div>

          <Separator className="mb-6" />

          <div className="prose prose-slate dark:prose-invert max-w-none">
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/90 mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <Separator className="my-6" />
          <div className="flex items-center gap-3">
            <Share2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Partager :</span>
            <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Partager sur Facebook">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Partager sur Twitter">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Partager sur LinkedIn">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>

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
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-2">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="200px"
                      />
                    </div>
                    <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
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
