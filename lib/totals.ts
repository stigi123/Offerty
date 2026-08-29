import type { LineComputed, LineItem, Quote, QuoteTotals, VatBucket } from "./types";
import { clampPercent, effectiveVatRate } from "./vat";

function cents(value: number): number {
  return Math.round((Number.isFinite(value) ? value : 0) * 100);
}

function fromCents(value: number): number {
  return value / 100;
}

function allocate(totalCents: number, weights: number[]): number[] {
  if (weights.length === 0) return [];
  const weightSum = weights.reduce((sum, w) => sum + w, 0);
  if (weightSum <= 0 || totalCents === 0) return weights.map(() => 0);

  const raw = weights.map((w) => (w / weightSum) * totalCents);
  const floored = raw.map((n) => Math.floor(n));
  let remainder = totalCents - floored.reduce((sum, n) => sum + n, 0);
  const order = raw
    .map((n, index) => ({ index, frac: n - Math.floor(n) }))
    .sort((a, b) => b.frac - a.frac);
  for (const { index } of order) {
    if (remainder <= 0) break;
    floored[index] += 1;
    remainder -= 1;
  }
  return floored;
}

export function lineRawAmount(item: LineItem): number {
  const qty = Number.isFinite(item.quantity) ? item.quantity : 0;
  const price = Number.isFinite(item.unitPrice) ? item.unitPrice : 0;
  return fromCents(cents(qty * price));
}

export function quoteTotals(quote: Quote): QuoteTotals {
  const documentRate = clampPercent(quote.vatRate);
  const docDiscountPercent = clampPercent(quote.documentDiscountPercent);

  const afterLine = quote.items.map((item) => {
    const rawCents = cents(lineRawAmount(item));
    const lineDiscountCents = cents(fromCents(rawCents) * (clampPercent(item.discountPercent) / 100));
    return {
      item,
      rawCents,
      lineDiscountCents,
      afterLineCents: rawCents - lineDiscountCents,
      vatRate: effectiveVatRate(item, documentRate),
    };
  });

  const subtotalCents = afterLine.reduce((sum, row) => sum + row.afterLineCents, 0);
  const documentDiscountCents = cents(fromCents(subtotalCents) * (docDiscountPercent / 100));
  const shares = allocate(
    documentDiscountCents,
    afterLine.map((row) => row.afterLineCents),
  );

  const lines: LineComputed[] = afterLine.map((row, index) => {
    const documentDiscountShare = shares[index] ?? 0;
    const netCents = row.afterLineCents - documentDiscountShare;
    const vatCents = cents(fromCents(netCents) * (row.vatRate / 100));
    return {
      id: row.item.id,
      pos: index + 1,
      raw: fromCents(row.rawCents),
      lineDiscount: fromCents(row.lineDiscountCents),
      afterLineDiscount: fromCents(row.afterLineCents),
      documentDiscountShare: fromCents(documentDiscountShare),
      net: fromCents(netCents),
      vatRate: row.vatRate,
      vat: fromCents(vatCents),
    };
  });

  const buckets = new Map<number, { net: number; vat: number }>();
  for (const line of lines) {
    const current = buckets.get(line.vatRate) ?? { net: 0, vat: 0 };
    current.net = fromCents(cents(current.net + line.net));
    current.vat = fromCents(cents(current.vat + line.vat));
    buckets.set(line.vatRate, current);
  }

  const vatByRate: VatBucket[] = [...buckets.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([rate, bucket]) => ({ rate, net: bucket.net, vat: bucket.vat }));

  const net = fromCents(lines.reduce((sum, line) => sum + cents(line.net), 0));
  const vat = fromCents(vatByRate.reduce((sum, bucket) => sum + cents(bucket.vat), 0));
  const lineDiscountTotal = fromCents(lines.reduce((sum, line) => sum + cents(line.lineDiscount), 0));
  const documentDiscount = fromCents(documentDiscountCents);
  const netBeforeDocumentDiscount = fromCents(subtotalCents);

  return {
    lineDiscountTotal,
    documentDiscount,
    netBeforeDocumentDiscount,
    net,
    vatByRate,
    vat,
    gross: fromCents(cents(net + vat)),
    lines,
  };
}
