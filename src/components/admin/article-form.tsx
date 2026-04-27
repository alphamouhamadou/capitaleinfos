"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import { Loader2, Save, ArrowLeft, Upload, X } from "lucide-react";
import { categories } from "@/lib/category-utils";
import { useState, useMemo } from "react";
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
    videoUrl?: string;
    readTime: number;
    isFeatured: boolean;
    isTrending: boolean;
    published: boolean;
  };
  isEdit?: boolean;
}
/** Convertit une URL YouTube/Dailymotion en URL embed */
function VideoEmbed({ url }: { url: string }) {
  const embedUrl = useMemo(() => {
    try {
      // YouTube watch URL
      let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
      if (match) return `https://www.youtube.com/embed/${match[1]}`;

      // YouTube shorts
      match = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (match) return `https://www.youtube.com/embed/${match[1]}`;

      // Dailymotion
      match = url.match(/dailymotion\.com\/video\/([a-zA-Z0-9]+)/);
      if (match) return `https://www.dailymotion.com/embed/video/${match[1]}`;

      return null;
    } catch {
      return null;
    }
  }, [url]);

  if (!embedUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/60 text-xs p-3 text-center">
        Aperçu non disponible pour ce lien
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Vidéo"
    />
  );
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
    videoUrl: initialData?.videoUrl || "",
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
    if (loading || uploading) return;
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
    <form onSubmit={handleSubmit} className="pb-20 sm:pb-0">
      {/* ── Error ── */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-5">

        {/* 1 ─ Titre */}
        <div className="space-y-2">
          <Label htmlFor="f-title" className="text-sm font-semibold">Titre *</Label>
          <Input
            id="f-title"
            placeholder="Titre de l'article..."
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
            className="text-lg h-12"
            autoComplete="off"
          />
        </div>

        {/* 2 ─ Résumé */}
        <div className="space-y-2">
          <Label htmlFor="f-excerpt" className="text-sm font-semibold">Résumé</Label>
          <Textarea
            id="f-excerpt"
            placeholder="Court résumé (optionnel)..."
            value={formData.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            rows={2}
          />
        </div>

        {/* 3 ─ Contenu */}
        <div className="space-y-2">
          <Label htmlFor="f-content" className="text-sm font-semibold">Contenu *</Label>
          <textarea
            id="f-content"
            placeholder="Contenu de l'article..."
            value={formData.content}
            onChange={(e) => updateField("content", e.target.value)}
            required
            rows={12}
            className="w-full min-h-[200px] rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* 4 ─ Image */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Image</Label>

          {imagePreview && (
            <div className="relative aspect-video w-full max-w-sm rounded-xl overflow-hidden border border-border/50">
              <Image
                src={imagePreview}
                alt="Aperçu"
                fill
                className="object-cover"
                sizes="400px"
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

          <div className="flex rounded-lg border overflow-hidden w-fit">
            <button
              type="button"
              onClick={() => setImageMode("upload")}
              className={`px-4 py-2 text-xs font-semibold ${
                imageMode === "upload" ? "bg-red-600 text-white" : "bg-background text-muted-foreground"
              }`}
            >
              Téléverser
            </button>
            <button
              type="button"
              onClick={() => setImageMode("url")}
              className={`px-4 py-2 text-xs font-semibold ${
                imageMode === "url" ? "bg-red-600 text-white" : "bg-background text-muted-foreground"
              }`}
            >
              URL
            </button>
          </div>

          {/* Upload — input natif, pas de label wrapper */}
          {imageMode === "upload" && (
            <div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                disabled={uploading}
                className="block w-full max-w-sm text-sm text-muted-foreground file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 file:cursor-pointer file:touch-manipulation disabled:opacity-50"
              />
              {uploading && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" /> Téléversement...
                </p>
              )}
            </div>
          )}

          {imageMode === "url" && (
            <Input
              placeholder="https://exemple.com/image.jpg"
              value={imageMode === "url" && !formData.image.startsWith("/uploads/") ? formData.image : ""}
              onChange={(e) => {
                updateField("image", e.target.value);
                setImagePreview(e.target.value);
              }}
              className="max-w-sm h-11"
            />
          )}
        </div>
        {/* 4b ─ Vidéo */}
<div className="space-y-3">
  <Label className="text-sm font-semibold">Vidéo (optionnel)</Label>
  <Input
    placeholder="https://www.youtube.com/watch?v=..."
    value={formData.videoUrl}
    onChange={(e) => updateField("videoUrl", e.target.value)}
    className="max-w-sm h-11"
    autoComplete="off"
  />
  <p className="text-xs text-muted-foreground">
    Collez un lien YouTube, Dailymotion ou tout autre lien vidéo. La vidéo s&apos;affichera dans l&apos;article.
  </p>

  {/* Preview vidéo */}
  {formData.videoUrl && (
    <div className="w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-border/50 bg-black">
      <VideoEmbed url={formData.videoUrl} />
    </div>
  )}
</div>
        {/* 5 ─ Catégorie + Lecture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Catégorie *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => updateField("category", value)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent position="popper">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="f-readTime" className="text-sm font-semibold">Lecture (min)</Label>
            <Input
              id="f-readTime"
              type="number"
              min={1}
              inputMode="numeric"
              value={formData.readTime}
              onChange={(e) => updateField("readTime", parseInt(e.target.value) || 1)}
              className="h-12"
            />
          </div>
        </div>

        {/* 6 ─ Auteur + Rôle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="f-author" className="text-sm font-semibold">Auteur</Label>
            <Input
              id="f-author"
              placeholder="Aminata Diallo"
              value={formData.authorName}
              onChange={(e) => updateField("authorName", e.target.value)}
              className="h-12"
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="f-role" className="text-sm font-semibold">Rôle</Label>
            <Input
              id="f-role"
              placeholder="Rédactrice en chef"
              value={formData.authorRole}
              onChange={(e) => updateField("authorRole", e.target.value)}
              className="h-12"
              autoComplete="off"
            />
          </div>
        </div>

        {/* 7 ─ Toggles */}
        <div className="flex flex-wrap gap-x-6 gap-y-4 p-4 rounded-xl bg-muted/30">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => updateField("published", e.target.checked)}
              className="h-5 w-5 rounded accent-red-600"
            />
            <span className="text-sm font-medium">Publié</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => updateField("isFeatured", e.target.checked)}
              className="h-5 w-5 rounded accent-red-600"
            />
            <span className="text-sm font-medium">À la une</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => updateField("isTrending", e.target.checked)}
              className="h-5 w-5 rounded accent-red-600"
            />
            <span className="text-sm font-medium">Tendance</span>
          </label>
        </div>
      </div>

      {/* ── BOTTOM BAR — sticky, PAS fixed ── */}
      <div className="sticky bottom-0 z-40 mt-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-background border-t border-border/40">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-12 px-4"
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
