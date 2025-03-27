"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Search, Users, ShoppingBag, Bell, Bookmark, Settings, MessageCircle, BadgeCheck, AArrowDown as SOS, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePremium } from "@/lib/context/PremiumContext";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { userPremiumState } = usePremium();

  const sidebarItems = [
    {
      href: "/",
      icon: Home,
      title: t('common.home'),
      color: "text-indigo-500",
      highlight: false
    },
    {
      href: "/explore",
      icon: Search,
      title: t('common.explore'),
      color: "text-purple-500",
      highlight: false
    },
    {
      href: "/communities",
      icon: Users,
      title: t('common.communities'),
      color: "text-pink-500",
      highlight: false
    },
    {
      href: "/marketplace",
      icon: ShoppingBag,
      title: t('common.marketplace'),
      color: "text-amber-500",
      highlight: false
    },
    {
      href: "/notifications",
      icon: Bell,
      title: t('common.notifications'),
      color: "text-blue-500",
      highlight: false
    },
    {
      href: "/messages",
      icon: MessageCircle,
      title: t('common.messages'),
      color: "text-green-500",
      highlight: false
    },
    {
      href: "/bookmarks",
      icon: Bookmark,
      title: t('common.bookmarks'),
      color: "text-orange-500",
      highlight: false
    },
    {
      href: "/profile",
      icon: User,
      title: t('common.profile'),
      color: "text-violet-500",
      highlight: false
    },
    {
      href: "/sos",
      icon: SOS,
      title: t('common.sos'),
      color: "text-red-500",
      highlight: true
    }
  ];

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <nav className="grid gap-2 grid-cols-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-indigo-600 dark:hover:text-indigo-400",
                    pathname === item.href ? 
                      "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-l-4 border-indigo-500" : 
                      item.highlight ? "bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500" : "transparent"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className={`mr-2 h-4 w-4 ${item.color}`} />
                    {item.title}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            {!userPremiumState.isVerified && (
              <Button 
                className="w-full gradient-bg hover:opacity-90 flex items-center justify-center"
                asChild
              >
                <Link href="/settings/subscription">
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  {t('premium.getVerified')}
                </Link>
              </Button>
            )}
            {userPremiumState.isVerified && (
              <Button 
                className="w-full border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30 flex items-center justify-center"
                variant="outline"
                asChild
              >
                <Link href="/settings/subscription">
                  <Settings className="mr-2 h-4 w-4" />
                  {t('premium.manageSubscription')}
                </Link>
              </Button>
            )}
            <Button 
              className="w-full border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30 mt-2"
              variant="outline"
              asChild
            >
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                {t('common.settings')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}