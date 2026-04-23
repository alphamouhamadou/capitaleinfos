import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/editors — List all users (admin + editors)
export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Only "admin" role can manage editors
    if (admin.role !== "admin") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const users = await db.admin.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// POST /api/admin/editors — Add a new editor
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    if (admin.role !== "admin") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nom, email et mot de passe sont requis" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await db.admin.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Un compte avec cet email existe déjà" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "editor",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Create editor error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/editors — Delete an editor (not the last admin)
export async function DELETE(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    if (admin.role !== "admin") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    // Prevent self-deletion
    if (userId === admin.id) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas supprimer votre propre compte" },
        { status: 400 }
      );
    }

    // Prevent deletion if it's the last admin
    const targetUser = await db.admin.findUnique({ where: { id: userId } });
    if (!targetUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    if (targetUser.role === "admin") {
      const adminCount = await db.admin.count({ where: { role: "admin" } });
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Impossible de supprimer le dernier administrateur" },
          { status: 400 }
        );
      }
    }

    await db.admin.delete({ where: { id: userId } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
