import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  /* config options here */
};

if (process.env.NODE_ENV === 'development') {
   await setupDevPlatform();
 }

export default withNextIntl(nextConfig);
