import type { ReactNode } from "react";
import { RouteTransitionProvider } from "@/components/animations/route-transition-provider";

export default function Template({ children }: Readonly<{ children: ReactNode }>) {
  return <RouteTransitionProvider>{children}</RouteTransitionProvider>;
}
