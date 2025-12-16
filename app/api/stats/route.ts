import { NextResponse } from "next/server";
import { getDailyStats } from "@/lib/db";

export async function GET() {
  try {
    const stats = await getDailyStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Provide more helpful error message
    if (errorMessage.includes("POSTGRES") || errorMessage.includes("connection")) {
      return NextResponse.json(
        { 
          error: "Database connection failed. Please ensure Vercel Postgres is configured with environment variables.",
          details: process.env.NODE_ENV === "development" ? errorMessage : undefined
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: "Failed to fetch stats",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
