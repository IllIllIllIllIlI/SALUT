import { NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/api/handlers";

export const GET = withErrorHandler(async () => {
  const messages = [
    { id: "1", sender: "John", content: "Hey there!" },
    { id: "2", sender: "Alice", content: "What's up?" },
  ];
  return NextResponse.json(messages);
});
