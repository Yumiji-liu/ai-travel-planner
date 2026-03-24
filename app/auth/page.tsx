'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Compass } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 text-center">
          {/* Logo */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/25 mb-6">
            <Compass className="h-7 w-7 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Welcome to TripAI</h1>
          <p className="mt-2 text-slate-500">
            Sign in to save your trips, access them anywhere, and share with friends.
          </p>

          <div className="mt-8 space-y-3">
            {/* Google OAuth Stub */}
            <button
              className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
              onClick={() => alert('Google OAuth integration coming soon! This is a demo.')}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 .001C4.029 0 0 4.028 0 9s4.029 9 9 9 9-4.028 9-9-4.029-9-9-9zm3.036 13.646H9V9.958h4.036c.588 1.125 1.002 2.446 1.002 3.844s-.414 2.719-1.002 3.844z"/>
              </svg>
              Continue with Google
            </button>

            <button
              className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
              onClick={() => alert('Demo mode — no actual login is needed for MVP.')}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-slate-700 text-white text-[10px] font-bold">D</div>
              Continue as Demo User
            </button>
          </div>

          <div className="mt-6 space-y-3 text-xs text-slate-400">
            <p>
              By continuing, you agree to our{' '}
              <Link href="#" className="text-teal-600 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="#" className="text-teal-600 hover:underline">Privacy Policy</Link>
            </p>
            <p>
              No account?{' '}
              <Link href="/plan" className="text-teal-600 hover:underline font-medium">
                Start planning without signing in
              </Link>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-teal-600">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
