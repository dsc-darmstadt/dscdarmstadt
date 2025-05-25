'use client';

import { Button } from '@/components/ui/button';

export function SkipToContent() {
  const skipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  return (
    <Button
      onClick={skipToMain}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50"
      variant="outline"
    >
      Skip to main content
    </Button>
  );
}
