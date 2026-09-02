import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/TrackedLink";
import { openGraphFor, pageUrl, SITE_URL } from "@/lib/seo";

const title = "Angebot schreiben: Anleitung für Freelancer in DE, CH und AT";
const description =
  "Was ins Angebot oder die Offerte gehört, welche MwSt. gilt (DE 19/7, CH 8,1/2,6/3,8, AT 20/10/13) und wie Sie das PDF in Offertly setzen. Kein Konto.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl("/anleitung") },
  openGraph: openGraphFor({ title, description, path: "/anleitung" }),
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const faqs = [
  {
    q: "Was gehört in ein Angebot oder eine Offerte?",
    a: "Absender mit Anschrift und Steuer-ID, Auftraggeber, fortlaufende Positionsnummern, Leistungstext, Menge, Einheit, Einzelpreis, MwSt.-Satz, Gesamtsumme, Datum und ein klares Gültig-bis. Hinweise zu Zahlung und Nutzungsrechten gehören darunter, nicht in die Positionstabelle.",
  },
  {
    q: "Welche Mehrwertsteuer gilt für Freelancer in DE, CH und AT?",
    a: "Deutschland: 19 % Regelsteuersatz, 7 % ermäßigt. Schweiz: 8,1 % Normalsatz, 2,6 % reduziert, 3,8 % Beherbergung. Österreich: 20 %, 10 % oder 13 %. Ein Angebot darf Sätze mischen, wenn die Leistungen unterschiedlich steuerbar sind.",
  },
  {
    q: "Unterschied zwischen Angebot und Offerte?",
    a: "In Deutschland und Österreich sagt man meist Angebot. In der Schweiz ist Offerte der übliche Begriff. Inhaltlich ist es dasselbe Dokument: eine verbindliche Preis- und Leistungszusage auf Zeit.",
  },
  {
    q: "Speichert Offertly mein Angebot auf einem Server?",
    a: "Nein. Der Entwurf bleibt im localStorage dieses Browsers. Das A4-PDF entsteht lokal. Es gibt kein Benutzerkonto.",
  },
];

export default function AnleitungPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Angebot oder Offerte als PDF erstellen",
    description,
    url: pageUrl("/anleitung"),
    step: [
      {
        "@type": "HowToStep",
        name: "Absender und Auftraggeber eintragen",
        text: "Firma oder Name, Straße, PLZ, Ort, Land und falls vorhanden USt-IdNr. oder UID.",
      },
      {
        "@type": "HowToStep",
        name: "Positionen mit Einheit und MwSt. setzen",
        text: "Jede Zeile braucht Nummer, Text, Menge, Einheit (Std, Stk, Pauschale, lfm, m²) und den passenden Steuersatz.",
      },
      {
        "@type": "HowToStep",
        name: "PDF herunterladen",
        url: `${SITE_URL}/erstellen`,
        text: "In Offertly das Angebot im Browser als A4-PDF erzeugen und versenden.",
      },
    ],
  };

  return (
    <article className="sheet pad legal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <p className="kicker">Anleitung</p>
      <h1>Angebot oder Offerte schreiben — kurz und vollständig</h1>
      <p className="lede">
        Ein gutes Angebot ist kein Roman. Es muss den Auftrag so beschreiben, dass der Kunde
        unterschreiben kann, ohne nachtelefonieren zu müssen. Offertly setzt daraus ein A4-PDF
        für Freelancer in Deutschland, der Schweiz und Österreich.
      </p>

      <h2>Was ins Dokument gehört</h2>
      <p>
        Oben stehen Sie (Absender) und darunter der Auftraggeber. In DE/AT erwartet man
        üblicherweise USt-IdNr., in der CH die UID. Das Datum und ein <strong>Gültig-bis</strong>{" "}
        gehören auf die erste Seite — zwei Wochen sind praxisnah, drei Wochen bei größeren
        Paketen. Die Angebotsnummer dürfen Sie frei wählen; Offertly zählt nicht serverseitig,
        weil es kein Konto gibt.
      </p>
      <p>
        Die Tabelle trägt die Arbeit: <strong>Pos. 1, 2, 3…</strong>, Leistungstext, Menge,
        Einheit, Einzelpreis, MwSt., Betrag. Einheiten wie Std, Stk, Pauschale, lfm oder m²
        machen die Zeile prüfbar. Rabatte gehören sichtbar in die Zeile oder als
        Dokumentrabatt darunter — nie nur in der Kopfrechnung.
      </p>

      <h2>MwSt. in DE, CH und AT</h2>
      <p>
        Das ist keine Steuerberatung, sondern die Sätze, die Freelancer in der Praxis setzen.
        Offertly nimmt einen beliebigen Prozentsatz; die Vorgaben sind nur Abkürzung.
      </p>
      <ul>
        <li>
          <strong>Deutschland:</strong> 19 % Regelsteuersatz, 7 % ermäßigt (u. a. bestimmte
          Druck- und Kulturgüter). 0 %, wenn die Leistung nicht steuerbar oder befreit ist —
          das schreiben Sie ins Angebot, nicht nur in die Summe.
        </li>
        <li>
          <strong>Schweiz:</strong> 8,1 % Normalsatz (seit 2024), 2,6 % reduziert, 3,8 %
          Beherbergung. Der frühere 7,7-%-Satz ist nicht mehr der Standard.
        </li>
        <li>
          <strong>Österreich:</strong> 20 % Normalsteuersatz, 10 % oder 13 % ermäßigt, je nach
          Leistung.
        </li>
      </ul>
      <p>
        Gemischte Angebote sind normal: Beratung zum Regelsatz, eine ermäßigte Nebenleistung
        daneben. Dann muss die Summe die MwSt. <strong>nach Satz getrennt</strong> ausweisen,
        sonst wirkt das Dokument wie eine Excel-Notiz statt wie eine Offerte.
      </p>

      <h2>Angebot oder Offerte?</h2>
      <p>
        In Deutschland und Österreich sagt man Angebot, oft mit Vorlage aus Word. In der
        Schweiz heißt dasselbe Schriftstück Offerte. Der Inhalt ist identisch: Leistung,
        Preis, Steuer, Gültigkeit. Wer an Zürcher oder Wiener Kunden schreibt, sollte die
        lokale Bezeichnung und den lokalen Satz verwenden — nicht eine deutsche 19-%-Vorlage
        umetikettieren.
      </p>

      <h2>So setzen Sie das PDF in Offertly</h2>
      <p>
        Unter{" "}
        <TrackedLink href="/erstellen" event="create_click">
          Angebot erstellen
        </TrackedLink>{" "}
        wählen Sie eine Vorlage (IT-Stunden, Handwerk, Beratung) oder schreiben frei.
        Absender, Auftraggeber und Positionen; Währung EUR oder CHF; MwSt. frei oder über
        die DE/CH/AT-Vorgaben; optional Rabatt und Logo. Das PDF entsteht im Browser.
        Kostenlos trägt es das Wasserzeichen „Offertly — Demo“; 30 Tage ohne
        Kennzeichnung gibt es unter{" "}
        <Link href="/entsperren">Entsperren</Link> für 9 € (PayPal, optional Solana).
      </p>

      <h2>Häufige Fragen</h2>
      {faqs.map((item) => (
        <section key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </section>
      ))}

      <div className="actions" style={{ marginTop: 28 }}>
        <TrackedLink className="btn" href="/erstellen" event="create_click">
          Angebot als PDF erstellen
        </TrackedLink>
      </div>
    </article>
  );
}
