import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <article className="sheet pad legal">
      <p className="kicker">Rechtliches</p>
      <h1>Impressum</h1>
      <p>
        Angaben gemäß § 5 TMG (DE) bzw. entsprechenden Pflichten in CH/AT.
      </p>
      <p>
        Diensteanbieter: Bernhard Stieger
        <br />
        Anschrift: Staatsstrasse 11, 9463 Oberriet, Schweiz
      </p>
      <p>
        Vertretungsberechtigt: Bernhard Stieger
        <br />
        Verantwortlich für den Inhalt: Bernhard Stieger
      </p>
      <p className="muted">
        Offertly ist ein Angebot-/Offertengenerator. PDFs werden im Browser erzeugt. Eine
        Freischaltung ist optional (PayPal oder Krypto); die Solana-Adresse stammt aus{" "}
        <code>WALLET_ADDRESS</code>.
      </p>
    </article>
  );
}
