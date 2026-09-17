const eur = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export function formatEur(value: number): string {
  return eur.format(value);
}

export function formatFromEur(value: number): string {
  return `ab ${eur.format(value)}`;
}
