"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { PostItem } from "@/components/post-item";
import { 
  Bookmark, 
  Search, 
  FolderPlus, 
  Folder, 
  MoreHorizontal,
  Trash2,
  Edit,
  Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

// Mock data for bookmarks
const BOOKMARKED_POSTS = [
  {
    id: "1",
    author: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "Just launched our new product! Check it out and let me know what you think. #ProductLaunch #Tech",
    timestamp: "2h ago",
    likes: 42,
    comments: 12,
    shares: 5,
    upvotes: 120,
    downvotes: 8,
    community: "TechTalk",
    folder: "Tech"
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
    likes: 87,
    comments: 23,
    shares: 15,
    upvotes: 210,
    downvotes: 3,
    community: "NatureLovers",
    folder: "Inspiration"
  },
  {
    id: "3",
    author: {
      name: "David Chen",
      username: "dchen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "Just finished reading 'The Midnight Library' by Matt Haig. Highly recommend it if you're looking for a thought-provoking read! #BookRecommendation #Reading",
    timestamp: "1d ago",
    likes: 65,
    comments: 18,
    shares: 7,
    upvotes: 150,
    downvotes: 12,
    community: "BookClub",
    folder: "Books"
  },
  {
    id: "4",
    author: {
      name: "Emily Rodriguez",
      username: "emilyr",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "Here's the recipe for the chocolate cake I made for the parish potluck last weekend. Everyone loved it! #CatholicCooking #Recipe",
    timestamp: "3d ago",
    likes: 112,
    comments: 34,
    shares: 22,
    upvotes: 180,
    downvotes: 5,
    community: "CatholicCooking",
    folder: "Recipes"
  },
  {
    id: "5",
    author: {
      name: "Michael Brown",
      username: "mikeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "After 5 years of hard work, I finally launched my startup today! It's been an incredible journey with many ups and downs. Thanks to everyone who supported me along the way. #Entrepreneurship #StartupLife",
    timestamp: "1w ago",
    likes: 254,
    comments: 78,
    shares: 45,
    upvotes: 320,
    downvotes: 12,
    community: "Entrepreneurs",
    folder: "Inspiration"
  }
];

// Folders for organizing bookmarks
const BOOKMARK_FOLDERS = [
  { name: "All", count: BOOKMARKED_POSTS.length, color: "bg-indigo-500" },
  { name: "Tech", count: BOOKMARKED_POSTS.filter(post => post.folder === "Tech").length, color: "bg-purple-500" },
  { name: "Inspiration", count: BOOKMARKED_POSTS.filter(post => post.folder === "Inspiration").length, color: "bg-pink-500" },
  { name: "Books", count: BOOKMARKED_POSTS.filter(post => post.folder === "Books").length, color: "bg-amber-500" },
  { name: "Recipes", count: BOOKMARKED_POSTS.filter(post => post.folder === "Recipes").length, color: "bg-green-500" }
];

export default function BookmarksPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState("All");
  const [bookmarkedPosts, setBookmarkedPosts] = useState(BOOKMARKED_POSTS);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const filteredPosts = bookmarkedPosts.filter(post => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.content.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.author.username.toLowerCase().includes(query) ||
        post.community.toLowerCase().includes(query)
      );
    }
    
    // Filter by folder
    if (activeFolder !== "All") {
      return post.folder === activeFolder;
    }
    
    return true;
  });

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ModeToggle />
              <Button asChild variant="default" className="gradient-bg hover:opacity-90">
                <a href="/sign-in">{mounted ? t('common.signIn') : "Sign In"}</a>
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
            <div className="flex items-center">
              <Bookmark className="h-6 w-6 mr-2 text-indigo-500" />
              <h1 className="text-3xl font-bold tracking-tight gradient-text">
                {mounted ? t('common.bookmarks') : "Bookmarks"}
              </h1>
            </div>
            <Button className="gradient-bg hover:opacity-90">
              <FolderPlus className="h-4 w-4 mr-2" />
              {mounted ? t('bookmarks.newFolder') : "New Folder"}
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={mounted ? t('bookmarks.searchPlaceholder') : "Search bookmarks..."}
              className="pl-8 border-2 border-indigo-200 focus-visible:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            <Card className="border-2 hover:shadow-md transition-shadow duration-300 h-fit">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {mounted ? t('bookmarks.folders') : "Folders"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {BOOKMARK_FOLDERS.map((folder) => (
                    <Button
                      key={folder.name}
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeFolder === folder.name ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300' : ''
                      }`}
                      onClick={() => setActiveFolder(folder.name)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Folder className={`h-4 w-4 mr-2 ${
                            folder.name === "All" ? "text-indigo-500" :
                            folder.name === "Tech" ? "text-purple-500" :
                            folder.name === "Inspiration" ? "text-pink-500" :
                            folder.name === "Books" ? "text-amber-500" :
                            "text-green-500"
                          }`} />
                          {folder.name}
                        </div>
                        <Badge className={`${folder.color}`}>{folder.count}</Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
                  <Plus className="h-4 w-4 mr-2" />
                  {mounted ? t('bookmarks.addFolder') : "Add Folder"}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {activeFolder} {mounted ? t('bookmarks.bookmarks') : "Bookmarks"}
                </h2>
                <Tabs defaultValue="grid" className="w-[160px]">
                  <TabsList className="grid w-full grid-cols-2 p-1 bg-indigo-50 dark:bg-indigo-950/30">
                    <TabsTrigger value="grid">
                      {mounted ? t('bookmarks.grid') : "Grid"}
                    </TabsTrigger>
                    <TabsTrigger value="list">
                      {mounted ? t('bookmarks.list') : "List"}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="relative group">
                      <PostItem post={post} />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Folder className="h-4 w-4 mr-2" />
                              {mounted ? t('bookmarks.moveToFolder') : "Move to folder"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              {mounted ? t('bookmarks.addNote') : "Add note"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {mounted ? t('bookmarks.removeBookmark') : "Remove bookmark"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                  <h3 className="text-lg font-medium gradient-text">
                    {mounted ? t('bookmarks.noBookmarksFound') : "No bookmarks found"}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery 
                      ? (mounted ? t('bookmarks.tryDifferentSearch') : "Try a different search term") 
                      : (mounted ? t('bookmarks.bookmarkPostsToSee') : "Bookmark posts to see them here")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}