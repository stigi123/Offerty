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
          Der Freischaltstatus (Zahlungsreferenz, Ablaufdatum) liegt ebenfalls nur lokal.
          Version 1 prüft Zahlungen nicht automatisch.
        </li>
        <li>
          Die Empfangsadresse für optionale Solana-Zahlungen stammt aus der
          Server-Umgebungsvariable <code>WALLET_ADDRESS</code>.
        </li>
      </ul>
      <h2>Zahlungsdienstleister</h2>
      <p>
        Für die optionale Freischaltung kann <strong>PayPal</strong> (PayPal (Europe)
        S.à r.l. et Cie, S.C.A.) als Zahlungsdienstleister genutzt werden. Beim Klick auf
        „Mit PayPal zahlen“ verlassen Sie diese Website; PayPal verarbeitet dann die für
        die Zahlung nötigen Daten nach eigener Datenschutzerklärung. Eine alternative
        Zahlung in SOL oder USDC auf Solana bleibt möglich.
      </p>
      <h2>Hosting</h2>
      <p>
        Die Website wird bei Vercel gehostet. Beim Aufruf verarbeitet Vercel übliche
        Verbindungsdaten (IP-Adresse, Zeitpunkt, User-Agent).
      </p>
      <h2>Reichweitenmessung</h2>
      <p>
        Wir nutzen Vercel Web Analytics. Erfasst werden Seitenaufrufe sowie die
        Ereignisse create_click, pdf_download, unlock_click, unlock_submit,
        buy_app_click und paypal_click (Klicks zum Formular bzw. zur Freischaltung,
        PDF-Download, Absenden einer Zahlungsreferenz, Klick auf den Komplettkauf,
        Klick auf PayPal). Es werden keine Angebotsinhalte, Namen, Beträge,
        Wallet-Adressen oder Hashes als Ereigniseigenschaften gesendet. Es gibt
        keine Werbe-Cookies und keine Nutzerkonten. Ein Cookie-Banner ist dafür
        nicht vorgesehen.
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
