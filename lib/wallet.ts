import { FAKE_WALLET_PLACEHOLDER } from "./unlock";

export function resolveWalletAddress(raw = process.env.WALLET_ADDRESS): {
  address: string;
  isPlaceholder: boolean;
} {
  const address = raw?.trim() ?? "";
  if (!address) {
    return { address: FAKE_WALLET_PLACEHOLDER, isPlaceholder: true };
  }
  return { address, isPlaceholder: false };
}
