import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = (session.user as { id?: string }).id;
    const body = await request.json();
    const { name, currentPassword, newPassword } = body;

    if (name) {
      await db.admin.update({
        where: { id: userId },
        data: { name },
      });
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Le mot de passe actuel est requis" },
          { status: 400 }
        );
      }

      const admin = await db.admin.findUnique({ where: { id: userId } });
      if (!admin) {
        return NextResponse.json(
          { error: "Admin non trouvé" },
          { status: 404 }
        );
      }

      const isValid = await bcrypt.compare(currentPassword, admin.password);
      if (!isValid) {
        return NextResponse.json(
          { error: "Mot de passe actuel incorrect" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.admin.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
