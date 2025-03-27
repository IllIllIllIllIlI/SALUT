"use client";

import { useState, useEffect } from "react";
import { PostItem } from "@/components/post-item";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface Post {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isVerified: boolean;
  };
  createdAt: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
}

interface PostFeedProps {
  initialPosts?: Post[];
  feedType?: 'home' | 'explore' | 'community' | 'profile' | 'bookmarks';
  userId?: string;
  communityId?: string;
}

export function PostFeed({ 
  initialPosts = [], 
  feedType = 'home',
  userId,
  communityId
}: PostFeedProps) {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch posts based on feed type
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For example:
        // const response = await fetch(`/api/posts?feedType=${feedType}&page=${page}&userId=${userId}&communityId=${communityId}`);
        // const data = await response.json();
        
        // Simulate API response
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate no more posts after page 3
        if (page > 3) {
          setHasMore(false);
          setIsLoading(false);
          return;
        }
        
        // For now, we'll just set empty posts since we're removing mock data
        setPosts(prevPosts => page === 1 ? [] : [...prevPosts]);
        
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [feedType, page, userId, communityId]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleLike = async (postId: string) => {
    // In a real app, this would call an API to like/unlike a post
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1 
            } 
          : post
      )
    );
  };

  const handleBookmark = async (postId: string) => {
    // In a real app, this would call an API to bookmark/unbookmark a post
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, isBookmarked: !post.isBookmarked } 
          : post
      )
    );
  };

  if (isLoading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (posts.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-lg text-muted-foreground mb-4">
          {t('feed.noPosts')}
        </p>
        <Button variant="outline" className="border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30">
          {t('feed.refresh')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <PostItem 
          key={post.id} 
          post={post} 
          onLike={handleLike}
          onBookmark={handleBookmark}
        />
      ))}
      
      {hasMore && (
        <div className="flex justify-center py-4">
          <Button 
            variant="outline" 
            onClick={loadMore} 
            disabled={isLoading}
            className="border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('common.loading')}
              </>
            ) : (
              t('feed.loadMore')
            )}
          </Button>
        </div>
      )}
    </div>
  );
}