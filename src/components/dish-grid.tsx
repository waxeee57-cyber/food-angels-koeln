import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { FoodPhoto } from "@/components/food-photo";
import { dishesByCategory, getPhoto, type Dish } from "@/lib/content";
import { formatEur } from "@/lib/format";
import { cn } from "@/lib/utils";

type DishGridProps = {
  category?: string;
  limit?: number;
  className?: string;
};

export function DishGrid({ category, limit, className }: DishGridProps) {
  const items = dishesByCategory(category).slice(0, limit);

  return (
    <ul
      className={cn(
        "columns-1 gap-3 sm:columns-2 lg:columns-3",
        className
      )}
    >
      {items.map((dish, index) => (
        <li key={dish.id} className="mb-3 break-inside-avoid">
          <DishCard dish={dish} tall={index % 5 === 0 || index % 5 === 3} />
        </li>
      ))}
    </ul>
  );
}

function DishCard({ dish, tall }: { dish: Dish; tall: boolean }) {
  const photo = getPhoto(dish.photoId);
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10">
      <FoodPhoto
        src={photo.src}
        alt={photo.alt}
        className={tall ? "aspect-4/5" : "aspect-4/3"}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-background/95 via-background/40 to-transparent p-4 pt-16">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="truncate font-heading text-xl leading-none text-foreground">
            {dish.name}
          </h3>
          {"note" in dish && dish.note ? (
            <p className="truncate text-sm text-foreground/75">{dish.note}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {"tag" in dish && dish.tag ? (
            <Badge variant="secondary">{dish.tag}</Badge>
          ) : null}
          <span className="text-sm font-medium text-primary">
            {formatEur(dish.priceEur)}
          </span>
        </div>
      </div>
    </article>
  );
}

export function MenuAllLink() {
  return (
    <p className="text-center">
      <Link
        href="/speisekarte"
        className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Ganze Speisekarte
      </Link>
    </p>
  );
}
