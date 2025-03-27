"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Types for premium state
export interface UserPremiumState {
  tier: 'free' | 'premium';
  isVerified: boolean;
  aiMessagesLimit: number;
  aiMessagesUsed: number;
  subscriptionPeriod?: 'monthly' | 'yearly';
  subscriptionEndDate?: Date;
}

// Types for pricing information
export interface PricingInfo {
  monthly: number;
  yearly: number;
  currency: string;
  currencySymbol: string;
}

// Context interface
interface PremiumContextType {
  userPremiumState: UserPremiumState;
  pricingInfo: PricingInfo;
  upgradeSubscription: (plan: 'monthly' | 'yearly') => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

// Create context with default values
const PremiumContext = createContext<PremiumContextType>({
  userPremiumState: {
    tier: 'free',
    isVerified: false,
    aiMessagesLimit: 10,
    aiMessagesUsed: 0
  },
  pricingInfo: {
    monthly: 9.99,
    yearly: 99.99,
    currency: 'USD',
    currencySymbol: '$'
  },
  upgradeSubscription: async () => {},
  cancelSubscription: async () => {}
});

// Provider component
export function PremiumProvider({ children }: { children: ReactNode }) {
  // State for user's premium status
  const [userPremiumState, setUserPremiumState] = useState<UserPremiumState>({
    tier: 'free',
    isVerified: false,
    aiMessagesLimit: 10,
    aiMessagesUsed: 3
  });

  // State for pricing information
  const [pricingInfo, setPricingInfo] = useState<PricingInfo>({
    monthly: 9.99,
    yearly: 99.99,
    currency: 'USD',
    currencySymbol: '$'
  });

  // Function to upgrade subscription
  const upgradeSubscription = async (plan: 'monthly' | 'yearly') => {
    // In a real app, this would call an API to process payment and update subscription
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUserPremiumState({
          tier: 'premium',
          isVerified: true,
          aiMessagesLimit: Infinity,
          aiMessagesUsed: 3,
          subscriptionPeriod: plan,
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
        });
        resolve();
      }, 1000);
    });
  };

  // Function to cancel subscription
  const cancelSubscription = async () => {
    // In a real app, this would call an API to cancel subscription
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUserPremiumState({
          tier: 'free',
          isVerified: false,
          aiMessagesLimit: 10,
          aiMessagesUsed: 3
        });
        resolve();
      }, 1000);
    });
  };

  // Effect to detect user's locale and set currency
  useEffect(() => {
    // In a real app, this would detect user's locale from browser or IP
    // and fetch appropriate pricing from an API
    const userLocale = navigator.language;
    let currency = 'USD';
    let currencySymbol = '$';
    let monthlyPrice = 9.99;
    let yearlyPrice = 99.99;
    
    // Simple currency conversion based on locale
    if (userLocale.startsWith('en-GB') || userLocale.startsWith('en-UK')) {
      currency = 'GBP';
      currencySymbol = '£';
      monthlyPrice = 7.99;
      yearlyPrice = 79.99;
    } else if (userLocale.startsWith('fr')) {
      currency = 'EUR';
      currencySymbol = '€';
      monthlyPrice = 8.99;
      yearlyPrice = 89.99;
    } else if (userLocale.startsWith('ja')) {
      currency = 'JPY';
      currencySymbol = '¥';
      monthlyPrice = 1100;
      yearlyPrice = 11000;
    }
    
    setPricingInfo({
      monthly: monthlyPrice,
      yearly: yearlyPrice,
      currency,
      currencySymbol
    });
  }, []);

  return (
    <PremiumContext.Provider value={{ 
      userPremiumState, 
      pricingInfo, 
      upgradeSubscription, 
      cancelSubscription 
    }}>
      {children}
    </PremiumContext.Provider>
  );
}

// Custom hook to use the premium context
export const usePremium = () => useContext(PremiumContext);