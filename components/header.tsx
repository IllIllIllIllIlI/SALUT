"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { MainNav } from "@/components/main-nav";

export function Header() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <Button asChild variant="default" className="gradient-bg hover:opacity-90">
              <Link href="/sign-in">{t('common.signIn')}</Link>
            </Button>
            <Button asChild variant="outline" className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
              <Link href="/sign-up">{t('common.signUp')}</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}