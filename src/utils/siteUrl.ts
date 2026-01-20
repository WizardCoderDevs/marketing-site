const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brands.ppg.br';

export const siteUrl = rawSiteUrl.replace(/\/$/, '');
export const siteUrlWithSlash = `${siteUrl}/`;

