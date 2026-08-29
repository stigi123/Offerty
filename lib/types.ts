export type Currency = "EUR" | "CHF";
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
  /** null = document default rate */
  vatRate: number | null;
  discountPercent: number;
}

export interface Quote {
  number: string;
  date: string;
  validUntil: string;
  currency: Currency;
  vatRate: number;
  documentDiscountPercent: number;
  sender: Party;
  client: Party;
  items: LineItem[];
  notes: string;
  intro: string;
  logoDataUrl: string;
}

export interface VatBucket {
  rate: number;
  net: number;
  vat: number;
}

export interface LineComputed {
  id: string;
  pos: number;
  raw: number;
  lineDiscount: number;
  afterLineDiscount: number;
  documentDiscountShare: number;
  net: number;
  vatRate: number;
  vat: number;
}

export interface QuoteTotals {
  lineDiscountTotal: number;
  documentDiscount: number;
  netBeforeDocumentDiscount: number;
  net: number;
  vatByRate: VatBucket[];
  vat: number;
  gross: number;
  lines: LineComputed[];
}
