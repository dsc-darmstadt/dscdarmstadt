import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { defaultMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultMetadata;

// App Router viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // This should work in newer Next.js versions
};

// This component will be server-rendered and should not cause hydration issues
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
