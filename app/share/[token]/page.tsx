'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trip, Activity } from '@/types';
import { DaySection } from '@/components/DaySection';
import { MapView } from '@/components/MapView';
import { Button } from '@/components/ui/Button';
import { mockTrips } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { 
  Share2, Calendar, MapPin, Users, DollarSign, 
  ExternalLink, Sparkles, Copy, Check
} from 'lucide-react';

const dayColors = [
  'bg-teal-500', 'bg-amber-500', 'bg-violet-500',
  'bg-pink-500', 'bg-cyan-500', 'bg-lime-500', 'bg-orange-500',
];

function SharePageContent({ token }: { token: string }) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Try sessionStorage first, then mock data
    const stored = sessionStorage.getItem(`trip-share-${token}`);
    if (stored) {
      setTrip(JSON.parse(stored));
    } else {
      const found = mockTrips.find(t => t.shareToken === token);
      if (found) setTrip(found);
    }
  }, [token]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 mb-6">
            <Share2 className="h-8 w-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Trip Not Found</h1>
          <p className="text-slate-500 mb-8">
            This share link may have expired or the trip doesn't exist.
          </p>
          <Link href="/plan">
            <Button>
              <Sparkles className="mr-2 h-4 w-4" />
              Create Your Own Trip
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-teal-100">
              <Share2 className="h-4 w-4" />
              <span>Shared by TripAI · {trip.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="h-8 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                {copied ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
              <Link href="/plan">
                <Button size="sm" className="h-8 bg-white text-teal-700 hover:bg-teal-50">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Plan Yours
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {trip.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-teal-500" />
              {trip.destination}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-teal-500" />
              {trip.days} {trip.days === 1 ? 'day' : 'days'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-teal-500" />
              {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-teal-500" />
              <span className="capitalize">{trip.budget}</span>
            </span>
          </div>

          {/* Day Filter Pills */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedDay(null)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap',
                selectedDay === null
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              All Days
            </button>
            {trip.itinerary.map(day => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(selectedDay === day.dayNumber ? null : day.dayNumber)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap',
                  selectedDay === day.dayNumber
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                <span 
                  className={cn('h-2 w-2 rounded-full', selectedDay === day.dayNumber ? 'bg-white' : dayColors[day.dayNumber % dayColors.length])}
                />
                Day {day.dayNumber}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Itinerary */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Itinerary</h2>
            {trip.itinerary
              .filter(day => selectedDay === null || day.dayNumber === selectedDay)
              .map((day, index) => (
                <motion.div
                  key={day.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <DaySection 
                    day={day}
                    isSelected={selectedDay === day.dayNumber}
                    onClick={() => setSelectedDay(selectedDay === day.dayNumber ? null : day.dayNumber)}
                    onActivityClick={(activityId) => {
                      const activity = day.activities.find(a => a.id === activityId);
                      if (activity) setActiveActivity(activity);
                    }}
                  />
                </motion.div>
              ))}
          </div>

          {/* Right: Map */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Map</h2>
            <div className="sticky top-24">
              <MapView
                days={trip.itinerary}
                selectedDay={selectedDay}
                onActivityClick={(activity) => setActiveActivity(activity)}
                className="h-[600px] shadow-lg shadow-slate-200/50"
              />
              
              {activeActivity && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl border border-teal-200 bg-teal-50/80 p-4 backdrop-blur-sm"
                >
                  <h4 className="font-semibold text-slate-900">{activeActivity.name}</h4>
                  <p className="mt-1 text-sm text-slate-600">{activeActivity.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {activeActivity.address}
                    </span>
                    {activeActivity.openingHours && (
                      <span>🕐 {activeActivity.openingHours}</span>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-12">
        <div className="mx-auto max-w-2xl text-center px-4">
          <h2 className="text-2xl font-bold text-white mb-3">
            Want to create your own trip?
          </h2>
          <p className="text-teal-100 mb-6">
            Get a personalized AI-generated itinerary in under 30 seconds. Free, no signup needed.
          </p>
          <Link href="/plan">
            <Button className="bg-white text-teal-700 hover:bg-teal-50 shadow-xl">
              <Sparkles className="mr-2 h-4 w-4" />
              Plan Your Trip Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  return <SharePageContent token={token} />;
}
