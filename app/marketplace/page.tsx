"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/sidebar-nav";
import { 
  Search, 
  ShoppingBag, 
  Tag, 
  Truck, 
  Star, 
  Filter, 
  SlidersHorizontal,
  Grid3X3,
  List
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for marketplace items
const MARKETPLACE_ITEMS = [
  {
    id: "1",
    title: "Professional DSLR Camera",
    description: "High-quality camera with 24.2MP sensor, 4K video recording, and Wi-Fi connectivity.",
    price: 1299.99,
    seller: "PhotoPro Shop",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Electronics",
    condition: "New",
    tags: ["camera", "photography", "dslr", "professional", "digital"]
  },
  {
    id: "2",
    title: "Vintage Vinyl Record Player",
    description: "Classic turntable with built-in speakers, Bluetooth connectivity, and USB port for recording.",
    price: 149.99,
    seller: "RetroAudio",
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Electronics",
    condition: "New",
    tags: ["vinyl", "record player", "turntable", "music", "audio", "vintage"]
  },
  {
    id: "3",
    title: "Handcrafted Leather Messenger Bag",
    description: "Genuine full-grain leather bag with adjustable strap, multiple compartments, and vintage brass hardware.",
    price: 189.99,
    seller: "ArtisanLeather",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Fashion",
    condition: "New",
    tags: ["bag", "leather", "messenger", "handcrafted", "accessories"]
  },
  {
    id: "4",
    title: "Smart Home Security System",
    description: "Complete home security with HD cameras, motion sensors, and smartphone integration.",
    price: 349.99,
    seller: "SmartTech Solutions",
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1558002038-1055e2dae2d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Smart Home",
    condition: "New",
    tags: ["security", "smart home", "cameras", "sensors", "technology"]
  },
  {
    id: "5",
    title: "Ergonomic Office Chair",
    description: "Adjustable chair with lumbar support, breathable mesh back, and 360° swivel.",
    price: 249.99,
    seller: "ErgoWorks",
    rating: 4.6,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1505657435995-a2dd2a5bbe5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Furniture",
    condition: "New",
    tags: ["chair", "office", "ergonomic", "furniture", "home office"]
  },
  {
    id: "6",
    title: "Vintage Mechanical Watch",
    description: "Hand-wound mechanical movement, sapphire crystal, and genuine leather strap.",
    price: 599.99,
    seller: "TimelessWatches",
    rating: 4.9,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Accessories",
    condition: "New",
    tags: ["watch", "mechanical", "vintage", "luxury", "accessories"]
  },
  {
    id: "7",
    title: "Mountain Bike - Full Suspension",
    description: "Aluminum frame, hydraulic disc brakes, and 27-speed Shimano gears.",
    price: 899.99,
    seller: "AdventureCycles",
    rating: 4.7,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Sports & Outdoors",
    condition: "New",
    tags: ["bike", "mountain bike", "cycling", "outdoor", "sports"]
  },
  {
    id: "8",
    title: "Wireless Noise-Cancelling Headphones",
    description: "Premium sound quality, 30-hour battery life, and adaptive noise cancellation.",
    price: 299.99,
    seller: "AudioElite",
    rating: 4.8,
    reviews: 231,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Electronics",
    condition: "New",
    tags: ["headphones", "wireless", "audio", "noise-cancelling", "music"]
  },
  {
    id: "9",
    title: "Handmade Ceramic Dinner Set",
    description: "Set of 6 plates, bowls, and mugs. Microwave and dishwasher safe.",
    price: 129.99,
    seller: "ArtisanPottery",
    rating: 4.9,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Home & Kitchen",
    condition: "New",
    tags: ["ceramic", "pottery", "dinnerware", "handmade", "kitchen"]
  },
  {
    id: "10",
    title: "Portable Solar Power Bank",
    description: "20000mAh capacity, solar charging, and dual USB ports for simultaneous charging.",
    price: 49.99,
    seller: "EcoTech",
    rating: 4.5,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba53bcd8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Electronics",
    condition: "New",
    tags: ["solar", "power bank", "portable", "charger", "eco-friendly"]
  },
  {
    id: "11",
    title: "Antique Wooden Bookshelf",
    description: "Solid oak construction with intricate carvings and adjustable shelves.",
    price: 499.99,
    seller: "VintageFinds",
    rating: 4.7,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Furniture",
    condition: "Used",
    tags: ["bookshelf", "antique", "wooden", "furniture", "vintage"]
  },
  {
    id: "12",
    title: "Professional Art Supplies Set",
    description: "Complete set with acrylic paints, brushes, canvas, and palette.",
    price: 89.99,
    seller: "ArtistrySupplies",
    rating: 4.8,
    reviews: 103,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    category: "Arts & Crafts",
    condition: "New",
    tags: ["art", "painting", "supplies", "creative", "acrylic"]
  }
];

// Categories for filtering
const CATEGORIES = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Smart Home",
  "Furniture",
  "Accessories",
  "Sports & Outdoors",
  "Home & Kitchen",
  "Arts & Crafts"
];

