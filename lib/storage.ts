import { emptyQuote, newId } from "./format";
import type { CountryCode, Currency, Quote, VatRate } from "./types";

export const DRAFT_KEY = "offertly.draft.v1";

const COUNTRIES: CountryCode[] = ["DE", "CH", "AT"];
const CURRENCIES: Currency[] = ["EUR", "CHF"];
const VAT_RATES: VatRate[] = [0, 7.7, 19];

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function asCountry(value: unknown, fallback: CountryCode): CountryCode {
  return COUNTRIES.includes(value as CountryCode) ? (value as CountryCode) : fallback;
}

function asParty(value: unknown, fallbackCountry: CountryCode) {
  const raw = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    name: asString(raw.name),
    street: asString(raw.street),
    zip: asString(raw.zip),
    city: asString(raw.city),
    country: asCountry(raw.country, fallbackCountry),
    email: asString(raw.email),
    phone: asString(raw.phone),
    taxId: asString(raw.taxId),
  };
}

export function parseQuote(value: unknown): Quote {
  const base = emptyQuote();
  if (!value || typeof value !== "object") return base;
  const raw = value as Record<string, unknown>;
  const currency = CURRENCIES.includes(raw.currency as Currency)
    ? (raw.currency as Currency)
    : base.currency;
  const vatRate = VAT_RATES.includes(raw.vatRate as VatRate)
    ? (raw.vatRate as VatRate)
    : base.vatRate;
  const itemsRaw = Array.isArray(raw.items) ? raw.items : [];
  const items =
    itemsRaw.length > 0
      ? itemsRaw.map((item) => {
          const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
          return {
            id: asString(row.id, newId()),
            description: asString(row.description),
            quantity: asNumber(row.quantity, 1),
            unit: asString(row.unit, "Std."),
            unitPrice: asNumber(row.unitPrice, 0),
          };
        })
      : base.items;

  return {
    number: asString(raw.number, base.number),
    date: asString(raw.date, base.date),
    validUntil: asString(raw.validUntil, base.validUntil),
    currency,
    vatRate,
    sender: asParty(raw.sender, "DE"),
    client: asParty(raw.client, "DE"),
    items,
    notes: asString(raw.notes),
    intro: asString(raw.intro, base.intro),
    logoDataUrl: asString(raw.logoDataUrl),
  };
}

export function loadDraft(): Quote | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return parseQuote(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveDraft(quote: Quote): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(quote));
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_KEY);
}
