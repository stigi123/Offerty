import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
  title: {
    default: "Offertly — Angebot & Offerte in unter 60 Sekunden",
    template: "%s · Offertly",
  },
  description:
    "Deutsche Angebote und Offerten als gesetztes A4-PDF. Für Freelancer in Deutschland, der Schweiz und Österreich. Kein Konto. PDF entsteht im Browser.",
  applicationName: "Offertly",
  keywords: ["Angebot", "Offerte", "PDF", "Freelancer", "Deutschland", "Schweiz", "Österreich"],
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
      </body>
    </html>
  );
}
