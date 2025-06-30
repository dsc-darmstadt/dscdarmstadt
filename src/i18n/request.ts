import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  const validLocale = locale && ['en', 'de'].includes(locale) ? locale : 'en';

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default
  };
});
