import { mapsEmbedSrc, mapsLink, restaurant } from "@/lib/content";

export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl ring-1 ring-foreground/10">
      <iframe
        title={`Karte: ${restaurant.name}`}
        src={mapsEmbedSrc()}
        className="h-72 w-full border-0 bg-muted md:h-96"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Ehrenfeld · U-Bahn Venloer Straße / Gürtel
        </p>
        <a
          href={mapsLink()}
          className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Route planen
        </a>
      </div>
    </div>
  );
}
