import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShieldDrive Insurance | Fast & Free Auto Insurance Quotes",
  description: "Get a free auto insurance quote from ShieldDrive Insurance in minutes. Licensed in all 50 states with top-tier coverage.",
  openGraph: {
    title: "ShieldDrive Insurance",
    description: "Get a free auto insurance quote in minutes.",
    url: "https://shielddrive.vercel.app",
    siteName: "ShieldDrive Insurance",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
