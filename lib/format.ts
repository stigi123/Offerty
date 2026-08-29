import type { CountryCode, Currency, Party, Quote, QuoteTotals, VatRate } from "./types";

export const COUNTRY_LABEL: Record<CountryCode, string> = {
  DE: "Deutschland",
  CH: "Schweiz",
  AT: "Österreich",
};

export const VAT_LABEL: Record<VatRate, string> = {
  0: "0 % (steuerfrei / nicht steuerbar)",
  7.7: "7,7 % (CH)",
  19: "19 % (DE)",
};

export function formatMoney(amount: number, currency: Currency): string {
  const locale = currency === "CHF" ? "de-CH" : "de-DE";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(isoDate: string): string {
  if (!isoDate) return "—";
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export function todayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function plusDaysIso(days: number, from = todayIso()): string {
  const [year, month, day] = from.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function generateQuoteNumber(date = todayIso()): string {
  const compact = date.replaceAll("-", "");
  const suffix = String(Date.now() % 10000).padStart(4, "0");
  return `OFF-${compact.slice(0, 4)}-${compact.slice(4)}-${suffix}`;
}

export function emptyParty(country: CountryCode = "DE"): Party {
  return {
    name: "",
    street: "",
    zip: "",
    city: "",
    country,
    email: "",
    phone: "",
    taxId: "",
  };
}

export function emptyQuote(): Quote {
  const date = todayIso();
  return {
    number: generateQuoteNumber(date),
    date,
    validUntil: plusDaysIso(14, date),
    currency: "EUR",
    vatRate: 19,
    sender: emptyParty("DE"),
    client: emptyParty("DE"),
    items: [
      {
        id: newId(),
        description: "",
        quantity: 1,
        unit: "Std.",
        unitPrice: 0,
      },
    ],
    notes: "",
    intro:
      "sehr geehrte Damen und Herren,\n\nvielen Dank für Ihre Anfrage. Anbei unser Angebot über die unten aufgeführten Leistungen.",
    logoDataUrl: "",
  };
}

export function lineAmount(quantity: number, unitPrice: number): number {
  const qty = Number.isFinite(quantity) ? quantity : 0;
  const price = Number.isFinite(unitPrice) ? unitPrice : 0;
  return Math.round(qty * price * 100) / 100;
}

export function quoteTotals(quote: Quote): QuoteTotals {
  const net =
    Math.round(
      quote.items.reduce(
        (sum, item) => sum + lineAmount(item.quantity, item.unitPrice),
        0,
      ) * 100,
    ) / 100;
  const vat = Math.round(net * (quote.vatRate / 100) * 100) / 100;
  const gross = Math.round((net + vat) * 100) / 100;
  return { net, vat, gross };
}

export function documentTitle(quote: Quote): string {
  return quote.sender.country === "CH" || quote.client.country === "CH"
    ? "Offerte"
    : "Angebot";
}

export function filenameFor(quote: Quote): string {
  const kind = documentTitle(quote).toLowerCase();
  const slug = (quote.number || kind).replace(/[^\w.-]+/g, "-");
  return `${slug}.pdf`;
}

export function partyLine(party: { zip: string; city: string; country: CountryCode }): string {
  const city = [party.zip, party.city].filter(Boolean).join(" ");
  return [city, COUNTRY_LABEL[party.country]].filter(Boolean).join(", ");
}
