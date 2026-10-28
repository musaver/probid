// Central site/company constants used across the footer content pages.
// Swap the bracketed placeholders here once finalized — they update everywhere.
export const SITE = {
  entity: 'PTI Services Inc.',
  supportEmail: 'support@[your-domain]', // TODO: replace [your-domain] with the final domain
  websiteUrl: '[Website URL]',           // TODO: production web address
  mailingAddress: '3620 Pelham Rd, Ste 64, Greenville, SC 29615',
  governingState: 'South Carolina',
  venue: 'Greenville County, South Carolina',
  effectiveDate: 'June 20, 2026',
  responseTime: '[X business days]',     // TODO: client to set the support response time
};

const PRODUCTION_URL = 'https://trackyourlien.com';

// Absolute base URL for links in outgoing emails. Falls back to the production
// domain when NEXTAUTH_URL is unset or still points at localhost in production,
// so a misconfigured deploy can't email users links to their own machine.
export function appUrl(): string {
  const url = (process.env.NEXTAUTH_URL || '').replace(/\/+$/, '');
  if (!url) return PRODUCTION_URL;
  if (process.env.NODE_ENV === 'production' && /\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(url)) {
    return PRODUCTION_URL;
  }
  return url;
}
