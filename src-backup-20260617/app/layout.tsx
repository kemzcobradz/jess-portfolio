import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jess Cobrado — SEO VA | Executive Assistant | Generalist VA",
  description: "Tired of juggling SEO tasks, client reporting, and missed deadlines? I build systems that run. 8+ years managing 12+ campaigns simultaneously. Reach out today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-screen bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
