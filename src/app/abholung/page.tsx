import Link from "next/link";

import { FoodPhoto } from "@/components/food-photo";
import { HoursList } from "@/components/hours-list";
import { Button } from "@/components/ui/button";
import { fullAddress, getPhoto, restaurant } from "@/lib/content";

export const metadata = {
  title: "Abholung",
  description: "Takeaway in Ehrenfeld: Burger, Schupfnudeln, Salate zum Mitnehmen.",
};

const steps = [
  {
    n: "01",
    title: "Anrufen oder reinkommen",
    text: "Telefonisch vorbestellen oder an der Theke. Kein App-Chaos.",
  },
  {
    n: "02",
    title: "Wir machen heiß",
    text: "Smash frisch von der Platte. Schupf aus der Pfanne. Nicht aus der Wärmelampe.",
  },
  {
    n: "03",
    title: "Mitnehmen",
    text: "Venloer Straße. Parken kurz vorm Haus. Fertig.",
  },
];

export default function AbholungPage() {
  const hero = getPhoto("burger-fries-mike");
  const side = getPhoto("fries");

  return (
    <main className="flex flex-col gap-10 pb-16">
      <section className="grid gap-3 px-3 pt-3 md:grid-cols-[1.4fr_0.8fr] md:px-4">
        <div className="relative min-h-[56svh] overflow-hidden rounded-2xl">
          <FoodPhoto
            src={hero.src}
            alt={hero.alt}
            className="absolute inset-0"
            sizes="(min-width: 768px) 60vw, 100vw"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-transparent" />
          <div className="relative flex min-h-[56svh] flex-col justify-end gap-4 p-6 md:p-10">
            <p className="text-sm tracking-[0.22em] text-primary uppercase">Takeaway</p>
            <h1 className="font-heading text-5xl leading-[0.95] md:text-7xl">
              Abholung
            </h1>
            <p className="max-w-md text-lg text-foreground/85">
              {restaurant.takeawayNote}
            </p>
          </div>
        </div>
        <div className="relative min-h-64 overflow-hidden rounded-2xl">
          <FoodPhoto
            src={side.src}
            alt={side.alt}
            className="absolute inset-0"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 md:grid-cols-3">
        {steps.map((step) => (
          <article
            key={step.n}
            className="flex flex-col gap-3 rounded-2xl bg-card p-6 ring-1 ring-foreground/10"
          >
            <span className="text-sm tracking-[0.2em] text-primary">{step.n}</span>
            <h2 className="font-heading text-3xl">{step.title}</h2>
            <p className="text-muted-foreground">{step.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4">
        <h2 className="font-heading text-4xl">Wann & wo</h2>
        <p className="text-muted-foreground">{fullAddress()}</p>
        <HoursList className="max-w-md" />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="xl" nativeButton={false} render={<a href={restaurant.phoneHref} />}>
            Jetzt anrufen
          </Button>
          <Button
            size="xl"
            variant="outline"
            nativeButton={false}
            render={<Link href="/speisekarte" />}
          >
            Speisekarte
          </Button>
        </div>
      </section>
    </main>
  );
}
