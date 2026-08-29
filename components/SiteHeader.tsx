"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SealMark } from "./SealMark";

const LINKS = [
  { href: "/erstellen", label: "Erstellen" },
  { href: "/entsperren", label: "Entsperren" },
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <SealMark className="brand-mark" />
        <span>
          <span className="brand-name">Offertly</span>
          <span className="brand-sub">Angebot · Offerte</span>
        </span>
      </Link>
      <nav className="nav" aria-label="Hauptnavigation">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
