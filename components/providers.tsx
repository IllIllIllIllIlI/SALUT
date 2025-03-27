"use client";

import React, { useState, useEffect, ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { PremiumProvider } from '@/lib/context/PremiumContext';
import { Toaster } from '@/components/ui/toaster';
import { I18nProvider } from '@/components/i18n-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  const [initialLanguage, setInitialLanguage] = useState('en');

  useEffect(() => {
    setMounted(true);
    // Get language from localStorage or browser settings
    const savedLang = localStorage.getItem('userLanguage');
    const browserLang = navigator.language.split('-')[0];
    const supportedLanguages = ['en', 'es', 'fr', 'de', 'ja', 'pt', 'hi'];
    const detectedLang = savedLang || (supportedLanguages.includes(browserLang) ? browserLang : 'en');
    setInitialLanguage(detectedLang);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <I18nProvider>
      <LanguageProvider>
        <PremiumProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </PremiumProvider>
      </LanguageProvider>
    </I18nProvider>
  );
}