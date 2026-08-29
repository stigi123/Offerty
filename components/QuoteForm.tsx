"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import type { CountryCode, Currency, LineItem, Party, Quote } from "@/lib/types";
import {
  COUNTRY_LABEL,
  documentTitle,
  emptyLineItem,
  emptyQuote,
  filenameFor,
  formatMoney,
  generateQuoteNumber,
} from "@/lib/format";
import { sampleQuote } from "@/lib/sample";
import { clearDraft, loadDraft, saveDraft } from "@/lib/storage";
import { lineRawAmount, quoteTotals } from "@/lib/totals";
import { isUnlocked, loadUnlock, remainingUnlockLabel } from "@/lib/unlock";
import {
  UNIT_PRESETS,
  VAT_PRESETS,
  defaultVatForCurrency,
  formatVatRate,
  parseVatInput,
  unitChipActive,
} from "@/lib/vat";

async function fileToDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const max = 640;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas nicht verfügbar");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.82);
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className={`chip${pressed ? " active" : ""}`} aria-pressed={pressed} onClick={onClick}>
      {children}
    </button>
  );
}

function VatPresetChips({
  value,
  inheritLabel,
  onPick,
  onInherit,
}: {
  value: number | null;
  inheritLabel?: string;
  onPick: (rate: number) => void;
  onInherit?: () => void;
}) {
  return (
    <div className="chips" role="group" aria-label="MwSt.-Vorgaben">
      {onInherit ? (
        <Chip pressed={value === null} onClick={onInherit}>
          {inheritLabel ?? "wie Dokument"}
        </Chip>
      ) : null}
      {VAT_PRESETS.map((group) => (
        <span key={group.country} className="chip-cluster">
          <span className="chip-group-label">{group.label}</span>
          {group.rates.map((rate) => (
            <Chip key={`${group.country}-${rate}`} pressed={value === rate} onClick={() => onPick(rate)}>
              {formatVatRate(rate)}
            </Chip>
          ))}
        </span>
      ))}
    </div>
  );
}

