"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Phone, 
  Video, 
  Info, 
  Image, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Plus,
  Users,
  UserPlus
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { VerifiedBadge } from "@/components/verified-badge";
import { usePremium } from "@/lib/context/PremiumContext";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for conversations
const CONVERSATIONS = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      isVerified: true,
      isOnline: true
    },
    lastMessage: {
      text: "Hey, did you see the new post about the parish event?",
      timestamp: "10:42 AM",
      isRead: true,
      sender: "them"
    },
    unreadCount: 0
  },
  {
    id: "2",
    user: {
      name: "Samantha Lee",
      username: "samlee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      isVerified: false,
      isOnline: false
    },
    lastMessage: {
      text: "I'll be at the prayer group tonight. Are you coming?",
      timestamp: "Yesterday",
      isRead: false,
      sender: "them"
    },
    unreadCount: 2
  },
  {
    id: "3",
    user: {
      name: "David Chen",
      username: "dchen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      isVerified: true,
      isOnline: true
    },
    lastMessage: {
      text: "Thanks for sharing that article on Aquinas. Really insightful!",
      timestamp: "Monday",
      isRead: true,
      sender: "them"
    },
    unreadCount: 0
  },
  {
    id: "4",
    isGroup: true,
    name: "Parish Youth Group",
    avatar: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    members: [
      {
        name: "Emily Rodriguez",
        username: "emilyr",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
      },
      {
        name: "Michael Brown",
        username: "mikeb",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
      },
      {
        name: "Jessica Kim",
        username: "jessk",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
      }
    ],
    lastMessage: {
      text: "Emily: Let's meet at the church at 6pm for the event",
      timestamp: "Yesterday",
      isRead: false,
      sender: "Emily Rodriguez"
    },
    unreadCount: 5
  }
];

// Mock data for messages in a conversation
const MESSAGES = [
  {
    id: "m1",
    text: "Hey, did you see the new post about the parish event?",
    timestamp: "10:42 AM",
    sender: "them",
    isRead: true
  },
  {
    id: "m2",
    text: "Yes, I did! It looks really interesting. Are you planning to go?",
    timestamp: "10:45 AM",
    sender: "me",
    isRead: true
  },
  {
    id: "m3",
    text: "Definitely! I think it's going to be a great opportunity to meet other members of the community.",
    timestamp: "10:47 AM",
    sender: "them",
    isRead: true
  },
  {
    id: "m4",
    text: "I agree. I've been looking for ways to get more involved with the parish activities.",
    timestamp: "10:50 AM",
    sender: "me",
    isRead: true
  },
  {
    id: "m5",
    text: "That's great! Maybe we can go together? I can introduce you to some people I know from the prayer group.",
    timestamp: "10:52 AM",
    sender: "them",
    isRead: true
  },
  {
    id: "m6",
    text: "That would be perfect! Thanks for offering. What time does it start?",
    timestamp: "10:55 AM",
    sender: "me",
    isRead: true
  },
  {
    id: "m7",
    text: "It starts at 7 PM on Friday. I was thinking we could meet a bit earlier, maybe around 6:30, to grab a coffee before?",
    timestamp: "10:58 AM",
    sender: "them",
    isRead: true
  },
  {
    id: "m8",
    text: "Sounds like a plan! I'll see you at 6:30 at the coffee shop across from the church.",
    timestamp: "11:00 AM",
    sender: "me",
    isRead: true
  },
  {
    id: "m9",
    text: "Perfect! Looking forward to it. 😊",
    timestamp: "11:02 AM",
    sender: "them",
    isRead: true
  }
];

