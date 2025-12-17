const { createClient } = require('@vercel/postgres');
require('dotenv').config({ path: '.env.local' });

const db = createClient({
  connectionString: process.env.POSTGRES_URL,
});

async function seed() {
  try {
    console.log('Creating table if it doesn\'t exist...');
    
    // Create table
    await db.query(`
      CREATE TABLE IF NOT EXISTS daily_stats (
        id SERIAL PRIMARY KEY,
        date DATE UNIQUE NOT NULL,
        transactions INTEGER NOT NULL DEFAULT 0,
        impressions INTEGER NOT NULL DEFAULT 0,
        revenue DECIMAL(10, 2) NOT NULL DEFAULT 0
      )
    `);

    console.log('Table created/verified');

    // Clear existing data
    await db.query('DELETE FROM daily_stats');
    console.log('Cleared existing data');

    // Generate sample data for the last 30 days
    const today = new Date();
    const sampleData = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate realistic sample data with some variation
      const baseImpressions = 50000;
      const baseRevenue = 5000;
      const variation = 0.3; // 30% variation
      
      const impressions = Math.floor(
        baseImpressions * (1 + (Math.random() - 0.5) * variation * 2)
      );
      
      const revenue = parseFloat(
        (baseRevenue * (1 + (Math.random() - 0.5) * variation * 2)).toFixed(2)
      );
      
      const transactions = Math.floor(impressions * 0.02 + Math.random() * 100);

      const dateStr = date.toISOString().split('T')[0];
      
      sampleData.push({
        date: dateStr,
        transactions,
        impressions,
        revenue,
      });
    }

    console.log('Inserting sample data...');
    
    // Insert data
    for (const data of sampleData) {
      await db.query(
        `INSERT INTO daily_stats (date, transactions, impressions, revenue)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (date) DO UPDATE SET
           transactions = EXCLUDED.transactions,
           impressions = EXCLUDED.impressions,
           revenue = EXCLUDED.revenue`,
        [data.date, data.transactions, data.impressions, data.revenue]
      );
    }

    console.log(`Successfully seeded ${sampleData.length} days of sample data!`);
    console.log('Sample data range:', sampleData[0].date, 'to', sampleData[sampleData.length - 1].date);
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await db.end();
  }
}

seed();

