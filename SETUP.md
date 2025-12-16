# Quick Setup Guide

## Where to Keep Your Data

Your data is stored in a **Postgres database**. You have two main options:

### 1. Vercel Postgres (Easiest - Recommended)

**Steps:**
1. Go to https://vercel.com/dashboard
2. Create/select your project
3. Go to **Storage** → **Create Database** → **Postgres**
4. Copy the environment variables from the **.env.local** tab
5. Create `.env.local` in your project root with those variables
6. Run `npm run seed` to add sample data

**Free tier includes:**
- 256 MB storage
- 60 hours compute time/month
- Perfect for this dashboard!

### 2. Local Postgres (For Development)

If you have PostgreSQL installed:

```bash
# Create a database
createdb dashboard

# Set environment variables in .env.local
POSTGRES_URL=postgresql://localhost:5432/dashboard
POSTGRES_PRISMA_URL=postgresql://localhost:5432/dashboard
# ... (see README for full list)
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up .env.local with database credentials
# (Copy from Vercel dashboard or use local Postgres)

# 3. Seed the database with sample data
npm run seed

# 4. Start the dev server
npm run dev

# 5. Open http://localhost:3000
```

## What Gets Stored?

The `daily_stats` table stores:
- **date**: The day (one row per day)
- **impressions**: Number of ad impressions
- **revenue**: Revenue in dollars
- **transactions**: Number of transactions

The seed script creates 30 days of sample data automatically.

## Need Help?

If you see "Failed to fetch stats":
1. Check `.env.local` exists and has all variables
2. Run `npm run seed` to initialize the database
3. Restart the dev server: `npm run dev`

