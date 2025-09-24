import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover' // This should work in newer Next.js versions
}
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
        <div style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: '#FFF9C4', // Calm matte yellow
          color: '#333',
          textAlign: 'center',
          padding: '5px 0',
          fontSize: '0.9rem',
          zIndex: 1000,
          boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
        }}>
          🚧 This website is still under construction. Thank you for your patience! 🚧
        </div>
      </body>
    </html>
  );
}
