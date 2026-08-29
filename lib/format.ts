import type { CountryCode, Currency, LineItem, Party, Quote } from "./types";
import { defaultVatForCurrency } from "./vat";

export const COUNTRY_LABEL: Record<CountryCode, string> = {
  DE: "Deutschland",
  CH: "Schweiz",
  AT: "Österreich",
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

export function emptyLineItem(unit = "Std"): LineItem {
  return {
    id: newId(),
    description: "",
    quantity: 1,
    unit,
    unitPrice: 0,
    vatRate: null,
    discountPercent: 0,
  };
}

export function emptyQuote(): Quote {
  const date = todayIso();
  return {
    number: generateQuoteNumber(date),
    date,
    validUntil: plusDaysIso(14, date),
    currency: "EUR",
    vatRate: defaultVatForCurrency("EUR"),
    documentDiscountPercent: 0,
    sender: emptyParty("DE"),
    client: emptyParty("DE"),
    items: [emptyLineItem()],
    notes: "",
    intro:
      "sehr geehrte Damen und Herren,\n\nvielen Dank für Ihre Anfrage. Anbei unser Angebot über die unten aufgeführten Leistungen.",
    logoDataUrl: "",
  };
}

export function documentTitle(quote: Quote): string {
  return quote.sender.country === "CH" || quote.client.country === "CH"
    ? "Offerte"
    : "Angebot";
}

export function filenameFor(quote: Quote): string {
  const kind = documentTitle(quote).toLowerCase();
  const slug = (quote.number.trim() || kind).replace(/[^\w.-]+/g, "-");
  return `${slug}.pdf`;
}

export function partyLine(party: { zip: string; city: string; country: CountryCode }): string {
  const city = [party.zip, party.city].filter(Boolean).join(" ");
  return [city, COUNTRY_LABEL[party.country]].filter(Boolean).join(", ");
}

export function formatQuantity(quantity: number): string {
  if (!Number.isFinite(quantity)) return "0";
  return String(quantity).replace(".", ",");
}
