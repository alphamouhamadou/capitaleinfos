import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  return {
    id: (session.user as { id?: string }).id,
    email: session.user.email,
    name: session.user.name,
    role: (session.user as { role?: string }).role,
  };
}
