"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Save, ArrowLeft, Upload, ImageIcon, X, Plus, Trash2 } from "lucide-react";
import { categories } from "@/lib/category-utils";

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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const [imageMode, setImageMode] = useState<"upload" | "url">(
    initialData?.image?.startsWith("http") ? "url" : "upload"
  );
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "",
    authorName: initialData?.authorName || "",
    authorRole: initialData?.authorRole || "",
    image: initialData?.image || "",
    readTime: initialData?.readTime || 3,
    isFeatured: initialData?.isFeatured || false,
    isTrending: initialData?.isTrending || false,
    published: initialData?.published ?? true,
  });

  const updateField = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image trop volumineuse (max 5 Mo).");
      return;
    }

    setUploading(true);
    setError("");

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: uploadData });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
      } else {
        const data = await res.json();
        setError(data.error || "Erreur lors du téléversement");
        setImagePreview("");
      }
    } catch {
      setError("Erreur de connexion");
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setImagePreview("");
  };

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
        window.dispatchEvent(new CustomEvent("articles-refresh"));
        router.push("/admin/articles");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Une erreur est survenue");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-[calc(100vh-8rem)]">
      {/* ── Error banner ── */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      {/* ── FIELDS ── */}
      <div className="flex-1 space-y-5 pb-24 lg:pb-4">

        {/* 1 ─ Titre */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-semibold">
            Titre *
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

        {/* 2 ─ Résumé */}
        <div className="space-y-2">
          <Label htmlFor="excerpt" className="text-sm font-semibold">
            Résumé
          </Label>
          <Textarea
            id="excerpt"
            placeholder="Un court résumé de l'article (optionnel)..."
            value={formData.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            rows={2}
          />
        </div>

        {/* 3 ─ Contenu */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Contenu *</Label>
          <Textarea
            placeholder="Saisissez le contenu de l'article..."
            value={formData.content}
            onChange={(e) => updateField("content", e.target.value)}
            required
            rows={12}
            className="min-h-[200px] lg:min-h-[350px]"
          />
        </div>

        {/* 4 ─ Image */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Image de l'article</Label>

          {/* Preview */}
          {imagePreview && (
            <div className="relative aspect-video w-full max-w-md rounded-xl overflow-hidden border border-border/50">
              <Image
                src={imagePreview}
                alt="Aperçu"
                fill
                className="object-cover"
                sizes="500px"
                unoptimized
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Upload toggle */}
          <div className="flex rounded-lg border overflow-hidden w-fit">
            <button
              type="button"
              onClick={() => setImageMode("upload")}
              className={`px-4 py-2 text-xs font-semibold transition-colors ${
                imageMode === "upload"
                  ? "bg-red-600 text-white"
                  : "bg-background text-muted-foreground"
              }`}
            >
              Téléverser
            </button>
            <button
              type="button"
              onClick={() => setImageMode("url")}
              className={`px-4 py-2 text-xs font-semibold transition-colors ${
                imageMode === "url"
                  ? "bg-red-600 text-white"
                  : "bg-background text-muted-foreground"
              }`}
            >
              URL
            </button>
          </div>

          {/* Upload input */}
          {imageMode === "upload" && (
            <label
              className={`flex flex-col items-center justify-center gap-1.5 h-28 w-full max-w-md rounded-xl border-2 border-dashed border-border/60 cursor-pointer transition-colors hover:border-red-400 hover:bg-red-50/30 ${uploading ? "opacity-50 pointer-events-none" : ""}`}
            >
              {uploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-red-500" />
              ) : (
                <Upload className="h-6 w-6 text-muted-foreground" />
              )}
              <span className="text-xs text-muted-foreground">
                {uploading ? "Téléversement..." : "Appuyer pour sélectionner"}
              </span>
              <span className="text-[10px] text-muted-foreground/50">JPG, PNG, WebP — Max 5 Mo</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                className="sr-only"
                disabled={uploading}
              />
            </label>
          )}

          {/* URL input */}
          {imageMode === "url" && (
            <Input
              placeholder="https://exemple.com/image.jpg"
              value={imageMode === "url" && !formData.image.startsWith("/uploads/") ? formData.image : ""}
              onChange={(e) => {
                updateField("image", e.target.value);
                setImagePreview(e.target.value);
              }}
              className="max-w-md h-11"
            />
          )}
        </div>

        {/* 5 ─ Catégorie + Temps de lecture (côte à côte) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Catégorie *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => updateField("category", value)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="readTime" className="text-sm font-semibold">
              Lecture (min)
            </Label>
            <Input
              id="readTime"
              type="number"
              min={1}
              value={formData.readTime}
              onChange={(e) => updateField("readTime", parseInt(e.target.value) || 1)}
              className="h-11"
            />
          </div>
        </div>

        {/* 6 ─ Auteur (côte à côte) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="authorName" className="text-sm font-semibold">
              Auteur
            </Label>
            <Input
              id="authorName"
              placeholder="Aminata Diallo"
              value={formData.authorName}
              onChange={(e) => updateField("authorName", e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="authorRole" className="text-sm font-semibold">
              Rôle
            </Label>
            <Input
              id="authorRole"
              placeholder="Rédactrice en chef"
              value={formData.authorRole}
              onChange={(e) => updateField("authorRole", e.target.value)}
              className="h-11"
            />
          </div>
        </div>

        {/* 7 ─ Toggles (rangés sur une ligne) */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 p-4 rounded-xl bg-muted/40 border border-border/30">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => updateField("published", e.target.checked)}
              className="h-4 w-4 rounded border-border accent-red-600"
            />
            <span className="text-sm font-medium">Publié</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => updateField("isFeatured", e.target.checked)}
              className="h-4 w-4 rounded border-border accent-red-600"
            />
            <span className="text-sm font-medium">À la une</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => updateField("isTrending", e.target.checked)}
              className="h-4 w-4 rounded border-border accent-red-600"
            />
            <span className="text-sm font-medium">Tendance</span>
          </label>
        </div>
      </div>

      {/* ── STICKY BOTTOM BAR — always visible on mobile ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border/40 p-3 sm:static sm:backdrop-blur-none sm:bg-transparent sm:border-0 sm:pt-4 lg:pt-2">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <Button
            type="button"
            variant="outline"
            className="flex-shrink-0 h-11"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Retour</span>
          </Button>
          <Button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-base sm:flex-none sm:px-8"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEdit ? "Enregistrer" : "Publier"}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
