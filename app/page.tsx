"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DailyStats {
  id: number;
  date: string;
  transactions: number;
  impressions: number;
  revenue: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Format data for the chart
  const chartData = stats.map((stat) => ({
    date: new Date(stat.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    impressions: stat.impressions,
    revenue: parseFloat(stat.revenue.toString()),
  }));

  // Calculate totals
  const totalImpressions = stats.reduce(
    (sum, stat) => sum + stat.impressions,
    0
  );
  const totalRevenue = stats.reduce(
    (sum, stat) => sum + parseFloat(stat.revenue.toString()),
    0
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          color: "white",
          fontSize: "1.5rem",
        }}
      >
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          color: "white",
          fontSize: "1.5rem",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <p>Error: {error}</p>
        <button
          onClick={fetchStats}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "white",
            color: "#667eea",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        color: "white",
      }}
    >
      <header
        style={{
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Advertisement Dashboard
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            opacity: 0.9,
          }}
        >
          Daily Impressions & Revenue Analytics
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h3
            style={{
              fontSize: "0.9rem",
              opacity: 0.8,
              marginBottom: "0.5rem",
            }}
          >
            Total Impressions
          </h3>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
            {totalImpressions.toLocaleString()}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h3
            style={{
              fontSize: "0.9rem",
              opacity: 0.8,
              marginBottom: "0.5rem",
            }}
          >
            Total Revenue
          </h3>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
            $
            {totalRevenue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h3
            style={{
              fontSize: "0.9rem",
              opacity: 0.8,
              marginBottom: "0.5rem",
            }}
          >
            Days Tracked
          </h3>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
            {stats.length}
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          minHeight: "500px",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "#333",
          }}
        >
          Daily Performance
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#666" style={{ fontSize: "12px" }} />
            <YAxis
              yAxisId="left"
              stroke="#666"
              style={{ fontSize: "12px" }}
              label={{
                value: "Impressions",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: "#666" },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#666"
              style={{ fontSize: "12px" }}
              label={{
                value: "Revenue ($)",
                angle: 90,
                position: "insideRight",
                style: { textAnchor: "middle", fill: "#666" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="impressions"
              fill="#667eea"
              name="Impressions"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="revenue"
              fill="#764ba2"
              name="Revenue ($)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
