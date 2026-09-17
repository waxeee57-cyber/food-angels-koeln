import Link from "next/link";
import { ArrowDownIcon } from "lucide-react";

import { CtaTrio } from "@/components/cta-trio";
import { DishGrid, MenuAllLink } from "@/components/dish-grid";
import { FoodPhoto } from "@/components/food-photo";
import { HoursList } from "@/components/hours-list";
import { MapEmbed } from "@/components/map-embed";
import { Button } from "@/components/ui/button";
import { fullAddress, getPhoto, restaurant } from "@/lib/content";

export default function HomePage() {
  const hero = getPhoto("smash-mae");

  return (
    <main className="flex flex-col gap-3 pb-16">
      <section className="relative mx-3 mt-3 min-h-[88svh] overflow-hidden rounded-2xl md:mx-4">
        <FoodPhoto
          src={hero.src}
          alt={hero.alt}
          className="absolute inset-0"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/35 to-background/10" />
        <div className="relative flex min-h-[88svh] flex-col justify-end gap-6 p-6 md:p-12">
          <p className="text-sm tracking-[0.28em] text-primary uppercase">
            {restaurant.neighborhood} · {restaurant.city}
          </p>
          <h1 className="max-w-4xl font-heading text-5xl leading-[0.92] text-balance md:text-7xl lg:text-8xl">
            {restaurant.tagline}
          </h1>
          <p className="max-w-xl text-lg text-foreground/85 md:text-xl">
            {restaurant.promise}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="xl" nativeButton={false} render={<Link href="/speisekarte" />}>
              Speisekarte
            </Button>
            <Button
              size="xl"
              variant="outline"
              nativeButton={false}
              render={<Link href="/catering" />}
            >
              Catering
            </Button>
            <Button
              size="xl"
              variant="ghost"
              nativeButton={false}
              render={<a href={restaurant.phoneHref} />}
            >
              {restaurant.phone}
            </Button>
          </div>
          <a
            href="#hungrig"
            className="inline-flex min-h-11 w-fit items-center gap-2 text-sm text-foreground/70"
          >
            <ArrowDownIcon />
            Runterscrollen. Der Hunger bleibt.
          </a>
        </div>
      </section>

      <CtaTrio />

      <section id="hungrig" className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10">
        <div className="flex flex-col gap-3 md:max-w-2xl">
          <h2 className="font-heading text-4xl md:text-5xl">Drei Dinge. Den Rest lassen wir.</h2>
          <p className="text-muted-foreground md:text-lg">
            Smash von der Platte. Schupfnudeln in der Butter. Salate, die nach
            Garten schmecken — nicht nach Kantine.
          </p>
        </div>
        <DishGrid limit={9} />
        <MenuAllLink />
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-6 md:grid-cols-2 md:items-start">
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-4xl">Kommt vorbei.</h2>
          <p className="text-muted-foreground">{fullAddress()}</p>
          <p className="text-muted-foreground">{restaurant.visitNote}</p>
          <HoursList className="max-w-sm" />
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button size="xl" nativeButton={false} render={<Link href="/kontakt" />}>
              Lage & Kontakt
            </Button>
            <Button
              size="xl"
              variant="outline"
              nativeButton={false}
              render={<Link href="/abholung" />}
            >
              Abholung
            </Button>
          </div>
        </div>
        <MapEmbed />
      </section>
    </main>
  );
}
