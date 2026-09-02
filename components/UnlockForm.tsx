"use client";

import { FormEvent, useEffect, useState } from "react";
import { BuyAppCta } from "@/components/BuyAppCta";
import { TrackedAnchor, TrackedLink } from "@/components/TrackedLink";
import { trackEvent } from "@/lib/analytics";
import {
  PAYPAL_ME_URL,
  UNLOCK_DAYS,
  UNLOCK_PRICE_EUR,
  loadUnlock,
  remainingUnlockLabel,
  unlockWithTxHash,
} from "@/lib/unlock";

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.top = "0";
      field.style.left = "0";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.focus();
      field.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(field);
      return ok;
    } catch {
      return false;
    }
  }
}

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
    const ok = await copyText(walletAddress);
    if (ok) {
      setCopied(true);
      setError(null);
      window.setTimeout(() => setCopied(false), 2000);
      return;
    }
    setCopied(false);
    setError("Adresse konnte nicht kopiert werden. Bitte die Adresse markieren und kopieren.");
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
      setError("Bitte die Zahlungsreferenz oder Transaktionssignatur einfügen.");
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

      <div className="pay-box">
        <p className="kicker">Zu zahlen</p>
        <p className="price">{UNLOCK_PRICE_EUR} €</p>
        <p className="muted">
          Bevorzugt per <strong>PayPal</strong> (9 EUR). Solana (SOL oder USDC) bleibt
          optional darunter.
        </p>
      </div>

      <div className="actions" style={{ marginBottom: 22 }}>
        <TrackedAnchor
          className="btn"
          href={PAYPAL_ME_URL}
          event="paypal_click"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mit PayPal zahlen ({UNLOCK_PRICE_EUR} €)
        </TrackedAnchor>
      </div>

      <h2>Ich habe bezahlt</h2>
      <p className="muted">
        Nach der Zahlung die PayPal-Referenz oder eine Solana-Signatur eintragen. Version 1
        speichert die Freischaltung nur in diesem Browser und prüft die Zahlung nicht
        automatisch.
      </p>

      <form onSubmit={onSubmit}>
        <label className="field">
          Zahlungsreferenz
          <input
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="PayPal-Referenz oder Solana-Signatur"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        {error ? <p className="alert alert-warn">{error}</p> : null}
        {status ? <p className="alert">{status}</p> : null}
        <div className="actions" style={{ marginTop: 16 }}>
          <button className="btn" type="submit">
            Ich habe bezahlt
          </button>
          <TrackedLink className="btn btn-brass" href="/erstellen" event="create_click">
            Zum Angebot
          </TrackedLink>
        </div>
      </form>

      <details className="unlock-alt">
        <summary>Stattdessen mit Solana (Phantom) zahlen</summary>

        {isPlaceholder ? (
          <p className="alert alert-warn">
            <strong>Keine echte Empfangsadresse.</strong> Die Umgebungsvariable{" "}
            <code>WALLET_ADDRESS</code> ist nicht gesetzt. Die folgende Adresse ist ein
            sichtbarer Platzhalter — bitte nichts überweisen.
          </p>
        ) : null}

        <p className="muted">Solana-Empfangsadresse</p>
        <div className="copy-row">
          <p className="wallet-box">{walletAddress}</p>
          <button type="button" className="btn btn-brass" onClick={() => void copyAddress()}>
            {copied ? "Kopiert" : "Kopieren"}
          </button>
        </div>

        <p className="alert alert-warn">
          <strong>Nur Solana.</strong> Senden Sie SOL oder USDC in Phantom auf dem
          Solana-Netzwerk. ETH, BTC oder USDC auf Ethereum erreichen diese Adresse nicht
          und können nicht gutgeschrieben werden.
        </p>

        <h3>Zahlung mit Phantom</h3>
        <ol>
          <li>
            Öffnen Sie Phantom und wählen Sie das Netzwerk <strong>Solana</strong>.
          </li>
          <li>
            Senden Sie den Gegenwert von <strong>{UNLOCK_PRICE_EUR} €</strong> in{" "}
            <strong>SOL</strong> oder <strong>USDC (Solana)</strong> an die Adresse oben.
          </li>
          <li>Warten Sie auf die Bestätigung im Solana-Netzwerk.</li>
          <li>
            Kopieren Sie die Transaktionssignatur aus den Phantom-Transaktionsdetails und
            fügen Sie sie oben unter „Ich habe bezahlt“ ein.
          </li>
        </ol>
      </details>

      <BuyAppCta variant="compact" />
    </section>
  );
}
