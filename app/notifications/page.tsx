"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Heart, 
  MessageSquare, 
  UserPlus, 
  AlertTriangle,
  Users,
  Star,
  ShoppingBag,
  Check,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

// Mock data for notifications
const NOTIFICATIONS = [
  {
    id: "1",
    type: "like",
    read: false,
    timestamp: "5 minutes ago",
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "liked your post",
    postTitle: "Just finished reading 'Introduction to the Devout Life'..."
  },
  {
    id: "2",
    type: "comment",
    read: false,
    timestamp: "15 minutes ago",
    user: {
      name: "Samantha Lee",
      username: "samlee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "commented on your post",
    postTitle: "Attended an amazing retreat this weekend...",
    comment: "That sounds amazing! Which retreat center did you go to?"
  },
  {
    id: "3",
    type: "follow",
    read: true,
    timestamp: "2 hours ago",
    user: {
      name: "David Chen",
      username: "dchen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "started following you"
  },
  {
    id: "4",
    type: "sos",
    read: false,
    timestamp: "30 minutes ago",
    user: {
      name: "Emily Rodriguez",
      username: "emilyr",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "posted an SOS request in your area",
    sosTitle: "Missing child in Downtown area",
    severity: 9
  },
  {
    id: "5",
    type: "community",
    read: true,
    timestamp: "1 day ago",
    user: {
      name: "Michael Brown",
      username: "mikeb",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "invited you to join the community",
    community: "CatholicTech"
  },
  {
    id: "6",
    type: "marketplace",
    read: true,
    timestamp: "2 days ago",
    user: {
      name: "Jessica Kim",
      username: "jessk",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    content: "responded to your marketplace listing",
    item: "Vintage Rosary Beads"
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("all");
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    if (activeTab === "mentions") return notification.type === "comment" && notification.comment?.includes("@");
    if (activeTab === "sos") return notification.type === "sos";
    return true;
  });
  
  const unreadCount = notifications.filter(notification => !notification.read).length;

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
            <div className="flex items-center">
              <Bell className="h-6 w-6 mr-2 text-indigo-500" />
              <h1 className="text-3xl font-bold tracking-tight gradient-text">Notifications</h1>
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-indigo-500">{unreadCount} new</Badge>
              )}
            </div>
            <Button 
              variant="outline" 
              className="border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30"
              onClick={markAllAsRead}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 p-1 bg-indigo-50 dark:bg-indigo-950/30">
              <TabsTrigger 
                value="all" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <Bell className="mr-2 h-4 w-4" />
                All
              </TabsTrigger>
              <TabsTrigger 
                value="unread" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <Badge className="mr-2 h-5 px-1.5 bg-indigo-500">{unreadCount}</Badge>
                Unread
              </TabsTrigger>
              <TabsTrigger 
                value="mentions" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-amber-500 data-[state=active]:text-white"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Mentions
              </TabsTrigger>
              <TabsTrigger 
                value="sos" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                SOS
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <NotificationsList 
                notifications={filteredNotifications} 
                markAsRead={markAsRead} 
                deleteNotification={deleteNotification} 
              />
            </TabsContent>
            
            <TabsContent value="unread" className="mt-6">
              <NotificationsList 
                notifications={filteredNotifications} 
                markAsRead={markAsRead} 
                deleteNotification={deleteNotification} 
              />
            </TabsContent>
            
            <TabsContent value="mentions" className="mt-6">
              <NotificationsList 
                notifications={filteredNotifications} 
                markAsRead={markAsRead} 
                deleteNotification={deleteNotification} 
              />
            </TabsContent>
            
            <TabsContent value="sos" className="mt-6">
              <NotificationsList 
                notifications={filteredNotifications} 
                markAsRead={markAsRead} 
                deleteNotification={deleteNotification} 
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

function NotificationsList({ notifications, markAsRead, deleteNotification }) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
        <h3 className="text-lg font-medium gradient-text">No notifications</h3>
        <p className="text-muted-foreground mt-1">
          You're all caught up!
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card 
          key={notification.id} 
          className={`hover:shadow-md transition-shadow duration-300 ${
            !notification.read ? 'border-2 border-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/20' : ''
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-400 text-white">
                    {notification.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <p>
                      <span className="font-semibold">{notification.user.name}</span>
                      <span className="text-muted-foreground ml-1">@{notification.user.username}</span>
                      <span className="ml-1">{notification.content}</span>
                    </p>
                    {!notification.read && (
                      <Badge className="ml-2 bg-indigo-500">New</Badge>
                    )}
                  </div>
                  
                  {notification.type === "like" && (
                    <div className="mt-1 text-sm text-muted-foreground">
                      <Heart className="inline-block h-3 w-3 mr-1 text-pink-500" />
                      {notification.postTitle}
                    </div>
                  )}
                  
                  {notification.type === "comment" && (
                    <div className="mt-1">
                      <div className="text-sm text-muted-foreground">
                        <MessageSquare className="inline-block h-3 w-3 mr-1 text-purple-500" />
                        {notification.postTitle}
                      </div>
                      <div className="mt-1 p-2 bg-slate-100 dark:bg-slate-800 rounded-md text-sm">
                        {notification.comment}
                      </div>
                    </div>
                  )}
                  
                  {notification.type === "follow" && (
                    <div className="mt-1 text-sm text-muted-foreground">
                      <UserPlus className="inline-block h-3 w-3 mr-1 text-indigo-500" />
                      You now have {Math.floor(Math.random() * 1000) + 100} followers
                    </div>
                  )}
                  
                  {notification.type === "sos" && (
                    <div className="mt-1">
                      <div className="text-sm text-muted-foreground flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1 text-red-500" />
                        <Badge className={`mr-2 ${
                          notification.severity <= 3 ? 'bg-yellow-500' : 
                          notification.severity <= 6 ? 'bg-orange-500' : 'bg-red-500'
                        }`}>
                          {notification.severity}
                        </Badge>
                        {notification.sosTitle}
                      </div>
                      <div className="mt-1">
                        <Button 
                          size="sm" 
                          className="h-7 bg-red-500 hover:bg-red-600 text-white"
                        >
                          View SOS
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {notification.type === "community" && (
                    <div className="mt-1">
                      <div className="text-sm text-muted-foreground">
                        <Users className="inline-block h-3 w-3 mr-1 text-green-500" />
                        c/{notification.community}
                      </div>
                      <div className="mt-1 flex space-x-2">
                        <Button 
                          size="sm" 
                          className="h-7 gradient-bg hover:opacity-90"
                        >
                          Join
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-7 border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30"
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {notification.type === "marketplace" && (
                    <div className="mt-1">
                      <div className="text-sm text-muted-foreground">
                        <ShoppingBag className="inline-block h-3 w-3 mr-1 text-amber-500" />
                        {notification.item}
                      </div>
                      <div className="mt-1">
                        <Button 
                          size="sm" 
                          className="h-7 bg-amber-500 hover:bg-amber-600 text-white"
                        >
                          View Message
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-1 text-xs text-muted-foreground">
                    {notification.timestamp}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {!notification.read && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 hover:text-indigo-500"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-indigo-500">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!notification.read && (
                      <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                        Mark as read
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Turn off notifications like this
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}