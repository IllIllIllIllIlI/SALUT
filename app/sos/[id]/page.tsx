"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  MessageSquare, 
  Heart, 
  Share2,
  Shield,
  Bell,
  Users
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for SOS post details
const SOS_POST = {
  id: "1",
  author: {
    name: "Emily Rodriguez",
    username: "emilyr",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
  },
  title: "Missing child in Downtown area",
  description: "My 8-year-old son went missing near Central Park. He was last seen wearing a blue t-shirt and jeans. Please contact me if you see him. He has brown hair and is about 4'2\" tall. He was last seen around 3:30 PM near the playground. He responds to the name 'Tommy'. If you have any information, please contact me immediately.",
  location: {
    city: "New York",
    region: "North America"
  },
  severity: 9,
  category: "Missing Person",
  timestamp: "15 minutes ago",
  responses: 28,
  status: "active",
  updates: [
    {
      id: "u1",
      content: "Update: We've contacted the police and they're helping with the search. Please keep an eye out in the Central Park area.",
      timestamp: "10 minutes ago"
    }
  ],
  comments: [
    {
      id: "c1",
      author: {
        name: "Michael Brown",
        username: "mikeb",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
      },
      content: "I'm in the area and will keep an eye out. Can you share a photo of him?",
      timestamp: "12 minutes ago",
      likes: 5
    },
    {
      id: "c2",
      author: {
        name: "Samantha Lee",
        username: "samlee",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
      },
      content: "I just saw a boy matching that description near the boathouse about 5 minutes ago. He was with a woman in a red jacket.",
      timestamp: "7 minutes ago",
      likes: 8
    },
    {
      id: "c3",
      author: {
        name: "David Chen",
        username: "dchen",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
      },
      content: "I'm heading to the boathouse now to check. Will update if I find anything.",
      timestamp: "5 minutes ago",
      likes: 12
    }
  ],
  helpers: [
    {
      name: "Michael Brown",
      username: "mikeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Samantha Lee",
      username: "samlee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "David Chen",
      username: "dchen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Jessica Kim",
      username: "jessk",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    }
  ]
};

export default function SOSPostPage() {
  const params = useParams();
  const postId = params.id;
  const post = SOS_POST; // In a real app, you would fetch the post based on the ID
  
  const [comment, setComment] = useState("");
  const [isHelping, setIsHelping] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  const handleSubmitComment = () => {
    // In a real app, this would submit the comment to the backend
    console.log("Submitting comment:", comment);
    setComment("");
  };
  
  const handleToggleHelp = () => {
    setIsHelping(!isHelping);
  };
  
  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
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
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr_300px] py-8">
        <aside className="hidden md:block">
          <SidebarNav />
        </aside>
        <main className="flex flex-col space-y-6">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2" asChild>
              <a href="/sos">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to SOS
              </a>
            </Button>
          </div>
          
          <Card className="border-2 border-red-300 hover:shadow-md transition-shadow duration-300">
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
                    <CardTitle className="text-xl text-red-600 dark:text-red-400">{post.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Badge variant="outline" className="mr-2 border-red-200 text-red-500">
                        {post.category}
                      </Badge>
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{post.location.city}, {post.location.region}</span>
                      <span className="mx-1">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{post.timestamp}</span>
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
              <div className="flex items-start space-x-3 mb-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback className="bg-gradient-to-br from-red-400 to-pink-400 text-white">
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
              
              {post.updates.length > 0 && (
                <div className="mt-4 space-y-4">
                  <Separator />
                  <h3 className="font-semibold text-red-600 dark:text-red-400">Updates</h3>
                  {post.updates.map((update) => (
                    <div key={update.id} className="bg-red-50 dark:bg-red-950/20 p-3 rounded-md border border-red-200 dark:border-red-800">
                      <p>{update.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{update.timestamp}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span>{post.responses} people responded</span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant={isFollowing ? "default" : "outline"} 
                  size="sm" 
                  className={isFollowing ? 
                    "bg-indigo-500 hover:bg-indigo-600 text-white" : 
                    "border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                  }
                  onClick={handleToggleFollow}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  {isFollowing ? "Following" : "Follow"}
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
          
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Comments ({post.comments.length})</h2>
          </div>
          
          <Card className="border-2">
            <CardContent className="pt-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" alt="Your avatar" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-400 text-white">YA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea 
                    placeholder="Add a comment..." 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="resize-none border-2 border-red-200 focus-visible:ring-red-500"
                  />
                  <div className="flex justify-end mt-2">
                    <Button 
                      size="sm" 
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={handleSubmitComment}
                      disabled={!comment.trim()}
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <Card key={comment.id} className="border hover:shadow-sm transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-400 text-white">
                        {comment.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-sm">{comment.author.name}</span>
                          <span className="text-muted-foreground text-xs ml-2">@{comment.author.username}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="mt-1">{comment.content}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <Button variant="ghost" size="sm" className="h-8 p-0 hover:text-pink-500">
                          <Heart className="h-4 w-4 mr-1" />
                          <span>{comment.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 p-0 hover:text-indigo-500">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>Reply</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        
        <aside className="hidden lg:block space-y-6">
          <Card className="border-2 hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">People Helping</CardTitle>
              <CardDescription>
                {post.helpers.length} people are actively helping with this SOS request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {post.helpers.map((helper) => (
                  <div key={helper.username} className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={helper.avatar} alt={helper.name} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-400 text-white">
                        {helper.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{helper.name}</div>
                      <div className="text-xs text-muted-foreground">@{helper.username}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}