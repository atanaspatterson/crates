// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "crates.",
  description: "remix with words",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-neutral-950 text-neutral-100 antialiased">
        <div className="min-h-dvh flex flex-col">
          <TopBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-800/60 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-xl">
          <span className="text-neutral-300">crates</span>
          <span className="text-fuchsia-400">.</span>
        </Link>
        <div className="text-xs text-neutral-500">mvp</div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-neutral-500">
        made with <span className="text-fuchsia-400">♥</span> for music
      </div>
    </footer>
  );
}
