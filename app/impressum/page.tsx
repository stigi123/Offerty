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
        Angaben gemäß § 5 TMG (DE) bzw. entsprechenden Pflichten in CH/AT. Die folgenden
        Felder sind absichtlich nicht mit erfundenen Personendaten gefüllt.
      </p>
      <p>
        Diensteanbieter: <span className="placeholder">[Platzhalter]</span>
        <br />
        Anschrift: <span className="placeholder">[Platzhalter]</span>
        <br />
        E-Mail: <span className="placeholder">[Platzhalter]</span>
        <br />
        Telefon: <span className="placeholder">[Platzhalter]</span>
      </p>
      <p>
        Vertretungsberechtigt: <span className="placeholder">[Platzhalter]</span>
        <br />
        USt-IdNr.: <span className="placeholder">[Platzhalter]</span>
        <br />
        Handelsregister: <span className="placeholder">[Platzhalter]</span>
      </p>
      <p>
        Verantwortlich für den Inhalt: <span className="placeholder">[Platzhalter]</span>
      </p>
      <p className="muted">
        Offertly ist ein Angebot-/Offertengenerator. PDFs werden im Browser erzeugt. Eine
        Freischaltung über Krypto ist optional und an die Umgebungsvariable{" "}
        <code>WALLET_ADDRESS</code> gebunden.
      </p>
    </article>
  );
}
