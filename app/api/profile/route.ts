import { NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/api/handlers";

export const GET = withErrorHandler(async () => {
  const userProfile = {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
    bio: "Software Developer",
  };
  return NextResponse.json(userProfile);
});
