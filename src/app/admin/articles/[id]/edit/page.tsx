"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ArticleForm from "@/components/admin/article-form";
import { Loader2 } from "lucide-react";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<{
    id: string;
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
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/admin/articles/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setArticle(data);
        } else {
          router.push("/admin/articles");
        }
      } catch {
        router.push("/admin/articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!article) return null;

  return <ArticleForm initialData={article} isEdit />;
}
