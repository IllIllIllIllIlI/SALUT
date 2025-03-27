"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

interface FeedToggleProps {
  defaultValue?: string;
  options?: {
    value: string;
    label: string;
    translateKey: string;
  }[];
}

export function FeedToggle({ 
  defaultValue = "for-you",
  options = [
    { value: "for-you", label: "For You", translateKey: "feed.forYou" },
    { value: "following", label: "Following", translateKey: "feed.following" }
  ]
}: FeedToggleProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentTab = searchParams.get("tab") || defaultValue;
  
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs defaultValue={currentTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        {options.map((option) => (
          <TabsTrigger 
            key={option.value} 
            value={option.value}
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-indigo-950/30"
          >
            {t(option.translateKey)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}