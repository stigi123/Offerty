export const UNLOCK_KEY = "offertly.unlock.v1";
export const UNLOCK_PRICE_EUR = 9;
export const UNLOCK_DAYS = 30;

/** Official PayPal.Me amount+currency: paypal.me/{name}/{amount}{ISO}. */
export const PAYPAL_ME_URL = "https://paypal.me/NathanStieger/9EUR";

/** Klar als unecht erkennbar, falls WALLET_ADDRESS nicht gesetzt ist. */
export const FAKE_WALLET_PLACEHOLDER =
  "SOL-DEMO-OFFERTLY-KEINE-ECHTE-WALLET — Platzhalter, nicht überweisen";

export interface UnlockRecord {
  txHash: string;
  unlockedAt: number;
  expiresAt: number;
}

export function loadUnlock(): UnlockRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(UNLOCK_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as UnlockRecord;
    if (!data.expiresAt || Date.now() >= data.expiresAt) return null;
    return data;
  } catch {
    return null;
  }
}

export function isUnlocked(): boolean {
  return loadUnlock() !== null;
}

export function unlockWithTxHash(txHash: string): UnlockRecord {
  const trimmed = txHash.trim();
  if (!trimmed) {
    throw new Error("Transaktionshash fehlt.");
  }
  const unlockedAt = Date.now();
  const expiresAt = unlockedAt + UNLOCK_DAYS * 24 * 60 * 60 * 1000;
  const record: UnlockRecord = { txHash: trimmed, unlockedAt, expiresAt };
  window.localStorage.setItem(UNLOCK_KEY, JSON.stringify(record));
  return record;
}

export function remainingUnlockLabel(record: UnlockRecord, now = Date.now()): string {
  const ms = record.expiresAt - now;
  const days = Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
  if (days <= 0) return "abgelaufen";
  if (days === 1) return "noch 1 Tag";
  return `noch ${days} Tage`;
}
