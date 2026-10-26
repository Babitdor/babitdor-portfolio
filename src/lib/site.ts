/**
 * Canonical site URL and the small amount of metadata copy that needs to agree
 * across pages.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in production. The fallback exists so local builds
 * and previews have a valid absolute URL for canonical tags and the sitemap;
 * it is not a claim that this domain is live.
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://babitdor.dev',
);

export const site = {
  name: 'Babitdor Kayang Khonglah',
  shortName: 'Babitdor',
  role: 'AI Engineer',
  title: 'Babitdor Kayang Khonglah · AI Engineer',
  description:
    'AI engineer building production agent systems: LangGraph orchestration, retrieval, validation, and the harnesses around them. M.Sc. AI at FAU Erlangen-Nürnberg.',
  email: 'babitdorbryan14@gmail.com',
  location: 'Erlangen, Germany',
  ogImage: '/og.png',
} as const;
