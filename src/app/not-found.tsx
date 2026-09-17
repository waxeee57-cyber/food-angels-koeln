import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60svh] w-full max-w-xl flex-col items-start justify-center gap-5 px-4 py-16">
      <p className="text-sm tracking-[0.22em] text-primary uppercase">404</p>
      <h1 className="font-heading text-5xl">Die Küche ist hier nicht.</h1>
      <p className="text-muted-foreground">
        Die Seite gibt’s nicht. Burger, Schupf und Salat schon.
      </p>
      <Button size="xl" nativeButton={false} render={<Link href="/" />}>
        Zur Startseite
      </Button>
    </main>
  );
}
