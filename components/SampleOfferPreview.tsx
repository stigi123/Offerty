import { QuotePreview } from "@/components/QuotePreview";
import { homepageSampleQuote } from "@/lib/templates";
import { quoteTotals } from "@/lib/totals";

export function SampleOfferPreview() {
  const quote = homepageSampleQuote();
  const totals = quoteTotals(quote);

  return (
    <figure className="quote-preview-wrap">
      <QuotePreview quote={quote} totals={totals} kicker="Beispiel · fiktiv" compact />
      <figcaption>Beispiel-Offerte (fiktive Daten) — so setzt Offertly das A4-PDF.</figcaption>
    </figure>
  );
}
