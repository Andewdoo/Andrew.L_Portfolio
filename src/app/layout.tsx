import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TopNav } from "@/components/ui/top-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrew L. | Software Engineering Portfolio",
  description: "A software engineering portfolio focused on full-stack development, systems thinking, and practical tooling.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TopNav />
          <main className="min-h-screen bg-black pt-[4.5rem]">{children}</main>
          <FloatingDock />
          <CommandPalette />
          <CustomCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