function PartyFields({
  id,
  party,
  onChange,
}: {
  id: string;
  party: Party;
  onChange: (party: Party) => void;
}) {
  function set<K extends keyof Party>(key: K, value: Party[K]) {
    onChange({ ...party, [key]: value });
  }

  return (
    <div className="fields">
      <label className="field span-2">
        Name / Firma
        <input
          id={`${id}-name`}
          value={party.name}
          onChange={(e) => set("name", e.target.value)}
          autoComplete="organization"
        />
      </label>
      <label className="field span-2">
        Straße
        <input value={party.street} onChange={(e) => set("street", e.target.value)} />
      </label>
      <label className="field">
        PLZ
        <input value={party.zip} onChange={(e) => set("zip", e.target.value)} />
      </label>
      <label className="field">
        Ort
        <input value={party.city} onChange={(e) => set("city", e.target.value)} />
      </label>
      <label className="field">
        Land
        <select
          value={party.country}
          onChange={(e) => set("country", e.target.value as CountryCode)}
        >
          {(Object.keys(COUNTRY_LABEL) as CountryCode[]).map((code) => (
            <option key={code} value={code}>
              {COUNTRY_LABEL[code]}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        USt-IdNr. / UID
        <input value={party.taxId} onChange={(e) => set("taxId", e.target.value)} />
      </label>
      <label className="field">
        E-Mail
        <input
          type="email"
          value={party.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </label>
      <label className="field">
        Telefon
        <input value={party.phone} onChange={(e) => set("phone", e.target.value)} />
      </label>
    </div>
  );
}

export function QuoteForm() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [unlockLabel, setUnlockLabel] = useState<string | null>(null);
  const logoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const draft = loadDraft();
    setQuote(draft ?? emptyQuote());
    const record = loadUnlock();
    setUnlocked(Boolean(record));
    setUnlockLabel(record ? remainingUnlockLabel(record) : null);
  }, []);

  useEffect(() => {
    if (!quote) return;
    const handle = window.setTimeout(() => saveDraft(quote), 400);
    return () => window.clearTimeout(handle);
  }, [quote]);

  const totals = useMemo(() => (quote ? quoteTotals(quote) : null), [quote]);
  const kind = quote ? documentTitle(quote) : "Angebot";

  const update = useCallback((patch: Partial<Quote>) => {
    setQuote((current) => (current ? { ...current, ...patch } : current));
  }, []);

  function updateItem(id: string, patch: Partial<LineItem>) {
    setQuote((current) =>
      current
        ? {
            ...current,
            items: current.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
          }
        : current,
    );
  }

  function addItem() {
    setQuote((current) =>
      current ? { ...current, items: [...current.items, emptyLineItem()] } : current,
    );
  }

  function removeItem(id: string) {
    setQuote((current) =>
      current
        ? {
            ...current,
            items:
              current.items.length > 1
                ? current.items.filter((item) => item.id !== id)
                : current.items,
          }
        : current,
    );
  }

  async function onLogo(file: File | undefined) {
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      update({ logoDataUrl: dataUrl });
    } catch {
      setError("Logo konnte nicht gelesen werden. Bitte PNG oder JPG versuchen.");
    }
  }

  async function downloadPdf() {
    setError(null);
    setMessage(null);
    if (!quote) return;
    if (!quote.sender.name.trim() || !quote.client.name.trim()) {
      setError("Bitte Absender und Auftraggeber mit Namen ausfüllen.");
      return;
    }
    setBusy(true);
    try {
      const { buildQuotePdf } = await import("@/components/buildQuotePdf");
      const blob = await buildQuotePdf(quote, !isUnlocked());
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filenameFor(quote);
      a.click();
      URL.revokeObjectURL(url);
      setMessage(
        isUnlocked()
          ? "PDF ohne Wasserzeichen heruntergeladen."
          : "PDF heruntergeladen (Wasserzeichen „Offertly — Demo“).",
      );
    } catch (cause) {
      console.error(cause);
      setError("Das PDF konnte nicht erzeugt werden. Bitte Seite neu laden und erneut versuchen.");
    } finally {
      setBusy(false);
    }
  }

  if (!quote || !totals) {
    return (
      <section className="sheet pad">
        <p className="kicker">Offertly</p>
        <h1>Entwurf wird geladen…</h1>
      </section>
    );
  }

  return (
    <div className="form-layout">
      <form
        className="sheet pad"
        onSubmit={(e) => {
          e.preventDefault();
          void downloadPdf();
        }}
      >
        <p className="kicker">{kind} setzen</p>
        <h1>Angaben zum Auftrag</h1>
        <p className="muted">
          Entwurf wird lokal gespeichert. Kein Konto. PDF entsteht in diesem Browser.
        </p>

        <div className="actions" style={{ marginBottom: 18 }}>
          <button
            type="button"
            className="btn btn-brass"
            onClick={() => {
              setQuote(sampleQuote());
              setMessage("Beispieldaten geladen.");
              setError(null);
            }}
          >
            Beispieldaten
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              clearDraft();
              setQuote(emptyQuote());
              setMessage("Entwurf gelöscht.");
            }}
          >
            Entwurf löschen
          </button>
        </div>

        <fieldset>
          <legend>Dokument</legend>
          <div className="fields">
            <label className="field">
              Angebotsnummer
              <input
                value={quote.number}
                onChange={(e) => update({ number: e.target.value })}
                placeholder="z. B. OFF-2026-014"
              />
            </label>
            <label className="field">
              Datum
              <input
                type="date"
                value={quote.date}
                onChange={(e) => update({ date: e.target.value })}
              />
            </label>
            <label className="field">
              Gültig bis
              <input
                type="date"
                value={quote.validUntil}
                onChange={(e) => update({ validUntil: e.target.value })}
              />
            </label>
            <label className="field">
              Währung
              <select
                value={quote.currency}
                onChange={(e) => {
                  const currency = e.target.value as Currency;
                  update({
                    currency,
                    vatRate: defaultVatForCurrency(currency),
                  });
                }}
              >
                <option value="EUR">EUR</option>
                <option value="CHF">CHF</option>
              </select>
            </label>
            <label className="field">
              Dokumentrabatt %
              <input
                type="number"
                min={0}
                max={100}
                step="0.1"
                value={quote.documentDiscountPercent || ""}
                placeholder="0"
                onChange={(e) =>
                  update({
                    documentDiscountPercent: e.target.value === "" ? 0 : parseVatInput(e.target.value, 0),
                  })
                }
              />
            </label>
            <div className="field span-2">
              <span>MwSt. Vorgabe für Positionen</span>
              <input
                type="number"
                min={0}
                max={100}
                step="0.1"
                value={quote.vatRate}
                onChange={(e) => update({ vatRate: parseVatInput(e.target.value, quote.vatRate) })}
              />
              <VatPresetChips value={quote.vatRate} onPick={(rate) => update({ vatRate: rate })} />
              <span className="muted">Beliebiger Satz, nicht nur die Vorgaben. CH-Standard ist 8,1 %.</span>
            </div>
            <div className="field">
              <span className="muted">Nummer frei wählbar, kein Serverzähler.</span>
              <button
                type="button"
                className="btn btn-brass"
                onClick={() => update({ number: generateQuoteNumber(quote.date) })}
              >
                Vorschlag erzeugen
              </button>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Absender</legend>
          <PartyFields
            id="sender"
            party={quote.sender}
            onChange={(sender) => update({ sender })}
          />
          <div className="fields" style={{ marginTop: 12 }}>
            <label className="field span-2">
              Logo (optional, PNG/JPG)
              <input
                ref={logoInput}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => void onLogo(e.target.files?.[0])}
              />
            </label>
            {quote.logoDataUrl ? (
              <div className="field">
                <span className="muted">Vorschau</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={quote.logoDataUrl} alt="Logo-Vorschau" width={96} height={96} />
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    update({ logoDataUrl: "" });
                    if (logoInput.current) logoInput.current.value = "";
                  }}
                >
                  Logo entfernen
                </button>
              </div>
            ) : null}
          </div>
        </fieldset>

        <fieldset>
          <legend>Auftraggeber</legend>
          <PartyFields
            id="client"
            party={quote.client}
            onChange={(client) => update({ client })}
          />
        </fieldset>

        <fieldset>
          <legend>Positionen</legend>
          <div className="items">
            {quote.items.map((item, index) => {
              const computed = totals.lines[index];
              return (
                <div className="item-card" key={item.id}>
                  <div className="item-card-head">
                    <span className="pos-mark">Pos. {index + 1}</span>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Position ${index + 1} entfernen`}
                    >
                      Entfernen
                    </button>
                  </div>
                  <div className="fields">
                    <label className="field span-2">
                      Beschreibung
                      <input
                        value={item.description}
                        onChange={(e) => updateItem(item.id, { description: e.target.value })}
                      />
                    </label>
                    <label className="field">
                      Menge
                      <input
                        type="number"
                        min={0}
                        step="0.25"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                      />
                    </label>
                    <label className="field">
                      Einzelpreis
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, { unitPrice: Number(e.target.value) })}
                      />
                    </label>
                    <label className="field">
                      Rabatt %
                      <input
                        type="number"
                        min={0}
                        max={100}
                        step="0.1"
                        value={item.discountPercent || ""}
                        placeholder="0"
                        onChange={(e) =>
                          updateItem(item.id, {
                            discountPercent: e.target.value === "" ? 0 : parseVatInput(e.target.value, 0),
                          })
                        }
                      />
                    </label>
                    <div className="field span-2">
                      <span>Einheit</span>
                      <input
                        value={item.unit}
                        onChange={(e) => updateItem(item.id, { unit: e.target.value })}
                        placeholder="Stk, Std, Pauschale, lfm, m² …"
                      />
                      <div className="chips" role="group" aria-label="Einheiten">
                        {UNIT_PRESETS.map((unit) => (
                          <Chip
                            key={unit}
                            pressed={unitChipActive(item.unit, unit)}
                            onClick={() => updateItem(item.id, { unit })}
                          >
                            {unit}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <div className="field span-2">
                      <span>MwSt. dieser Position</span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        step="0.1"
                        value={item.vatRate ?? ""}
                        placeholder={String(quote.vatRate).replace(".", ",")}
                        onChange={(e) =>
                          updateItem(item.id, {
                            vatRate: e.target.value === "" ? null : parseVatInput(e.target.value, quote.vatRate),
                          })
                        }
                      />
                      <VatPresetChips
                        value={item.vatRate}
                        inheritLabel={`Dokument (${formatVatRate(quote.vatRate)})`}
                        onPick={(rate) => updateItem(item.id, { vatRate: rate })}
                        onInherit={() => updateItem(item.id, { vatRate: null })}
                      />
                    </div>
                  </div>
                  <p className="item-amount">
                    Betrag {formatMoney(computed?.afterLineDiscount ?? lineRawAmount(item), quote.currency)}
                    {item.discountPercent > 0
                      ? ` · Rabatt ${formatVatRate(item.discountPercent)} sichtbar im PDF`
                      : ""}
                    {` · ${formatVatRate(computed?.vatRate ?? quote.vatRate)}`}
                  </p>
                </div>
              );
            })}
          </div>
          <button type="button" className="btn btn-brass" onClick={addItem} style={{ marginTop: 12 }}>
            Position hinzufügen
          </button>
        </fieldset>

        <fieldset>
          <legend>Text</legend>
          <label className="field">
            Anschreiben
            <textarea
              value={quote.intro}
              onChange={(e) => update({ intro: e.target.value })}
              rows={5}
            />
          </label>
          <label className="field" style={{ marginTop: 12 }}>
            Hinweise / Zahlungsbedingungen
            <textarea
              value={quote.notes}
              onChange={(e) => update({ notes: e.target.value })}
              rows={4}
            />
          </label>
        </fieldset>
      </form>

      <aside className="sheet pad aside totals">
        <span className="status-pill">
          {unlocked ? `Freigeschaltet · ${unlockLabel}` : "Demo · mit Wasserzeichen"}
        </span>
        <h2>Summe</h2>
        <dl>
          {totals.lines.map((line) => {
            const item = quote.items.find((row) => row.id === line.id);
            return (
              <div key={line.id} style={{ display: "contents" }}>
                <dt>
                  Pos. {line.pos} {item?.description || "Position"}
                  {item?.unit ? ` · ${item.unit}` : ""}
                </dt>
                <dd>{formatMoney(line.afterLineDiscount, quote.currency)}</dd>
              </div>
            );
          })}
          {totals.lineDiscountTotal > 0 ? (
            <>
              <dt>Rabatt auf Positionen</dt>
              <dd>−{formatMoney(totals.lineDiscountTotal, quote.currency)}</dd>
            </>
          ) : null}
          <dt>Zwischensumme</dt>
          <dd>{formatMoney(totals.netBeforeDocumentDiscount, quote.currency)}</dd>
          {totals.documentDiscount > 0 ? (
            <>
              <dt>Dokumentrabatt {formatVatRate(quote.documentDiscountPercent)}</dt>
              <dd>−{formatMoney(totals.documentDiscount, quote.currency)}</dd>
            </>
          ) : null}
          <dt>Netto</dt>
          <dd>{formatMoney(totals.net, quote.currency)}</dd>
          {totals.vatByRate.map((bucket) => (
            <div key={bucket.rate} style={{ display: "contents" }}>
              <dt>MwSt. {formatVatRate(bucket.rate)}</dt>
              <dd>{formatMoney(bucket.vat, quote.currency)}</dd>
            </div>
          ))}
          <dt className="grand">Gesamt</dt>
          <dd className="grand">{formatMoney(totals.gross, quote.currency)}</dd>
        </dl>

        {error ? <p className="alert alert-warn">{error}</p> : null}
        {message ? <p className="alert">{message}</p> : null}

        <button className="btn" type="button" onClick={() => void downloadPdf()} disabled={busy}>
          {busy ? "Setze PDF…" : `${kind} als PDF laden`}
        </button>
        {!unlocked ? (
          <p className="muted" style={{ marginTop: 12 }}>
            Kostenlose PDFs tragen „Offertly — Demo“.{" "}
            <Link href="/entsperren">30 Tage entsperren für 9 €</Link>
          </p>
        ) : null}
      </aside>
    </div>
  );
}
