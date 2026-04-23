"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Category } from "@/lib/data";

// ── Frontend Article type (matches data.ts) ──────────────────────
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: { name: string; role: string };
  date: string;
  image: string;
  readTime: number;
  isFeatured: boolean;
  isTrending: boolean;
}

// ── Context shape ────────────────────────────────────────────────
interface ArticlesContextValue {
  articles: Article[];
  loading: boolean;
  featuredArticles: Article[];
  trendingArticles: Article[];
  latestArticles: Article[];
  getArticlesByCategory: (category: Category) => Article[];
  getArticleById: (id: string) => Article | undefined;
  getRelatedArticles: (article: Article, limit?: number) => Article[];
  searchArticles: (query: string) => Article[];
  refreshArticles: () => void;
}

const ArticlesContext = createContext<ArticlesContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────
export function ArticlesProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch("/api/articles");
      if (res.ok) {
        const data: Article[] = await res.json();
        setArticles(data);
      }
    } catch {
      // Silent fail — articles stay empty, components show nothing
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Listen for custom refresh events dispatched by the admin panel
  useEffect(() => {
    const handleRefresh = () => {
      setLoading(true);
      fetchArticles();
    };
    window.addEventListener("articles-refresh", handleRefresh);
    return () => window.removeEventListener("articles-refresh", handleRefresh);
  }, [fetchArticles]);

  // ── Computed properties ──────────────────────────────────────
  const featuredArticles = articles.filter((a) => a.isFeatured);
  const trendingArticles = articles.filter((a) => a.isTrending);
  const latestArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // ── Helper functions ─────────────────────────────────────────
  const getArticlesByCategory = useCallback(
    (category: Category): Article[] =>
      articles.filter((a) => a.category === category),
    [articles]
  );

  const getArticleById = useCallback(
    (id: string): Article | undefined =>
      articles.find((a) => a.id === id),
    [articles]
  );

  const getRelatedArticles = useCallback(
    (article: Article, limit = 3): Article[] =>
      articles
        .filter((a) => a.id !== article.id && a.category === article.category)
        .slice(0, limit),
    [articles]
  );

  const searchArticles = useCallback(
    (query: string): Article[] => {
      const lower = query.toLowerCase();
      return articles.filter(
        (a) =>
          a.title.toLowerCase().includes(lower) ||
          a.excerpt.toLowerCase().includes(lower) ||
          a.content.toLowerCase().includes(lower) ||
          a.category.toLowerCase().includes(lower) ||
          a.author.name.toLowerCase().includes(lower)
      );
    },
    [articles]
  );

  const refreshArticles = useCallback(() => {
    setLoading(true);
    fetchArticles();
  }, [fetchArticles]);

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        loading,
        featuredArticles,
        trendingArticles,
        latestArticles,
        getArticlesByCategory,
        getArticleById,
        getRelatedArticles,
        searchArticles,
        refreshArticles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────
export function useArticles(): ArticlesContextValue {
  const ctx = useContext(ArticlesContext);
  if (!ctx) {
    throw new Error("useArticles must be used within an <ArticlesProvider>");
  }
  return ctx;
}
