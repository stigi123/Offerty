export const SALE_EMAIL = "nathan.stieger2004@gmail.com";
export const SALE_PRICE_USD = "20 USD";
export const SALE_PRICE_EUR = "ca. 17–18 EUR";

const subject = "Offertly kaufen — Quelle und Vercel-App";
const body =
  `Hallo Nathan,\n\nich möchte Offertly kaufen (GitHub-Quellcode und die laufende Vercel-App).\n\nPreis: ${SALE_PRICE_USD} (${SALE_PRICE_EUR}).\n`;

export const SALE_MAILTO = `mailto:${SALE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
