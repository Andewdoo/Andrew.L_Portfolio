"use client";

import { motion } from "framer-motion";

type TechGroup = {
  items: string[];
  title: string;
};

type ScrollableTechCardsProps = {
  groups: TechGroup[];
};

export function ScrollableTechCards({ groups }: Readonly<ScrollableTechCardsProps>) {
  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-black/70 p-4 sm:p-5">
      <div className="flex snap-x gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {groups.map((group, index) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: "1rem" }}
            whileInView={{ opacity: 1, y: "0rem" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.05, duration: 0.35, ease: "easeOut" }}
            className="min-w-[min(100%,22rem)] snap-start rounded-2xl border border-white/10 bg-zinc-950/80 p-5 lg:min-w-0 lg:flex-[0_0_calc((100%-3.75rem)/4)]"
          >
            <h4 className="text-base font-semibold text-zinc-50">{group.title}</h4>
            <div className="mt-5 flex flex-wrap gap-3">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-800 bg-black px-4 py-2 text-sm font-semibold text-zinc-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