export default function MessagesPage() {
  const { t } = useTranslation();
  const { userPremiumState } = usePremium();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [messages, setMessages] = useState(MESSAGES);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const newMsg = {
      id: `m${messages.length + 1}`,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: "me",
      isRead: false
    };
    
    setMessages([...messages, newMsg]);
    
    // Update the conversation's last message
    setConversations(conversations.map(conv => 
      conv.id === selectedConversation 
        ? { 
            ...conv, 
            lastMessage: { 
              text: newMessage, 
              timestamp: "Just now", 
              isRead: true, 
              sender: "me" 
            } 
          }
        : conv
    ));
    
    setNewMessage("");
  };
  
  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    if (conv.isGroup) {
      return conv.name.toLowerCase().includes(query) || 
             conv.members.some(member => 
               member.name.toLowerCase().includes(query) || 
               member.username.toLowerCase().includes(query)
             );
    } else {
      return conv.user.name.toLowerCase().includes(query) || 
             conv.user.username.toLowerCase().includes(query);
    }
  });
  
  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

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
      <div className="container grid flex-1 gap-0 md:grid-cols-[320px_1fr] py-0 h-[calc(100vh-3.5rem)]">
        <aside className="border-r">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-indigo-500" />
                {mounted ? t('messages.title') : "Messages"}
              </h2>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={mounted ? t('messages.searchPlaceholder') : "Search messages..."}
                className="pl-8 border-2 border-indigo-200 focus-visible:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <div className="px-4 pt-2">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-indigo-50 dark:bg-indigo-950/30">
                <TabsTrigger value="all">
                  {mounted ? t('messages.all') : "All"}
                </TabsTrigger>
                <TabsTrigger value="unread">
                  {mounted ? t('messages.unread') : "Unread"}
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <ScrollArea className="h-[calc(100vh-13rem)]">
                <div className="space-y-1 p-2">
                  {filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedConversation === conversation.id 
                          ? 'bg-indigo-100 dark:bg-indigo-900/50' 
                          : 'hover:bg-indigo-50 dark:hover:bg-indigo-950/30'
                      } ${
                        conversation.unreadCount > 0 
                          ? 'font-medium' 
                          : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          {conversation.isGroup ? (
                            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
                              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                            </div>
                          ) : (
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                              <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-400 text-white">
                                {conversation.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          {!conversation.isGroup && conversation.user.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-sm font-medium truncate">
                                {conversation.isGroup ? conversation.name : conversation.user.name}
                              </span>
                              {!conversation.isGroup && conversation.user.isVerified && (
                                <VerifiedBadge size="sm" className="ml-1" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {conversation.lastMessage.timestamp}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                              {conversation.lastMessage.sender === "me" ? "You: " : ""}
                              {conversation.lastMessage.text}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <Badge className="ml-2 bg-indigo-500">{conversation.unreadCount}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  {filteredConversations.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-muted-foreground">
                        {mounted ? t('messages.noResults') : "No conversations found"}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="unread" className="mt-0">
              <ScrollArea className="h-[calc(100vh-13rem)]">
                <div className="space-y-1 p-2">
                  {filteredConversations.filter(conv => conv.unreadCount > 0).map((conversation) => (
                    <button
                      key={conversation.id}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedConversation === conversation.id 
                          ? 'bg-indigo-100 dark:bg-indigo-900/50' 
                          : 'hover:bg-indigo-50 dark:hover:bg-indigo-950/30'
                      } font-medium`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          {conversation.isGroup ? (
                            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
                              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                            </div>
                          ) : (
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                              <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-400 text-white">
                                {conversation.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          {!conversation.isGroup && conversation.user.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-sm font-medium truncate">
                                {conversation.isGroup ? conversation.name : conversation.user.name}
                              </span>
                              {!conversation.isGroup && conversation.user.isVerified && (
                                <VerifiedBadge size="sm" className="ml-1" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {conversation.lastMessage.timestamp}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                              {conversation.lastMessage.sender === "me" ? "You: " : ""}
                              {conversation.lastMessage.text}
                            </p>
                            <Badge className="ml-2 bg-indigo-500">{conversation.unreadCount}</Badge>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  {filteredConversations.filter(conv => conv.unreadCount > 0).length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-muted-foreground">
                        {mounted ? t('messages.noUnread') : "No unread messages"}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </aside>
        
        <main className="flex flex-col h-full">
          {selectedConversation && currentConversation ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  {currentConversation.isGroup ? (
                    <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                    </div>
                  ) : (
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={currentConversation.user.avatar} alt={currentConversation.user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-400 text-white">
                        {currentConversation.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">
                        {currentConversation.isGroup ? currentConversation.name : currentConversation.user.name}
                      </h3>
                      {!currentConversation.isGroup && currentConversation.user.isVerified && (
                        <VerifiedBadge size="sm" className="ml-1" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {currentConversation.isGroup 
                        ? `${currentConversation.members.length} members` 
                        : currentConversation.user.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "me" 
                            ? "bg-indigo-500 text-white" 
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <p>{message.text}</p>
                        <div 
                          className={`text-xs mt-1 ${
                            message.sender === "me" 
                              ? "text-indigo-100" 
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Image className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder={mounted ? t('messages.typePlaceholder') : "Type a message..."}
                    className="flex-1 border-2 border-indigo-200 focus-visible:ring-indigo-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button 
                    className="rounded-full gradient-bg hover:opacity-90 p-2 h-10 w-10"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <MessageSquare className="h-16 w-16 text-indigo-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">
                {mounted ? t('messages.noConversationSelected') : "Select a conversation"}
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                {mounted ? t('messages.startConversation') : "Choose a conversation from the sidebar or start a new one"}
              </p>
              <Button className="mt-4 gradient-bg hover:opacity-90">
                <UserPlus className="h-4 w-4 mr-2" />
                {mounted ? t('messages.newMessage') : "New Message"}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}