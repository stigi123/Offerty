import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Fraunces, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
});

const serif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
});

const sans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Angebot erstellen als PDF | Offertly für Freelancer (DE/CH/AT)",
    template: "%s · Offertly",
  },
  description:
    "Angebot oder Offerte als gesetztes A4-PDF. Vorlage für Freelancer in Deutschland, der Schweiz und Österreich. Kein Konto — PDF im Browser.",
  applicationName: SITE_NAME,
  keywords: [
    "Angebot erstellen PDF",
    "Offerte erstellen Schweiz",
    "Angebot Vorlage Freelancer",
    "Angebot Freelancer Deutschland",
    "Offerte PDF Österreich",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Angebot erstellen als PDF | Offertly für Freelancer (DE/CH/AT)",
    description:
      "Angebot oder Offerte als gesetztes A4-PDF. Für Freelancer in DE, CH und AT. Kein Konto.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angebot erstellen als PDF | Offertly",
    description:
      "Angebot oder Offerte als A4-PDF für Freelancer in DE, CH und AT. Kein Konto.",
  },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#2d4a3a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${display.variable} ${serif.variable} ${sans.variable}`}>
        <a className="skip-link" href="#inhalt">
          Zum Inhalt
        </a>
        <SiteHeader />
        <main id="inhalt" className="site-main">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
