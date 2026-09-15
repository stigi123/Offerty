export const SALE_EMAIL = "nathan.stieger2004@gmail.com";
export const SALE_PRICE_USD = "20 USD";
export const SALE_PRICE_EUR = "ca. 17–18 EUR";

/** Official PayPal.Me amount+currency: paypal.me/{name}/{amount}{ISO}. Whole-app sale, not the 9 EUR unlock. */
export const SALE_PAYPAL_ME_URL = "https://paypal.me/NathanStieger/20USD";

const subject = "Offertly kaufen — Quelle und Vercel-App";
const body =
  `Hallo Nathan,\n\nich möchte Offertly kaufen (GitHub-Quellcode und die laufende Vercel-App).\n\nPreis: ${SALE_PRICE_USD} (${SALE_PRICE_EUR}).\n`;

export const SALE_MAILTO = `mailto:${SALE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
