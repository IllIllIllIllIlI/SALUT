import { NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/api/handlers";

export const GET = withErrorHandler(async () => {
  const notifications = [
    { id: "1", type: "like", user: "John", message: "liked your post" },
    { id: "2", type: "comment", user: "Alice", message: "commented on your post" },
  ];
  return NextResponse.json(notifications);
});
