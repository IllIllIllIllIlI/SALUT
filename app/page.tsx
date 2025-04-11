import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { FeedToggle } from '@/components/feed-toggle';
import { PostFeed } from '@/components/post-feed';
import { TrendingPosts } from '@/components/trending-posts';
import { ErrorBoundary } from '@/components/error-boundary';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
      <Header />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr_300px] py-8">
        <aside className="hidden md:block">
          <SidebarNav />
        </aside>
        <main className="flex flex-col space-y-6">
          <FeedToggle />
          <ErrorBoundary>
            <PostFeed type="all" />
          </ErrorBoundary>
        </main>
        <aside className="hidden lg:block space-y-6">
          <TrendingPosts />
        </aside>
      </div>
    </div>
  );
}