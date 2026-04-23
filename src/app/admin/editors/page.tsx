"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserPlus,
  Trash2,
  Shield,
  PenTool,
  Loader2,
  CheckCircle2,
  Users,
} from "lucide-react";

interface UserItem {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function EditorsPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor",
  });

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/editors");
      if (res.ok) {
        setUsers(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Only admin can access this page
  const isAdmin = (session?.user as { role?: string })?.role === "admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/editors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(`${data.name} a été ajouté avec succès`);
        setForm({ name: "", email: "", password: "", role: "editor" });
        fetchUsers();
        setTimeout(() => setSuccess(""), 4000);
      } else {
        setFormError(data.error || "Une erreur est survenue");
      }
    } catch {
      setFormError("Erreur de connexion au serveur");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/editors?id=${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== deleteId));
        setDeleteId(null);
      } else {
        const data = await res.json();
        setFormError(data.error || "Impossible de supprimer");
      }
    } catch {
      setFormError("Erreur de connexion au serveur");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-16">
        <Shield className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
        <h2 className="text-lg font-semibold text-gray-900">Accès restreint</h2>
        <p className="text-muted-foreground mt-1">
          Seul l&apos;administrateur principal peut gérer les éditeurs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Gestion des éditeurs
        </h1>
        <p className="text-muted-foreground mt-1">
          Ajouter et gérer les comptes rédacteurs de la plateforme
        </p>
      </div>

      {/* Add editor form */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-50">
              <UserPlus className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-base">Ajouter un éditeur</CardTitle>
              <CardDescription className="text-sm">
                Créer un nouveau compte pour un rédacteur ou un administrateur
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editor-name" className="text-sm font-medium">
                  Nom complet *
                </Label>
                <Input
                  id="editor-name"
                  placeholder="Aminata Diallo"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editor-email" className="text-sm font-medium">
                  Email *
                </Label>
                <Input
                  id="editor-email"
                  type="email"
                  placeholder="aminata@capitaleinfos.sn"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editor-password" className="text-sm font-medium">
                  Mot de passe *
                </Label>
                <Input
                  id="editor-password"
                  type="password"
                  placeholder="Minimum 6 caractères"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editor-role" className="text-sm font-medium">
                  Rôle
                </Label>
                <Select
                  value={form.role}
                  onValueChange={(value) => setForm({ ...form, role: value })}
                >
                  <SelectTrigger id="editor-role">
                    <SelectValue placeholder="Choisir un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">
                      <span className="flex items-center gap-2">
                        <PenTool className="h-3.5 w-3.5" />
                        Éditeur (rédacteur)
                      </span>
                    </SelectItem>
                    <SelectItem value="admin">
                      <span className="flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5" />
                        Administrateur
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formError && (
              <p className="text-sm text-red-600">{formError}</p>
            )}

            {success && (
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
                <CheckCircle2 className="h-4 w-4" />
                {success}
              </div>
            )}

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                Ajouter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Users list */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-base">
                Comptes existants ({users.length})
              </CardTitle>
              <CardDescription className="text-sm">
                Liste de tous les administrateurs et éditeurs
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Aucun utilisateur enregistré
            </p>
          ) : (
            <div className="space-y-3">
              {users.map((user) => {
                const isCurrentUser = user.id === (session?.user as { id?: string })?.id;
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${
                          user.role === "admin"
                            ? "bg-gradient-to-br from-red-500 to-red-700"
                            : "bg-gradient-to-br from-blue-500 to-blue-700"
                        }`}
                      >
                        {user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">
                            {user.name}
                          </span>
                          {isCurrentUser && (
                            <Badge variant="secondary" className="text-[10px] bg-muted">
                              Vous
                            </Badge>
                          )}
                          <Badge
                            variant="secondary"
                            className={`text-[10px] ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-700 hover:bg-red-100"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                            }`}
                          >
                            {user.role === "admin" ? (
                              <span className="flex items-center gap-1">
                                <Shield className="h-2.5 w-2.5" />
                                Admin
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <PenTool className="h-2.5 w-2.5" />
                                Éditeur
                              </span>
                            )}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {!isCurrentUser && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-red-600 shrink-0"
                        onClick={() => setDeleteId(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cet utilisateur ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L&apos;utilisateur ne pourra plus
              se connecter à la plateforme.
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
