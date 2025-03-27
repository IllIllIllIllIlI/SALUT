"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { PostItem } from "@/components/post-item";
import { Search, TrendingUp, Clock, Siren as Fire } from "lucide-react";

// Mock data for demonstration
const TRENDING_POSTS = [
  {
    id: "1",
    author: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "Just launched our new product! Check it out and let me know what you think. #ProductLaunch #Tech",
    timestamp: "2h ago",
    likes: 1542,
    comments: 342,
    shares: 215,
    upvotes: 2120,
    downvotes: 108,
    community: "TechTalk"
  },
  {
    id: "2",
    author: {
      name: "Samantha Lee",
      username: "samlee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "The sunset at the beach today was absolutely breathtaking! 🌅 #BeachLife #Sunset",
    timestamp: "5h ago",
    likes: 987,
    comments: 123,
    shares: 75,
    upvotes: 1210,
    downvotes: 23,
    community: "NatureLovers"
  }
];

const LATEST_POSTS = [
  {
    id: "3",
    author: {
      name: "David Chen",
      username: "dchen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "Just finished reading 'The Midnight Library' by Matt Haig. Highly recommend it if you're looking for a thought-provoking read! #BookRecommendation #Reading",
    timestamp: "15m ago",
    likes: 45,
    comments: 8,
    shares: 3,
    upvotes: 50,
    downvotes: 2,
    community: "BookClub"
  },
  {
    id: "4",
    author: {
      name: "Emily Rodriguez",
      username: "emilyr",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "Just tried the new restaurant downtown. The food was amazing! Anyone else been there? #FoodieLife #LocalEats",
    timestamp: "30m ago",
    likes: 32,
    comments: 14,
    shares: 2,
    upvotes: 38,
    downvotes: 1,
    community: "FoodLovers"
  }
];

const POPULAR_POSTS = [
  {
    id: "5",
    author: {
      name: "Michael Brown",
      username: "mikeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "After 5 years of hard work, I finally launched my startup today! It's been an incredible journey with many ups and downs. Thanks to everyone who supported me along the way. #Entrepreneurship #StartupLife",
    timestamp: "1d ago",
    likes: 3254,
    comments: 542,
    shares: 321,
    upvotes: 4320,
    downvotes: 87,
    community: "Entrepreneurs"
  },
  {
    id: "6",
    author: {
      name: "Jessica Kim",
      username: "jessk",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "I've been working on this painting for months and finally finished it today! What do you think? #Art #Painting #CreativeProcess",
    timestamp: "2d ago",
    likes: 2876,
    comments: 432,
    shares: 287,
    upvotes: 3210,
    downvotes: 45,
    community: "ArtistsUnited"
  }
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filterPosts = (posts: any[]) => {
    return posts.filter(post => 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.community.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
                <a href="/sign-in">Sign In</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] py-8">
        <aside className="hidden md:block">
          <SidebarNav />
        </aside>
        <main className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight gradient-text">Explore</h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-8 border-2 border-indigo-200 focus-visible:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 p-1 bg-indigo-50 dark:bg-indigo-950/30">
              <TabsTrigger 
                value="trending" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger 
                value="latest" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <Clock className="mr-2 h-4 w-4" />
                Latest
              </TabsTrigger>
              <TabsTrigger 
                value="popular" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-amber-500 data-[state=active]:text-white"
              >
                <Fire className="mr-2 h-4 w-4" />
                Popular
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="trending" className="space-y-4 mt-6">
              {filterPosts(TRENDING_POSTS).map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
              {filterPosts(TRENDING_POSTS).length === 0 && (
                <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                  <h3 className="text-lg font-medium gradient-text">No trending posts found</h3>
                  <p className="text-muted-foreground mt-1">
                    Try a different search term
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="latest" className="space-y-4 mt-6">
              {filterPosts(LATEST_POSTS).map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
              {filterPosts(LATEST_POSTS).length === 0 && (
                <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                  <h3 className="text-lg font-medium gradient-text">No latest posts found</h3>
                  <p className="text-muted-foreground mt-1">
                    Try a different search term
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="popular" className="space-y-4 mt-6">
              {filterPosts(POPULAR_POSTS).map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
              {filterPosts(POPULAR_POSTS).length === 0 && (
                <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                  <h3 className="text-lg font-medium gradient-text">No popular posts found</h3>
                  <p className="text-muted-foreground mt-1">
                    Try a different search term
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}