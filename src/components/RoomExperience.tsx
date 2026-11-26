"use client";

import { useCallback, useRef, useState } from "react";
import type { Panel } from "@/data/content";
import DeskViewport from "./DeskViewport";
import PortfolioDialog from "./PortfolioDialog";

export default function RoomExperience() {
  const trigger = useRef<HTMLElement>(null);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const openPanel = useCallback((name: Panel, element: HTMLElement, index = 0) => {
    trigger.current = element;
    setPhotoIndex(index);
    setPanel(name);
  }, []);
  return <>
    <DeskViewport onSelect={openPanel} />
    <PortfolioDialog panel={panel} photoIndex={photoIndex} setPhotoIndex={setPhotoIndex}
      onClose={() => { setPanel(null); trigger.current?.focus({ preventScroll: true }); }} />
  </>;
}
