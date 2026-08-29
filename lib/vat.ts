import type { CountryCode, LineItem } from "./types";

export const VAT_PRESETS: { country: CountryCode; label: string; rates: number[] }[] = [
  { country: "DE", label: "DE", rates: [0, 7, 19] },
  { country: "CH", label: "CH", rates: [0, 2.6, 3.8, 8.1] },
  { country: "AT", label: "AT", rates: [0, 10, 13, 20] },
];

export const UNIT_PRESETS = ["Stk", "Std", "Pauschale", "lfm", "m²"] as const;

export function formatVatRate(rate: number): string {
  const text = Number.isInteger(rate) ? String(rate) : String(rate).replace(".", ",");
  return `${text} %`;
}

export function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export function parseVatInput(raw: string, fallback: number): number {
  const normalized = raw.replace(",", ".").trim();
  if (normalized === "") return fallback;
  const n = Number(normalized);
  return Number.isFinite(n) ? clampPercent(n) : fallback;
}

export function effectiveVatRate(item: LineItem, documentRate: number): number {
  if (item.vatRate === null || item.vatRate === undefined) return documentRate;
  return clampPercent(item.vatRate);
}

export function defaultVatForCurrency(currency: "EUR" | "CHF"): number {
  return currency === "CHF" ? 8.1 : 19;
}

export function unitChipActive(current: string, preset: string): boolean {
  const a = current.trim().replace(/\.$/, "").toLowerCase();
  const b = preset.trim().replace(/\.$/, "").toLowerCase();
  if (b === "pauschale") return a === "pauschale" || a === "pauschal";
  if (b === "m²") return a === "m²" || a === "m2" || a === "qm";
  return a === b;
}
