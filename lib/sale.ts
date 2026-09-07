export const SALE_EMAIL = "nathan.stieger2004@gmail.com";
export const SALE_PRICE_USD = "29 USD";
export const SALE_PRICE_EUR = "ca. 25 EUR";

const subject = "Offertly kaufen — Quelle und Vercel-App";
const body =
  "Hallo Nathan,\n\nich möchte Offertly kaufen (GitHub-Quellcode und die laufende Vercel-App).\n\nPreis: 29 USD (ca. 25 EUR).\n";

export const SALE_MAILTO = `mailto:${SALE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
