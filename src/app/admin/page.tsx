"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  CheckCircle2,
  FileEdit,
  TrendingUp,
  Plus,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { getCategoryColor } from "@/lib/category-utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Stats {
  total: number;
  published: number;
  draft: number;
  categories: { name: string; count: number }[];
  recentArticles: {
    id: string;
    title: string;
    category: string;
    published: boolean;
    createdAt: string;
  }[];
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }
    if (session) {
      fetchStats();
    }
  }, [session, status, router]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!session) return null;

  const statCards = [
    {
      title: "Total articles",
      value: stats?.total ?? 0,
      icon: FileText,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Publiés",
      value: stats?.published ?? 0,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Brouillons",
      value: stats?.draft ?? 0,
      icon: FileEdit,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Catégories",
      value: stats?.categories?.length ?? 0,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Bonjour, {session.user?.name} 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Bienvenue dans votre espace de gestion
          </p>
        </div>
        <Link href="/admin/articles/new" className="sm:self-start">
          <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white shadow-md h-12">
            <Plus className="h-5 w-5 mr-2" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{card.title}</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-1">{card.value}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-xl ${card.bg} shrink-0`}>
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent articles - Desktop Table */}
      <div className="hidden md:block">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">
              Articles récents
            </CardTitle>
            <Link href="/admin/articles">
              <Button variant="ghost" size="sm" className="text-red-600">
                Voir tout
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left text-sm font-medium text-muted-foreground">Titre</th>
                  <th className="py-2 text-left text-sm font-medium text-muted-foreground">Catégorie</th>
                  <th className="py-2 text-left text-sm font-medium text-muted-foreground">Statut</th>
                  <th className="py-2 text-right text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentArticles?.map((article) => (
                  <tr key={article.id} className="border-b last:border-0 hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => router.push(`/admin/articles/${article.id}/edit`)}>
                    <td className="py-3 font-medium max-w-xs truncate">
                      {article.title}
                    </td>
                    <td className="py-3">
                      <Badge
                        variant="secondary"
                        className={getCategoryColor(article.category)}
                      >
                        {article.category}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          article.published ? "default" : "secondary"
                        }
                        className={
                          article.published
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        }
                      >
                        {article.published ? "Publié" : "Brouillon"}
                      </Badge>
                    </td>
                    <td className="py-3 text-right text-muted-foreground text-sm whitespace-nowrap">
                      {format(new Date(article.createdAt), "dd MMM yyyy", {
                        locale: fr,
                      })}
                    </td>
                  </tr>
                ))}
                {!stats?.recentArticles?.length && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-muted-foreground">
                      Aucun article pour le moment
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Recent articles - Mobile Cards */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">Articles récents</h2>
          <Link href="/admin/articles">
            <Button variant="ghost" size="sm" className="text-red-600 text-sm">
              Voir tout
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="space-y-2">
          {stats?.recentArticles?.map((article) => (
            <Card
              key={article.id}
              className="border-0 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
              onClick={() => router.push(`/admin/articles/${article.id}/edit`)}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] px-1.5 ${getCategoryColor(article.category)}`}
                      >
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(article.createdAt), "dd MMM", {
                          locale: fr,
                        })}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-1.5 shrink-0 ${
                      article.published
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {article.published ? "Publié" : "Brouillon"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          {!stats?.recentArticles?.length && (
            <Card className="border-0 shadow-sm">
              <CardContent className="text-center py-8 text-muted-foreground text-sm">
                Aucun article pour le moment
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Category distribution */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Répartition par catégorie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats?.categories?.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={getCategoryColor(cat.name)}
                  >
                    {cat.name}
                  </Badge>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  {cat.count}
                </span>
              </div>
            ))}
            {!stats?.categories?.length && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Aucune catégorie
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Actions rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/admin/articles/new">
              <Button variant="outline" className="w-full h-12 gap-2 text-sm">
                <Plus className="h-4 w-4" />
                Créer un article
              </Button>
            </Link>
            <Link href="/admin/articles">
              <Button variant="outline" className="w-full h-12 gap-2 text-sm">
                <FileText className="h-4 w-4" />
                Gérer les articles
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full h-12 gap-2 text-sm">
                <TrendingUp className="h-4 w-4" />
                Paramètres
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
