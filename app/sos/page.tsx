"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { 
  AlertTriangle, 
  Search, 
  Clock, 
  MapPin, 
  Users, 
  Shield, 
  PlusCircle,
  AlertCircle,
  Bell
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for SOS posts
const SOS_POSTS = [
  {
    id: "1",
    author: {
      name: "Emily Rodriguez",
      username: "emilyr",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    title: "Missing child in Downtown area",
    description: "My 8-year-old son went missing near Central Park. He was last seen wearing a blue t-shirt and jeans. Please contact me if you see him.",
    location: {
      city: "New York",
      region: "North America"
    },
    severity: 9,
    category: "Missing Person",
    timestamp: "15 minutes ago",
    responses: 28,
    status: "active"
  },
  {
    id: "2",
    author: {
      name: "David Chen",
      username: "dchen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    title: "Need help with temporary housing",
    description: "Our apartment building was damaged in the recent storm. Looking for temporary housing for a family of 4 for the next week.",
    location: {
      city: "Boston",
      region: "North America"
    },
    severity: 6,
    category: "Housing",
    timestamp: "2 hours ago",
    responses: 15,
    status: "active"
  },
  {
    id: "3",
    author: {
      name: "Samantha Lee",
      username: "samlee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    title: "Lost pet in Riverside Park",
    description: "My golden retriever ran off in Riverside Park this morning. He's wearing a red collar with tags. Very friendly, answers to 'Max'.",
    location: {
      city: "Chicago",
      region: "North America"
    },
    severity: 3,
    category: "Lost Pet",
    timestamp: "5 hours ago",
    responses: 7,
    status: "active"
  },
  {
    id: "4",
    author: {
      name: "Michael Brown",
      username: "mikeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    title: "Need urgent ride to hospital",
    description: "My car broke down and I need to get to Memorial Hospital for an important appointment in 1 hour. Can anyone help?",
    location: {
      city: "Los Angeles",
      region: "North America"
    },
    severity: 5,
    category: "Transportation",
    timestamp: "30 minutes ago",
    responses: 3,
    status: "active"
  },
  {
    id: "5",
    author: {
      name: "Jessica Kim",
      username: "jessk",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    title: "Flooding in basement after storm",
    description: "Our basement is flooded after the heavy rain. Need help with water removal and possibly some temporary repairs.",
    location: {
      city: "Seattle",
      region: "North America"
    },
    severity: 7,
    category: "Disaster Relief",
    timestamp: "3 hours ago",
    responses: 12,
    status: "active"
  },
  {
    id: "6",
    author: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    title: "Need food assistance for family",
    description: "Lost my job last week and struggling to provide food for my family of 5. Any help with groceries would be greatly appreciated.",
    location: {
      city: "Denver",
      region: "North America"
    },
    severity: 6,
    category: "Food Insecurity",
    timestamp: "1 day ago",
    responses: 20,
    status: "active"
  }
];

// SOS categories with severity ranges
const SOS_CATEGORIES = [
  { name: "Lost Pet", defaultSeverity: 2, description: "Help find lost pets in your area" },
  { name: "Transportation", defaultSeverity: 4, description: "Assistance with urgent transportation needs" },
  { name: "Food Insecurity", defaultSeverity: 5, description: "Help with food and essential supplies" },
  { name: "Housing", defaultSeverity: 6, description: "Temporary housing and shelter needs" },
  { name: "Disaster Relief", defaultSeverity: 7, description: "Help after natural disasters or emergencies" },
  { name: "Medical Emergency", defaultSeverity: 8, description: "Non-life-threatening medical assistance" },
  { name: "Missing Person", defaultSeverity: 9, description: "Help locate missing individuals" },
  { name: "Life-Threatening", defaultSeverity: 10, description: "Immediate life-threatening situations" }
];

export default function SOSPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [severityLevel, setSeverityLevel] = useState(5);
  const [userCity, setUserCity] = useState("New York");
  const [userRegion, setUserRegion] = useState("North America");

  const handleCreatePost = () => {
    setIsCreatingPost(true);
  };

  const handleCancelPost = () => {
    setIsCreatingPost(false);
    setNewPostTitle("");
    setNewPostDescription("");
    setSelectedCategory("");
    setSeverityLevel(5);
  };

  const handleSubmitPost = () => {
    // In a real app, this would submit the post to the backend
    console.log("Submitting post:", {
      title: newPostTitle,
      description: newPostDescription,
      category: selectedCategory,
      severity: severityLevel,
      location: {
        city: userCity,
        region: userRegion
      }
    });
    
    // Reset form and close creation panel
    handleCancelPost();
  };

  const getNotificationScope = (severity) => {
    if (severity <= 3) return "Community";
    if (severity <= 6) return "City-wide";
    return "Regional";
  };

  const getSeverityColor = (severity) => {
    if (severity <= 3) return "bg-yellow-500";
    if (severity <= 6) return "bg-orange-500";
    return "bg-red-500";
  };

  const filteredPosts = SOS_POSTS.filter(post => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.location.city.toLowerCase().includes(query)
      );
    }
    
    // Filter by tab
    if (activeTab === "high-severity") {
      return post.severity >= 7;
    } else if (activeTab === "my-area") {
      return post.location.city === userCity;
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
                <a href="/sign-in">Sign In</a>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-red-500" />
              <h1 className="text-3xl font-bold tracking-tight text-red-600 dark:text-red-400">SOS Community</h1>
            </div>
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleCreatePost}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create SOS Request
            </Button>
          </div>
          
          {isCreatingPost ? (
            <Card className="border-2 border-red-300 bg-red-50 dark:bg-red-950/20">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Create SOS Request</CardTitle>
                <CardDescription>
                  Please provide details about your emergency situation. The more information you provide, the better others can help you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Brief description of your emergency" 
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="border-red-200 focus-visible:ring-red-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide detailed information about your situation" 
                    value={newPostDescription}
                    onChange={(e) => setNewPostDescription(e.target.value)}
                    className="min-h-[100px] border-red-200 focus-visible:ring-red-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger id="category" className="border-red-200 focus:ring-red-500">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {SOS_CATEGORIES.map((category) => (
                          <SelectItem 
                            key={category.name} 
                            value={category.name}
                            onClick={() => setSeverityLevel(category.defaultSeverity)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="severity">Severity Level</Label>
                      <span className={`text-sm font-medium ${
                        severityLevel <= 3 ? 'text-yellow-500' : 
                        severityLevel <= 6 ? 'text-orange-500' : 'text-red-500'
                      }`}>
                        {severityLevel}/10
                      </span>
                    </div>
                    <Slider
                      id="severity"
                      min={1}
                      max={10}
                      step={1}
                      value={[severityLevel]}
                      onValueChange={(value) => setSeverityLevel(value[0])}
                      className={`[&>span]:${
                        severityLevel <= 3 ? 'bg-yellow-500' : 
                        severityLevel <= 6 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      value={userCity}
                      onChange={(e) => setUserCity(e.target.value)}
                      className="border-red-200 focus-visible:ring-red-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input 
                      id="region" 
                      value={userRegion}
                      onChange={(e) => setUserRegion(e.target.value)}
                      className="border-red-200 focus-visible:ring-red-500"
                    />
                  </div>
                </div>
                
                <div className="p-3 bg-white dark:bg-slate-900 rounded-md border border-red-200 dark:border-red-800">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                    <h3 className="font-semibold">Notification Scope</h3>
                  </div>
                  <div className="text-sm mt-1">
                    Based on the severity level ({severityLevel}/10), this SOS request will be sent as a{' '}
                    <span className="inline-flex items-center">
                      <Badge className={getSeverityColor(severityLevel)}>
                        {getNotificationScope(severityLevel)}
                      </Badge>
                    </span> alert.
                  </div>
                  <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
                    <li>• Community (1-3): Only visible in the SOS community feed</li>
                    <li>• City-wide (4-6): Notifies all users in your city</li>
                    <li>• Regional (7-10): Sends push notifications to all users in your region</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancelPost}>
                  Cancel
                </Button>
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={handleSubmitPost}
                  disabled={!newPostTitle || !newPostDescription || !selectedCategory}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Submit SOS Request
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search SOS requests..."
                  className="pl-8 border-2 border-red-200 focus-visible:ring-red-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 p-1 bg-red-50 dark:bg-red-950/30">
                  <TabsTrigger 
                    value="all" 
                    className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    All SOS
                  </TabsTrigger>
                  <TabsTrigger 
                    value="high-severity" 
                    className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    High Severity
                  </TabsTrigger>
                  <TabsTrigger 
                    value="my-area" 
                    className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    My Area
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4 mt-6">
                  {filteredPosts.map((post) => (
                    <SOSPostCard key={post.id} post={post} />
                  ))}
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                      <h3 className="text-lg font-medium text-red-500">No SOS requests found</h3>
                      <p className="text-muted-foreground mt-1">
                        Try a different search term or check back later
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="high-severity" className="space-y-4 mt-6">
                  {filteredPosts.map((post) => (
                    <SOSPostCard key={post.id} post={post} />
                  ))}
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                      <h3 className="text-lg font-medium text-red-500">No high severity SOS requests found</h3>
                      <p className="text-muted-foreground mt-1">
                        Check back later or view all SOS requests
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="my-area" className="space-y-4 mt-6">
                  {filteredPosts.map((post) => (
                    <SOSPostCard key={post.id} post={post} />
                  ))}
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
                      <h3 className="text-lg font-medium text-red-500">No SOS requests in your area</h3>
                      <p className="text-muted-foreground mt-1">
                        Check back later or view all SOS requests
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </main>
        
        <aside className="hidden lg:block space-y-6">
          <Card className="border-2 border-red-300 hover:shadow-md transition-shadow duration-300 bg-red-50 dark:bg-red-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                <span className="text-red-600 dark:text-red-400">SOS Guidelines</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-md border border-red-200 dark:border-red-800">
                  <h3 className="font-semibold text-red-600 dark:text-red-400">When to Create an SOS</h3>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• Real emergencies requiring community help</li>
                    <li>• Situations where official services are not enough</li>
                    <li>• When you need immediate assistance</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-white dark:bg-slate-900 rounded-md border border-red-200 dark:border-red-800">
                  <h3 className="font-semibold text-red-600 dark:text-red-400">Severity Guidelines</h3>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• <span className="text-yellow-500 font-medium">1-3:</span> Minor issues (lost pets, small favors)</li>
                    <li>• <span className="text-orange-500 font-medium">4-6:</span> Moderate needs (transportation, temporary housing)</li>
                    <li>• <span className="text-red-500 font-medium">7-10:</span> Critical situations (missing persons, medical emergencies)</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-white dark:bg-slate-900 rounded-md border border-red-200 dark:border-red-800">
                  <h3 className="font-semibold text-red-600 dark:text-red-400">How to Help</h3>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• Respond only if you can genuinely help</li>
                    <li>• Prioritize your own safety</li>
                    <li>• Contact emergency services when appropriate</li>
                    <li>• Follow up on your commitments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-md border border-red-200 dark:border-red-800">
                  <h3 className="font-semibold text-red-600 dark:text-red-400">Emergency Services</h3>
                  <p className="text-sm mt-1">Call 911 for immediate emergency assistance</p>
                </div>
                
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-md border border-indigo-200 dark:border-indigo-800">
                  <h3 className="font-semibold text-indigo-600 dark:text-indigo-400">Crisis Hotline</h3>
                  <p className="text-sm mt-1">24/7 Support: 1-800-273-8255</p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-md border border-purple-200 dark:border-purple-800">
                  <h3 className="font-semibold text-purple-600 dark:text-purple-400">Disaster Relief</h3>
                  <p className="text-sm mt-1">Red Cross: 1-800-733-2767</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">SOS Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active SOS Requests:</span>
                  <span className="font-bold">{SOS_POSTS.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">High Severity:</span>
                  <span className="font-bold text-red-500">{SOS_POSTS.filter(post => post.severity >= 7).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">In Your Area:</span>
                  <span className="font-bold text-indigo-500">{SOS_POSTS.filter(post => post.location.city === userCity).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">People Helping:</span>
                  <span className="font-bold text-green-500">87</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function SOSPostCard({ post }) {
  const [isHelping, setIsHelping] = useState(false);
  
  const handleToggleHelp = () => {
    setIsHelping(!isHelping);
  };
  
  return (
    <Card 
      className={`hover-scale border-2 hover:shadow-md transition-shadow duration-300 ${
        post.severity >= 7 ? 'border-red-300 bg-red-50 dark:bg-red-950/20' : 
        post.severity >= 4 ? 'border-orange-300 bg-orange-50 dark:bg-orange-950/20' : 
        'border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20'
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Badge className={`mr-2 ${
              post.severity <= 3 ? 'bg-yellow-500' : 
              post.severity <= 6 ? 'bg-orange-500' : 'bg-red-500'
            }`}>
              {post.severity}
            </Badge>
            <div>
              <CardTitle className={`text-lg ${
                post.severity >= 7 ? 'text-red-600 dark:text-red-400' : 
                post.severity >= 4 ? 'text-orange-600 dark:text-orange-400' : 
                'text-yellow-600 dark:text-yellow-400'
              }`}>
                {post.title}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Badge variant="outline" className={`mr-2 ${
                  post.severity >= 7 ? 'border-red-200 text-red-500' : 
                  post.severity >= 4 ? 'border-orange-200 text-orange-500' : 
                  'border-yellow-200 text-yellow-500'
                }`}>
                  {post.category}
                </Badge>
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {post.location.city}, {post.location.region}
                </span>
                <span className="mx-1">•</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.timestamp}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Badge className={`
              ${post.severity <= 3 ? 'bg-yellow-500' : 
                post.severity <= 6 ? 'bg-orange-500' : 'bg-red-500'}
            `}>
              {post.severity <= 3 ? 'Community' : 
               post.severity <= 6 ? 'City-wide' : 'Regional'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex items-start space-x-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-400 text-white">
              {post.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-semibold">{post.author.name}</span>
              <span className="text-muted-foreground text-sm ml-2">@{post.author.username}</span>
            </div>
            <p className="mt-2">{post.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span>{post.responses} people responded</span>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
            asChild
          >
            <a href={`/sos/${post.id}`}>
              View Details
            </a>
          </Button>
          <Button 
            size="sm" 
            className={isHelping ? 
              "bg-green-500 hover:bg-green-600 text-white" : 
              "bg-red-500 hover:bg-red-600 text-white"
            }
            onClick={handleToggleHelp}
          >
            <Shield className="h-4 w-4 mr-2" />
            {isHelping ? "Helping" : "Offer Help"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}