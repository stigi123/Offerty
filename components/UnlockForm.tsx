"use client";

import { FormEvent, useEffect, useState } from "react";
import { TrackedLink } from "@/components/TrackedLink";
import { trackEvent } from "@/lib/analytics";
import {
  UNLOCK_DAYS,
  UNLOCK_PRICE_EUR,
  loadUnlock,
  remainingUnlockLabel,
  unlockWithTxHash,
} from "@/lib/unlock";

export function UnlockForm({
  walletAddress,
  isPlaceholder,
}: {
  walletAddress: string;
  isPlaceholder: boolean;
}) {
  const [txHash, setTxHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const record = loadUnlock();
    setActive(record ? remainingUnlockLabel(record) : null);
  }, []);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setStatus(null);
    try {
      const record = unlockWithTxHash(txHash);
      trackEvent("unlock_submit");
      setActive(remainingUnlockLabel(record));
      setStatus(
        "Freischaltung gespeichert. Neue PDFs in diesem Browser erscheinen 30 Tage ohne Wasserzeichen.",
      );
      setTxHash("");
    } catch {
      setError("Bitte die Solana-Transaktionssignatur einfügen.");
    }
  }

  return (
    <section className="sheet pad legal">
      <p className="kicker">Freischaltung</p>
      <h1>Wasserzeichen entfernen</h1>
      <p className="lede">
        {UNLOCK_PRICE_EUR} € für {UNLOCK_DAYS} Tage — unbegrenzt PDFs ohne „Offertly — Demo“.
        Kein Konto. Der Status bleibt nur in diesem Browser.
      </p>

      {active ? (
        <p className="alert">Aktive Freischaltung: {active}.</p>
      ) : null}

      {isPlaceholder ? (
        <p className="alert alert-warn">
          <strong>Keine echte Empfangsadresse.</strong> Die Umgebungsvariable{" "}
          <code>WALLET_ADDRESS</code> ist nicht gesetzt. Die folgende Adresse ist ein
          sichtbarer Platzhalter — bitte nichts überweisen.
        </p>
      ) : null}

      <div className="pay-box">
        <div>
          <p className="kicker">Zu zahlen</p>
          <p className="price">{UNLOCK_PRICE_EUR} €</p>
          <p className="muted">
            Gegenwert in <strong>SOL</strong> oder <strong>USDC</strong> auf Solana.
            USDC liegt üblicherweise nahe 9–10 USDC; bei SOL den Euro-Betrag in Phantom
            zum Versandzeitpunkt prüfen.
          </p>
        </div>
      </div>

      <h2>Zahlung mit Phantom auf Solana</h2>
      <ol>
        <li>
          Öffnen Sie <strong>Phantom</strong> (oder eine andere Solana-Wallet) und wählen Sie
          das Netzwerk <strong>Solana</strong> — nicht Ethereum, nicht Bitcoin.
        </li>
        <li>
          Senden Sie den Gegenwert von <strong>{UNLOCK_PRICE_EUR} €</strong> in{" "}
          <strong>SOL</strong> oder <strong>USDC (Solana)</strong> an die Empfangsadresse
          unten.
        </li>
        <li>Warten Sie auf die Bestätigung im Solana-Netzwerk.</li>
        <li>
          Kopieren Sie die Transaktionssignatur aus Phantom (Transaktionsdetails) und fügen
          Sie sie hier ein, um die 30 Tage freizuschalten.
        </li>
      </ol>

      <p className="alert alert-warn">
        <strong>Nur Solana.</strong> Diese Adresse nimmt kein ETH, kein BTC und kein USDC
        auf Ethereum entgegen. Überweisungen auf einem anderen Netz kommen nicht an und
        können nicht gutgeschrieben werden.
      </p>

      <p className="muted">Solana-Empfangsadresse</p>
      <div className="copy-row">
        <p className="wallet-box">{walletAddress}</p>
        <button type="button" className="btn btn-brass" onClick={() => void copyAddress()}>
          {copied ? "Kopiert" : "Kopieren"}
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <label className="field">
          Transaktionssignatur
          <input
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="Solana-Signatur aus Phantom"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        <p className="muted">
          Die Signatur steht in Phantom nach der Überweisung unter den Transaktionsdetails.
        </p>
        {error ? <p className="alert alert-warn">{error}</p> : null}
        {status ? <p className="alert">{status}</p> : null}
        <div className="actions" style={{ marginTop: 16 }}>
          <button className="btn" type="submit">
            Freischalten
          </button>
          <TrackedLink className="btn btn-brass" href="/erstellen" event="create_click">
            Zum Angebot
          </TrackedLink>
        </div>
      </form>
    </section>
  );
}
