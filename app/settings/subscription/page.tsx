"use client";

import { useState, useEffect } from "react";
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
  AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { usePremium } from "@/lib/context/PremiumContext";
import { useTranslation } from "react-i18next";
import { VerifiedBadge } from "@/components/verified-badge";

export default function SubscriptionPage() {
  const { t } = useTranslation();
  const { userPremiumState, pricingInfo, upgradeSubscription, cancelSubscription } = usePremium();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
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
  
  const handleCancel = async () => {
    setIsProcessing(true);
    try {
      await cancelSubscription();
    } catch (error) {
      console.error('Cancellation error:', error);
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
                <a href="/sign-in">{mounted ? t('common.signIn') : "Sign In"}</a>
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
            <CreditCard className="h-6 w-6 mr-2 text-indigo-500" />
            <h1 className="text-3xl font-bold tracking-tight gradient-text">
              {mounted ? t('settings.subscription') : "Subscription"}
            </h1>
          </div>
          
          <Card className="border-2 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center">
                <CardTitle className="text-2xl">
                  {mounted ? t('premium.title') : "SALUT Premium"}
                </CardTitle>
                {userPremiumState.isVerified && (
                  <Badge className="ml-2 bg-blue-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {mounted ? t('premium.verified') : "Verified"}
                  </Badge>
                )}
              </div>
              <CardDescription>
                {mounted ? t('premium.subtitle') : "Unlock exclusive features and benefits"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {userPremiumState.tier === 'premium' ? (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-700 dark:text-green-400">
                        {mounted ? t('premium.pricing.currentPlan') : "Current Plan"}: 
                        {mounted ? t(`premium.pricing.${userPremiumState.subscriptionPeriod}`) : 
                          (userPremiumState.subscriptionPeriod === 'monthly' ? "Monthly" : "Yearly")}
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                        {userPremiumState.subscriptionEndDate && (
                          <>
                            {mounted ? t('premium.pricing.nextBilling') : "Next billing date"}: 
                            {userPremiumState.subscriptionEndDate.toLocaleDateString()}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 text-indigo-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-indigo-700 dark:text-indigo-400">
                        {mounted ? t('premium.limits.freeMessages', { 
                          remaining: userPremiumState.aiMessagesLimit - userPremiumState.aiMessagesUsed, 
                          total: userPremiumState.aiMessagesLimit 
                        }) : `You have ${userPremiumState.aiMessagesLimit - userPremiumState.aiMessagesUsed} of ${userPremiumState.aiMessagesLimit} free AI messages remaining this month`}
                      </h3>
                      <p className="text-sm text-indigo-600 dark:text-indigo-500 mt-1">
                        {mounted ? t('premium.limits.upgradeNow') : "Upgrade to Premium for unlimited AI messages"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={`border-2 hover:shadow-md transition-shadow duration-300 ${selectedPlan === 'monthly' && userPremiumState.tier !== 'premium' ? 'border-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/20' : ''}`}>
                  <CardHeader className="pb-2">
                    <CardTitle>{mounted ? t('premium.pricing.monthly') : "Monthly"}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{formatPrice(pricingInfo.monthly)}</span>
                      <span className="text-sm text-muted-foreground ml-1">
                        {mounted ? t('premium.pricing.perMonth') : "per month"}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {userPremiumState.tier === 'premium' && userPremiumState.subscriptionPeriod === 'monthly' ? (
                      <Button className="w-full" variant="outline" disabled>
                        {mounted ? t('premium.pricing.currentPlan') : "Current Plan"}
                      </Button>
                    ) : (
                      <Button 
                        className={`w-full ${selectedPlan === 'monthly' ? 'gradient-bg hover:opacity-90' : 'border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30'}`}
                        variant={selectedPlan === 'monthly' ? 'default' : 'outline'}
                        onClick={() => setSelectedPlan('monthly')}
                      >
                        {userPremiumState.tier === 'premium' 
                          ? (mounted ? t('premium.pricing.switchPlan') : "Switch Plan") 
                          : (mounted ? t('premium.pricing.subscribe') : "Subscribe")}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
                
                <Card className={`border-2 hover:shadow-md transition-shadow duration-300 ${selectedPlan === 'yearly' && userPremiumState.tier !== 'premium' ? 'border-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/20' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{mounted ? t('premium.pricing.yearly') : "Yearly"}</CardTitle>
                      <Badge className="bg-green-500">
                        {mounted ? t('premium.pricing.yearlyDiscount') : "Save 16%"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{formatPrice(yearlyPrice)}</span>
                      <span className="text-sm text-muted-foreground ml-1">
                        {mounted ? t('premium.pricing.perMonth') : "per month"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {mounted 
                        ? t('premium.pricing.billedAs', { price: formatPrice(pricingInfo.yearly) })
                        : `Billed as ${formatPrice(pricingInfo.yearly)} per year`}
                    </p>
                  </CardContent>
                  <CardFooter>
                    {userPremiumState.tier === 'premium' && userPremiumState.subscriptionPeriod === 'yearly' ? (
                      <Button className="w-full" variant="outline" disabled>
                        {mounted ? t('premium.pricing.currentPlan') : "Current Plan"}
                      </Button>
                    ) : (
                      <Button 
                        className={`w-full ${selectedPlan === 'yearly' ? 'gradient-bg hover:opacity-90' : 'border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30'}`}
                        variant={selectedPlan === 'yearly' ? 'default' : 'outline'}
                        onClick={() => setSelectedPlan('yearly')}
                      >
                        {userPremiumState.tier === 'premium' 
                          ? (mounted ? t('premium.pricing.switchPlan') : "Switch Plan") 
                          : (mounted ? t('premium.pricing.subscribe') : "Subscribe")}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {mounted ? t('premium.features.title') : "Premium Features"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        {mounted ? t('premium.features.verifiedBadge') : "Verified Badge"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {mounted ? t('premium.features.verifiedBadgeDesc') : "Stand out with a blue checkmark next to your name"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 mr-2 text-indigo-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        {mounted ? t('premium.features.unlimitedAI') : "Unlimited AI Assistant Messages"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {mounted ? t('premium.features.unlimitedAIDesc') : "No limits on AI-generated responses"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 mr-2 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        {mounted ? t('premium.features.priorityReplies') : "Priority in Replies & Trending Topics"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {mounted ? t('premium.features.priorityRepliesDesc') : "Your content gets seen by more people"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Ban className="h-5 w-5 mr-2 text-pink-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        {mounted ? t('premium.features.adFree') : "Ad-Free Experience"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {mounted ? t('premium.features.adFreeDesc') : "Enjoy SALUT without any advertisements"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        {mounted ? t('premium.features.earlyAccess') : "Early Access to New Features"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {mounted ? t('premium.features.earlyAccessDesc') : "Be the first to try new platform features"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {userPremiumState.tier === 'free' && (
                <div className="flex justify-center mt-6">
                  <Button 
                    size="lg" 
                    className="gradient-bg hover:opacity-90"
                    onClick={handleSubscribe}
                    disabled={isProcessing}
                  >
                    {isProcessing 
                      ? (mounted ? t('common.loading') : "Loading...") 
                      : (mounted ? t('premium.getVerified') : "Get Verified")}
                  </Button>
                </div>
              )}
              
              {userPremiumState.tier === 'premium' && (
                <div className="flex justify-center mt-6">
                  <Button 
                    variant="outline" 
                    className="border-red-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                    onClick={handleCancel}
                    disabled={isProcessing}
                  >
                    {isProcessing 
                      ? (mounted ? t('common.loading') : "Loading...") 
                      : (mounted ? t('premium.cancelSubscription') : "Cancel Subscription")}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}