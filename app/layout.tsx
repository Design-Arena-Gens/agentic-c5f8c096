import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multibagger Stock Scanner",
  description: "Find potential multibagger stocks with intrinsic value analysis",
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
