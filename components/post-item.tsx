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
import { type Post } from "./post-feed";

interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export function PostItem({ post, onLike, onBookmark }: PostItemProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatDate = (date: Date) => {
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
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href={`/profile/${post.author.username}`} className="font-semibold hover:underline">
                  {post.author.name}
                </Link>
                {post.author.isVerified && <VerifiedBadge className="ml-1" />}
                <span className="text-muted-foreground text-sm ml-2">@{post.author.username}</span>
                <span className="text-muted-foreground text-sm ml-2">·</span>
                <span className="text-muted-foreground text-sm ml-2">{formatDate(post.createdAt)}</span>
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
            
            {post.media && post.media.length > 0 && (
              <div className={`mt-3 grid gap-2 ${post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {post.media.map((item, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden bg-muted">
                    {item.type === 'image' ? (
                      <img 
                        src={item.url} 
                        alt={`Media ${index}`}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    ) : (
                      <div className="relative aspect-video bg-black/10 flex items-center justify-center rounded-lg">
                        <Play className="h-12 w-12 text-white opacity-80" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`rounded-full ${post.isLiked ? 'text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20' : ''}`}
          onClick={() => onLike(post.id)}
        >
          <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full">
          <MessageCircle className="h-4 w-4 mr-1" />
          <span>{post.comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full">
          <Share2 className="h-4 w-4 mr-1" />
          <span>{post.shares}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`rounded-full ${post.isBookmarked ? 'text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/20' : ''}`}
          onClick={() => onBookmark(post.id)}
        >
          <Bookmark className={`h-4 w-4 mr-1 ${post.isBookmarked ? 'fill-current' : ''}`} />
        </Button>
      </CardFooter>
    </Card>
  );
}