"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  CheckCircle, 
  Shield, 
  MessageSquare, 
  TrendingUp, 
  Ban, 
  Clock,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { usePremium } from "@/lib/context/PremiumContext";
import { useTranslation } from "react-i18next";
import { VerifiedBadge } from "@/components/verified-badge";

export default function PremiumPage() {
  const { t } = useTranslation();
  const { userPremiumState, pricingInfo, upgradeSubscription } = usePremium();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubscribe = async () => {
    setIsProcessing(true);
    try {
      await upgradeSubscription(selectedPlan);
      // In a real app, this would redirect to a payment page
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const formatPrice = (price: number) => {
    return `${pricingInfo.currencySymbol}${price.toFixed(2)}`;
  };
  
  const yearlyPrice = pricingInfo.yearly / 12;
  const monthlySavings = ((pricingInfo.monthly - yearlyPrice) / pricingInfo.monthly) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ModeToggle />
              <Button asChild variant="default" className="gradient-bg hover:opacity-90">
                <a href="/sign-in">{t('common.signIn')}</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] py-8">
        <aside className="hidden md:block">
          <SidebarNav />
        </aside>
        <main className="flex flex-col space-y-6">
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-indigo-500" />
            <h1 className="text-3xl font-bold tracking-tight gradient-text">{t('premium.title')}</h1>
          </div>
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4">{t('premium.subtitle')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('premium.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className={`border-2 hover:shadow-md transition-shadow duration-300 ${selectedPlan === 'monthly' ? 'border-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/20' : ''}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{t('premium.pricing.monthly')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{formatPrice(pricingInfo.monthly)}</span>
                  <span className="text-sm text-muted-foreground ml-1">{t('premium.pricing.perMonth')}</span>
                </div>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{t('premium.features.verifiedBadgeDesc')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{t('premium.features.unlimitedAIDesc')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{t('premium.features.priorityRepliesDesc')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{t('premium.features.adFreeDesc')}</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full gradient-bg hover:opacity-90"
                  onClick={() => {
                    setSelectedPlan('monthly');
                    handleSubscribe();
                  }}
                  disabled={isProcessing || (userPremiumState.tier === 'premium' && userPremiumState.subscriptionPeriod === 'monthly')}
                >
                  {userPremiumState.tier === 'premium' && userPremiumState.subscriptionPeriod === 'monthly' 
                    ? t('premium.pricing.currentPlan') 
                    : isProcessing ? t('common.loading') : t('premium.pricing.subscribe')}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className={`border-2 hover:shadow-md transition-shadow duration-300 ${selectedPlan === 'yearly' ? 'border-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/20' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{t('premium.pricing.yearly')}</CardTitle>
                  <Badge className="bg-green-500">
                    {t('premium.pricing.yearlyDiscount')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{formatPrice(yearlyPrice)}</span>
                  <span className="text-sm text-muted-foreground ml-1">{t('premium.pricing.perMonth')}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('premium.pricing.billedAs', { price: formatPrice(pricingInfo.yearly) })}
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{t('premium.features.verifiedBadgeDesc')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{t('premium.features.unlimitedAIDesc')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{t('premium.features.priorityRepliesDesc')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{t('premium.features.adFreeDesc')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{t('premium.features.earlyAccessDesc')}</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full gradient-bg hover:opacity-90"
                  onClick={() => {
                    setSelectedPlan('yearly');
                    handleSubscribe();
                  }}
                  disabled={isProcessing || (userPremiumState.tier === 'premium' && userPremiumState.subscriptionPeriod === 'yearly')}
                >
                  {userPremiumState.tier === 'premium' && userPremiumState.subscriptionPeriod === 'yearly' 
                    ? t('premium.pricing.currentPlan') 
                    : isProcessing ? t('common.loading') : t('premium.pricing.subscribe')}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Separator className="my-8" />
          
          <div className="space-y-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center">{t('premium.features.title')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-500" />
                    <CardTitle>{t('premium.features.verifiedBadge')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{t('premium.features.verifiedBadgeDesc')}</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-indigo-500" />
                    <CardTitle>{t('premium.features.unlimitedAI')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{t('premium.features.unlimitedAIDesc')}</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                    <CardTitle>{t('premium.features.priorityReplies')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{t('premium.features.priorityRepliesDesc')}</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <Ban className="h-5 w-5 mr-2 text-pink-500" />
                    <CardTitle>{t('premium.features.adFree')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{t('premium.features.adFreeDesc')}</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:shadow-md transition-shadow duration-300 md:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-amber-500" />
                    <CardTitle>{t('premium.features.earlyAccess')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{t('premium.features.earlyAccessDesc')}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center mt-8">
              {userPremiumState.tier === 'premium' ? (
                <Button 
                  size="lg" 
                  className="gradient-bg hover:opacity-90"
                  asChild
                >
                  <a href="/settings/subscription">{t('premium.pricing.managePlan')}</a>
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="gradient-bg hover:opacity-90"
                  onClick={handleSubscribe}
                  disabled={isProcessing}
                >
                  {isProcessing ? t('common.loading') : t('premium.getVerified')}
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}