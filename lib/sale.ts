export const SALE_EMAIL = "nathan.stieger2004@gmail.com";
export const SALE_PRICE_USD = "20 USD";
export const SALE_PRICE_EUR = "ca. 17–18 EUR";

export const OFFERTLY_APP_URL = "https://offertly.vercel.app";
export const RECHNUNGLY_APP_URL = "https://rechnungly.vercel.app";

/** Official PayPal.Me amount+currency: paypal.me/{name}/{amount}{ISO}. Bundle sale, not the 9 EUR unlock. */
export const SALE_PAYPAL_ME_URL = "https://paypal.me/NathanStieger/20USD";

const subject = "Paket kaufen — Offertly + Rechnungly, Quelle und Vercel";
const body =
  `Hallo Nathan,\n\nich möchte das Paket kaufen: eine Zahlung für GitHub-Quellcode und die laufende Vercel-App von Offertly (${OFFERTLY_APP_URL}) und Rechnungly (${RECHNUNGLY_APP_URL}).\n\nPreis: ${SALE_PRICE_USD} (${SALE_PRICE_EUR}). Eine Zahlung gilt für beide Apps.\n`;

export const SALE_MAILTO = `mailto:${SALE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
