"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { usePremium } from '@/lib/context/PremiumContext';
import { useTranslation } from 'react-i18next';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

export function VerifiedBadge({ size = 'md', showTooltip = true, className = '' }: VerifiedBadgeProps) {
  const { t } = useTranslation();
  const { userPremiumState } = usePremium();
  
  if (!userPremiumState.isVerified) return null;
  
  const sizeMap = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  const badge = (
    <CheckCircle className={`${sizeMap[size]} text-blue-500 fill-blue-500 ${className}`} />
  );
  
  if (!showTooltip) return badge;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('premium.verified')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}