"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Polls", href: "/polls" },
    { name: "Create Poll", href: "/create-poll" },
  ];

  return (
    <header className="border-b bg-[hsl(var(--background))] sticky top-0 z-40 shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-gradient flex items-center">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 12H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Polly
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[hsl(var(--primary))] focus-ring rounded-md px-3 py-2",
                    pathname === item.href
                      ? "text-[hsl(var(--foreground))] font-semibold bg-[hsl(var(--accent))]"
                      : "text-[hsl(var(--muted-foreground))]"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ModeToggle />
            
            {/* Sign In Button */}
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/login">
                Sign In
              </Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[hsl(var(--border))] page-transition">
            <nav className="py-4 flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors px-4 py-3 rounded-md",
                    pathname === item.href
                      ? "text-[hsl(var(--foreground))] font-semibold bg-[hsl(var(--accent))]"
                      : "text-[hsl(var(--muted-foreground))]"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}