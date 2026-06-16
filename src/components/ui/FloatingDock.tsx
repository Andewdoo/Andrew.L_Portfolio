"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";

import { cn } from "@/lib/utils";

type DockItem = {
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

const dockItems: DockItem[] = [
  {
    href: "https://github.com/",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:hello@example.com",
    icon: Mail,
    label: "Email",
  },
];

export function FloatingDock() {
  return (
    <motion.nav
      aria-label="Social links"
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-black/55 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
        {dockItems.map((item) => {
          const Icon = item.icon;

          return (
            <motion.a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className={cn(
                "group relative flex size-11 items-center justify-center rounded-xl",
                "border border-white/10 bg-zinc-950/90 text-zinc-300",
                "transition-colors hover:border-white/25 hover:text-white"
              )}
              whileHover={{ scale: 1.28, y: -12 }}
              whileTap={{ scale: 0.96, y: -4 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span className="pointer-events-none absolute -top-9 rounded-md border border-white/10 bg-zinc-950 px-2 py-1 text-xs text-zinc-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </motion.a>
          );
        })}
      </div>
    </motion.nav>
  );
}
