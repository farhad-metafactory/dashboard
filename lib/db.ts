import { sql } from "@vercel/postgres";

export interface DailyStats {
  id: number;
  date: string;
  transactions: number;
  impressions: number;
  revenue: number;
}

export async function getDailyStats() {
  try {
    // Try to initialize table first if it doesn't exist
    await initDatabase();

    const { rows } = await sql<DailyStats>`
      SELECT id, date, transactions, impressions, revenue
      FROM daily_stats
      ORDER BY date ASC
    `;
    return rows;
  } catch (error) {
    console.error("Error fetching daily stats:", error);
    // If table doesn't exist or connection fails, return empty array for graceful handling
    if (error instanceof Error && error.message.includes("does not exist")) {
      await initDatabase();
      return [];
    }
    throw error;
  }
}

export async function initDatabase() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS daily_stats (
        id SERIAL PRIMARY KEY,
        date DATE UNIQUE NOT NULL,
        transactions INTEGER NOT NULL DEFAULT 0,
        impressions INTEGER NOT NULL DEFAULT 0,
        revenue DECIMAL(10, 2) NOT NULL DEFAULT 0
      )
    `;
    console.log("Database table initialized");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
