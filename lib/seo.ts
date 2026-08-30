export const SITE_URL = "https://offertly.vercel.app";
export const SITE_NAME = "Offertly";

export const OG_LOCALE = "de_DE";

export function pageUrl(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

export function openGraphFor(input: {
  title: string;
  description: string;
  path: string;
}): {
  title: string;
  description: string;
  url: string;
  siteName: string;
  locale: string;
  type: "website";
} {
  return {
    title: input.title,
    description: input.description,
    url: pageUrl(input.path),
    siteName: SITE_NAME,
    locale: OG_LOCALE,
    type: "website",
  };
}
