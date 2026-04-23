'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, Clock, User, X, Share2, Facebook, Twitter, Linkedin, ArrowLeft, Bookmark, ChevronRight, Minus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  categoryColors,
} from '@/lib/data';
import {
  type Article,
  useArticles,
} from '@/lib/articles-context';

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
  const { getArticleById, getRelatedArticles } = useArticles();
  const article = articleId ? getArticleById(articleId) : null;
  const relatedArticles = article ? getRelatedArticles(article) : [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Track scroll progress for reading bar
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
      setHeaderVisible(scrollTop > 300);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [article]);

  if (!article) return null;

  const paragraphs = article.content.split('\n\n').filter(p => p.trim());

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[100dvh] h-[100dvh] sm:h-[95dvh] sm:max-h-[95dvh] sm:rounded-2xl p-0 gap-0 overflow-hidden border-border/40 shadow-2xl flex flex-col">
        <DialogTitle className="sr-only">
          {article.title}
        </DialogTitle>

        {/* ── READING PROGRESS BAR ── */}
        <div className="absolute top-0 left-0 right-0 h-[3px] z-50 bg-muted/30">
          <div
            className="h-full bg-gradient-to-r from-primary via-red-500 to-amber-500 transition-all duration-150 ease-out rounded-full"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* ── STICKY MINI HEADER (appears on scroll) ── */}
        <div
          className={`absolute top-[3px] left-0 right-0 z-40 transition-all duration-300 ${
            headerVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="bg-background/95 backdrop-blur-xl border-b border-border/30 px-4 sm:px-6 py-2.5">
            <div className="flex items-center gap-3">
              <Badge className={`${categoryColors[article.category]} border-0 text-[9px] font-bold px-2.5 py-0.5`}>
                {article.category}
              </Badge>
              <h2 className="text-[13px] font-semibold text-foreground line-clamp-1 flex-1">
                {article.title}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 flex-shrink-0"
                onClick={onClose}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* ── SCROLLABLE CONTENT ── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {/* Hero image */}
          <div className="relative aspect-[16/9] sm:aspect-[2/1] w-full overflow-hidden flex-shrink-0">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
              unoptimized
            />
            {/* Multi-layer gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

            {/* Close button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 bg-black/30 backdrop-blur-md text-white hover:bg-black/50 hover:text-white rounded-full border border-white/10"
                onClick={onClose}
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Bottom info on image */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <Badge className={`${categoryColors[article.category]} border-0 text-[10px] font-bold px-3 py-1 shadow-lg mb-4`}>
                {article.category}
              </Badge>
              <h1 className="text-[22px] sm:text-[1.75rem] lg:text-[2rem] font-black leading-[1.15] text-white tracking-tight mb-4">
                {article.title}
              </h1>
              {/* Author card on image */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {article.author.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <span className="font-bold text-white text-[14px] block">{article.author.name}</span>
                  <span className="text-[11px] text-white/60">{article.author.role}</span>
                </div>
                <div className="hidden sm:flex items-center gap-4 ml-auto text-[11px] text-white/50">
                  <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min de lecture
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── ARTICLE BODY ── */}
          <div className="px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
            {/* Mobile-only meta bar */}
            <div className="flex sm:hidden items-center gap-3 mb-6 pb-5 border-b border-border/30 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {article.readTime} min
              </span>
            </div>

            {/* Excerpt highlight */}
            <div className="relative mb-10 pl-5 border-l-[3px] border-primary/40">
              <p className="text-[15px] sm:text-[16px] leading-relaxed text-foreground/90 font-medium italic">
                {article.excerpt}
              </p>
            </div>

            {/* Article paragraphs */}
            <div className="space-y-0">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-[15px] sm:text-[16px] leading-[1.9] text-foreground/80 mb-6 text-justify ${
                    i === 0
                      ? 'text-[17px] sm:text-[18px] leading-[1.85] text-foreground/90 font-medium'
                      : ''
                  }`}
                  style={i === 0 ? {
                    WebkitInitialLetter: '4',
                    initialLetter: '4',
                  } : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* ── BOTTOM SEPARATOR ── */}
            <div className="flex items-center gap-4 my-10">
              <Minus className="h-4 w-4 text-primary/30" />
              <div className="flex-1 h-px bg-gradient-to-r from-primary/20 via-border/60 to-transparent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Fin</span>
              <div className="flex-1 h-px bg-gradient-to-l from-primary/20 via-border/60 to-transparent" />
              <Minus className="h-4 w-4 text-primary/30" />
            </div>

            {/* ── SHARE SECTION ── */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-5">
                <Share2 className="h-4 w-4 text-muted-foreground/50" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                  Partager cet article
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Button
                  className="h-11 px-5 gap-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-[13px]"
                  onClick={() => {
                    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
                    const text = encodeURIComponent(article.title);
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
                  }}
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
                <Button
                  className="h-11 px-5 gap-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium text-[13px]"
                  onClick={() => {
                    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
                    const text = encodeURIComponent(article.title);
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
                  }}
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                <Button
                  className="h-11 px-5 gap-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-medium text-[13px]"
                  onClick={() => {
                    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
                  }}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
              </div>
            </div>

            {/* ── RELATED ARTICLES ── */}
            {relatedArticles.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                    Articles connexes
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-border via-border/60 to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((related: Article) => (
                    <div
                      key={related.id}
                      className="group cursor-pointer"
                      onClick={() => onArticleClick(related.id)}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-3 shadow-md card-lift">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover img-zoom"
                          sizes="250px"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <Badge className={`absolute top-2.5 left-2.5 ${categoryColors[related.category]} border-0 text-[8px] font-bold px-2 py-0.5 shadow-sm`}>
                          {related.category}
                        </Badge>
                        <div className="absolute bottom-2.5 right-2.5 h-7 w-7 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <ChevronRight className="h-3.5 w-3.5 text-primary" />
                        </div>
                      </div>
                      <h4 className="text-[13px] font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-snug mb-1.5">
                        {related.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground/60">
                        <span className="font-medium">{related.author.name.split(' ')[0]}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span>
                          {new Date(related.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
