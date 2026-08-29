import type { Metadata } from "next";
import { UnlockForm } from "@/components/UnlockForm";
import { resolveWalletAddress } from "@/lib/wallet";

export const metadata: Metadata = {
  title: "Entsperren",
  description: "9 € für 30 Tage PDFs ohne Wasserzeichen. Zahlung per Krypto, ohne Konto.",
};

export const dynamic = "force-dynamic";

export default function EntsperrenPage() {
  const wallet = resolveWalletAddress();
  return (
    <UnlockForm walletAddress={wallet.address} isPlaceholder={wallet.isPlaceholder} />
  );
}
