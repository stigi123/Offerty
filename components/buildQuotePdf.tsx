"use client";

import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import type { Quote, VatRate } from "@/lib/types";
import {
  COUNTRY_LABEL,
  documentTitle,
  formatDate,
  formatMoney,
  lineAmount,
  partyLine,
  quoteTotals,
} from "@/lib/format";

let fontsReady = false;

function ensureFonts() {
  if (fontsReady) return;
  Font.registerHyphenationCallback((word) => [word]);
  Font.register({
    family: "Libre Baskerville",
    fonts: [
      { src: "/fonts/LibreBaskerville-Regular.ttf", fontWeight: 400 },
      { src: "/fonts/LibreBaskerville-Bold.ttf", fontWeight: 700 },
      { src: "/fonts/LibreBaskerville-Italic.ttf", fontStyle: "italic", fontWeight: 400 },
    ],
  });
  fontsReady = true;
}

function vatShort(rate: VatRate): string {
  if (rate === 7.7) return "7,7 %";
  if (rate === 19) return "19 %";
  return "0 %";
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f7f1e3",
    color: "#1a241c",
    fontFamily: "Libre Baskerville",
    fontSize: 10,
    paddingTop: 42,
    paddingBottom: 54,
    paddingHorizontal: 48,
  },
  watermark: {
    position: "absolute",
    top: 360,
    left: -20,
    width: "120%",
    textAlign: "center",
    fontFamily: "Libre Baskerville",
    fontSize: 40,
    color: "#2d4a3a",
    opacity: 0.13,
    letterSpacing: 1.5,
    transform: "rotate(-26deg)",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  logo: {
    width: 72,
    height: 72,
    objectFit: "contain",
  },
  brandBlock: {
    alignItems: "flex-end",
  },
  kicker: {
    fontSize: 8,
    letterSpacing: 2.2,
    textTransform: "uppercase",
    color: "#6b5a38",
    marginBottom: 4,
  },
  title: {
    fontFamily: "Libre Baskerville",
    fontSize: 26,
    color: "#1c3228",
  },
  number: {
    marginTop: 4,
    fontSize: 10,
    color: "#2d4a3a",
  },
  rule: {
    height: 1.5,
    backgroundColor: "#b8954a",
    marginBottom: 2,
  },
  ruleThin: {
    height: 0.6,
    backgroundColor: "#d4bc7a",
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  partyLabel: {
    fontSize: 7.5,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "#6b5a38",
    marginBottom: 5,
  },
  partyName: {
    fontFamily: "Libre Baskerville",
    fontSize: 11,
    marginBottom: 2,
  },
  partyLine: {
    fontSize: 9.5,
    lineHeight: 1.35,
    color: "#2a332c",
  },
  dateCol: {
    width: 170,
    alignItems: "flex-end",
  },
  intro: {
    fontFamily: "Libre Baskerville",
    fontSize: 10.5,
    lineHeight: 1.5,
    marginTop: 8,
    marginBottom: 6,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 0.8,
    borderBottomColor: "#b8954a",
    paddingBottom: 5,
    marginBottom: 4,
    marginTop: 12,
  },
  th: {
    fontSize: 7.5,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: "#6b5a38",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 0.4,
    borderBottomColor: "#d9ccb0",
  },
  colPos: { width: "8%" },
  colDesc: { width: "42%" },
  colQty: { width: "12%", textAlign: "right" },
  colUnit: { width: "12%", textAlign: "right" },
  colPrice: { width: "13%", textAlign: "right" },
  colTotal: { width: "13%", textAlign: "right" },
  totals: {
    marginTop: 14,
    alignSelf: "flex-end",
    width: 250,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalStrong: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#b8954a",
    marginTop: 4,
    paddingTop: 6,
    fontFamily: "Libre Baskerville",
    fontWeight: 700,
    fontSize: 12,
  },
  notes: {
    marginTop: 20,
  },
  notesBody: {
    fontSize: 9.5,
    lineHeight: 1.45,
    color: "#2a332c",
  },
  closing: {
    marginTop: 18,
    fontFamily: "Libre Baskerville",
    fontSize: 10.5,
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#6b5a38",
    borderTopWidth: 0.5,
    borderTopColor: "#d4bc7a",
    paddingTop: 8,
  },
});

