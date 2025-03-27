import { NextResponse } from 'next/server';

// Simulating database response (Replace with real DB call later)
const mockBookmarks = [
  {
    id: "1",
    author: { name: "Alex Johnson", username: "alexj", avatar: "/avatars/alex.jpg" },
    content: "Just launched our new product! #Tech",
    timestamp: "2h ago",
    likes: 42,
    comments: 12,
    shares: 5,
    upvotes: 120,
    downvotes: 8,
    community: "TechTalk",
    folder: "Tech"
  },
  {
    id: "2",
    author: { name: "Samantha Lee", username: "samlee", avatar: "/avatars/sam.jpg" },
    content: "The sunset at the beach today was breathtaking! #Nature",
    timestamp: "5h ago",
    likes: 87,
    comments: 23,
    shares: 15,
    upvotes: 210,
    downvotes: 3,
    community: "NatureLovers",
    folder: "Inspiration"
  },
];

export async function GET() {
  return NextResponse.json(mockBookmarks);
}
