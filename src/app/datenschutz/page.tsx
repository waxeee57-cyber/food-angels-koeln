import { restaurant } from "@/lib/content";

export const metadata = {
  title: "Datenschutz",
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12">
      <h1 className="font-heading text-5xl">Datenschutz</h1>
      <p className="rounded-xl bg-card p-4 text-sm text-muted-foreground ring-1 ring-foreground/10">
        Demo. Das Catering-Formular speichert nichts dauerhaft und sendet keine
        E-Mails.
      </p>
      <div className="flex flex-col gap-4 text-sm leading-7 text-muted-foreground">
        <p>
          Verantwortliche Stelle (Demo): {restaurant.legal.company},{" "}
          {restaurant.address.street}, {restaurant.address.zip}{" "}
          {restaurant.address.city}.
        </p>
        <p>
          Beim Absenden der Catering-Anfrage werden Name, Kontaktdaten und
          Eventdetails nur im laufenden Demo-Request verarbeitet und nicht in
          einer Datenbank abgelegt.
        </p>
        <p>
          Eingebettete Karten kommen von OpenStreetMap. Fotos von Unsplash.
          Es werden keine Tracking-Cookies gesetzt.
        </p>
      </div>
    </main>
  );
}
