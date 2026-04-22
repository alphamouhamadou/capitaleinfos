"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Save, User, Lock, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const [loadingName, setLoadingName] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [nameForm, setNameForm] = useState({
    name: session?.user?.name || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingName(true);
    setNameSuccess(false);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameForm.name }),
      });

      if (res.ok) {
        setNameSuccess(true);
        updateSession({ name: nameForm.name });
        setTimeout(() => setNameSuccess(false), 3000);
      }
    } catch {
      // handle error
    } finally {
      setLoadingName(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoadingPassword(true);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPasswordSuccess(true);
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        setPasswordError(data.error || "Une erreur est survenue");
      }
    } catch {
      setPasswordError("Erreur de connexion au serveur");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-muted-foreground mt-1">
          Gérer votre compte administrateur
        </p>
      </div>

      {/* Profile info */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-50">
              <User className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-base">Profil</CardTitle>
              <CardDescription className="text-sm">
                {session?.user?.email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nom d&apos;affichage
              </Label>
              <Input
                id="name"
                value={nameForm.name}
                onChange={(e) =>
                  setNameForm({ name: e.target.value })
                }
                required
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={loadingName}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {loadingName ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Enregistrer
              </Button>
              {nameSuccess && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Nom mis à jour
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Password change */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50">
              <Lock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <CardTitle className="text-base">Mot de passe</CardTitle>
              <CardDescription className="text-sm">
                Modifier votre mot de passe
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium">
                  Mot de passe actuel
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                  className="max-w-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">
                  Nouveau mot de passe
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Minimum 6 caractères"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  required
                  className="max-w-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirmer le nouveau mot de passe
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  className="max-w-sm"
                />
              </div>
            </div>

            {passwordError && (
              <p className="text-sm text-red-600">{passwordError}</p>
            )}

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={loadingPassword}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                {loadingPassword ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Lock className="h-4 w-4 mr-2" />
                )}
                Changer le mot de passe
              </Button>
              {passwordSuccess && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Mot de passe mis à jour
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
