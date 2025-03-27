import { NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/api/handlers";

export const GET = withErrorHandler(async () => {
  const trendingTopics = [
    { id: "1", title: "Next.js", posts: 123, category: "Tech" },
    { id: "2", title: "AI", posts: 98, category: "Science" },
  ];
  return NextResponse.json(trendingTopics);
});
