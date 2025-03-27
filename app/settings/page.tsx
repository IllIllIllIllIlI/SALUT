"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Lock, 
  Eye, 
  Globe, 
  Smartphone,
  LogOut,
  Save,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Mock user data
const USER_DATA = {
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
  joinedDate: "January 2023"
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(USER_DATA);
  const [notificationSettings, setNotificationSettings] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
    sos: true,
    communities: true,
    marketplace: true,
    email: false,
    push: true
  });
  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: true,
    showLocation: true,
    showActivity: true,
    allowMessages: true,
    allowTagging: true
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "30"
  });
  
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In a real app, this would send the updated profile to the backend
    console.log("Profile updated:", userData);
    // Show success message
  };
  
  const handleNotificationToggle = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };
  
  const handlePrivacyToggle = (key) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key]
    });
  };
  
  const handleSecurityToggle = (key) => {
    setSecuritySettings({
      ...securitySettings,
      [key]: !securitySettings[key]
    });
  };
  
  const handleSecurityChange = (key, value) => {
    setSecuritySettings({
      ...securitySettings,
      [key]: value
    });
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
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] py-8">
        <aside className="hidden md:block">
          <SidebarNav />
        </aside>
        <main className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="h-6 w-6 mr-2 text-indigo-500" />
              <h1 className="text-3xl font-bold tracking-tight gradient-text">Settings</h1>
            </div>
          </div>
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 p-1 bg-indigo-50 dark:bg-indigo-950/30">
              <TabsTrigger 
                value="profile" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-amber-500 data-[state=active]:text-white"
              >
                <Eye className="mr-2 h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="flex items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <Card className="border-2 hover:shadow-md transition-shadow duration-300">
                <form onSubmit={handleProfileUpdate}>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your profile information and how others see you on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center space-y-2">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={userData.avatar} alt={userData.name} />
                          <AvatarFallback className="text-2xl bg-gradient-to-br from-indigo-400 to-purple-400 text-white">
                            {userData.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" className="mt-2 border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30">
                          Change Avatar
                        </Button>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              value={userData.name}
                              onChange={(e) => setUserData({...userData, name: e.target.value})}
                              className="border-indigo-200 focus-visible:ring-indigo-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input 
                              id="username" 
                              value={userData.username}
                              onChange={(e) => setUserData({...userData, username: e.target.value})}
                              className="border-indigo-200 focus-visible:ring-indigo-500"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            className="border-indigo-200 focus-visible:ring-indigo-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            value={userData.bio}
                            onChange={(e) => setUserData({...userData, bio: e.target.value})}
                            className="min-h-[100px] border-indigo-200 focus-visible:ring-indigo-500"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city" 
                              value={userData.location.city}
                              onChange={(e) => setUserData({
                                ...userData, 
                                location: {...userData.location, city: e.target.value}
                              })}
                              className="border-indigo-200 focus-visible:ring-indigo-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="region">Region</Label>
                            <Input 
                              id="region" 
                              value={userData.location.region}
                              onChange={(e) => setUserData({
                                ...userData, 
                                location: {...userData.location, region: e.target.value}
                              })}
                              className="border-indigo-200 focus-visible:ring-indigo-500"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input 
                            id="website" 
                            value={userData.website}
                            onChange={(e) => setUserData({...userData, website: e.target.value})}
                            className="border-indigo-200 focus-visible:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" className="border-red-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                    <Button type="submit" className="gradient-bg hover:opacity-90">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6">
              <Card className="border-2 hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Activity Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="likes">Likes</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when someone likes your post
                          </p>
                        </div>
                        <Switch 
                          id="likes" 
                          checked={notificationSettings.likes}
                          onCheckedChange={() => handleNotificationToggle('likes')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="comments">Comments</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when someone comments on your post
                          </p>
                        </div>
                        <Switch 
                          id="comments" 
                          checked={notificationSettings.comments}
                          onCheckedChange={() => handleNotificationToggle('comments')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="follows">Follows</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when someone follows you
                          </p>
                        </div>
                        <Switch 
                          id="follows" 
                          checked={notificationSettings.follows}
                          onCheckedChange={() => handleNotificationToggle('follows')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="messages">Messages</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when you receive a new message
                          </p>
                        </div>
                        <Switch 
                          id="messages" 
                          checked={notificationSettings.messages}
                          onCheckedChange={() => handleNotificationToggle('messages')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Feature Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sos" className="flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                            SOS Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Notify about SOS requests in your area
                          </p>
                        </div>
                        <Switch 
                          id="sos" 
                          checked={notificationSettings.sos}
                          onCheckedChange={() => handleNotificationToggle('sos')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="communities">Communities</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify about community invites and updates
                          </p>
                        </div>
                        <Switch 
                          id="communities" 
                          checked={notificationSettings.communities}
                          onCheckedChange={() => handleNotificationToggle('communities')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketplace">Marketplace</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify about marketplace activity
                          </p>
                        </div>
                        <Switch 
                          id="marketplace" 
                          checked={notificationSettings.marketplace}
                          onCheckedChange={() => handleNotificationToggle('marketplace')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch 
                          id="email" 
                          checked={notificationSettings.email}
                          onCheckedChange={() => handleNotificationToggle('email')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications on your device
                          </p>
                        </div>
                        <Switch 
                          id="push" 
                          checked={notificationSettings.push}
                          onCheckedChange={() => handleNotificationToggle('push')}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gradient-bg hover:opacity-90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-6">
              <Card className="border-2 hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control who can see your information and how your data is used
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Privacy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="publicProfile">Public Profile</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow anyone to view your profile
                          </p>
                        </div>
                        <Switch 
                          id="publicProfile" 
                          checked={privacySettings.publicProfile}
                          onCheckedChange={() => handlePrivacyToggle('publicProfile')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="showLocation">Show Location</Label>
                          <p className="text-sm text-muted-foreground">
                            Display your city and region on your profile
                          </p>
                        </div>
                        <Switch 
                          id="showLocation" 
                          checked={privacySettings.showLocation}
                          onCheckedChange={() => handlePrivacyToggle('showLocation')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="showActivity">Show Activity</Label>
                          <p className="text-sm text-muted-foreground">
                            Let others see your recent activity
                          </p>
                        </div>
                        <Switch 
                          id="showActivity" 
                          checked={privacySettings.showActivity}
                          onCheckedChange={() => handlePrivacyToggle('showActivity')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Interaction Privacy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="allowMessages">Allow Messages</Label>
                          <p className="text-sm text-muted-foreground">
                            Let others send you direct messages
                          </p>
                        </div>
                        <Switch 
                          id="allowMessages" 
                          checked={privacySettings.allowMessages}
                          onCheckedChange={() => handlePrivacyToggle('allowMessages')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="allowTagging">Allow Tagging</Label>
                          <p className="text-sm text-muted-foreground">
                            Let others tag you in posts and comments
                          </p>
                        </div>
                        <Switch 
                          id="allowTagging" 
                          checked={privacySettings.allowTagging}
                          onCheckedChange={() => handlePrivacyToggle('allowTagging')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Privacy</h3>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-md border border-amber-200 dark:border-amber-800">
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-700 dark:text-amber-400">Data Usage</h4>
                          <p className="text-sm text-amber-600 dark:text-amber-500 mt-1">
                            Your data is used to provide and improve SALUT services. We never sell your personal information to third parties.
                          </p>
                          <Button variant="link" className="p-0 h-auto text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 mt-1">
                            View Privacy Policy
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="border-red-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30">
                      Request Data Download
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gradient-bg hover:opacity-90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Privacy Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-6">
              <Card className="border-2 hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and authentication methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Security</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="password">Password</Label>
                          <p className="text-sm text-muted-foreground">
                            Last changed 3 months ago
                          </p>
                        </div>
                        <Button variant="outline" className="border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30">
                          Change Password
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch 
                          id="twoFactorAuth" 
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={() => handleSecurityToggle('twoFactorAuth')}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="loginAlerts">Login Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified of new logins to your account
                          </p>
                        </div>
                        <Switch 
                          id="loginAlerts" 
                          checked={securitySettings.loginAlerts}
                          onCheckedChange={() => handleSecurityToggle('loginAlerts')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Session Management</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sessionTimeout">Session Timeout</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically log out after period of inactivity
                          </p>
                        </div>
                        <Select 
                          value={securitySettings.sessionTimeout} 
                          onValueChange={(value) => handleSecurityChange('sessionTimeout', value)}
                        >
                          <SelectTrigger className="w-[180px] border-indigo-200 focus:ring-indigo-500">
                            <SelectValue placeholder="Select timeout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      <div>
                        <Label>Active Sessions</Label>
                        <div className="mt-2 space-y-2">
                          <div className="p-3 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="flex items-center">
                                  <Smartphone className="h-4 w-4 mr-2 text-green-500" />
                                  <span className="font-medium">Current Device</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Chrome on Windows • San Francisco, CA • Active now
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                                End Session
                              </Button>
                            </div>
                          </div>
                          <div className="p-3 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="flex items-center">
                                  <Smartphone className="h-4 w-4 mr-2 text-indigo-500" />
                                  <span className="font-medium">iPhone 13</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Safari on iOS • San Francisco, CA • Last active 2 days ago
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                                End Session
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-md border border-red-200 dark:border-red-800">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-700 dark:text-red-400">Danger Zone</h4>
                        <p className="text-sm text-red-600 dark:text-red-500 mt-1">
                          These actions are permanent and cannot be undone.
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Button variant="outline" className="border-red-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950/50">
                            <LogOut className="h-4 w-4 mr-2" />
                            Log Out All Devices
                          </Button>
                          <Button variant="outline" className="border-red-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950/50">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto gradient-bg hover:opacity-90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Security Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}