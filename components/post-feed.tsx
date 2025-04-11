"use client";

import { useState } from "react";
import { PostItem } from "@/components/post-item";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePosts } from "@/hooks/use-posts";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorBoundary } from "@/components/error-boundary";

interface PostFeedProps {
  type?: 'all' | 'following' | 'community';
  communityId?: string;
  userId?: string;
}

export function PostFeed({ 
  type = 'all',
  communityId,
  userId
}: PostFeedProps) {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage 
  } = usePosts({
    type,
    communityId,
    userId,
    page
  });

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (isError) {
    return (
      <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
        <h3 className="text-lg font-medium text-red-500">Error loading posts</h3>
        <p className="text-muted-foreground mt-1">
          {error?.message || 'Something went wrong'}
        </p>
        <Button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!data?.posts.length) {
    return (
      <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
        <h3 className="text-lg font-medium gradient-text">
          {t('feed.noPosts')}
        </h3>
        <p className="text-muted-foreground mt-1">
          {t('feed.refresh')}
        </p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        {data.posts.map(post => (
          <PostItem 
            key={post.id} 
            post={post}
          />
        ))}
        
        {hasNextPage && (
          <div className="flex justify-center py-4">
            <Button 
              variant="outline" 
              onClick={() => setPage(prev => prev + 1)}
              disabled={isFetchingNextPage}
              className="border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30"
            >
              {isFetchingNextPage ? (
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
    </ErrorBoundary>
  );
}