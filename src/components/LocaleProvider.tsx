'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

export function LocaleProvider() {
  const locale = useLocale();

  useEffect(() => {
    // Set the HTML lang attribute dynamically
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
