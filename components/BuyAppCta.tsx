import { TrackedAnchor } from "@/components/TrackedLink";
import {
  SALE_EMAIL,
  SALE_MAILTO,
  SALE_PRICE_EUR,
  SALE_PRICE_USD,
} from "@/lib/sale";

export function BuyAppCta({ variant }: { variant: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <aside className="sale-box" aria-label="Komplettkauf">
        <p className="kicker">Komplettkauf</p>
        <p>
          Nicht die 9-€-Freischaltung: das komplette Offertly — GitHub-Quellcode plus
          die laufende Vercel-App — für {SALE_PRICE_USD} ({SALE_PRICE_EUR}). Schreiben
          Sie an{" "}
          <TrackedAnchor href={SALE_MAILTO} event="buy_app_click">
            {SALE_EMAIL}
          </TrackedAnchor>
          .
        </p>
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
        nicht die 9-€-Freischaltung, sondern das ganze Produkt. Kein Checkout auf
        dieser Seite — eine E-Mail reicht, Übergabe nach Zahlung.
      </p>
      <div className="actions" style={{ marginTop: 18 }}>
        <TrackedAnchor className="btn" href={SALE_MAILTO} event="buy_app_click">
          Offertly kaufen
        </TrackedAnchor>
      </div>
      <p className="muted" style={{ marginTop: 12 }}>
        Kontakt: {SALE_EMAIL}
      </p>
    </section>
  );
}