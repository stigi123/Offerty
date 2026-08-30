import type { Metadata } from "next";
import Link from "next/link";
import { SealMark } from "@/components/SealMark";
import { TrackedLink } from "@/components/TrackedLink";
import { openGraphFor, SITE_NAME, SITE_URL } from "@/lib/seo";

const title = "Angebot erstellen als PDF | Offertly für Freelancer (DE/CH/AT)";
const description =
  "Angebot oder Offerte als gesetztes A4-PDF. Vorlage für Freelancer in Deutschland, der Schweiz und Österreich. Kein Konto — PDF im Browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: SITE_URL },
  openGraph: openGraphFor({ title, description, path: "/" }),
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "PDF mit Wasserzeichen kostenlos; 9 EUR für 30 Tage ohne Kennzeichnung",
  },
  inLanguage: "de",
  featureList: [
    "Angebot und Offerte als A4-PDF",
    "MwSt. DE, CH und AT",
    "Kein Benutzerkonto",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <section className="sheet hero">
        <div>
          <p className="kicker">Für Freelancer in DE · CH · AT</p>
          <h1>Die Offerte, die sitzt.</h1>
          <p className="lede">
            Angebot erstellen als PDF: Jobdetails eintragen, A4 herunterladen — in unter
            60 Sekunden. Für Freelancer in Deutschland, der Schweiz und Österreich. Kein
            Konto. Das Dokument entsteht in Ihrem Browser.
          </p>
          <div className="actions">
            <TrackedLink className="btn" href="/erstellen" event="create_click">
              Angebot erstellen
            </TrackedLink>
            <Link className="btn btn-brass" href="/anleitung">
              Anleitung lesen
            </Link>
          </div>
        </div>
        <SealMark className="wax" />
      </section>

      <section className="sheet" style={{ marginTop: 24 }}>
        <div className="band">
          <article>
            <p className="step">01</p>
            <h2>Angaben</h2>
            <p className="muted">
              Absender, Auftraggeber, Positionen, Währung, MwSt. Entwurf bleibt lokal
              im Browser.
            </p>
          </article>
          <article>
            <p className="step">02</p>
            <h2>Satz</h2>
            <p className="muted">
              Typografisch gesetztes A4, Papier und Messinglinie — bereit zum Senden
              als Angebot oder Offerte.
            </p>
          </article>
          <article>
            <p className="step">03</p>
            <h2>PDF</h2>
            <p className="muted">
              Download sofort. Kostenlos mit Kennzeichnung „Offertly — Demo“.
              Freischaltung 30 Tage.
            </p>
          </article>
        </div>
      </section>

      <div className="grid-2">
        <section className="sheet pad">
          <p className="kicker">Preis</p>
          <h2>Kostenlos testen, sauber absenden.</h2>
          <p>
            Jedes PDF ohne Freischaltung trägt das Wasserzeichen{" "}
            <strong>Offertly — Demo</strong>. Für 9 € schalten Sie 30 Tage
            unbegrenzte PDFs ohne Kennzeichnung frei — Zahlung per Krypto, ohne
            Benutzerkonto.
          </p>
          <p className="price">9 €</p>
          <p className="muted">pro 30 Tage · Transaktionshash genügt (v1)</p>
          <TrackedLink className="btn" href="/entsperren" event="unlock_click">
            Zur Freischaltung
          </TrackedLink>
        </section>
        <section className="sheet pad">
          <p className="kicker">Was enthalten ist</p>
          <h2>Alles für die erste Offerte.</h2>
          <ul>
            <li>EUR und CHF, MwSt. frei (DE/CH/AT-Sätze), Rabatt, Einheiten</li>
            <li>Gültig-bis, Hinweise, optionales Logo</li>
            <li>Beispieldaten und lokaler Entwurf</li>
            <li>Kein Tracking-Konto, keine Cloud-Akte</li>
          </ul>
        </section>
      </div>

      <section className="sheet pad" style={{ marginTop: 24 }}>
        <p className="kicker">Anleitung</p>
        <h2>Angebot Vorlage statt leerem Word-Dokument</h2>
        <p>
          Wer „Angebot erstellen PDF“ oder „Offerte erstellen Schweiz“ sucht, braucht
          meist keine Folie, sondern die Pflichtangaben: Positionen mit Einheit,
          den richtigen MwSt.-Satz (DE 19/7, CH 8,1, AT 20) und ein Gültig-bis.
          Die{" "}
          <Link href="/anleitung">Anleitung zum Angebot schreiben</Link> erklärt das
          in Kurzform — danach setzen Sie das Dokument unter{" "}
          <TrackedLink href="/erstellen" event="create_click">
            /erstellen
          </TrackedLink>
          .
        </p>
      </section>
    </>
  );
}
