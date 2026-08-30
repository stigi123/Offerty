import type { Metadata } from "next";
import { UnlockForm } from "@/components/UnlockForm";
import { resolveWalletAddress } from "@/lib/wallet";
import { openGraphFor, pageUrl } from "@/lib/seo";

const title = "PDF ohne Wasserzeichen — Offertly entsperren";
const description =
  "9 € für 30 Tage Angebote und Offerten ohne Demo-Kennzeichnung. Kein Konto, Zahlung per Krypto.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl("/entsperren") },
  openGraph: openGraphFor({ title, description, path: "/entsperren" }),
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const dynamic = "force-dynamic";

export default function EntsperrenPage() {
  const wallet = resolveWalletAddress();
  return (
    <UnlockForm walletAddress={wallet.address} isPlaceholder={wallet.isPlaceholder} />
  );
}
