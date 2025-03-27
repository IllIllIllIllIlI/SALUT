"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export function MainNav() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <MessageCircle className="h-6 w-6 text-indigo-500" />
        <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          SALUT
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-indigo-500",
            pathname === "/" ? "text-indigo-500 font-bold" : "text-foreground/60"
          )}
        >
          {t('common.home')}
        </Link>
        <Link
          href="/explore"
          className={cn(
            "transition-colors hover:text-purple-500",
            pathname === "/explore" ? "text-purple-500 font-bold" : "text-foreground/60"
          )}
        >
          {t('common.explore')}
        </Link>
        <Link
          href="/communities"
          className={cn(
            "transition-colors hover:text-pink-500",
            pathname?.startsWith("/communities")
              ? "text-pink-500 font-bold"
              : "text-foreground/60"
          )}
        >
          {t('common.communities')}
        </Link>
        <Link
          href="/marketplace"
          className={cn(
            "transition-colors hover:text-amber-500",
            pathname?.startsWith("/marketplace")
              ? "text-amber-500 font-bold"
              : "text-foreground/60"
          )}
        >
          {t('common.marketplace')}
        </Link>
      </nav>
    </div>
  );
}