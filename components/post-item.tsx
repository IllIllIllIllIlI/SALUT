"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Bookmark,
  Image as ImageIcon,
  Play
} from "lucide-react";
import { VerifiedBadge } from "@/components/verified-badge";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Database } from "@/lib/types/supabase";

type Post = Database['public']['Tables']['posts']['Row'] & {
  author: Database['public']['Tables']['users']['Row']
};

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return t('time.justNow');
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return t('time.minutesAgo', { count: minutes });
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return t('time.hoursAgo', { count: hours });
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return t('time.daysAgo', { count: days });
    } else {
      return date.toLocaleDateString();
    }
  };
  
  const truncateContent = (content: string, maxLength = 280) => {
    if (content.length <= maxLength || isExpanded) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card className="border-2 hover:shadow-md transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex space-x-4">
          <Link href={`/profile/${post.author.username}`}>
            <Avatar className="h-10 w-10 border-2 border-indigo-100 dark:border-indigo-900">
              <AvatarImage src={post.author.avatar_url || undefined} alt={post.author.display_name || post.author.username} />
              <AvatarFallback>{(post.author.display_name || post.author.username).charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href={`/profile/${post.author.username}`} className="font-semibold hover:underline">
                  {post.author.display_name || post.author.username}
                </Link>
                {post.author.is_verified && <VerifiedBadge className="ml-1" />}
                <span className="text-muted-foreground text-sm ml-2">@{post.author.username}</span>
                <span className="text-muted-foreground text-sm ml-2">·</span>
                <span className="text-muted-foreground text-sm ml-2">{formatDate(post.created_at)}</span>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-sm sm:text-base whitespace-pre-line">
                {truncateContent(post.content)}
              </p>
              {post.content.length > 280 && !isExpanded && (
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="text-indigo-500 hover:text-indigo-600 text-sm font-medium mt-1"
                >
                  {t('post.readMore')}
                </button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="ghost" size="sm" className="rounded-full">
          <Heart className="h-4 w-4 mr-1" />
          <span>0</span>
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full">
          <MessageCircle className="h-4 w-4 mr-1" />
          <span>0</span>
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full">
          <Share2 className="h-4 w-4 mr-1" />
          <span>0</span>
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full">
          <Bookmark className="h-4 w-4 mr-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}