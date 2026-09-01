import { documentTitle, formatDate, formatMoney, formatQuantity, partyLine } from "@/lib/format";
import { homepageSampleQuote } from "@/lib/templates";
import { quoteTotals } from "@/lib/totals";
import { formatVatRate } from "@/lib/vat";

export function SampleOfferPreview() {
  const quote = homepageSampleQuote();
  const totals = quoteTotals(quote);
  const kind = documentTitle(quote);

  return (
    <figure className="quote-preview-wrap">
      <div className="quote-preview" aria-label={`Beispiel-${kind}`}>
        <header className="quote-preview-top">
          <span className="quote-preview-kicker">Beispiel · fiktiv</span>
          <div className="quote-preview-brand">
            <p className="quote-preview-kind">{kind}</p>
            <p className="quote-preview-no">Nr. {quote.number}</p>
          </div>
        </header>
        <div className="quote-preview-rule" />
        <div className="quote-preview-parties">
          <div>
            <p className="quote-preview-label">Auftraggeber</p>
            <p className="quote-preview-name">{quote.client.name}</p>
            <p>
              {quote.client.street}
              <br />
              {partyLine(quote.client)}
            </p>
          </div>
          <div className="quote-preview-meta">
            <p>
              {quote.sender.city}, {formatDate(quote.date)}
            </p>
            <p className="quote-preview-label">Gültig bis</p>
            <p>{formatDate(quote.validUntil)}</p>
          </div>
        </div>
        <p className="quote-preview-label">Absender</p>
        <p className="quote-preview-name">{quote.sender.name}</p>
        <p>
          {quote.sender.street} · {partyLine(quote.sender)}
        </p>
        <table className="quote-preview-table">
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Leistung</th>
              <th>Menge</th>
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
                    {item.description}
                    <span className="quote-preview-unit">
                      {" "}
                      · {formatQuantity(item.quantity)} {item.unit} · {formatVatRate(line?.vatRate ?? quote.vatRate)}
                    </span>
                  </td>
                  <td>
                    {formatQuantity(item.quantity)} {item.unit}
                  </td>
                  <td>{formatMoney(line?.afterLineDiscount ?? 0, quote.currency)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <dl className="quote-preview-totals">
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
      </div>
      <figcaption>Beispiel-Offerte (fiktive Daten) — so setzt Offertly das A4-PDF.</figcaption>
    </figure>
  );
}
