"use client";

import { useCallback, useRef, useState } from "react";
import type { Panel } from "@/data/content";
import DeskViewport from "./DeskViewport";
import PortfolioDialog from "./PortfolioDialog";

export default function RoomExperience() {
  const trigger = useRef<HTMLElement>(null);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const openPanel = useCallback((name: Panel, element: HTMLElement) => {
    trigger.current = element;
    setPhotoIndex(0);
    setPanel(name);
  }, []);
  return <>
    <DeskViewport onSelect={openPanel} />
    <PortfolioDialog panel={panel} trigger={trigger} photoIndex={photoIndex} setPhotoIndex={setPhotoIndex}
      onClose={() => { setPanel(null); trigger.current?.focus({ preventScroll: true }); }} />
  </>;
}
