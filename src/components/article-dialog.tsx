'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  X,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ChevronRight,
  ArrowLeft,
  Quote,
  Link2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { categoryColors } from '@/lib/data';
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

/* ══════════════════════════════════════════════════════════════════════
   INNER SCROLLABLE CONTENT — keyed by article.id for clean remount
   ══════════════════════════════════════════════════════════════════════ */
interface ArticleContentProps {
  article: Article;
  paragraphs: string[];
  relatedArticles: Article[];
  authorInitials: string;
  formattedDate: string;
  onArticleClick: (id: string) => void;
  onScrollStateChange: (progress: number, showHeader: boolean) => void;
}

function ArticleContent({
  article,
  paragraphs,
  relatedArticles,
  authorInitials,
  formattedDate,
  onArticleClick,
  onScrollStateChange,
}: ArticleContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    let showHeader = false;
    if (heroRef.current) {
      const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
      showHeader = scrollTop > heroBottom - 60;
    }

    onScrollStateChange(Math.min(progress, 100), showHeader);
  }, [onScrollStateChange]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-none">

      {/* ── HERO IMAGE SECTION ── */}
      <div ref={heroRef} className="relative w-full">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="aspect-[16/9] sm:aspect-[2.2/1] w-full bg-muted animate-pulse" />
        )}
        <div
          className={`relative w-full overflow-hidden transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
            onLoad={() => setImageLoaded(true)}
          />
          {/* Multi-layer gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

          {/* ── Overlay content ── */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 pb-8 sm:pb-12">
              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Badge
                  className={`${categoryColors[article.category]} border-0 text-[11px] font-bold px-3.5 py-1 shadow-lg mb-5 inline-flex items-center gap-1.5`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                  {article.category}
                </Badge>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-[26px] sm:text-[2rem] lg:text-[2.5rem] font-black leading-[1.12] text-white tracking-tight mb-6 max-w-4xl"
              >
                {article.title}
              </motion.h1>

              {/* Author info on hero */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3.5"
              >
                <div className="h-11 w-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white font-bold text-[13px] shadow-lg flex-shrink-0">
                  {authorInitials}
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-white text-[14px] block leading-tight">
                    {article.author.name}
                  </span>
                  <span className="text-[11px] text-white/55 leading-tight">
                    {article.author.role}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-3 ml-auto text-[11px] text-white/50">
                  <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/5">
                    <Calendar className="h-3 w-3" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/5">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min de lecture
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <div className="bg-background">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Mobile-only date/read time bar */}
          <div className="flex sm:hidden items-center gap-3 pt-6 pb-5 border-b border-border/20 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime} min
            </span>
          </div>

          {/* Desktop author row below hero */}
          <div className="hidden sm:flex items-center gap-4 pt-8 pb-6 border-b border-border/20">
            <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
              {authorInitials}
            </div>
            <div>
              <span className="font-bold text-foreground text-[15px] block leading-tight">
                {article.author.name}
              </span>
              <span className="text-[12px] text-muted-foreground">{article.author.role}</span>
            </div>
            <div className="ml-auto flex items-center gap-4 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime} min de lecture
              </span>
            </div>
          </div>

          {/* ── EXCERPT HIGHLIGHT ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-10 mb-12 pl-6 border-l-[3px] border-primary/40"
          >
            <Quote className="absolute top-0 left-1 h-4 w-4 text-primary/20 -translate-x-1/2" />
            <p className="text-[16px] sm:text-[17px] leading-[1.75] text-foreground/80 font-medium italic">
              {article.excerpt}
            </p>
          </motion.div>

          {/* ── ARTICLE PARAGRAPHS ── */}
          <div className="space-y-0 pb-8">
            {paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35 + i * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`text-[15px] sm:text-[17px] leading-[1.9] text-foreground/80 mb-7 text-justify hyphens-auto ${
                  i === 0 ? 'drop-cap-paragraph' : ''
                }`}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* ══════════════════════════════════════════════════════
              BOTTOM SEPARATOR — "Fin"
              ══════════════════════════════════════════════════════ */}
          <div className="flex items-center gap-4 py-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/35 select-none">
              Fin
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border/60 to-transparent" />
          </div>

          {/* ══════════════════════════════════════════════════════
              SHARE SECTION
              ══════════════════════════════════════════════════════ */}
          <div className="pb-12">
            <div className="flex items-center gap-3 mb-5">
              <Share2 className="h-4 w-4 text-muted-foreground/40" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/45">
                Partager cet article
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                className="h-11 px-5 gap-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl font-medium text-[13px] shadow-sm hover:shadow-md transition-shadow"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(article.title);
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
                    '_blank',
                    'width=600,height=400'
                  );
                }}
              >
                <Facebook className="h-4 w-4" />
                <span className="hidden sm:inline">Facebook</span>
              </Button>
              <Button
                className="h-11 px-5 gap-2.5 bg-foreground hover:bg-foreground/90 text-background rounded-xl font-medium text-[13px] shadow-sm hover:shadow-md transition-shadow"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(article.title);
                  window.open(
                    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
                    '_blank',
                    'width=600,height=400'
                  );
                }}
              >
                <Twitter className="h-4 w-4" />
                <span className="hidden sm:inline">Twitter</span>
              </Button>
              <Button
                className="h-11 px-5 gap-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl font-medium text-[13px] shadow-sm hover:shadow-md transition-shadow"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
                    '_blank',
                    'width=600,height=400'
                  );
                }}
              >
                <Linkedin className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                className="h-11 w-11 p-0 rounded-xl hover:bg-muted transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                aria-label="Copier le lien"
              >
                <Link2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
              RELATED ARTICLES
              ══════════════════════════════════════════════════════ */}
          {relatedArticles.length > 0 && (
            <div className="border-t border-border/20 pt-10 pb-16">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[13px] font-bold uppercase tracking-[0.15em] text-foreground/70">
                  Articles connexes
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-border/30 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedArticles.map((related: Article, index: number) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.1,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group cursor-pointer"
                    onClick={() => onArticleClick(related.id)}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-3 shadow-md card-lift">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover img-zoom"
                        sizes="(max-width: 640px) 100vw, 280px"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge
                        className={`absolute top-2.5 left-2.5 ${categoryColors[related.category]} border-0 text-[8px] font-bold px-2 py-0.5 shadow-sm`}
                      >
                        {related.category}
                      </Badge>
                      <div className="absolute bottom-2.5 right-2.5 h-7 w-7 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        <ChevronRight className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                    <h4 className="text-[13px] font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-snug mb-2">
                      {related.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50">
                      <span className="font-medium">{related.author.name.split(' ')[0]}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                      <span>
                        {new Date(related.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                      <span>{related.readTime} min</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom spacing */}
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN ARTICLE DIALOG
   ══════════════════════════════════════════════════════════════════════ */
export function ArticleDialog({
  articleId,
  open,
  onClose,
  onArticleClick,
}: ArticleDialogProps) {
  const { getArticleById, getRelatedArticles } = useArticles();
  const article = articleId ? getArticleById(articleId) : null;
  const relatedArticles = article ? getRelatedArticles(article) : [];

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  // Keyboard shortcut: Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Reset scroll state when article changes or dialog closes
  useEffect(() => {
    if (!open) {
      setScrollProgress(0);
      setShowStickyHeader(false);
    }
  }, [open]);

  const handleScrollStateChange = useCallback(
    (progress: number, showHeader: boolean) => {
      setScrollProgress(progress);
      setShowStickyHeader(showHeader);
    },
    []
  );

  if (!article) return null;

  const paragraphs = article.content.split('\n\n').filter(p => p.trim());
  const authorInitials = article.author.name
    .split(' ')
    .map((n) => n[0])
    .join('');
  const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-0 z-50 flex flex-col w-full h-full max-w-none m-0 p-0 border-0 rounded-none bg-background translate-x-0 translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-2 data-[state=open]:slide-in-from-bottom-2 sm:rounded-none overflow-hidden"
      >
        <DialogTitle className="sr-only">
          {article.title}
        </DialogTitle>

        {/* ══════════════════════════════════════════════════════════
            READING PROGRESS BAR
            ══════════════════════════════════════════════════════════ */}
        <div className="absolute top-0 left-0 right-0 h-[3px] z-50 bg-black/5 dark:bg-white/5">
          <div
            className="h-full rounded-full transition-[width] duration-150 ease-linear"
            style={{
              width: `${scrollProgress}%`,
              background: 'linear-gradient(90deg, oklch(0.5 0.19 22), oklch(0.78 0.14 85))',
            }}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════
            STICKY MINI HEADER
            ══════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {showStickyHeader && (
            <motion.div
              initial={{ y: -56, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -56, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[3px] left-0 right-0 z-40"
            >
              <div className="glass border-b border-border/20 px-4 sm:px-6 py-2.5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    aria-label="Retour"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Retour</span>
                  </button>
                  <div className="w-px h-4 bg-border/40 flex-shrink-0" />
                  <Badge
                    className={`${categoryColors[article.category]} border-0 text-[9px] font-bold px-2 py-0.5 flex-shrink-0`}
                  >
                    {article.category}
                  </Badge>
                  <h2 className="text-[13px] font-semibold text-foreground line-clamp-1 flex-1 min-w-0">
                    {article.title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex-shrink-0"
                    aria-label="Fermer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════════
            CLOSE BUTTON — visible when sticky header is hidden
            ══════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {!showStickyHeader && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="absolute top-5 right-5 z-50 h-11 w-11 rounded-full bg-black/40 backdrop-blur-xl text-white hover:bg-black/60 hover:text-white transition-all duration-200 border border-white/10 shadow-lg flex items-center justify-center"
              aria-label="Fermer l'article"
            >
              <X className="h-[18px] w-[18px]" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════════
            SCROLLABLE CONTENT (keyed by article.id)
            ══════════════════════════════════════════════════════════ */}
        <ArticleContent
          key={article.id}
          article={article}
          paragraphs={paragraphs}
          relatedArticles={relatedArticles}
          authorInitials={authorInitials}
          formattedDate={formattedDate}
          onArticleClick={onArticleClick}
          onScrollStateChange={handleScrollStateChange}
        />
      </DialogContent>
    </Dialog>
  );
}
