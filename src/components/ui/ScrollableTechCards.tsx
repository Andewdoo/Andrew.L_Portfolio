type TechGroup = {
  items: string[];
  title: string;
};

type ScrollableTechCardsProps = {
  groups: TechGroup[];
};

export function ScrollableTechCards({ groups }: Readonly<ScrollableTechCardsProps>) {
  return (
    <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-black/70 p-5 sm:p-6 lg:p-8">
      <div className="grid grid-flow-col auto-cols-[minmax(min(82vw,20rem),1fr)] snap-x gap-6 overflow-x-auto pb-2 [scrollbar-width:none] sm:auto-cols-[minmax(20rem,1fr)] xl:grid-flow-row xl:grid-cols-4 xl:gap-7 [&::-webkit-scrollbar]:hidden">
        {groups.map((group) => (
          <article
            key={group.title}
            className="min-h-[clamp(15rem,18vw,18rem)] snap-start rounded-2xl border border-white/10 bg-zinc-950/80 p-[clamp(1.5rem,2vw,2rem)]"
          >
            <h4 className="text-[clamp(1.125rem,1.4vw,1.35rem)] font-semibold text-zinc-50">{group.title}</h4>
            <div className="mt-6 flex flex-wrap gap-4">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-800 bg-black px-5 py-2.5 text-[clamp(0.95rem,1.15vw,1.08rem)] font-semibold text-zinc-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
