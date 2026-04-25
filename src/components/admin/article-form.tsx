"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import { Separator } from "@/components/ui/separator";
import { Loader2, Save, ArrowLeft, Upload, Image as ImageIcon, Link, X } from "lucide-react";
import { categories } from "@/lib/data";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      setError("Type de fichier non autorisé. Utilisez JPG, PNG, GIF ou WebP.");
      return;
    }

    // Validate size
    if (file.size > 5 * 1024 * 1024) {
      setError("L'image est trop volumineuse. Taille maximale : 5 Mo.");
      return;
    }

    setUploading(true);
    setError("");

    // Show local preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

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
      setError("Erreur de connexion au serveur");
      setImagePreview("");
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
    setImagePreview(url);
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
    <form onSubmit={handleSubmit} className="space-y-4 pb-24 lg:pb-6">
      {/* Header - Mobile friendly: stack vertically on small screens */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 h-11 w-11"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
            {isEdit ? "Modifier l'article" : "Nouvel article"}
          </h1>
        </div>
        {/* Desktop publish button (hidden on mobile, shown in sticky footer) */}
        <Button
          type="submit"
          disabled={loading || uploading}
          className="hidden lg:flex bg-red-600 hover:bg-red-700 text-white shadow-md h-11 px-6"
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
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Title */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 lg:p-6 space-y-4">
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
                  className="text-base sm:text-lg h-12"
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
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Contenu *
                </Label>
                <div className="min-h-[200px] sm:min-h-[300px] border rounded-lg overflow-hidden">
                  <textarea
                    placeholder="Saisissez le contenu de l'article en Markdown..."
                    value={formData.content}
                    onChange={(e) => updateField("content", e.target.value)}
                    required
                    className="w-full min-h-[200px] sm:min-h-[300px] p-4 text-sm sm:text-base resize-y focus:outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 lg:space-y-6">
          {/* Publishing */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Publication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
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
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
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
                  className="h-12"
                />
              </div>
            </CardContent>
          </Card>

          {/* Image */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Image de l&apos;article
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mode toggle */}
              <div className="flex rounded-lg border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                    imageMode === "upload"
                      ? "bg-red-600 text-white"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  Téléverser
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                    imageMode === "url"
                      ? "bg-red-600 text-white"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Link className="h-4 w-4" />
                  URL
                </button>
              </div>

              {/* Image preview */}
              {imagePreview && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50">
                  <Image
                    src={imagePreview}
                    alt="Aperçu de l'image"
                    fill
                    className="object-cover"
                    sizes="400px"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 h-9 w-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Upload mode */}
              {imageMode === "upload" && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-28 sm:h-24 border-dashed flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="text-sm">Téléversement en cours...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-sm font-medium">
                          Appuyer pour sélectionner
                        </span>
                        <span className="text-xs text-muted-foreground/60">
                          JPG, PNG, GIF, WebP — Max 5 Mo
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* URL mode */}
              {imageMode === "url" && (
                <div className="space-y-2">
                  <Label htmlFor="image-url" className="text-sm">
                    URL de l&apos;image
                  </Label>
                  <Input
                    id="image-url"
                    placeholder="https://exemple.com/image.jpg"
                    value={imageMode === "url" && !formData.image.startsWith("/uploads/") ? formData.image : ""}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="h-12"
                  />
                </div>
              )}

              {!imagePreview && (
                <p className="text-xs text-muted-foreground/60 text-center">
                  Aucune image sélectionnée — une image par défaut sera utilisée
                </p>
              )}
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
                  className="h-12"
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
                  className="h-12"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky publish button for mobile */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/95 backdrop-blur-md border-t border-border p-3 z-40 shadow-lg">
        <Button
          type="submit"
          disabled={loading || uploading}
          className="w-full h-12 bg-red-600 hover:bg-red-700 text-white shadow-md text-base font-semibold"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <Save className="h-5 w-5 mr-2" />
          )}
          {isEdit ? "Enregistrer" : "Publier l'article"}
        </Button>
      </div>
    </form>
  );
}
