import { emptyLineItem, emptyQuote, newId } from "./format";
import type { CountryCode, Currency, LineItem, Quote } from "./types";
import { clampPercent } from "./vat";

export const DRAFT_KEY = "offertly.draft.v1";

const COUNTRIES: CountryCode[] = ["DE", "CH", "AT"];
const CURRENCIES: Currency[] = ["EUR", "CHF"];

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

function asVatNumber(value: unknown, fallback: number): number {
  const n = asNumber(value, fallback);
  return clampPercent(n);
}

function asOptionalVat(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return null;
  return clampPercent(n);
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

function asItem(value: unknown): LineItem {
  const row = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const base = emptyLineItem();
  return {
    id: asString(row.id, newId()),
    description: asString(row.description),
    quantity: asNumber(row.quantity, 1),
    unit: asString(row.unit, base.unit),
    unitPrice: asNumber(row.unitPrice, 0),
    vatRate: asOptionalVat(row.vatRate),
    discountPercent: clampPercent(asNumber(row.discountPercent, 0)),
  };
}

export function parseQuote(value: unknown): Quote {
  const base = emptyQuote();
  if (!value || typeof value !== "object") return base;
  const raw = value as Record<string, unknown>;
  const currency = CURRENCIES.includes(raw.currency as Currency)
    ? (raw.currency as Currency)
    : base.currency;
  const itemsRaw = Array.isArray(raw.items) ? raw.items : [];
  const items = itemsRaw.length > 0 ? itemsRaw.map(asItem) : base.items;

  return {
    number: asString(raw.number, base.number),
    date: asString(raw.date, base.date),
    validUntil: asString(raw.validUntil, base.validUntil),
    currency,
    vatRate: asVatNumber(raw.vatRate, base.vatRate),
    documentDiscountPercent: clampPercent(asNumber(raw.documentDiscountPercent, 0)),
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
