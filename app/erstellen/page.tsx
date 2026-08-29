import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Angebot erstellen",
  description: "Absender, Auftraggeber und Positionen eintragen, A4-PDF im Browser erzeugen.",
};

export default function ErstellenPage() {
  return <QuoteForm />;
}
