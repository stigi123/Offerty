import { track } from "@vercel/analytics";

export type OffertlyEvent =
  | "create_click"
  | "pdf_download"
  | "unlock_click"
  | "unlock_submit"
  | "buy_app_click"
  | "paypal_click";

/** Fire a named event with no properties (no offer data, wallets, or hashes). */
export function trackEvent(name: OffertlyEvent): void {
  track(name);
}
