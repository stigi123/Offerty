import type { Quote } from "./types";
import { generateQuoteNumber, newId, plusDaysIso, todayIso } from "./format";

/** Fiktive Beispieldaten — keine echten Personen oder Firmen. */
export function sampleQuote(): Quote {
  const date = todayIso();
  return {
    number: generateQuoteNumber(date),
    date,
    validUntil: plusDaysIso(21, date),
    currency: "EUR",
    vatRate: 19,
    documentDiscountPercent: 5,
    sender: {
      name: "Atelier Nordlicht",
      street: "Musterstraße 12",
      zip: "10115",
      city: "Berlin",
      country: "DE",
      email: "post@nordlicht.example",
      phone: "+49 30 0000000",
      taxId: "DE000000000",
    },
    client: {
      name: "Helvetia Digital GmbH",
      street: "Beispielgasse 8",
      zip: "8001",
      city: "Zürich",
      country: "CH",
      email: "einkauf@helvetia-digital.example",
      phone: "+41 44 0000000",
      taxId: "CHE-000.000.000 MWST",
    },
    items: [
      {
        id: newId(),
        description: "Konzeption und Informationsarchitektur der neuen Website",
        quantity: 8,
        unit: "Std",
        unitPrice: 95,
        vatRate: 19,
        discountPercent: 0,
      },
      {
        id: newId(),
        description: "Visuelles Design (Desktop und mobil), zwei Korrekturschleifen",
        quantity: 1,
        unit: "Pauschale",
        unitPrice: 1800,
        vatRate: 7,
        discountPercent: 10,
      },
      {
        id: newId(),
        description: "Frontend-Umsetzung in Next.js inkl. Barrierefreiheit nach WCAG 2.2 AA",
        quantity: 24,
        unit: "Std",
        unitPrice: 110,
        vatRate: 19,
        discountPercent: 0,
      },
      {
        id: newId(),
        description: "Druck und Montage der Informationstafeln",
        quantity: 12,
        unit: "m²",
        unitPrice: 40,
        vatRate: 8.1,
        discountPercent: 0,
      },
    ],
    notes:
      "Zahlbar innerhalb von 14 Tagen nach Abnahme, ohne Abzug. Reisekosten nach Aufwand, sofern vorab abgestimmt. Es gelten die üblichen Urheberrechte: Nutzungsrechte gehen mit vollständiger Zahlung über.",
    intro:
      "sehr geehrte Damen und Herren,\n\nvielen Dank für das Gespräch vom letzten Dienstag. Nachfolgend unser Angebot für Relaunch und Umsetzung Ihrer öffentlichen Website.",
    logoDataUrl: "",
  };
}
