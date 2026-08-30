"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SealMark } from "./SealMark";
import { TrackedLink } from "./TrackedLink";
import type { OffertlyEvent } from "@/lib/analytics";

const LINKS: { href: string; label: string; event?: OffertlyEvent }[] = [
  { href: "/erstellen", label: "Erstellen", event: "create_click" },
  { href: "/anleitung", label: "Anleitung" },
  { href: "/entsperren", label: "Entsperren", event: "unlock_click" },
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
        {LINKS.map((link) => {
          const current = pathname === link.href ? "page" : undefined;
          if (link.event) {
            return (
              <TrackedLink
                key={link.href}
                href={link.href}
                event={link.event}
                aria-current={current}
              >
                {link.label}
              </TrackedLink>
            );
          }
          return (
            <Link key={link.href} href={link.href} aria-current={current}>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
