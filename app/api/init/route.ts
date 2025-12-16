import { NextResponse } from "next/server";
import { initDatabase } from "@/lib/db";

export async function POST() {
  try {
    await initDatabase();
    return NextResponse.json({
      success: true,
      message: "Database initialized",
    });
  } catch (error) {
    console.error("Error initializing database:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to initialize database",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
