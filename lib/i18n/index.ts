"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translations
import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';
import frTranslation from './locales/fr/translation.json';
import deTranslation from './locales/de/translation.json';
import jaTranslation from './locales/ja/translation.json';
import ptTranslation from './locales/pt/translation.json';
import hiTranslation from './locales/hi/translation.json';

// Define resources
const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
  fr: {
    translation: frTranslation
  },
  de: {
    translation: deTranslation
  },
  ja: {
    translation: jaTranslation
  },
  pt: {
    translation: ptTranslation
  },
  hi: {
    translation: hiTranslation
  }
};

if (typeof window !== 'undefined') {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      react: {
        useSuspense: false,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span'],
      }
    });
}

export default i18n;