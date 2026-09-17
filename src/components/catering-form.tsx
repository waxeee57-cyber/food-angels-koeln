"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { catering } from "@/lib/content";
import { formatFromEur } from "@/lib/format";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  packageId: string;
  message: string;
};

const empty: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  date: "",
  guests: "12",
  packageId: catering.packages[0]?.id ?? "burger-bar",
  message: "",
};

export function CateringForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ id: string } | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function validate(next: FormState) {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (next.name.trim().length < 2) nextErrors.name = "Bitte Namen angeben.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) {
      nextErrors.email = "Bitte eine gültige E-Mail angeben.";
    }
    if (next.phone.replace(/\s/g, "").length < 6) {
      nextErrors.phone = "Bitte eine Telefonnummer angeben.";
    }
    if (!next.date) nextErrors.date = "Bitte ein Datum wählen.";
    const guests = Number(next.guests);
    if (!Number.isFinite(guests) || guests < 8) {
      nextErrors.guests = "Mindestens 8 Personen.";
    }
    if (!next.packageId) nextErrors.packageId = "Bitte ein Paket wählen.";
    return nextErrors;
  }

  async function submit(next: FormState) {
    const nextErrors = validate(next);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Bitte die markierten Felder prüfen.");
      const first = Object.keys(nextErrors)[0];
      if (first) {
        document.getElementById(first === "packageId" ? `pkg-${next.packageId || catering.packages[0]?.id}` : first)?.focus();
      }
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        id?: string;
        error?: string;
      };
      if (!response.ok || !payload.ok || !payload.id) {
        throw new Error(payload.error ?? "Anfrage fehlgeschlagen");
      }
      setResult({ id: payload.id });
      toast.success("Anfrage ist raus. Wir melden uns.");
    } catch {
      toast.error("Gerade keine Verbindung. Bitte anrufen oder später nochmal.");
    } finally {
      setPending(false);
    }
  }

  if (result) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
        <p className="font-heading text-3xl">Angekommen.</p>
        <p className="text-muted-foreground">
          Referenz {result.id}. Wir antworten werktags innerhalb von 24 Stunden —
          in dieser Demo geht keine echte Mail raus.
        </p>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
          onClick={() => {
            setResult(null);
            setValues(empty);
            setErrors({});
          }}
        >
          Weitere Anfrage
        </button>
      </div>
    );
  }

  return (
    <form
      id="anfrage"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void submit(values);
      }}
      className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10 md:p-6"
    >
      <FieldGroup>
        <Field data-invalid={Boolean(errors.name) || undefined}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            className="h-11 min-h-11"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name) || undefined}
          />
          <FieldError>{errors.name}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="company">Firma / Anlass</FieldLabel>
          <Input
            id="company"
            name="company"
            className="h-11 min-h-11"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
          />
          <FieldDescription>Optional. z. B. Office-Lunch, Hochzeit, Premiere.</FieldDescription>
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={Boolean(errors.email) || undefined}>
            <FieldLabel htmlFor="email">E-Mail</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              className="h-11 min-h-11"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={Boolean(errors.email) || undefined}
            />
            <FieldError>{errors.email}</FieldError>
          </Field>
          <Field data-invalid={Boolean(errors.phone) || undefined}>
            <FieldLabel htmlFor="phone">Telefon</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              aria-required="true"
              className="h-11 min-h-11"
              value={values.phone}
              onChange={(event) => update("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone) || undefined}
            />
            <FieldError>{errors.phone}</FieldError>
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={Boolean(errors.date) || undefined}>
            <FieldLabel htmlFor="date">Datum</FieldLabel>
            <Input
              id="date"
              name="date"
              type="date"
              required
              aria-required="true"
              className="h-11 min-h-11"
              value={values.date}
              onChange={(event) => update("date", event.target.value)}
              aria-invalid={Boolean(errors.date) || undefined}
            />
            <FieldError>{errors.date}</FieldError>
          </Field>
          <Field data-invalid={Boolean(errors.guests) || undefined}>
            <FieldLabel htmlFor="guests">Personen</FieldLabel>
            <Input
              id="guests"
              name="guests"
              type="number"
              min={8}
              max={400}
              required
              aria-required="true"
              className="h-11 min-h-11"
              value={values.guests}
              onChange={(event) => update("guests", event.target.value)}
              aria-invalid={Boolean(errors.guests) || undefined}
            />
            <FieldError>{errors.guests}</FieldError>
          </Field>
        </div>

        <FieldSet>
          <FieldLegend>Paket</FieldLegend>
          <RadioGroup
            value={values.packageId}
            onValueChange={(value) => update("packageId", String(value))}
            className="grid gap-3"
            required
          >
            {catering.packages.map((item) => (
              <FieldLabel
                key={item.id}
                htmlFor={`pkg-${item.id}`}
                className="w-full cursor-pointer rounded-xl border border-border p-3 has-data-checked:border-primary"
              >
                <Field orientation="horizontal">
                  <RadioGroupItem
                    value={item.id}
                    id={`pkg-${item.id}`}
                    className="mt-1"
                  />
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatFromEur(item.priceFromEur)} · {item.unit}
                    </span>
                  </span>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
          <FieldError>{errors.packageId}</FieldError>
        </FieldSet>

        <Field>
          <FieldLabel htmlFor="message">Was sollen wir wissen?</FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={4}
            className="min-h-28"
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Ort, Allergene, vegetarisch/vegan, Aufbauen ja/nein…"
          />
        </Field>

        <button
          type="button"
          disabled={pending}
          className={cn(buttonVariants({ size: "xl" }), "w-full sm:w-auto")}
          onClick={() => void submit(values)}
        >
          {pending ? <Loader2Icon data-icon="inline-start" className="animate-spin" /> : null}
          Anfrage senden
        </button>
        <FieldDescription>
          Demo-Formular. Es wird nichts verbindlich gebucht.
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
