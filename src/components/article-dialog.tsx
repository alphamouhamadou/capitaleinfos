'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  X,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ChevronRight,
  Quote,
  Link2,
  Check,
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

export function ArticleDialog({
  articleId,
  open,
  onClose,
  onArticleClick,
}: ArticleDialogProps) {
  const { getArticleById, getRelatedArticles } = useArticles();
  const article = articleId ? getArticleById(articleId) : null;
  const relatedArticles = article ? getRelatedArticles(article) : [];

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset state when article changes or dialog opens
  useEffect(() => {
    if (open) {
      setImageLoaded(false);
      setImageError(false);
      setCopied(false);
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    }
  }, [open, articleId]);

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

  // Get the current page URL (works on Vercel with custom domain)
  const getArticleUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  // Web Share API — works perfectly on mobile (opens native share sheet)
  const handleNativeShare = async () => {
    const url = getArticleUrl();
    if (!url) return;

    // Check if Web Share API is available (mobile browsers)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || article.title,
          url: url,
        });
        return;
      } catch (err) {
        // User cancelled or error — fall through to individual buttons
        if (err instanceof Error && err.name === 'AbortError') return;
      }
    }

    // Fallback: copy link if no Web Share API
    handleCopyLink();
  };

  // Copy link with fallback + visual feedback
  const handleCopyLink = async () => {
    const url = getArticleUrl();
    if (!url) return;

    try {
      // Modern clipboard API
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers / non-HTTPS
      try {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Last resort: prompt
        prompt('Copiez ce lien :', url);
      }
    }
  };

  // Open share URL in new tab (no popup dimensions — mobile compatible)
  const openShareUrl = (shareUrl: string) => {
    window.open(shareUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="!fixed !top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] z-50 !flex !flex-col w-[calc(100%-2rem)] sm:!w-[680px] lg:!w-[780px] !max-h-[88vh] !rounded-2xl !border !border-border/60 !shadow-2xl !p-0 !gap-0 !overflow-hidden bg-background"
      >
        <DialogTitle className="sr-only">
          {article.title}
        </DialogTitle>

        {/* ── SCROLLABLE CONTENT ── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">

          {/* ── ARTICLE IMAGE ── */}
          <div className="relative aspect-[16/9] w-full bg-muted flex-shrink-0">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-muted animate-pulse z-10" />
            )}
            {imageError && (
              <div className="absolute inset-0 bg-muted z-10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-muted-foreground/10 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>
                  </div>
                  <p className="text-[11px] text-muted-foreground/40">Image non disponible</p>
                </div>
              </div>
            )}
            <Image
              src={article.image}
              alt={article.title}
              fill
              className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 640px) 100vw, 780px"
              priority
              unoptimized
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {/* Category badge on image */}
            <Badge
              className={`absolute top-3 left-3 ${categoryColors[article.category]} border-0 text-[10px] font-bold px-2.5 py-0.5 shadow-md z-20 inline-flex items-center gap-1`}
            >
              <span className="w-1 h-1 rounded-full bg-current opacity-50" />
              {article.category}
            </Badge>
            {/* Close button on image */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all duration-200 border border-white/15 flex items-center justify-center"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* ── ARTICLE BODY ── */}
          <div className="px-5 sm:px-7 pt-5 pb-6">

            {/* Title */}
            <h1 className="text-[20px] sm:text-[22px] font-black leading-[1.2] text-foreground tracking-tight mb-4">
              {article.title}
            </h1>

            {/* Author + meta row */}
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border/20">
              <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center text-primary font-bold text-[11px] flex-shrink-0">
                {authorInitials}
              </div>
              <div className="min-w-0">
                <span className="font-bold text-foreground text-[13px] block leading-tight">
                  {article.author.name}
                </span>
                <span className="text-[11px] text-muted-foreground">{article.author.role}</span>
              </div>
              <div className="ml-auto flex items-center gap-3 text-[11px] text-muted-foreground flex-shrink-0">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span className="hidden sm:inline">{formattedDate}</span>
                  <span className="sm:hidden">
                    {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </span>
                </span>
                <Separator orientation="vertical" className="h-3.5 hidden sm:block" />
                <span className="hidden sm:flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime} min de lecture
                </span>
              </div>
            </div>

            {/* ── EXCERPT ── */}
            <div className="relative mb-5 pl-5 border-l-[3px] border-primary/40">
              <Quote className="absolute top-0 left-1 h-3.5 w-3.5 text-primary/20 -translate-x-1/2" />
              <p className="text-[14px] sm:text-[15px] leading-[1.7] text-foreground/75 font-medium italic">
                {article.excerpt}
              </p>
            </div>

            {/* ── PARAGRAPHS ── */}
            <div className="space-y-0 pb-6">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-[13.5px] sm:text-[14.5px] leading-[1.85] text-foreground/75 mb-5 text-justify hyphens-auto ${
                    i === 0 ? 'drop-cap-paragraph' : ''
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* ── SHARE SECTION ── */}
            <div className="pt-4 pb-5 border-t border-border/15">
              <div className="flex items-center gap-2.5 mb-3.5">
                <Share2 className="h-3.5 w-3.5 text-muted-foreground/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                  Partager
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Native Share button (mobile share sheet) */}
                <Button
                  size="sm"
                  className="h-10 px-4 gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-[12px]"
                  onClick={handleNativeShare}
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Partager</span>
                </Button>
                {/* Facebook */}
                <Button
                  size="sm"
                  className="h-10 px-3 gap-1.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg font-medium text-[12px]"
                  onClick={() => {
                    const url = encodeURIComponent(getArticleUrl());
                    const text = encodeURIComponent(article.title);
                    openShareUrl(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`);
                  }}
                >
                  <Facebook className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Facebook</span>
                </Button>
                {/* X / Twitter */}
                <Button
                  size="sm"
                  className="h-10 px-3 gap-1.5 bg-foreground hover:bg-foreground/90 text-background rounded-lg font-medium text-[12px]"
                  onClick={() => {
                    const url = encodeURIComponent(getArticleUrl());
                    const text = encodeURIComponent(article.title);
                    openShareUrl(`https://x.com/intent/tweet?url=${url}&text=${text}`);
                  }}
                >
                  <Twitter className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">X</span>
                </Button>
                {/* WhatsApp — very popular in Senegal */}
                <Button
                  size="sm"
                  className="h-10 px-3 gap-1.5 bg-[#25D366] hover:bg-[#1EBE57] text-white rounded-lg font-medium text-[12px]"
                  onClick={() => {
                    const url = encodeURIComponent(getArticleUrl());
                    const text = encodeURIComponent(article.title + '\n\n');
                    openShareUrl(`https://wa.me/?text=${text}${url}`);
                  }}
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
                {/* Copy link */}
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-10 min-w-[40px] px-3 gap-1.5 rounded-lg font-medium text-[12px] transition-colors ${
                    copied
                      ? 'bg-green-50 border-green-200 text-green-600'
                      : ''
                  }`}
                  onClick={handleCopyLink}
                  aria-label={copied ? 'Lien copié !' : 'Copier le lien'}
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Copié !</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Copier</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* ── RELATED ARTICLES ── */}
            {relatedArticles.length > 0 && (
              <div className="border-t border-border/15 pt-5">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/50 mb-4">
                  Articles connexes
                </h3>
                <div className="space-y-3">
                  {relatedArticles.slice(0, 3).map((related: Article) => (
                    <div
                      key={related.id}
                      className="group flex gap-3 cursor-pointer items-start"
                      onClick={() => onArticleClick(related.id)}
                    >
                      <div className="relative w-[80px] h-[56px] rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                      <div className="flex-1 min-w-0 py-0.5">
                        <h4 className="text-[12.5px] font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-200 leading-snug mb-1">
                          {related.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground/50">
                          <span>{related.author.name.split(' ')[0]}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                          <span>
                            {new Date(related.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/25 group-hover:text-primary mt-3 flex-shrink-0 transition-colors duration-200" />
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
