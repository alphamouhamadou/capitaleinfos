"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  CheckCircle2,
  FileEdit,
  TrendingUp,
  Plus,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { categoryColors } from "@/lib/data";
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
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, {session.user?.name} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue dans votre espace de gestion
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="bg-red-600 hover:bg-red-700 text-white shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="text-3xl font-bold mt-1">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${card.bg}`}>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent articles & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent articles */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead className="hidden sm:table-cell">Catégorie</TableHead>
                  <TableHead className="hidden md:table-cell">Statut</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats?.recentArticles?.map((article) => (
                  <TableRow key={article.id} className="cursor-pointer" onClick={() => router.push(`/admin/articles/${article.id}/edit`)}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {article.title}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant="secondary"
                        className={
                          categoryColors[
                            article.category as keyof typeof categoryColors
                          ] || ""
                        }
                      >
                        {article.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
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
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm whitespace-nowrap">
                      {format(new Date(article.createdAt), "dd MMM yyyy", {
                        locale: fr,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
                {!stats?.recentArticles?.length && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Aucun article pour le moment
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

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
                      className={
                        categoryColors[
                          cat.name as keyof typeof categoryColors
                        ] || ""
                      }
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
      </div>

      {/* Quick actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Actions rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/articles/new">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Créer un article
              </Button>
            </Link>
            <Link href="/admin/articles">
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Gérer les articles
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="gap-2">
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
