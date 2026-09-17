import { HoursList } from "@/components/hours-list";
import { MapEmbed } from "@/components/map-embed";
import { Button } from "@/components/ui/button";
import { fullAddress, restaurant } from "@/lib/content";

export const metadata = {
  title: "Kontakt",
  description: "Adresse, Öffnungszeiten und Anfahrt zu Food Angels Köln in Ehrenfeld.",
};

export default function KontaktPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 pb-16">
      <header className="flex max-w-2xl flex-col gap-3">
        <p className="text-sm tracking-[0.22em] text-primary uppercase">Ehrenfeld</p>
        <h1 className="font-heading text-5xl md:text-6xl">Besuchen</h1>
        <p className="text-lg text-muted-foreground">{restaurant.visitNote}</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.2fr]">
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-3xl">Adresse</h2>
            <p>
              {restaurant.name}
              <br />
              {fullAddress()}
            </p>
            <p className="text-sm text-muted-foreground">
              Belgisches Viertel ist um die Ecke. U-Bahn: Venloer Straße / Gürtel.
              Kurzparken vor der Tür.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-3xl">Öffnung</h2>
            <HoursList />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-3xl">Kontakt</h2>
            <a
              href={restaurant.phoneHref}
              className="min-h-11 w-fit py-2 text-primary underline-offset-4 hover:underline"
            >
              {restaurant.phone}
            </a>
            <a
              href={`mailto:${restaurant.email}`}
              className="min-h-11 w-fit py-2 text-primary underline-offset-4 hover:underline"
            >
              {restaurant.email}
            </a>
            <a
              href={restaurant.instagramUrl}
              className="min-h-11 w-fit py-2 text-primary underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {restaurant.instagramHandle}
            </a>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="xl" nativeButton={false} render={<a href={restaurant.phoneHref} />}>
              Anrufen
            </Button>
            <Button
              size="xl"
              variant="outline"
              nativeButton={false}
              render={<a href={`mailto:${restaurant.email}`} />}
            >
              Mail schreiben
            </Button>
          </div>
        </div>

        <MapEmbed />
      </div>
    </main>
  );
}
