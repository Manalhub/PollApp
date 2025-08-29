"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Polls", href: "/polls" },
    { name: "Create Poll", href: "/create-poll" },
  ];

  return (
    <header className="border-b bg-[hsl(var(--background))] sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">Polly</Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[hsl(var(--primary))]",
                  pathname === item.href
                    ? "text-[hsl(var(--foreground))] font-semibold"
                    : "text-[hsl(var(--muted-foreground))]"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/auth/login" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-[hsl(var(--primary))]",
              pathname === "/auth/login" || pathname === "/auth/register"
                ? "text-[hsl(var(--foreground))] font-semibold"
                : "text-[hsl(var(--muted-foreground))]"
            )}
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}