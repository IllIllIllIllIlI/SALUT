"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { PostItem } from "@/components/post-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Calendar, 
  MapPin, 
  Mail, 
  Link2, 
  Edit, 
  MessageSquare,
  Heart,
  Bookmark,
  Shield
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const USER_PROFILE = {
  id: "1", // Add ID to help identify if it's the current user
  name: "John Doe",
  username: "johndoe",
  email: "john.doe@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
  bio: "Catholic software developer and tech enthusiast. I love building things that help people connect and grow in faith. Always learning, always sharing.",
  location: {
    city: "San Francisco",
    region: "North America"
  },
  website: "https://johndoe.com",
  joinedDate: "January 2023",
  stats: {
    posts: 42,
    followers: 128,
    following: 97,
    communities: 5
  },
  badges: [
    {
      name: "Verified",
      color: "bg-blue-500",
      icon: Shield,
      description: "Verified Account"
    }
  ]
};

const USER_POSTS: any[] = [];

export default function ProfilePage() {
  const { t } = useTranslation();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [mounted, setMounted] = useState(false);
  
  // In a real app, this would come from your auth context/state
  const currentUserId = "1"; // Hardcoded for demo
  const isOwnProfile = USER_PROFILE.id === currentUserId;
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr_300px] py-8">
        <aside className="hidden md:block">
          <SidebarNav />
        </aside>
        <main className="flex flex-col space-y-6">
          <Card className="border-2 hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-24 w-24 md:h-32 md:w-32">
                    <AvatarImage src={USER_PROFILE.avatar} alt={USER_PROFILE.name} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-indigo-400 to-purple-400 text-white">
                      {USER_PROFILE.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                    {USER_PROFILE.badges.map((badge, index) => (
                      <Badge key={index} className={`${badge.color} hover:${badge.color}`} title={badge.description}>
                        <badge.icon className="h-3 w-3 mr-1" />
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h1 className="text-2xl font-bold">{USER_PROFILE.name}</h1>
                    <p className="text-muted-foreground">@{USER_PROFILE.username}</p>
                  </div>
                  <p>{USER_PROFILE.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center md:justify-start">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {USER_PROFILE.location.city}, {USER_PROFILE.location.region}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {USER_PROFILE.email}
                    </div>
                    <div className="flex items-center">
                      <Link2 className="h-4 w-4 mr-1" />
                      <a href={USER_PROFILE.website} className="text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer">
                        {USER_PROFILE.website}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {t('profile.joinedDate')} {USER_PROFILE.joinedDate}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                    <div className="text-center">
                      <p className="font-bold">{USER_PROFILE.stats.posts}</p>
                      <p className="text-sm text-muted-foreground">{t('profile.posts')}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{USER_PROFILE.stats.followers}</p>
                      <p className="text-sm text-muted-foreground">{t('common.followers')}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{USER_PROFILE.stats.following}</p>
                      <p className="text-sm text-muted-foreground">{t('common.following')}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{USER_PROFILE.stats.communities}</p>
                      <p className="text-sm text-muted-foreground">{t('common.communities')}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center md:items-end">
                  {isOwnProfile ? (
                    <Button 
                      variant="outline" 
                      className="border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30"
                      asChild
                    >
                      <Link href="/settings/profile">
                        <Edit className="h-4 w-4 mr-2" />
                        {t('profile.editProfile')}
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant={isFollowing ? "outline" : "default"}
                        className={isFollowing ? 
                          "border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30" : 
                          "gradient-bg hover:opacity-90"
                        }
                        onClick={handleToggleFollow}
                      >
                        {isFollowing ? t('common.following') : t('common.follow')}
                      </Button>
                      <Button variant="outline" className="border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {t('profile.message')}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 p-1 bg-indigo-50 dark:bg-indigo-950/30">
              <TabsTrigger 
                value="posts" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                {t('profile.posts')}
              </TabsTrigger>
              <TabsTrigger 
                value="likes" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <Heart className="mr-2 h-4 w-4" />
                {t('profile.likes')}
              </TabsTrigger>
              <TabsTrigger 
                value="bookmarks" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-amber-500 data-[state=active]:text-white"
              >
                <Bookmark className="mr-2 h-4 w-4" />
                {t('profile.bookmarks')}
              </TabsTrigger>
              <TabsTrigger 
                value="communities" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-green-500 data-[state=active]:text-white"
              >
                <User className="mr-2 h-4 w-4" />
                {t('profile.communities')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="space-y-4 mt-6">
              {USER_POSTS.map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
              {USER_POSTS.length === 0 && (
                <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                  <h3 className="text-lg font-medium gradient-text">{t('profile.noPosts')}</h3>
                  <p className="text-muted-foreground mt-1">
                    {t('profile.tryPosting')}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="likes" className="space-y-4 mt-6">
              <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                <h3 className="text-lg font-medium gradient-text">{t('profile.noLikes')}</h3>
                <p className="text-muted-foreground mt-1">
                  {t('profile.tryLiking')}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="bookmarks" className="space-y-4 mt-6">
              <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                <h3 className="text-lg font-medium gradient-text">{t('profile.noBookmarks')}</h3>
                <p className="text-muted-foreground mt-1">
                  {t('profile.tryBookmarking')}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="communities" className="space-y-4 mt-6">
              <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                <h3 className="text-lg font-medium gradient-text">{t('profile.noCommunities')}</h3>
                <p className="text-muted-foreground mt-1">
                  {t('profile.tryJoining')}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
        
        <aside className="hidden lg:block space-y-6">
          <Card className="border-2 hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('profile.similarProfiles')}</CardTitle>
              <CardDescription>{t('profile.peopleToFollow')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://images.unsplash.com/photo-${1570295999919 + i}-b8c36b15f770?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80`} />
                        <AvatarFallback>{String.fromCharCode(64 + i)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">User {i}</p>
                        <p className="text-xs text-muted-foreground">@user{i}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30">
                      {t('common.follow')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
                {t('profile.showMore')}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-2 hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('profile.activeCommunities')}</CardTitle>
              <CardDescription>{t('profile.communities')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["CatholicTech", "CatholicReads", "CatholicLife"].map((community, i) => (
                  <div key={community} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        i === 0 ? "bg-indigo-100 text-indigo-600" : 
                        i === 1 ? "bg-purple-100 text-purple-600" : 
                        "bg-pink-100 text-pink-600"
                      }`}>
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">c/{community}</p>
                        <p className="text-xs text-muted-foreground">{(10 - i) * 1000} {t('profile.members')}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 hover:text-indigo-600">
                      {t('common.view')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
                {t('profile.showMore')}
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  );
}