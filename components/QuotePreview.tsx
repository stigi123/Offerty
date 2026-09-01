import type { Quote, QuoteTotals } from "@/lib/types";
import {
  documentTitle,
  formatDate,
  formatMoney,
  formatQuantity,
  partyLine,
} from "@/lib/format";
import { formatVatRate } from "@/lib/vat";

export function QuotePreview({
  quote,
  totals,
  kicker,
  compact = false,
  watermark = false,
}: {
  quote: Quote;
  totals: QuoteTotals;
  kicker?: string;
  compact?: boolean;
  watermark?: boolean;
}) {
  const kind = documentTitle(quote);
  const intro = quote.intro.trim();

  return (
    <div
      className={`quote-preview${compact ? " quote-preview-compact" : " quote-preview-live"}`}
      aria-label={`${kind} ${quote.number}`.trim()}
    >
      {watermark ? <p className="quote-preview-mark">Offertly — Demo</p> : null}
      <header className="quote-preview-top">
        {kicker ? <span className="quote-preview-kicker">{kicker}</span> : <span />}
        <div className="quote-preview-brand">
          <p className="quote-preview-kind">{kind}</p>
          {quote.number.trim() ? <p className="quote-preview-no">Nr. {quote.number.trim()}</p> : null}
        </div>
      </header>
      <div className="quote-preview-rule" />
      <div className="quote-preview-rule quote-preview-rule-thin" />

      <div className="quote-preview-parties">
        <div>
          <p className="quote-preview-label">Auftraggeber</p>
          <p className="quote-preview-name">{quote.client.name.trim() || "—"}</p>
          {quote.client.street.trim() ? <p>{quote.client.street}</p> : null}
          <p>{partyLine(quote.client) || "—"}</p>
        </div>
        <div className="quote-preview-meta">
          <p>
            {quote.sender.city || "—"}, {formatDate(quote.date)}
          </p>
          <p className="quote-preview-label">Gültig bis</p>
          <p>{formatDate(quote.validUntil)}</p>
        </div>
      </div>

      <p className="quote-preview-label">Absender</p>
      <p className="quote-preview-name">{quote.sender.name.trim() || "—"}</p>
      <p>
        {[quote.sender.street, partyLine(quote.sender)].filter(Boolean).join(" · ") || "—"}
      </p>
      {quote.sender.taxId.trim() ? (
        <p className="quote-preview-meta-line">USt-IdNr. / UID: {quote.sender.taxId}</p>
      ) : null}

      {intro && !compact ? <p className="quote-preview-intro">{intro}</p> : null}

      <table className="quote-preview-table">
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Beschreibung</th>
            <th>Menge</th>
            <th>Einheit</th>
            <th>MwSt.</th>
            <th>Betrag</th>
          </tr>
        </thead>
        <tbody>
          {quote.items.map((item, index) => {
            const line = totals.lines[index];
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {item.description.trim() || "—"}
                  {item.discountPercent > 0 ? (
                    <span className="quote-preview-note">
                      {" "}
                      Rabatt {formatVatRate(item.discountPercent)}
                    </span>
                  ) : null}
                </td>
                <td>{formatQuantity(item.quantity)}</td>
                <td>{item.unit.trim() || "—"}</td>
                <td>{formatVatRate(line?.vatRate ?? quote.vatRate)}</td>
                <td>{formatMoney(line?.afterLineDiscount ?? 0, quote.currency)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <dl className="quote-preview-totals">
        {totals.lineDiscountTotal > 0 ? (
          <div>
            <dt>Rabatt auf Positionen</dt>
            <dd>−{formatMoney(totals.lineDiscountTotal, quote.currency)}</dd>
          </div>
        ) : null}
        <div>
          <dt>Zwischensumme</dt>
          <dd>{formatMoney(totals.netBeforeDocumentDiscount, quote.currency)}</dd>
        </div>
        {totals.documentDiscount > 0 ? (
          <div>
            <dt>Dokumentrabatt {formatVatRate(quote.documentDiscountPercent)}</dt>
            <dd>−{formatMoney(totals.documentDiscount, quote.currency)}</dd>
          </div>
        ) : null}
        <div>
          <dt>Netto</dt>
          <dd>{formatMoney(totals.net, quote.currency)}</dd>
        </div>
        {totals.vatByRate.map((bucket) => (
          <div key={bucket.rate}>
            <dt>MwSt. {formatVatRate(bucket.rate)}</dt>
            <dd>{formatMoney(bucket.vat, quote.currency)}</dd>
          </div>
        ))}
        <div className="quote-preview-grand">
          <dt>Gesamt</dt>
          <dd>{formatMoney(totals.gross, quote.currency)}</dd>
        </div>
      </dl>

      {quote.notes.trim() && !compact ? (
        <p className="quote-preview-notes">{quote.notes.trim()}</p>
      ) : null}

      <p className="quote-preview-closing">
        Mit freundlichen Grüßen
        {quote.sender.name.trim() ? `\n${quote.sender.name.trim()}` : ""}
      </p>
    </div>
  );
}
