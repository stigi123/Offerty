export type Currency = "EUR" | "CHF";
export type VatRate = 0 | 7.7 | 19;
export type CountryCode = "DE" | "CH" | "AT";

export interface Party {
  name: string;
  street: string;
  zip: string;
  city: string;
  country: CountryCode;
  email: string;
  phone: string;
  taxId: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface Quote {
  number: string;
  date: string;
  validUntil: string;
  currency: Currency;
  vatRate: VatRate;
  sender: Party;
  client: Party;
  items: LineItem[];
  notes: string;
  intro: string;
  logoDataUrl: string;
}

export interface QuoteTotals {
  net: number;
  vat: number;
  gross: number;
}
