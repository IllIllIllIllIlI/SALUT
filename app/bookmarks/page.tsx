"use client";

import { useState, useEffect } from "react";
import { Post } from '@/types/posts';
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

export default function BookmarksPage() {
  const { t } = useTranslation();
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/bookmarks");
        const data = await response.json();
        setBookmarkedPosts(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const filteredPosts = bookmarkedPosts.filter(post =>
    searchQuery ? post.content.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
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

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] py-8">
        <aside className="hidden md:block">
          <SidebarNav />
        </aside>

        <main className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bookmark className="h-6 w-6 mr-2 text-indigo-500" />
              <h1 className="text-3xl font-bold tracking-tight gradient-text">
                {t('common.bookmarks')}
              </h1>
            </div>
            <Button className="gradient-bg hover:opacity-90">
              <FolderPlus className="h-4 w-4 mr-2" />
              {t('bookmarks.newFolder')}
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('bookmarks.searchPlaceholder')}
              className="pl-8 border-2 border-indigo-200 focus-visible:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : filteredPosts.length > 0 ? (
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
                          {t('bookmarks.moveToFolder')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          {t('bookmarks.addNote')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t('bookmarks.removeBookmark')}
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
                {t('bookmarks.noBookmarksFound')}
              </h3>
              <p className="text-muted-foreground mt-1">
                {searchQuery
                  ? t('bookmarks.tryDifferentSearch')
                  : t('bookmarks.bookmarkPostsToSee')}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
