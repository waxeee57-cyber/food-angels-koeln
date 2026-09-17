import Link from "next/link";

import { restaurant, uniquePhotographers } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  const photographers = uniquePhotographers();

  return (
    <footer className="mt-auto border-t border-foreground/10 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <p className="font-heading text-3xl leading-none">{restaurant.name}</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              {restaurant.promise}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="font-medium">Besuch</p>
            <p>
              {restaurant.address.street}
              <br />
              {restaurant.address.zip} {restaurant.address.city}
            </p>
            <a
              className="min-h-11 w-fit py-2 text-primary underline-offset-4 hover:underline"
              href={restaurant.phoneHref}
            >
              {restaurant.phone}
            </a>
            <a
              className="min-h-11 w-fit py-2 text-primary underline-offset-4 hover:underline"
              href={`mailto:${restaurant.email}`}
            >
              {restaurant.email}
            </a>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="font-medium">Öffnung</p>
            {restaurant.hours.map((row) => (
              <p key={row.days} className="flex justify-between gap-6">
                <span className="text-muted-foreground">{row.days}</span>
                <span>{row.time}</span>
              </p>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-6 text-xs text-muted-foreground">
          <p>
            Fotos: Unsplash-Lizenz. Danke an{" "}
            {photographers.map((photo, index) => (
              <span key={photo.id}>
                {index > 0 ? ", " : ""}
                <a
                  href={`${photo.unsplash}?utm_source=foodangels&utm_medium=referral`}
                  className="underline-offset-2 hover:text-foreground hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  {photo.photographer}
                </a>
              </span>
            ))}
            .
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/impressum" className="min-h-11 py-2 hover:text-foreground">
              Impressum
            </Link>
            <Link href="/datenschutz" className="min-h-11 py-2 hover:text-foreground">
              Datenschutz
            </Link>
            <span>Demo-Website · keine echte Bestellung</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
