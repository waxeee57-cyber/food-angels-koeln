"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { restaurant } from "@/lib/content";
import { cn } from "@/lib/utils";

const links = [
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/abholung", label: "Abholung" },
  { href: "/catering", label: "Catering" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Zum Inhalt
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex min-h-11 min-w-11 flex-col justify-center">
          <span className="font-heading text-lg leading-none tracking-tight">
            {restaurant.shortName}
          </span>
          <span className="text-[11px] tracking-[0.28em] text-primary uppercase">
            {restaurant.city}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Hauptnavigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "inline-flex min-h-11 items-center px-3 text-sm text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="xl"
            nativeButton={false}
            render={<Link href="/catering" />}
            className="hidden sm:inline-flex"
          >
            Catering anfragen
          </Button>

          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon-xl" }),
                "md:hidden"
              )}
            >
              <MenuIcon />
              <span className="sr-only">Menü öffnen</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetHeader>
                <SheetTitle>{restaurant.name}</SheetTitle>
                <SheetDescription>{restaurant.tagline}</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobilnavigation">
                {links.map((link) => (
                  <SheetClose
                    key={link.href}
                    nativeButton={false}
                    render={
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-lg"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="p-4">
                <Button
                  size="xl"
                  className="w-full"
                  nativeButton={false}
                  render={<Link href={restaurant.phoneHref} />}
                >
                  Anrufen
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
