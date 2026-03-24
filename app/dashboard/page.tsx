'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { mockTrips } from '@/lib/mock-data';
import { Trip } from '@/types';
import { formatDate, cn } from '@/lib/utils';
import { 
  Plus, Calendar, MapPin, Users, Share2, 
  ChevronRight, Compass, Globe
} from 'lucide-react';

export default function DashboardPage() {
  const [trips] = useState<Trip[]>(mockTrips);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              My Trips
            </h1>
            <p className="mt-2 text-slate-500">
              {trips.length} {trips.length === 1 ? 'trip' : 'trips'} saved
            </p>
          </div>
          <Link href="/plan">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Trip
            </Button>
          </Link>
        </div>

        {trips.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white py-20 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 mb-5">
              <Compass className="h-8 w-8 text-teal-500" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No trips yet
            </h2>
            <p className="text-slate-500 mb-6 max-w-sm">
              Plan your first trip and it will appear here. Takes less than 30 seconds!
            </p>
            <Link href="/plan">
              <Button>
                <Globe className="mr-2 h-4 w-4" />
                Plan Your First Trip
              </Button>
            </Link>
          </motion.div>
        ) : (
          /* Trip Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Link href={`/trip/${trip.id}`} className="group block">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-500/10">
                    {/* Cover */}
                    <div className="relative h-40 bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <svg width="100%" height="100%">
                          <pattern id={`grid-${trip.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                          </pattern>
                          <rect width="100%" height="100%" fill={`url(#grid-${trip.id})`}/>
                        </svg>
                      </div>
                      <Compass className="h-16 w-16 text-white/80" />
                      <div className="absolute top-3 right-3">
                        <span className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                          trip.status === 'published' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
                        )}>
                          {trip.status}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                        {trip.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {trip.destination}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {trip.days} days
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {trip.travelers}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                          {formatDate(trip.createdAt)}
                        </span>
                        <div className="flex items-center gap-1 text-teal-600 text-sm font-medium">
                          View
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Add New Card */}
            <Link href="/plan">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: trips.length * 0.1 }}
                className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white p-6 text-center transition-all duration-200 hover:border-teal-400 hover:bg-teal-50/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-500 mb-4">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="font-medium text-slate-700">Plan a New Trip</p>
                <p className="mt-1 text-sm text-slate-400">AI-powered itinerary in 30s</p>
              </motion.div>
            </Link>
          </div>
        )}

        {/* Demo Notice */}
        <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50/50 p-6 text-center">
          <p className="text-sm text-amber-700">
            <strong>Demo Mode:</strong> You're viewing sample trips. Sign in with Google OAuth to save and manage your own trips.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/auth">
              <Button variant="secondary" size="sm">
                Sign In with Google
              </Button>
            </Link>
            <Link href="/plan">
              <Button variant="outline" size="sm">
                Create Trip Without Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
