import { CateringForm } from "@/components/catering-form";
import { FoodPhoto } from "@/components/food-photo";
import { Badge } from "@/components/ui/badge";
import { catering, getPhoto } from "@/lib/content";
import { formatFromEur } from "@/lib/format";

export const metadata = {
  title: "Catering",
  description:
    "Burger-Bar, Schupfnudel-Pfanne und Salatbuffet für Köln. Ab 10 Personen.",
};

export default function CateringPage() {
  const hero = getPhoto("spread-brooke");

  return (
    <main className="flex flex-col gap-10 pb-16">
      <section className="relative mx-3 mt-3 min-h-[54svh] overflow-hidden rounded-2xl md:mx-4">
        <FoodPhoto
          src={hero.src}
          alt={hero.alt}
          className="absolute inset-0"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-background/15" />
        <div className="relative flex min-h-[54svh] flex-col justify-end gap-4 p-6 md:p-12">
          <p className="text-sm tracking-[0.22em] text-primary uppercase">
            Für Köln & Umland
          </p>
          <h1 className="max-w-3xl font-heading text-5xl leading-[0.95] md:text-7xl">
            Catering, das nach Küche schmeckt.
          </h1>
          <p className="max-w-xl text-lg text-foreground/85">{catering.intro}</p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 md:grid-cols-2">
        {catering.packages.map((item) => {
          const photo = getPhoto(item.photoId);
          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10"
            >
              <FoodPhoto
                src={photo.src}
                alt={photo.alt}
                className="aspect-16/10"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-heading text-3xl">{item.name}</h2>
                  <Badge variant="secondary">
                    {formatFromEur(item.priceFromEur)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.unit} · ab {item.minGuests} Personen
                </p>
                <ul className="flex flex-col gap-2 text-sm">
                  {item.includes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-4xl">Anfrage</h2>
          <p className="text-muted-foreground">{catering.leadTime}</p>
          <p className="text-sm text-muted-foreground">
            Allergene, vegetarisch, vegan, halal auf Wunsch — schreibt’s in die
            Nachricht.
          </p>
        </div>
        <CateringForm />
      </section>
    </main>
  );
}
