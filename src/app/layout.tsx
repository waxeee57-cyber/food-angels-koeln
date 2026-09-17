import type { Metadata } from "next";
import { Figtree, Fraunces, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { restaurant } from "@/lib/content";

import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${restaurant.name} · ${restaurant.tagline}`,
    template: `%s · ${restaurant.name}`,
  },
  description: restaurant.description,
  openGraph: {
    title: restaurant.name,
    description: restaurant.description,
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`dark ${figtree.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <SiteHeader />
          <div id="inhalt" className="flex flex-1 flex-col">
            {children}
          </div>
          <SiteFooter />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
