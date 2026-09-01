import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import { openGraphFor, pageUrl } from "@/lib/seo";

const title = "Angebot erstellen PDF — Offerte mit Positionen und MwSt.";
const description =
  "Angebot Vorlage für Freelancer: Absender, Auftraggeber, Positionen, EUR/CHF, MwSt. DE/CH/AT. Offerte erstellen und A4-PDF im Browser herunterladen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl("/erstellen") },
  openGraph: openGraphFor({ title, description, path: "/erstellen" }),
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

function FormFallback() {
  return (
    <section className="sheet pad">
      <p className="kicker">Offertly</p>
      <h1>Entwurf wird geladen…</h1>
    </section>
  );
}

export default function ErstellenPage() {
  return (
    <Suspense fallback={<FormFallback />}>
      <QuoteForm />
    </Suspense>
  );
}
