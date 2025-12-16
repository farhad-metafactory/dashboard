import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Advertisement Dashboard",
  description: "Daily impressions and revenue dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
