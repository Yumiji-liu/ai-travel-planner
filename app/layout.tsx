import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TripAI — AI-Powered Travel Planning",
  description: "Generate personalized travel itineraries in seconds with AI. Plan your perfect trip with smart recommendations for attractions, restaurants, and routes.",
  keywords: ["travel", "AI", "trip planner", "itinerary", "vacation", "tourism"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-900">TripAI</span>
              </div>
              <p className="text-sm text-slate-500">
                © 2024 TripAI. Plan smarter, travel better.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
