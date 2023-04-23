import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Weather Forecast",
  description: "24 hours weather forecast all around the world",
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
