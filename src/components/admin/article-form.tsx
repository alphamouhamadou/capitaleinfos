"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { categories, categoryColors } from "@/lib/data";
import dynamic from "next/dynamic";

// Dynamically import the MDX editor to avoid SSR issues
const MDXEditor = dynamic(
  () => import("@mdxeditor/editor").then((mod) => {
    // Need to explicitly import the plugin as well
    return { default: mod.MDXEditor };
  }),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse" /> }
);

interface ArticleFormProps {
  initialData?: {
    id?: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    authorName: string;
    authorRole: string;
    image: string;
    readTime: number;
    isFeatured: boolean;
    isTrending: boolean;
    published: boolean;
  };
  isEdit?: boolean;
}

export default function ArticleForm({ initialData, isEdit = false }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "",
    authorName: initialData?.authorName || "",
    authorRole: initialData?.authorRole || "",
    image: initialData?.image || "/img/hero-dakar.jpg",
    readTime: initialData?.readTime || 3,
    isFeatured: initialData?.isFeatured || false,
    isTrending: initialData?.isTrending || false,
    published: initialData?.published ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = initialData?.id
        ? `/api/admin/articles/${initialData.id}`
        : "/api/admin/articles";
      const method = initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Dispatch custom event so the public ArticlesProvider can refresh
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("articles-refresh"));
        }
        router.push("/admin/articles");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Une erreur est survenue");
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Modifier l'article" : "Nouvel article"}
          </h1>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white shadow-md"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {isEdit ? "Enregistrer" : "Publier"}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Titre de l&apos;article *
                </Label>
                <Input
                  id="title"
                  placeholder="Saisissez le titre de l'article..."
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-sm font-medium">
                  Résumé *
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="Saisissez un résumé de l'article..."
                  value={formData.excerpt}
                  onChange={(e) => updateField("excerpt", e.target.value)}
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Contenu *
                </Label>
                <div className="min-h-[300px] border rounded-lg overflow-hidden">
                  <textarea
                    placeholder="Saisissez le contenu de l'article en Markdown..."
                    value={formData.content}
                    onChange={(e) => updateField("content", e.target.value)}
                    required
                    className="w-full min-h-[300px] p-4 text-sm resize-y focus:outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Publication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published" className="text-sm">
                  Publié
                </Label>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    updateField("published", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="featured" className="text-sm">
                  À la une
                </Label>
                <Switch
                  id="featured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) =>
                    updateField("isFeatured", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="trending" className="text-sm">
                  Tendance
                </Label>
                <Switch
                  id="trending"
                  checked={formData.isTrending}
                  onCheckedChange={(checked) =>
                    updateField("isTrending", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Category & Meta */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Catégorie & Métadonnées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Catégorie *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => updateField("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              cat === "Politique"
                                ? "bg-red-500"
                                : cat === "Économie"
                                ? "bg-amber-500"
                                : cat === "Sport"
                                ? "bg-green-500"
                                : cat === "Culture"
                                ? "bg-purple-500"
                                : cat === "Société"
                                ? "bg-teal-500"
                                : cat === "International"
                                ? "bg-orange-500"
                                : "bg-emerald-500"
                            }`}
                          />
                          {cat}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm">
                  URL de l&apos;image
                </Label>
                <Input
                  id="image"
                  placeholder="/img/hero-dakar.jpg"
                  value={formData.image}
                  onChange={(e) => updateField("image", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime" className="text-sm">
                  Temps de lecture (min)
                </Label>
                <Input
                  id="readTime"
                  type="number"
                  min={1}
                  value={formData.readTime}
                  onChange={(e) =>
                    updateField("readTime", parseInt(e.target.value) || 1)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Author */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Auteur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="authorName" className="text-sm">
                  Nom de l&apos;auteur *
                </Label>
                <Input
                  id="authorName"
                  placeholder="Aminata Diallo"
                  value={formData.authorName}
                  onChange={(e) => updateField("authorName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorRole" className="text-sm">
                  Rôle de l&apos;auteur *
                </Label>
                <Input
                  id="authorRole"
                  placeholder="Rédactrice en chef"
                  value={formData.authorRole}
                  onChange={(e) => updateField("authorRole", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
