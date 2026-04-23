"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut, SessionProvider } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Menu,
  ArrowLeft,
  ChevronRight,
  Users,
} from "lucide-react";

const navItems = [
  {
    label: "Tableau de bord",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Articles",
    href: "/admin/articles",
    icon: FileText,
  },
  {
    label: "Éditeurs",
    href: "/admin/editors",
    icon: Users,
  },
  {
    label: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
];

function SidebarContent() {
  const pathname = usePathname();
  const sessionResult = useSession();
  const session = sessionResult?.data;

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 flex items-center gap-3">
        <div className="relative w-10 h-10 shrink-0">
          <Image
            src="/img/logo-capitale-infos.jpg"
            alt="Capitale Infos"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-bold text-base leading-tight">Capitale Infos</h2>
          <p className="text-xs text-muted-foreground">Administration</p>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-red-600 text-white shadow-md"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
                {isActive && (
                  <ChevronRight className="h-4 w-4 ml-auto opacity-70" />
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* User info & logout */}
      <div className="p-3 space-y-1">
        {session?.user && (
          <div className="px-3 py-2 text-xs text-muted-foreground">
            <p className="font-medium text-foreground truncate">
              {session.user.name}
            </p>
            <p className="truncate">{session.user.email}</p>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-all w-full"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}

function AdminLayoutInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const status = sessionResult?.status || "loading";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [status, pathname, router]);

  // Login page gets its own full layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r flex-col shadow-sm shrink-0">
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b flex items-center px-4 lg:px-6 shrink-0">
          {/* Mobile menu */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden mr-3"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <SidebarContent />
            </SheetContent>
          </Sheet>

          {/* Breadcrumb / page title */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Retour au site</span>
            </button>
            <ChevronRight className="h-3 w-3 hidden sm:block" />
            <span className="text-foreground font-medium">
              {navItems.find(
                (item) =>
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href)
              )?.label || "Administration"}
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Mobile user */}
          <div className="lg:hidden text-xs text-muted-foreground">
            {session?.user?.name}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}