function QuotePdfDocument({ quote, watermark }: { quote: Quote; watermark: boolean }) {
  const totals = quoteTotals(quote);
  const kind = documentTitle(quote);
  const senderCity = quote.sender.city || COUNTRY_LABEL[quote.sender.country];
  const intro =
    quote.intro.trim() ||
    "sehr geehrte Damen und Herren,\n\nvielen Dank für Ihre Anfrage. Anbei unser Angebot über die unten aufgeführten Leistungen.";

  return (
    <Document
      title={`${kind} ${quote.number}`}
      author={quote.sender.name || "Offertly"}
      subject={`${kind} ${quote.number}`}
      creator="Offertly"
      language="de"
    >
      <Page size="A4" style={styles.page}>
        {watermark ? (
          <Text style={styles.watermark} fixed>
            Offertly — Demo
          </Text>
        ) : null}

        <View style={styles.topRow}>
          {quote.logoDataUrl ? (
            // eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image
            <Image src={quote.logoDataUrl} style={styles.logo} />
          ) : (
            <View style={{ width: 72 }} />
          )}
          <View style={styles.brandBlock}>
            <Text style={styles.kicker}>Offertly · DE · CH · AT</Text>
            <Text style={styles.title}>{kind.toUpperCase()}</Text>
            <Text style={styles.number}>Nr. {quote.number}</Text>
          </View>
        </View>

        <View style={styles.rule} />
        <View style={styles.ruleThin} />

        <View style={styles.metaRow}>
          <View style={{ width: "58%" }}>
            <Text style={styles.partyLabel}>Auftraggeber</Text>
            <Text style={styles.partyName}>{quote.client.name || "—"}</Text>
            {quote.client.street ? <Text style={styles.partyLine}>{quote.client.street}</Text> : null}
            <Text style={styles.partyLine}>{partyLine(quote.client) || "—"}</Text>
            {quote.client.email ? <Text style={styles.partyLine}>{quote.client.email}</Text> : null}
          </View>
          <View style={styles.dateCol}>
            <Text style={styles.partyLine}>
              {senderCity}, {formatDate(quote.date)}
            </Text>
            <Text style={[styles.partyLine, { marginTop: 8 }]}>Gültig bis</Text>
            <Text style={{ fontFamily: "Libre Baskerville", fontSize: 11 }}>
              {formatDate(quote.validUntil)}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.partyLabel}>Absender</Text>
          <Text style={styles.partyName}>{quote.sender.name || "—"}</Text>
          {quote.sender.street ? <Text style={styles.partyLine}>{quote.sender.street}</Text> : null}
          <Text style={styles.partyLine}>{partyLine(quote.sender) || "—"}</Text>
          {quote.sender.taxId ? (
            <Text style={styles.partyLine}>USt-IdNr. / UID: {quote.sender.taxId}</Text>
          ) : null}
          {quote.sender.email ? <Text style={styles.partyLine}>{quote.sender.email}</Text> : null}
          {quote.sender.phone ? <Text style={styles.partyLine}>{quote.sender.phone}</Text> : null}
        </View>

        <Text style={styles.intro}>{intro}</Text>

        <View style={styles.tableHeader}>
          <Text style={[styles.th, styles.colPos]}>Pos.</Text>
          <Text style={[styles.th, styles.colDesc]}>Beschreibung</Text>
          <Text style={[styles.th, styles.colQty]}>Menge</Text>
          <Text style={[styles.th, styles.colUnit]}>Einheit</Text>
          <Text style={[styles.th, styles.colPrice]}>Einzelpreis</Text>
          <Text style={[styles.th, styles.colTotal]}>Betrag</Text>
        </View>

        {quote.items.map((item, index) => (
          <View style={styles.row} key={item.id} wrap={false}>
            <Text style={styles.colPos}>{String(index + 1).padStart(2, "0")}</Text>
            <Text style={styles.colDesc}>{item.description || "—"}</Text>
            <Text style={styles.colQty}>{String(item.quantity).replace(".", ",")}</Text>
            <Text style={styles.colUnit}>{item.unit || "—"}</Text>
            <Text style={styles.colPrice}>{formatMoney(item.unitPrice, quote.currency)}</Text>
            <Text style={styles.colTotal}>
              {formatMoney(lineAmount(item.quantity, item.unitPrice), quote.currency)}
            </Text>
          </View>
        ))}

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Zwischensumme</Text>
            <Text>{formatMoney(totals.net, quote.currency)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>MwSt. {vatShort(quote.vatRate)}</Text>
            <Text>{formatMoney(totals.vat, quote.currency)}</Text>
          </View>
          <View style={styles.totalStrong}>
            <Text>Gesamt</Text>
            <Text>{formatMoney(totals.gross, quote.currency)}</Text>
          </View>
        </View>

        {quote.notes.trim() ? (
          <View style={styles.notes}>
            <Text style={styles.partyLabel}>Hinweise</Text>
            <Text style={styles.notesBody}>{quote.notes.trim()}</Text>
          </View>
        ) : null}

        <Text style={styles.closing}>
          {`Mit freundlichen Grüßen\n${quote.sender.name || ""}`}
        </Text>

        <View style={styles.footer} fixed>
          <Text>
            {watermark
              ? "Offertly — Demo  ·  Wasserzeichen entfernen unter /entsperren"
              : "Erstellt mit Offertly"}
          </Text>
          <Text
            render={({ pageNumber, totalPages }) => `Seite ${pageNumber} von ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}

export async function buildQuotePdf(quote: Quote, watermark: boolean): Promise<Blob> {
  ensureFonts();
  return pdf(<QuotePdfDocument quote={quote} watermark={watermark} />).toBlob();
}
