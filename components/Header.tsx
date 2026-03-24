'use client';

import Link from 'next/link';
import { Map, Compass, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/25 transition-transform duration-200 group-hover:scale-105">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">
            Trip<span className="text-teal-600">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/plan" 
            className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
          >
            Plan a Trip
          </Link>
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
          >
            My Trips
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-slate-200 text-slate-600 transition-all duration-200 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50"
          >
            <User className="h-4.5 w-4.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