// Conditions for filtering
const CONDITIONS = [
  "All Conditions",
  "New",
  "Used",
  "Refurbished"
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [filteredItems, setFilteredItems] = useState(MARKETPLACE_ITEMS);
  const [searchResults, setSearchResults] = useState(MARKETPLACE_ITEMS);

  // Powerful search algorithm that finds relevant results even when exact matches aren't found
  useEffect(() => {
    // Apply filters first
    let results = MARKETPLACE_ITEMS.filter(item => {
      // Category filter
      if (selectedCategory !== "All Categories" && item.category !== selectedCategory) {
        return false;
      }
      
      // Condition filter
      if (selectedCondition !== "All Conditions" && item.condition !== selectedCondition) {
        return false;
      }
      
      // Price range filter
      if (item.price < priceRange[0] || item.price > priceRange[1]) {
        return false;
      }
      
      // Rating filter
      if (item.rating < minRating) {
        return false;
      }
      
      return true;
    });
    
    setFilteredItems(results);
    
    // If there's a search query, apply the smart search algorithm
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      
      // Calculate relevance score for each item
      const scoredResults = results.map(item => {
        let score = 0;
        
        // Exact title match (highest priority)
        if (item.title.toLowerCase() === query) {
          score += 100;
        }
        // Title contains query
        else if (item.title.toLowerCase().includes(query)) {
          score += 50;
        }
        
        // Description contains query
        if (item.description.toLowerCase().includes(query)) {
          score += 30;
        }
        
        // Category matches
        if (item.category.toLowerCase().includes(query)) {
          score += 20;
        }
        
        // Tags match (very important for related searches)
        const matchingTags = item.tags.filter(tag => 
          tag.includes(query) || query.includes(tag)
        );
        
        score += matchingTags.length * 15;
        
        // Fuzzy matching for similar terms
        // Check if any word in the title is similar to the query
        const titleWords = item.title.toLowerCase().split(' ');
        for (const word of titleWords) {
          // Simple Levenshtein-like approach: if more than 60% of characters match
          if (word.length > 3 && (
            word.includes(query.substring(0, Math.floor(query.length * 0.6))) ||
            query.includes(word.substring(0, Math.floor(word.length * 0.6)))
          )) {
            score += 10;
          }
        }
        
        // Check tags for fuzzy matches
        for (const tag of item.tags) {
          if (tag.length > 3 && (
            tag.includes(query.substring(0, Math.floor(query.length * 0.6))) ||
            query.includes(tag.substring(0, Math.floor(tag.length * 0.6)))
          )) {
            score += 8;
          }
        }
        
        return { item, score };
      });
      
      // Sort by score and filter out items with zero relevance
      let sortedResults = scoredResults
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(result => result.item);
      
      // If no results found, return items that might be related
      // This ensures we always return something
      if (sortedResults.length === 0) {
        // Return items from popular categories or with high ratings as fallback
        sortedResults = results
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);
      }
      
      setSearchResults(sortedResults);
    } else {
      // If no search query, just use the filtered results
      setSearchResults(results);
    }
    
    // Apply sorting
    let sortedItems = [...searchResults];
    
    switch (sortBy) {
      case "price-low":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedItems.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        sortedItems.sort((a, b) => b.reviews - a.reviews);
        break;
      // For relevance, we keep the order determined by the search algorithm
      default:
        break;
    }
    
    setSearchResults(sortedItems);
  }, [searchQuery, selectedCategory, selectedCondition, priceRange, minRating, sortBy]);

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
      <div className="container grid flex-1 gap-12 md:grid-cols-[240px_1fr] py-8">
        <aside className="hidden md:block space-y-6">
          <SidebarNav />
          
          <div className="space-y-4 p-4 rounded-lg border-2 bg-white/50 dark:bg-slate-900/50 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="font-medium text-lg gradient-text">Filters</h3>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Category</h4>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="border-indigo-200 focus:ring-indigo-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Condition</h4>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="border-purple-200 focus:ring-purple-500">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {CONDITIONS.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <h4 className="font-medium text-sm">Price Range</h4>
                <span className="text-sm text-muted-foreground">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[0, 1500]}
                max={1500}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="[&>span]:bg-pink-500"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <h4 className="font-medium text-sm">Minimum Rating</h4>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-1">{minRating}</span>
                  <Star className="h-3 w-3 fill-current text-amber-500" />
                </div>
              </div>
              <Slider
                defaultValue={[0]}
                max={5}
                step={0.1}
                value={[minRating]}
                onValueChange={(value) => setMinRating(value[0])}
                className="[&>span]:bg-amber-500"
              />
            </div>
            
            <Button className="w-full gradient-bg hover:opacity-90" onClick={() => {
              setSelectedCategory("All Categories");
              setSelectedCondition("All Conditions");
              setPriceRange([0, 1500]);
              setMinRating(0);
            }}>
              Reset Filters
            </Button>
          </div>
        </aside>
        
        <main className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <ShoppingBag className="mr-2 h-8 w-8 text-indigo-500" />
              <span className="gradient-text">SALUT Marketplace</span>
            </h1>
            <Button className="gradient-bg hover:opacity-90">
              Sell an Item
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for anything..."
              className="pl-8 border-2 border-indigo-200 focus-visible:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-2 ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-2 ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <span className="text-sm text-muted-foreground">
                {searchResults.length} items
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-purple-200 focus:ring-purple-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Mobile filters button */}
          <div className="md:hidden">
            <Button variant="outline" className="w-full border-2 border-indigo-200 hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900 dark:hover:text-indigo-300">
              <Filter className="h-4 w-4 mr-2" />
              Show Filters
            </Button>
          </div>
          
          {searchResults.length === 0 ? (
            <div className="text-center py-12 bg-white/50 dark:bg-slate-900/50 rounded-lg border-2 shadow-sm">
              <h3 className="text-lg font-medium gradient-text">No exact matches found</h3>
              <p className="text-muted-foreground mt-1 mb-6">
                Here are some items you might be interested in:
              </p>
              
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 gap-4" 
                : "space-y-4"
              }>
                {MARKETPLACE_ITEMS
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 4)
                  .map((item) => (
                    <MarketplaceItem 
                      key={item.id} 
                      item={item} 
                      viewMode={viewMode} 
                    />
                  ))
                }
              </div>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4" 
              : "space-y-4"
            }>
              {searchResults.map((item) => (
                <MarketplaceItem 
                  key={item.id} 
                  item={item} 
                  viewMode={viewMode} 
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

interface MarketplaceItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    price: number;
    seller: string;
    rating: number;
    reviews: number;
    image: string;
    category: string;
    condition: string;
    tags: string[];
  };
  viewMode: "grid" | "list";
}

function MarketplaceItem({ item, viewMode }: MarketplaceItemProps) {
  if (viewMode === 'grid') {
    return (
      <Card className="overflow-hidden h-full flex flex-col hover-scale border-2 hover:shadow-md transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          <Badge className={`absolute top-2 right-2 ${
            item.condition === 'New' ? 'bg-green-500' : 
            item.condition === 'Used' ? 'bg-amber-500' : 'bg-blue-500'
          }`}>
            {item.condition}
          </Badge>
        </div>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
          <CardDescription className="line-clamp-2">{item.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow">
          <div className="flex items-center space-x-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({item.reviews})
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Seller: {item.seller}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">${item.price.toFixed(2)}</div>
          <Button size="sm" className="gradient-bg hover:opacity-90">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <Card className="overflow-hidden hover-scale border-2 hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-48 h-48">
            <img 
              src={item.image} 
              alt={item.title} 
              className="object-cover w-full h-full"
            />
            <Badge className={`absolute top-2 right-2 ${
              item.condition === 'New' ? 'bg-green-500' : 
              item.condition === 'Used' ? 'bg-amber-500' : 'bg-blue-500'
            }`}>
              {item.condition}
            </Badge>
          </div>
          <div className="flex-1 flex flex-col">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </div>
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">${item.price.toFixed(2)}</div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 pb-2 flex-grow">
              <div className="flex items-center space-x-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  ({item.reviews})
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Seller: {item.seller}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                    +{item.tags.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <Truck className="h-4 w-4 mr-1 text-green-500" />
                Free shipping
              </div>
              <Button size="sm" className="gradient-bg hover:opacity-90">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }
}