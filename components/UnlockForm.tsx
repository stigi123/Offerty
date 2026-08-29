"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
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
      setActive(remainingUnlockLabel(record));
      setStatus(
        "Freischaltung gespeichert. Neue PDFs in diesem Browser erscheinen 30 Tage ohne Wasserzeichen.",
      );
      setTxHash("");
    } catch {
      setError("Bitte einen Transaktionshash einfügen.");
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

      <h2>Zahlung per Krypto</h2>
      <ol>
        <li>
          Senden Sie den Gegenwert von <strong>{UNLOCK_PRICE_EUR} €</strong> (ETH, USDC oder
          BTC) an die unten stehende Adresse.
        </li>
        <li>Warten Sie auf die Bestätigung im jeweiligen Netzwerk.</li>
        <li>
          Fügen Sie den Transaktionshash ein. In Version 1 genügt jeder nicht-leere Hash —
          eine On-Chain-Prüfung findet nicht statt.
        </li>
      </ol>

      <p className="muted">Empfangsadresse</p>
      <div className="copy-row">
        <p className="wallet-box">{walletAddress}</p>
        <button type="button" className="btn btn-brass" onClick={() => void copyAddress()}>
          {copied ? "Kopiert" : "Kopieren"}
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <label className="field">
          Transaktionshash
          <input
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="0x… oder beliebiger Tx-Hash"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        {error ? <p className="alert alert-warn">{error}</p> : null}
        {status ? <p className="alert">{status}</p> : null}
        <div className="actions" style={{ marginTop: 16 }}>
          <button className="btn" type="submit">
            Freischalten
          </button>
          <Link className="btn btn-brass" href="/erstellen">
            Zum Angebot
          </Link>
        </div>
      </form>
    </section>
  );
}
