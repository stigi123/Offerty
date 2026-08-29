import { SealMark } from "@/components/SealMark";
import { TrackedLink } from "@/components/TrackedLink";

export default function HomePage() {
  return (
    <>
      <section className="sheet hero">
        <div>
          <p className="kicker">Für Freelancer in DE · CH · AT</p>
          <h1>Die Offerte, die sitzt.</h1>
          <p className="lede">
            Jobdetails eintragen, A4-PDF herunterladen — in unter 60 Sekunden.
            Kein Konto, kein Server-Upload. Das Dokument entsteht in Ihrem Browser.
          </p>
          <div className="actions">
            <TrackedLink className="btn" href="/erstellen" event="create_click">
              Angebot erstellen
            </TrackedLink>
            <TrackedLink className="btn btn-brass" href="/entsperren" event="unlock_click">
              Wasserzeichen entfernen · 9 €
            </TrackedLink>
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
    </>
  );
}
