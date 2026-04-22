'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import {
  Menu,
  Search,
  Sun,
  Moon,
  TrendingUp,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'À la une', href: '#a-la-une', action: 'scroll' },
  { label: 'Politique', href: '#rubriques', category: 'Politique' },
  { label: 'Économie', href: '#rubriques', category: 'Économie' },
  { label: 'Sport', href: '#rubriques', category: 'Sport' },
  { label: 'Culture', href: '#rubriques', category: 'Culture' },
  { label: 'Société', href: '#rubriques', category: 'Société' },
  { label: 'International', href: '#rubriques', category: 'International' },
];

interface HeaderProps {
  onSearchOpen: () => void;
}

export function Header({ onSearchOpen }: HeaderProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(
      now.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback((href: string, category?: string) => {
    setMobileOpen(false);
    if (category) {
      window.dispatchEvent(new CustomEvent('switch-category', { detail: category }));
    }
    if (href && href !== '#') {
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          const headerHeight = 120;
          const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  const isDark = resolvedTheme === 'dark';

  return (
    <>
      {/* Top accent line */}
      <div className="h-[3px] bg-gradient-to-r from-primary via-amber-500 to-primary" />

      <header className="sticky top-0 z-50 w-full">
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'glass border-b border-border/40 shadow-lg shadow-black/[0.03] dark:shadow-black/20'
              : 'bg-background/60 backdrop-blur-sm'
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Top meta bar */}
            <div className="flex items-center justify-between py-2 text-[11px] text-muted-foreground">
              <span className="hidden sm:block capitalize font-medium tracking-wide">
                {currentTime}
              </span>
              <span className="sm:hidden text-[11px] font-medium">22 Avril 2026</span>
              <div className="flex items-center gap-1">
                <div className="hidden sm:flex items-center gap-1.5 mr-3">
                  <TrendingUp className="h-3 w-3 text-primary/70" />
                  <span className="font-semibold text-foreground/80">Dakar 32°C</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary/8 transition-colors"
                  onClick={onSearchOpen}
                  aria-label="Rechercher"
                >
                  <Search className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary/8 transition-colors"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  aria-label="Changer de thème"
                >
                  {isDark ? (
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                  ) : (
                    <Moon className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Logo + Navigation */}
            <div className="flex h-14 items-center justify-between border-t border-border/30">
              {/* Logo */}
              <a href="#a-la-une" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group">
                <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-md shadow-primary/10 group-hover:shadow-primary/20 transition-all duration-500">
                  <img
                    src="/img/logo-capitale-infos.jpg"
                    alt="Capitale Infos"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight leading-none text-foreground">
                    CAPITALE<span className="text-primary"> INFOS</span>
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-muted-foreground/70 mt-0.5">
                    Le Journal du Sénégal
                  </span>
                </div>
              </a>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-0" aria-label="Navigation principale">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href, link.category);
                    }}
                    className="relative px-3.5 py-2 text-[12.5px] font-semibold text-muted-foreground transition-all duration-300 hover:text-foreground rounded-lg hover:bg-primary/5 elegant-underline"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-xl hover:bg-primary/8"
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
            style={{ animation: 'fadeIn 200ms ease-out' }}
          />
          {/* Panel */}
          <div
            className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] shadow-2xl flex flex-col overflow-hidden"
            style={{
              animation: 'slideInRight 300ms cubic-bezier(0.22, 1, 0.36, 1)',
              background: isDark ? 'oklch(0.14 0.008 25)' : 'oklch(0.998 0.001 60)',
            }}
          >
            {/* Panel header */}
            <div className="relative px-6 pt-10 pb-8 flex-shrink-0 overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/5" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-amber-500/5" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-11 w-11 rounded-xl overflow-hidden shadow-lg shadow-primary/15">
                    <img
                      src="/img/logo-capitale-infos.jpg"
                      alt="Capitale Infos"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-black tracking-tight">CAPITALE INFOS</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Le Journal du Sénégal
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium capitalize">{currentTime}</p>
              </div>

              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 h-9 w-9 rounded-xl bg-muted/80 hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Gradient separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Menu links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navigation mobile">
              {navLinks.map((link, index) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href, link.category)}
                  className="w-full text-left flex items-center gap-3.5 px-4 py-3.5 text-[14px] font-medium text-foreground/80 hover:text-primary transition-all duration-300 rounded-xl hover:bg-primary/5 group"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center text-[10px] font-bold text-primary/70 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {index === 0 ? '★' : String(index).padStart(2, '0')}
                  </span>
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Panel footer */}
            <div className="flex-shrink-0 px-5 py-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl hover:bg-primary/8"
                  onClick={() => {
                    setMobileOpen(false);
                    onSearchOpen();
                  }}
                >
                  <Search className="h-4.5 w-4.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl hover:bg-primary/8"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                >
                  {isDark ? (
                    <Sun className="h-4.5 w-4.5 text-amber-400" />
                  ) : (
                    <Moon className="h-4.5 w-4.5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
