"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { VerifiedBadge } from "./verified-badge";

interface TrendingTopic {
  id: string;
  title: string;
  posts: number;
  category: string;
}

export function TrendingPosts() {
  const { t } = useTranslation();
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For example:
        // const response = await fetch('/api/trending');
        // const data = await response.json();
        
        // Simulate API response
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // We're removing mock data, so we'll set an empty array
        setTrendingTopics([]);
      } catch (error) {
        console.error('Error fetching trending topics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingTopics();
  }, []);

  return (
    <Card className="border-2 hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-indigo-500" />
          {t('trending.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
          </div>
        ) : trendingTopics.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            {t('trending.noTopics')}
          </div>
        ) : (
          <div className="space-y-4">
            {trendingTopics.map((topic) => (
              <Link 
                key={topic.id} 
                href={`/explore?topic=${encodeURIComponent(topic.title)}`}
                className="block"
              >
                <div className="flex items-start justify-between hover:bg-muted/50 p-2 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium text-sm">#{topic.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {t('trending.postsCount', { count: topic.posts })}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {topic.category}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}