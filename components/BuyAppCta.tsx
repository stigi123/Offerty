import { TrackedAnchor } from "@/components/TrackedLink";
import {
  SALE_EMAIL,
  SALE_MAILTO,
  SALE_PAYPAL_ME_URL,
  SALE_PRICE_EUR,
  SALE_PRICE_USD,
} from "@/lib/sale";

function SaleActions() {
  return (
    <div className="actions">
      <TrackedAnchor
        className="btn"
        href={SALE_PAYPAL_ME_URL}
        event="buy_app_paypal_click"
        target="_blank"
        rel="noopener noreferrer"
      >
        Mit PayPal kaufen — {SALE_PRICE_USD}
      </TrackedAnchor>
      <TrackedAnchor className="btn btn-brass" href={SALE_MAILTO} event="buy_app_click">
        Per E-Mail schreiben
      </TrackedAnchor>
    </div>
  );
}

export function BuyAppCta({ variant }: { variant: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <aside className="sale-box" aria-label="Komplettkauf">
        <p className="kicker">Komplettkauf</p>
        <p>
          Nicht die 9-€-Freischaltung: das komplette Offertly — GitHub-Quellcode plus
          die laufende Vercel-App — für {SALE_PRICE_USD} ({SALE_PRICE_EUR}). Die
          PayPal-Zahlung gilt für Quelle und Vercel-App, nicht für 9 € / 30 Tage.
        </p>
        <SaleActions />
      </aside>
    );
  }

  return (
    <section id="komplettkauf" className="sheet pad" style={{ marginTop: 24 }}>
      <p className="kicker">Komplettkauf</p>
      <h2>Quelle und Vercel-App übernehmen.</h2>
      <p>
        Offertly steht zum Verkauf: der GitHub-Quellcode plus die laufende App auf
        Vercel. Preis <strong>{SALE_PRICE_USD}</strong> ({SALE_PRICE_EUR}). Das ist
        nicht die 9-€-Freischaltung, sondern das ganze Produkt. Zahlung per PayPal
        übernimmt Quelle und Vercel-App — nicht die 9 € / 30 Tage ohne Wasserzeichen.
        Übergabe nach Zahlung.
      </p>
      <div style={{ marginTop: 18 }}>
        <SaleActions />
      </div>
      <p className="muted" style={{ marginTop: 12 }}>
        Kontakt: {SALE_EMAIL}
      </p>
    </section>
  );
}