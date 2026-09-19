import { TrackedAnchor } from "@/components/TrackedLink";
import {
  OFFERTLY_APP_URL,
  RECHNUNGLY_APP_URL,
  SALE_EMAIL,
  SALE_MAILTO,
  SALE_PAYPAL_ME_URL,
  SALE_PRICE_EUR,
  SALE_PRICE_USD,
} from "@/lib/sale";

function BundleApps() {
  return (
    <>
      <a href={OFFERTLY_APP_URL} target="_blank" rel="noopener noreferrer">
        Offertly
      </a>{" "}
      ({OFFERTLY_APP_URL.replace("https://", "")}) und{" "}
      <a href={RECHNUNGLY_APP_URL} target="_blank" rel="noopener noreferrer">
        Rechnungly
      </a>{" "}
      ({RECHNUNGLY_APP_URL.replace("https://", "")})
    </>
  );
}

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
        Mit PayPal beide Apps kaufen — {SALE_PRICE_USD}
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
          Nicht die 9-€-Freischaltung (nur Offertly): eine PayPal-Zahlung von{" "}
          {SALE_PRICE_USD} ({SALE_PRICE_EUR}) übernimmt Quelle und Vercel-App für
          beide — <BundleApps />.
        </p>
        <SaleActions />
      </aside>
    );
  }

  return (
    <section id="komplettkauf" className="sheet pad" style={{ marginTop: 24 }}>
      <p className="kicker">Komplettkauf</p>
      <h2>Beide Apps: Quelle und Vercel.</h2>
      <p>
        Eine Zahlung — {SALE_PRICE_USD} ({SALE_PRICE_EUR}) per PayPal — gilt für
        GitHub-Quellcode plus die laufende Vercel-App von <strong>beiden</strong>{" "}
        Produkten: <BundleApps />. Das ist nicht die 9-€-Freischaltung (nur
        Offertly, 30 Tage ohne Wasserzeichen). Übergabe nach Zahlung.
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
