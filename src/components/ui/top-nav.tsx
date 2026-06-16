"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function TopNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900/90 bg-black/55 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-zinc-100"
        >
          Andrew L.
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden rounded-md px-3 py-2 text-sm text-zinc-400 hover:text-zinc-50 md:inline-flex"
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              "ml-2 inline-flex size-9 items-center justify-center rounded-md border border-zinc-900",
              "bg-black/40 text-zinc-300 hover:border-zinc-700 hover:text-zinc-50",
              "dark:bg-zinc-950/80"
            )}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
