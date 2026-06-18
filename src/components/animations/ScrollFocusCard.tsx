"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ScrollFocusCardProps = ComponentPropsWithoutRef<"article"> & {
  className?: string;
};

export function ScrollFocusCard({
  children,
  className,
  ...props
}: Readonly<ScrollFocusCardProps>) {
  return (
    <article className={cn("focus-card-item", className)} {...props}>
      {children}
    </article>
  );
}
