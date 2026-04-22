'use client';

import { useRef, useMemo } from 'react';
import { Search, X, Clock, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { searchArticles, categoryColors, type Article } from '@/lib/data';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  onArticleClick: (id: string) => void;
}

function SearchDialogInner({ onArticleClick, onClose }: { onArticleClick: (id: string) => void; onClose: () => void }) {
  const [query, setQuery] = React.useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo<Article[]>(() => {
    if (query.trim().length >= 2) {
      return searchArticles(query);
    }
    return [];
  }, [query]);

  const handleSelect = (id: string) => {
    onClose();
    onArticleClick(id);
  };

  return (
    <>
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Rechercher un article, un sujet, un auteur..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
          aria-label="Recherche"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
            onClick={() => setQuery('')}
            aria-label="Effacer"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="max-h-[50vh] overflow-y-auto p-2">
        {query.trim().length >= 2 ? (
          results.length > 0 ? (
            <div className="space-y-1">
              {results.map((article) => (
                <button
                  key={article.id}
                  className="w-full text-left flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => handleSelect(article.id)}
                >
                  <Badge
                    variant="secondary"
                    className={`${categoryColors[article.category]} mt-0.5 text-[10px] flex-shrink-0`}
                  >
                    {article.category}
                  </Badge>
                  <div className="min-w-0">
                    <p className="font-medium text-sm leading-snug line-clamp-2">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} min
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground text-sm">
                Aucun résultat pour &laquo; {query} &raquo;
              </p>
              <p className="text-muted-foreground/60 text-xs mt-1">
                Essayez d&apos;autres mots-clés
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground text-sm">
              Tapez au moins 2 caractères pour lancer la recherche
            </p>
          </div>
        )}
      </div>

      <div className="border-t px-4 py-2.5 text-xs text-muted-foreground flex items-center justify-between">
        <span>
          {query.trim().length >= 2
            ? `${results.length} résultat${results.length !== 1 ? 's' : ''}`
            : 'Recherche en temps réel'}
        </span>
        <span className="hidden sm:inline">
          Appuyez sur <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">ESC</kbd> pour fermer
        </span>
      </div>
    </>
  );
}

import React from 'react';

export function SearchDialog({ open, onClose, onArticleClick }: SearchDialogProps) {
  const [key, setKey] = React.useState(0);

  const handleClose = React.useCallback(() => {
    onClose();
    setKey((k) => k + 1);
  }, [onClose]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 top-[10%] translate-y-0 sm:top-[15%] sm:translate-y-0">
        <DialogTitle className="sr-only">Rechercher des articles</DialogTitle>
        <div key={key}>
          <SearchDialogInner onArticleClick={onArticleClick} onClose={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
