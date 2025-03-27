"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  // Sample regions for demonstration
  const regions = [
    "North America",
    "South America",
    "Europe",
    "Asia",
    "Africa",
    "Oceania",
    "Middle East"
  ];

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center"
      >
        <MessageCircle className="h-6 w-6 mr-2 text-indigo-500" />
        <span className="font-bold gradient-text">SALUT</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center gradient-text">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline" className="hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
                <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4 text-indigo-500">
                  <path
                    fill="currentColor"
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30">
                <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4 text-purple-500">
                  <path
                    fill="currentColor"
                    d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"
                  />
                </svg>
                Apple
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="focus-visible:ring-indigo-500"
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="focus-visible:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1">
                    <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Your city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="focus-visible:ring-indigo-500"
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="region">Region <span className="text-red-500">*</span></Label>
                    <Select value={region} onValueChange={setRegion} required>
                      <SelectTrigger id="region" className="focus:ring-indigo-500">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-red-500">*</span> Location information is required for the SOS feature
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus-visible:ring-indigo-500"
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="focus-visible:ring-indigo-500"
                  />
                </div>
                <Button type="submit" className="mt-2 gradient-bg hover:opacity-90" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center text-muted-foreground w-full">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline underline-offset-4 hover:text-indigo-500">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}