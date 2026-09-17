import { fullAddress, restaurant } from "@/lib/content";

export const metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12">
      <h1 className="font-heading text-5xl">Impressum</h1>
      <p className="rounded-xl bg-card p-4 text-sm text-muted-foreground ring-1 ring-foreground/10">
        Demo-Website. Keine echte Firma, keine echten Bestellungen.
      </p>
      <section className="flex flex-col gap-2 text-sm leading-7">
        <p className="font-medium">{restaurant.legal.company}</p>
        <p>
          {fullAddress()}
          <br />
          Vertreten durch: {restaurant.legal.owner}
        </p>
        <p>
          Telefon: {restaurant.phone}
          <br />
          E-Mail: {restaurant.email}
        </p>
        <p>
          {restaurant.legal.register}
          <br />
          USt-IdNr.: {restaurant.legal.vatId}
        </p>
      </section>
    </main>
  );
}
