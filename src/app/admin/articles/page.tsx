"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Loader2,
  FileText,
} from "lucide-react";
import { categories, categoryColors } from "@/lib/data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  authorName: string;
  published: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== "all") params.set("category", categoryFilter);
      if (statusFilter !== "all") params.set("published", statusFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/articles?${params.toString()}`);
      if (res.ok) {
        setArticles(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, statusFilter, search]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/articles/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== deleteId));
        setDeleteId(null);
        window.dispatchEvent(new CustomEvent("articles-refresh"));
      }
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
          <p className="text-muted-foreground mt-1">
            Gérer vos articles publiés et brouillons
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="bg-red-600 hover:bg-red-700 text-white shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un article..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="true">Publiés</SelectItem>
                <SelectItem value="false">Brouillons</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Articles table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-red-600" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Titre</TableHead>
                  <TableHead className="hidden md:table-cell">Auteur</TableHead>
                  <TableHead className="hidden sm:table-cell">Catégorie</TableHead>
                  <TableHead className="hidden lg:table-cell">Statut</TableHead>
                  <TableHead className="text-right pr-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="pl-4 max-w-sm">
                      <div>
                        <p className="font-medium truncate max-w-xs">
                          {article.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {format(
                            new Date(article.createdAt),
                            "dd MMM yyyy",
                            { locale: fr }
                          )}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {article.authorName}
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
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        <Badge
                          variant="secondary"
                          className={
                            article.published
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          }
                        >
                          {article.published ? "Publié" : "Brouillon"}
                        </Badge>
                        {article.isFeatured && (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                            À la une
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/admin/articles/${article.id}/edit`
                              )
                            }
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteId(article.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {!articles.length && !loading && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-12 text-muted-foreground"
                    >
                      <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
                      <p>Aucun article trouvé</p>
                      <Link href="/admin/articles/new">
                        <Button
                          variant="link"
                          className="text-red-600 mt-2"
                        >
                          Créer votre premier article
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cet article ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L&apos;article sera définitivement
              supprimé de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
