"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Check,
  GraduationCap,
  Moon,
  Palette,
  Search,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  type ComponentType,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
  type SVGProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type CommandAction = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  keywords: string[];
  label: string;
  onSelect: () => void;
};

function Command({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-50 shadow-2xl shadow-black/50">
      {children}
    </div>
  );
}

function CommandInput({
  onValueChange,
  value,
}: Readonly<{ onValueChange: (value: string) => void; value: string }>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center border-b border-zinc-800 px-4">
      <Search className="mr-3 size-4 shrink-0 text-zinc-500" aria-hidden="true" />
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className="h-14 w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
        placeholder="Type a command or search..."
      />
    </div>
  );
}

function CommandList({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="max-h-80 overflow-y-auto p-2">{children}</div>;
}

function CommandItem({
  active,
  action,
  onSelect,
}: Readonly<{ active: boolean; action: CommandAction; onSelect: () => void }>) {
  const Icon = action.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors",
        active ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-black/60">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="flex-1">{action.label}</span>
      {active ? <Check className="size-4 text-zinc-400" aria-hidden="true" /> : null}
    </button>
  );
}

function jumpToSection(id: string) {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  window.location.hash = id;
}

export function CommandPalette() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const actions = useMemo<CommandAction[]>(
    () => [
      {
        icon: mounted && resolvedTheme === "dark" ? Sun : Moon,
        keywords: ["theme", "dark", "light", "mode"],
        label: mounted && resolvedTheme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode",
        onSelect: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        icon: Briefcase,
        keywords: ["work", "portfolio", "projects"],
        label: "Jump to Projects",
        onSelect: () => jumpToSection("projects"),
      },
      {
        icon: GraduationCap,
        keywords: ["school", "university", "education"],
        label: "Jump to Education",
        onSelect: () => jumpToSection("education"),
      },
    ],
    [mounted, resolvedTheme, setTheme]
  );

  const filteredActions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return actions;
    }

    return actions.filter((action) =>
      [action.label, ...action.keywords].some((value) => value.toLowerCase().includes(query))
    );
  }, [actions, search]);

  useEffect(() => {
    setActiveIndex(0);
  }, [search, open]);

  const runAction = (action: CommandAction) => {
    action.onSelect();
    setOpen(false);
    setSearch("");
  };

  const handleCommandKeys = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        filteredActions.length === 0 ? 0 : Math.min(current + 1, filteredActions.length - 1)
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    }

    if (event.key === "Enter" && filteredActions[activeIndex]) {
      event.preventDefault();
      runAction(filteredActions[activeIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl"
            initial={{ opacity: 0, scale: 0.96, y: "0.75rem" }}
            animate={{ opacity: 1, scale: 1, y: "0rem" }}
            exit={{ opacity: 0, scale: 0.98, y: "0.5rem" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onKeyDown={handleCommandKeys}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <Command>
              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <Palette className="size-4" aria-hidden="true" />
                  Command
                </div>
                <kbd className="rounded border border-zinc-800 bg-black px-2 py-1 font-mono text-[0.6875rem] text-zinc-500">
                  Esc
                </kbd>
              </div>
              <CommandInput value={search} onValueChange={setSearch} />
              <CommandList>
                {filteredActions.length > 0 ? (
                  filteredActions.map((action, index) => (
                    <CommandItem
                      key={action.label}
                      action={action}
                      active={index === activeIndex}
                      onSelect={() => runAction(action)}
                    />
                  ))
                ) : (
                  <div className="px-3 py-8 text-center text-sm text-zinc-500">No command found.</div>
                )}
              </CommandList>
            </Command>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
