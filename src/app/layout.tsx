import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Andrew Liu | The Desk",
  description: "Explore Andrew Liu’s interactive 3D workspace, featuring software engineering projects, skills, and a resume.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
