"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';

type LanguageContextType = {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  availableLanguages: { code: string; name: string }[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'pt', name: 'Português' },
  { code: 'hi', name: 'हिन्दी' }
];

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set the language based on browser settings on initial load
    const savedLanguage = localStorage.getItem('userLanguage');
    const detectedLanguage = navigator.language.split('-')[0];
    const initialLanguage = savedLanguage || (availableLanguages.some(lang => lang.code === detectedLanguage) ? detectedLanguage : 'en');
    
    if (currentLanguage !== initialLanguage) {
      i18n.changeLanguage(initialLanguage);
      setCurrentLanguage(initialLanguage);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem('userLanguage', lang);
  };

  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};