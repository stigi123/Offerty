export const SALE_EMAIL = "nathan.stieger2004@gmail.com";
export const SALE_PRICE_USD = "49–79 USD";
export const SALE_PRICE_EUR = "ca. 45–75 EUR";

const subject = "Offertly kaufen — Quelle und Vercel-App";
const body =
  "Hallo Nathan,\n\nich möchte Offertly kaufen (GitHub-Quellcode und die laufende Vercel-App).\n\nPreisvorstellung: ";

export const SALE_MAILTO = `mailto:${SALE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
