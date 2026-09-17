import Link from "next/link";

import { DishGrid } from "@/components/dish-grid";
import { Badge } from "@/components/ui/badge";
import { dishes } from "@/lib/content";
import { cn } from "@/lib/utils";

type SpeisekartePageProps = {
  searchParams: Promise<{ kat?: string }>;
};

export const metadata = {
  title: "Speisekarte",
  description: "Burger, Schupfnudeln und Salate bei Food Angels Köln.",
};

export default async function SpeisekartePage({ searchParams }: SpeisekartePageProps) {
  const { kat } = await searchParams;
  const active =
    dishes.categories.find((category) => category.id === kat)?.id ?? undefined;
  const current = dishes.categories.find((category) => category.id === active);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10">
      <header className="flex max-w-2xl flex-col gap-3">
        <p className="text-sm tracking-[0.22em] text-primary uppercase">Küche</p>
        <h1 className="font-heading text-5xl md:text-6xl">Speisekarte</h1>
        <p className="text-lg text-muted-foreground">
          {current?.blurb ?? "Wenig Text. Viel Pfanne. Preise in Euro."}
        </p>
      </header>

      <nav className="flex flex-wrap gap-2" aria-label="Gerichtkategorien">
        <FilterChip href="/speisekarte" active={!active}>
          Alles
        </FilterChip>
        {dishes.categories.map((category) => (
          <FilterChip
            key={category.id}
            href={`/speisekarte?kat=${category.id}`}
            active={active === category.id}
          >
            {category.label}
          </FilterChip>
        ))}
      </nav>

      <DishGrid category={active} />
    </main>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="min-h-11">
      <Badge
        variant={active ? "default" : "outline"}
        className={cn("h-11 rounded-full px-4 text-sm", !active && "text-foreground")}
      >
        {children}
      </Badge>
    </Link>
  );
}
