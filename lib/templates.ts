import type { Quote } from "./types";
import { generateQuoteNumber, newId, plusDaysIso, todayIso } from "./format";

export type StarterTemplateId = "it-stunden" | "handwerk" | "beratung";

export interface StarterTemplate {
  id: StarterTemplateId;
  label: string;
  blurb: string;
  build: () => Quote;
}

function datedQuote(partial: Omit<Quote, "number" | "date" | "validUntil"> & { validDays: number }): Quote {
  const date = todayIso();
  const { validDays, ...rest } = partial;
  return {
    ...rest,
    number: generateQuoteNumber(date),
    date,
    validUntil: plusDaysIso(validDays, date),
  };
}

/** IT-Freelance nach Stunden — DE-Absender, CH-Auftraggeber (Offerte). */
export function itStundenQuote(): Quote {
  return datedQuote({
    validDays: 21,
    currency: "EUR",
    vatRate: 19,
    documentDiscountPercent: 0,
    sender: {
      name: "Nordlicht Software",
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
        description: "API-Schnittstelle und Datenmodell (Backend)",
        quantity: 16,
        unit: "Std",
        unitPrice: 110,
        vatRate: null,
        discountPercent: 0,
      },
      {
        id: newId(),
        description: "Code-Review und Abnahmebegleitung",
        quantity: 6,
        unit: "Std",
        unitPrice: 95,
        vatRate: null,
        discountPercent: 0,
      },
      {
        id: newId(),
        description: "Deployment, Übergabe und kurze Einweisung",
        quantity: 4,
        unit: "Std",
        unitPrice: 110,
        vatRate: null,
        discountPercent: 0,
      },
    ],
    notes:
      "Zahlbar innerhalb von 14 Tagen nach Abnahme, ohne Abzug. Reisekosten nach Aufwand, sofern vorab abgestimmt. Nutzungsrechte gehen mit vollständiger Zahlung über.",
    intro:
      "sehr geehrte Damen und Herren,\n\nvielen Dank für das Gespräch. Nachfolgend unser Angebot für die vereinbarten Entwicklungsleistungen — Abrechnung nach Aufwand zu den genannten Stundensätzen.",
    logoDataUrl: "",
  });
}

/** Handwerk mit Mengen, lfm und m² — CH, MwSt. 8,1 %. */
export function handwerkQuote(): Quote {
  return datedQuote({
    validDays: 14,
    currency: "CHF",
    vatRate: 8.1,
    documentDiscountPercent: 0,
    sender: {
      name: "Holzwerk Muster",
      street: "Werkstrasse 4",
      zip: "9000",
      city: "St. Gallen",
      country: "CH",
      email: "werkstatt@holzwerk-muster.example",
      phone: "+41 71 0000000",
      taxId: "CHE-000.000.000 MWST",
    },
    client: {
      name: "Familie Beispiel",
      street: "Seeweg 9",
      zip: "9400",
      city: "Rorschach",
      country: "CH",
      email: "familie@beispiel.example",
      phone: "+41 71 0000001",
      taxId: "",
    },
    items: [
      {
        id: newId(),
        description: "Eichenparkett verlegen, inkl. Unterlagsboden",
        quantity: 32,
        unit: "m²",
        unitPrice: 85,
        vatRate: null,
        discountPercent: 0,
      },
      {
        id: newId(),
        description: "Sockelleisten weiss, inkl. Material und Zuschnitt",
        quantity: 24,
        unit: "lfm",
        unitPrice: 28,
        vatRate: null,
        discountPercent: 0,
      },
      {
        id: newId(),
        description: "Entsorgung Altbelag",
        quantity: 1,
        unit: "Pauschale",
        unitPrice: 180,
        vatRate: null,
        discountPercent: 0,
      },
      {
        id: newId(),
        description: "Anfahrt und Baustelleneinrichtung",
        quantity: 1,
        unit: "Pauschale",
        unitPrice: 120,
        vatRate: null,
        discountPercent: 0,
      },
    ],
    notes:
      "Offerte gültig wie angegeben. Ausführung nach Terminabsprache. 50 % Anzahlung bei Auftragserteilung, Rest nach Abnahme. Zahlbar innert 10 Tagen.",
    intro:
      "Guten Tag,\n\nvielen Dank für die Besichtigung. Wir offerieren die unten aufgeführten Arbeiten für den Wohnbereich Seeweg 9.",
    logoDataUrl: "",
  });
}

/** Beratung als Pauschale — DE, 19 % MwSt. */
export function beratungQuote(): Quote {
  return datedQuote({
    validDays: 21,
    currency: "EUR",
    vatRate: 19,
    documentDiscountPercent: 5,
    sender: {
      name: "Klartext Beratung",
      street: "Beispielallee 3",
      zip: "80331",
      city: "München",
      country: "DE",
      email: "post@klartext-beratung.example",
      phone: "+49 89 0000000",
      taxId: "DE000000000",
    },
    client: {
      name: "Werkstatt am Fluss GmbH",
      street: "Hafenstraße 18",
      zip: "40213",
      city: "Düsseldorf",
      country: "DE",
      email: "leitung@werkstatt-fluss.example",
      phone: "+49 211 0000000",
      taxId: "DE000000001",
    },
    items: [
      {
        id: newId(),
        description: "Kick-off und Zielbild (remote)",
        quantity: 1,
        unit: "Pauschale",
        unitPrice: 900,
        vatRate: null,
        discountPercent: 0,
      },
      {
        id: newId(),
        description: "Strategie-Workshop, 1 Tag vor Ort inkl. Vorbereitung",
        quantity: 1,
        unit: "Pauschale",
        unitPrice: 2400,
        vatRate: null,
        discountPercent: 0,
      },
      {
        id: newId(),
        description: "Dokumentation und Maßnahmenplan",
        quantity: 1,
        unit: "Pauschale",
        unitPrice: 750,
        vatRate: null,
        discountPercent: 0,
      },
    ],
    notes:
      "Reisekosten Düsseldorf nach Aufwand, Bahn 2. Klasse. Workshop-Termin nach Absprache. Zahlbar innerhalb von 14 Tagen ohne Abzug.",
    intro:
      "sehr geehrte Damen und Herren,\n\nvielen Dank für Ihre Anfrage. Anbei unser Angebot für die strategische Begleitung — als feste Pakete, nicht nach Stunden.",
    logoDataUrl: "",
  });
}

export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: "it-stunden",
    label: "IT-Freelance Stunden",
    blurb: "Web-Entwicklung nach Aufwand · EUR · 19 %",
    build: itStundenQuote,
  },
  {
    id: "handwerk",
    label: "Handwerk Positionen",
    blurb: "Parkett und Montage · CHF · 8,1 %",
    build: handwerkQuote,
  },
  {
    id: "beratung",
    label: "Beratung Pauschale",
    blurb: "Workshop-Paket · EUR · 19 %",
    build: beratungQuote,
  },
];

export const DEFAULT_STARTER_ID: StarterTemplateId = "it-stunden";

export function getStarterTemplate(id: string | null | undefined): StarterTemplate | undefined {
  if (!id) return undefined;
  return STARTER_TEMPLATES.find((template) => template.id === id);
}

/** Fiktive Beispiel-Offerte für die Startseite — gleiche Daten wie IT-Vorlage. */
export function homepageSampleQuote(): Quote {
  const quote = itStundenQuote();
  quote.number = `OFF-${quote.date.replaceAll("-", "").slice(0, 4)}-014`;
  return quote;
}
