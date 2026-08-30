import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>Offertly — Angebote für DE, CH und AT. Kein Konto.</span>
      <span>
        <Link href="/anleitung">Anleitung</Link>
        {" · "}
        <Link href="/impressum">Impressum</Link>
        {" · "}
        <Link href="/datenschutz">Datenschutz</Link>
      </span>
    </footer>
  );
}
