import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CustomCursor } from "@/components/animations/CustomCursor";

import "./globals.css";

export const metadata: Metadata = {
  title: "Andrew L. | Software Engineer",
  description: "Andrew L.'s software engineering portfolio, featuring Devlify and Elara.ai.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
