# Advertisement Dashboard

A Next.js dashboard application displaying daily advertisement impressions and revenue data. Deployed on Vercel with Vercel Postgres database.

## Features

- 📊 Vertical bar chart showing daily impressions and revenue
- 📈 Summary statistics (total impressions, total revenue, days tracked)
- 🎨 Modern, responsive UI
- 🚀 Optimized for Vercel deployment
- 💾 Uses Vercel Postgres (free tier supported)

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Vercel Postgres** - Database
- **Recharts** - Charting library

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

You have two options for the database:

#### Option A: Vercel Postgres (Recommended for Production)

**For Local Development:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project or select your existing project
3. Go to the **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Once created, go to the **.env.local** tab in your database settings
6. Copy all the environment variables

**For Vercel Deployment:**
- Environment variables are automatically available when you link a Postgres database to your project

#### Option B: Local Postgres (For Development)

If you have PostgreSQL installed locally:

```env
POSTGRES_URL=postgresql://username:password@localhost:5432/dashboard
POSTGRES_PRISMA_URL=postgresql://username:password@localhost:5432/dashboard
POSTGRES_USER=username
POSTGRES_HOST=localhost
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=dashboard
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory with your database credentials:

```env
POSTGRES_URL=your_postgres_url_here
POSTGRES_PRISMA_URL=your_prisma_url_here
POSTGRES_USER=your_user_here
POSTGRES_HOST=your_host_here
POSTGRES_PASSWORD=your_password_here
POSTGRES_DATABASE=your_database_here
```

**Important:** Never commit `.env.local` to git (it's already in `.gitignore`)

### 4. Initialize and Seed the Database

First, initialize the database table (this happens automatically, but you can also call the API):

```bash
# Option 1: Use the API endpoint
curl -X POST http://localhost:3000/api/init

# Option 2: The table will be created automatically on first data fetch
```

Then, seed the database with sample data:

```bash
npm run seed
```

This will create 30 days of sample data with:
- Daily impressions (around 50,000 with variation)
- Daily revenue (around $5,000 with variation)
- Daily transactions

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Troubleshooting

### Error: "Failed to fetch stats"

This usually means:
1. **Database not configured**: Make sure `.env.local` exists with all required variables
2. **Database not initialized**: Run `npm run seed` to create the table and add data
3. **Connection issues**: Verify your database credentials are correct

**Quick fix:**
```bash
# 1. Check your .env.local file exists and has all variables
cat .env.local

# 2. Test database connection by running seed
npm run seed

# 3. If seed works, restart your dev server
npm run dev
```

### Database Connection Issues

- Verify all environment variables are set correctly
- For Vercel Postgres, ensure you copied all variables from the dashboard
- Check that your database is running (for local Postgres)
- Ensure your IP is whitelisted (for cloud databases)

## Database Schema

The `daily_stats` table contains:

- `id` - Primary key (SERIAL)
- `date` - Date (DATE, UNIQUE)
- `transactions` - Number of transactions (INTEGER)
- `impressions` - Number of ad impressions (INTEGER)
- `revenue` - Revenue amount (DECIMAL(10, 2))

## Deployment to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your Postgres database connection variables in Vercel's environment settings
4. Deploy!

The database table will be created automatically on first API call, or you can run the seed script after deployment.

## Project Structure

```
dashboard/
├── app/
│   ├── api/
│   │   └── stats/
│   │       └── route.ts      # API endpoint for fetching stats
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Dashboard page
│   └── globals.css           # Global styles
├── lib/
│   └── db.ts                 # Database utilities
├── scripts/
│   └── seed.js               # Database seeding script
└── package.json
```

## Notes

- The dashboard is publicly accessible (no authentication)
- Data is fetched client-side from the API route
- The chart displays impressions on the left Y-axis and revenue on the right Y-axis
- Sample data includes 30 days of historical data

