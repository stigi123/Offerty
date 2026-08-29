import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function DatenschutzPage() {
  return (
    <article className="sheet pad legal">
      <p className="kicker">Rechtliches</p>
      <h1>Datenschutz</h1>
      <p>
        Verantwortliche Stelle: Bernhard Stieger, Staatsstrasse 11, 9463 Oberriet, Schweiz
        <br />
        Kontakt: Bernhard Stieger, Staatsstrasse 11, 9463 Oberriet, Schweiz
      </p>
      <h2>Was gespeichert wird — und was nicht</h2>
      <ul>
        <li>
          Es gibt <strong>keine Benutzerkonten</strong>. Eine Registrierung findet nicht statt.
        </li>
        <li>
          Angebotsdaten (Absender, Auftraggeber, Positionen, optionales Logo) bleiben im{" "}
          <strong>localStorage dieses Browsers</strong>. Sie werden nicht auf unseren Server
          hochgeladen.
        </li>
        <li>
          Das PDF wird <strong>im Browser</strong> mit @react-pdf/renderer erzeugt.
        </li>
        <li>
          Der Freischaltstatus (Transaktionshash, Ablaufdatum) liegt ebenfalls nur lokal.
          Version 1 prüft Hashes nicht on-chain.
        </li>
        <li>
          Die Empfangsadresse für optionale Zahlungen stammt aus der Server-Umgebungsvariable{" "}
          <code>WALLET_ADDRESS</code>.
        </li>
      </ul>
      <h2>Hosting</h2>
      <p>
        Die Website wird bei Vercel gehostet. Beim Aufruf verarbeitet Vercel übliche
        Verbindungsdaten (IP-Adresse, Zeitpunkt, User-Agent).
      </p>
      <h2>Rechte</h2>
      <p>
        Soweit die DSGVO oder das nDSG / DSG (CH) Anwendung findet: Auskunft, Berichtigung,
        Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit, Beschwerde bei einer
        Aufsichtsbehörde. Kontakt: Bernhard Stieger, Staatsstrasse 11, 9463 Oberriet, Schweiz
      </p>
      <p className="muted">
        Entwurf im Browser löschen: auf der Seite „Erstellen“ den Knopf „Entwurf löschen“
        verwenden oder die Website-Daten des Browsers leeren.
      </p>
    </article>
  );
}
