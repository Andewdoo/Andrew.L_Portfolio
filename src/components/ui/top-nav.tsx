"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#education", label: "Education" },
];

export function TopNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const handleSectionClick = (href: string) => {
    const section = document.getElementById(href.slice(1));

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
      setMobileOpen(false);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900/90 bg-black/55 backdrop-blur-xl">
      <nav className="site-shell flex h-18 w-full items-center justify-between">
        <Link
          href="/"
          className="font-mono text-[0.95rem] font-medium uppercase tracking-[0.2em] text-zinc-100"
          onClick={() => setMobileOpen(false)}
        >
          Andrew L.
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                handleSectionClick(item.href);
              }}
              className="hidden rounded-md px-3.5 py-2 text-[0.95rem] text-zinc-400 hover:text-zinc-50 md:inline-flex"
            >
              {item.label}
            </a>
          ))}

          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              "ml-2 inline-flex size-10 items-center justify-center rounded-md border border-zinc-900",
              "bg-black/40 text-zinc-300 hover:border-zinc-700 hover:text-zinc-50",
              "dark:bg-zinc-950/80"
            )}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className={cn(
              "ml-1 inline-flex size-10 items-center justify-center rounded-md border border-zinc-900 md:hidden",
              "bg-black/40 text-zinc-300 hover:border-zinc-700 hover:text-zinc-50",
              "dark:bg-zinc-950/80"
            )}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="border-t border-zinc-900/90 bg-black/90 shadow-2xl shadow-black/40 md:hidden"
            initial={{ opacity: 0, y: "-0.5rem" }}
            animate={{ opacity: 1, y: "0rem" }}
            exit={{ opacity: 0, y: "-0.5rem" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="site-shell grid gap-2 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSectionClick(item.href);
                  }}
                  className="rounded-lg border border-zinc-900 bg-zinc-950/70 px-4 py-3 text-base font-medium text-zinc-300 hover:border-zinc-700 hover:text-zinc-50"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
