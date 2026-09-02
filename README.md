# Offertly

Deutsche Angebote und Offerten als gesetztes A4-PDF — für Freelancer in **Deutschland, der Schweiz und Österreich**. Angaben eintippen, PDF herunterladen, in unter 60 Sekunden. **Kein Konto.**

Das GitHub-Repository heißt weiterhin **Offerty**. Das Produkt heißt **Offertly**.

## Funktionen

- Formular unter `/erstellen`: Absender, Auftraggeber, nummerierte Positionen mit Einheit, EUR/CHF, frei wählbare MwSt. (Vorgaben DE/CH/AT, CH-Standard 8,1 %), Positions- und Dokumentrabatt, Gültig-bis, Hinweise, optionales Logo, Angebotsnummer
- Drei Startvorlagen (IT-Stunden, Handwerk, Beratung); Entwurf in `localStorage`
- PDF im **Browser** mit [`@react-pdf/renderer`](https://react-pdf.org/) (A4)
- Kostenlose PDFs mit Wasserzeichen **Offertly — Demo**
- Freischaltung **9 € / 30 Tage** unter `/entsperren`: Zahlung in **SOL oder USDC auf Solana** (Phantom), Empfangsadresse aus `WALLET_ADDRESS`
- Ist `WALLET_ADDRESS` leer, erscheint ein **klar als Fake gekennzeichneter Platzhalter**
- Komplettkauf (Quelle + Vercel-App) für **49–79 USD** über die Startseite und `/entsperren` — Kontakt `nathan.stieger2004@gmail.com`, kein Checkout
- `/impressum` und `/datenschutz` mit den hinterlegten Betreiberangaben — keine erfundenen E-Mails oder USt-IdNr.

## Entwicklung

```bash
npm install
cp .env.example .env.local   # optional WALLET_ADDRESS setzen
npm run dev
```

Öffnen: [http://localhost:3000](http://localhost:3000)

```bash
npm run build
npm start
```

## Umgebungsvariablen

Siehe `.env.example`.

| Variable         | Zweck                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| `WALLET_ADDRESS` | Empfangsadresse auf `/entsperren`. Leer = sichtbarer Fake-Platzhalter |

Die Variable ist **serverseitig**. Sie wird nicht als `NEXT_PUBLIC_*` ins Client-Bundle gelegt.

## Stack

Next.js App Router, TypeScript, React 19, CSS (Papier / Kiefer / Messing — kein generisches Violett).

## Rechtliches

Impressum und Datenschutzerklärung enthalten nur die vom Betreiber mitgeteilten Angaben. Fehlende Werte (E-Mail, Telefon, USt-IdNr.) werden weggelassen.
