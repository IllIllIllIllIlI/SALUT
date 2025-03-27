"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useTranslation } from "react-i18next";

export default function LanguageSettingsPage() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleSaveLanguage = () => {
    changeLanguage(selectedLanguage);
  };

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
            <Globe className="h-6 w-6 mr-2 text-indigo-500" />
            <h1 className="text-3xl font-bold tracking-tight gradient-text">{t('settings.language')}</h1>
          </div>
          
          <Card className="border-2 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{t('settings.language')}</CardTitle>
              <CardDescription>
                {t('settings.language')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedLanguage} 
                onValueChange={handleLanguageChange}
                className="space-y-4"
              >
                {availableLanguages.map((language) => (
                  <div key={language.code} className="flex items-center space-x-2">
                    <RadioGroupItem value={language.code} id={`language-${language.code}`} />
                    <Label htmlFor={`language-${language.code}`} className="flex-1">
                      {t(`settings.languages.${language.code}`)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button 
                className="gradient-bg hover:opacity-90 ml-auto"
                onClick={handleSaveLanguage}
                disabled={selectedLanguage === currentLanguage}
              >
                {t('common.save')}
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}