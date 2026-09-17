import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { FoodPhoto } from "@/components/food-photo";
import { getPhoto } from "@/lib/content";

const actions = [
  {
    href: "/kontakt",
    label: "Besuchen",
    line: "Tisch in der Küche",
    photoId: "restaurant-jay",
  },
  {
    href: "/abholung",
    label: "Abholung",
    line: "Heiß in 15 Minuten",
    photoId: "burger-fries-mike",
  },
  {
    href: "/catering",
    label: "Catering",
    line: "Büro, Party, Hof",
    photoId: "spread-brooke",
  },
] as const;

export function CtaTrio() {
  return (
    <section aria-labelledby="cta-heading" className="px-3 pb-3 md:px-4">
      <h2 id="cta-heading" className="sr-only">
        Besuchen, abholen oder Catering
      </h2>
      <div className="grid gap-3 md:grid-cols-3">
        {actions.map((action) => {
          const photo = getPhoto(action.photoId);
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group relative min-h-44 overflow-hidden rounded-2xl focus-visible:ring-3 focus-visible:ring-ring/60"
            >
              <FoodPhoto
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div className="flex flex-col gap-1">
                  <span className="font-heading text-3xl leading-none text-foreground">
                    {action.label}
                  </span>
                  <span className="text-sm text-foreground/80">
                    {action.line}
                  </span>
                </div>
                <ArrowUpRightIcon className="size-6 text-primary" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
