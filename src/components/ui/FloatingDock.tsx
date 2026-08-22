"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";

import { cn } from "@/lib/utils";

type DockItem = {
  kind: "link";
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

const dockItems: DockItem[] = [
  {
    kind: "link",
    href: "https://github.com/Andewdoo",
    icon: Github,
    label: "GitHub",
  },
  {
    kind: "link",
    href: "https://www.linkedin.com/in/andrew-liu-13099336a",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    kind: "link",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=ahanliu0311%40gmail.com",
    icon: Mail,
    label: "Email",
  },
];

export function FloatingDock() {
  return (
    <motion.nav
      aria-label="Social links"
      className="fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-[clamp(1rem,3.8vw,5rem)]"
      initial={{ opacity: 0, y: "1.125rem" }}
      animate={{ opacity: 1, y: "0rem" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex max-w-full items-end gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-black/55 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isEmail = item.label === "Email";
          const dockItemClassName = cn(
            "group relative flex size-12 items-center justify-center rounded-xl",
            "border border-white/10 bg-zinc-950/90 text-zinc-300",
            "transition-colors hover:border-white/25 hover:text-white"
          );
          const motionProps = {
            whileHover: { scale: 1.28, y: "-0.75rem" },
            whileTap: { scale: 0.96, y: "-0.25rem" },
            transition: { type: "spring", stiffness: 380, damping: 24 },
          } as const;

          return (
            <motion.a
              key={item.label}
              href={item.href}
              aria-label={isEmail ? "Email Andrew at ahanliu0311@gmail.com" : item.label}
              title={item.label}
              target="_blank"
              rel="noreferrer"
              className={dockItemClassName}
              {...motionProps}
            >
              <Icon className="size-5.5" aria-hidden="true" />
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
