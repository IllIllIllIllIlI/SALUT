"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { Users, TrendingUp, Star, Search, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const POPULAR_COMMUNITIES = [
  {
    id: "sos",
    name: "SOS",
    description: "Emergency help and support for community members in need",
    members: 250000,
    posts: 3500,
    isJoined: true,
    isOfficial: true,
    isPinned: true
  },
  {
    id: "1",
    name: "TechTalk",
    description: "Discuss the latest in technology and gadgets",
    members: 125000,
    posts: 1500,
    isJoined: false
  },
  {
    id: "2",
    name: "GamingNews",
    description: "The latest gaming news, reviews, and discussions",
    members: 98000,
    posts: 1200,
    isJoined: true
  },
  {
    id: "3",
    name: "ScienceExplained",
    description: "Making complex scientific concepts accessible to everyone",
    members: 87000,
    posts: 950,
    isJoined: false
  },
  {
    id: "4",
    name: "MovieBuffs",
    description: "For those who love discussing films and cinema",
    members: 76000,
    posts: 820,
    isJoined: false
  },
  {
    id: "5",
    name: "BookClub",
    description: "Share your reading experiences and book recommendations",
    members: 65000,
    posts: 750,
    isJoined: true
  }
];

const TRENDING_COMMUNITIES = [
  {
    id: "sos",
    name: "SOS",
    description: "Emergency help and support for community members in need",
    members: 250000,
    posts: 3500,
    isJoined: true,
    growth: "+25% this week",
    isOfficial: true,
    isPinned: true
  },
  {
    id: "6",
    name: "ArtificialIntelligence",
    description: "Exploring the future of AI and machine learning",
    members: 45000,
    posts: 650,
    isJoined: false,
    growth: "+15% this week"
  },
  {
    id: "7",
    name: "SpaceExploration",
    description: "The latest in space missions, astronomy, and cosmic discoveries",
    members: 38000,
    posts: 580,
    isJoined: false,
    growth: "+12% this week"
  },
  {
    id: "8",
    name: "SustainableLiving",
    description: "Tips and discussions on eco-friendly lifestyles",
    members: 32000,
    posts: 520,
    isJoined: true,
    growth: "+10% this week"
  }
];

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedCommunities, setJoinedCommunities] = useState<Record<string, boolean>>({
    "sos": true,
    "2": true,
    "5": true,
    "8": true
  });

  const handleJoinCommunity = (communityId: string) => {
    setJoinedCommunities(prev => ({
      ...prev,
      [communityId]: !prev[communityId]
    }));
  };

  const filteredPopularCommunities = POPULAR_COMMUNITIES.filter(community => 
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTrendingCommunities = TRENDING_COMMUNITIES.filter(community => 
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort communities to ensure SOS is always at the top
  const sortedPopularCommunities = [...filteredPopularCommunities].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const sortedTrendingCommunities = [...filteredTrendingCommunities].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const myCommunities = [...POPULAR_COMMUNITIES, ...TRENDING_COMMUNITIES]
    .filter(community => joinedCommunities[community.id])
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
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
            <h1 className="text-3xl font-bold tracking-tight gradient-text">Communities</h1>
            <Button className="gradient-bg hover:opacity-90">Create Community</Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search communities..."
              className="pl-8 border-2 border-indigo-200 focus-visible:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="popular" className="w-full">
            <TabsList className="grid w-full grid-cols-3 p-1 bg-indigo-50 dark:bg-indigo-950/30">
              <TabsTrigger 
                value="popular" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <Star className="mr-2 h-4 w-4" />
                Popular
              </TabsTrigger>
              <TabsTrigger 
                value="trending" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger 
                value="my-communities" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-amber-500 data-[state=active]:text-white"
              >
                <Users className="mr-2 h-4 w-4" />
                My Communities
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular" className="space-y-4 mt-6">
              {sortedPopularCommunities.map((community) => (
                <Card 
                  key={community.id} 
                  className={`hover-scale border-2 hover:shadow-md transition-shadow duration-300 ${
                    community.isOfficial ? 'border-red-300 bg-red-50 dark:bg-red-950/20' : ''
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <CardTitle className={community.isOfficial ? "text-red-600 dark:text-red-400" : "text-indigo-600 dark:text-indigo-400"}>
                            c/{community.name}
                          </CardTitle>
                          {community.isOfficial && (
                            <Badge className="ml-2 bg-red-500">Official</Badge>
                          )}
                        </div>
                        <CardDescription>{community.description}</CardDescription>
                      </div>
                      <Button 
                        variant={joinedCommunities[community.id] ? "outline" : "default"}
                        className={joinedCommunities[community.id] ? 
                          "border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30" : 
                          "gradient-bg hover:opacity-90"}
                        onClick={() => handleJoinCommunity(community.id)}
                      >
                        {joinedCommunities[community.id] ? "Joined" : "Join"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardFooter className="text-sm text-muted-foreground">
                    <div className="flex space-x-4">
                      <span>{community.members.toLocaleString()} members</span>
                      <span>{community.posts.toLocaleString()} posts</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              {filteredPopularCommunities.length === 0 && (
                <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                  <h3 className="text-lg font-medium gradient-text">No communities found</h3>
                  <p className="text-muted-foreground mt-1">
                    Try a different search term
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="trending" className="space-y-4 mt-6">
              {sortedTrendingCommunities.map((community) => (
                <Card 
                  key={community.id} 
                  className={`hover-scale border-2 hover:shadow-md transition-shadow duration-300 ${
                    community.isOfficial ? 'border-red-300 bg-red-50 dark:bg-red-950/20' : ''
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <CardTitle className={community.isOfficial ? "text-red-600 dark:text-red-400" : "text-indigo-600 dark:text-indigo-400"}>
                            c/{community.name}
                          </CardTitle>
                          {community.isOfficial && (
                            <Badge className="ml-2 bg-red-500">Official</Badge>
                          )}
                        </div>
                        <CardDescription>{community.description}</CardDescription>
                      </div>
                      <Button 
                        variant={joinedCommunities[community.id] ? "outline" : "default"}
                        className={joinedCommunities[community.id] ? 
                          "border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30" : 
                          "gradient-bg hover:opacity-90"}
                        onClick={() => handleJoinCommunity(community.id)}
                      >
                        {joinedCommunities[community.id] ? "Joined" : "Join"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2">
                    <div className="text-sm font-medium text-green-500">
                      {community.growth}
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground">
                    <div className="flex space-x-4">
                      <span>{community.members.toLocaleString()} members</span>
                      <span>{community.posts.toLocaleString()} posts</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              {filteredTrendingCommunities.length === 0 && (
                <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                  <h3 className="text-lg font-medium gradient-text">No trending communities found</h3>
                  <p className="text-muted-foreground mt-1">
                    Try a different search term
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="my-communities" className="space-y-4 mt-6">
              {myCommunities.map((community) => (
                <Card 
                  key={community.id} 
                  className={`hover-scale border-2 hover:shadow-md transition-shadow duration-300 ${
                    community.isOfficial ? 'border-red-300 bg-red-50 dark:bg-red-950/20' : ''
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <CardTitle className={community.isOfficial ? "text-red-600 dark:text-red-400" : "text-indigo-600 dark:text-indigo-400"}>
                            c/{community.name}
                          </CardTitle>
                          {community.isOfficial && (
                            <Badge className="ml-2 bg-red-500">Official</Badge>
                          )}
                        </div>
                        <CardDescription>{community.description}</CardDescription>
                      </div>
                      <Button 
                        variant="outline"
                        className="border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30"
                        onClick={() => handleJoinCommunity(community.id)}
                      >
                        Joined
                      </Button>
                    </div>
                  </CardHeader>
                  <CardFooter className="text-sm text-muted-foreground">
                    <div className="flex space-x-4">
                      <span>{community.members.toLocaleString()} members</span>
                      <span>{community.posts.toLocaleString()} posts</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              {Object.keys(joinedCommunities).filter(id => joinedCommunities[id]).length === 0 && (
                <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                  <h3 className="text-lg font-medium gradient-text">You haven't joined any communities yet</h3>
                  <p className="text-muted-foreground mt-1">
                    Join communities to see them here
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