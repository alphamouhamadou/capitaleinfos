'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Menu,
  Search,
  Sun,
  Moon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const navLinks = [
  { label: 'À la une', href: '#' },
  { label: 'Politique', href: '#politique' },
  { label: 'Économie', href: '#economie' },
  { label: 'Sport', href: '#sport' },
  { label: 'Culture', href: '#culture' },
  { label: 'Société', href: '#societe' },
  { label: 'Tech', href: '#tech' },
  { label: 'International', href: '#international' },
];

interface HeaderProps {
  onSearchOpen: () => void;
}

export function Header({ onSearchOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentDate = 'Mardi 22 Avril 2026';

  return (
    <header className="sticky top-0 z-50 w-full border-t-[3px] border-primary bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border py-1.5 text-xs text-muted-foreground">
          <span className="hidden sm:block">{currentDate}</span>
          <span className="sm:hidden">22/04/2026</span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onSearchOpen}
              aria-label="Rechercher"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Changer de thème"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>

        {/* Logo + Navigation */}
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img
              src="/img/logo.png"
              alt="Capitale Infos"
              className="h-10 w-10 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-tight text-foreground">
                CAPITALE INFOS
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-primary">
                Le Journal du Sénégal
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary rounded-md hover:bg-primary/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex flex-col gap-6 pt-8">
                <div className="flex items-center gap-3">
                  <img
                    src="/img/logo.png"
                    alt="Capitale Infos"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-black tracking-tight">CAPITALE INFOS</p>
                    <p className="text-xs text-primary font-medium uppercase tracking-widest">
                      Le Journal du Sénégal
                    </p>
                  </div>
                </div>
                <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2.5 text-base font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/5"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">{currentDate}</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
