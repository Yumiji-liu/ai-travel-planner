'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trip, Activity } from "@/types";
import { DaySection } from "@/components/DaySection";
import { MapView } from "@/components/MapView";
import { Button } from "@/components/ui/Button";
import { mockTrips } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Share2, Edit3, ChevronLeft, Calendar, MapPin, Users, DollarSign, Filter, Check } from "lucide-react";

const dayColors = ["bg-teal-500","bg-amber-500","bg-violet-500","bg-pink-500","bg-cyan-500","bg-lime-500","bg-orange-500"];

function TripPageContent({ tripId }: { tripId: string }) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(`trip-${tripId}`);
    if (stored) setTrip(JSON.parse(stored));
    else { const found = mockTrips.find(t => t.id === tripId); if (found) setTrip(found); }
  }, [tripId]);

  const handleShare = () => {
    if (!trip?.shareToken) return;
    navigator.clipboard.writeText(`${window.location.origin}/share/${trip.shareToken}`).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  if (!trip) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="text-center"><div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-teal-500 border-t-transparent mb-4" /><p className="text-slate-500">Loading your trip...</p></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-teal-600 mb-3 transition-colors"><ChevronLeft className="h-4 w-4" />My Trips</Link>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{trip.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-teal-500" />{trip.destination}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-teal-500" />{trip.days} days</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-teal-500" />{trip.travelers} travelers</span>
                <span className="inline-flex items-center gap-1.5"><DollarSign className="h-4 w-4 text-teal-500" /><span className="capitalize">{trip.budget}</span></span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={handleShare}>{copied ? <Check className="h-4 w-4 mr-1.5 text-green-500" /> : <Share2 className="h-4 w-4 mr-1.5" />}{copied ? "Copied!" : "Share"}</Button>
              <Button variant="outline" size="sm"><Edit3 className="h-4 w-4 mr-1.5" />Edit</Button>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
            <button onClick={() => setSelectedDay(null)} className={cn("inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap", selectedDay === null ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}><Filter className="h-3.5 w-3.5" />All Days</button>
            {trip.itinerary.map(day => (
              <button key={day.id} onClick={() => setSelectedDay(selectedDay === day.dayNumber ? null : day.dayNumber)} className={cn("inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap", selectedDay === day.dayNumber ? "bg-teal-600 text-white shadow-lg shadow-teal-500/25" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}>
                <span className={cn("h-2 w-2 rounded-full", selectedDay === day.dayNumber ? "bg-white" : dayColors[day.dayNumber % dayColors.length])} />Day {day.dayNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Itinerary</h2>
            {trip.itinerary.filter(day => selectedDay === null || day.dayNumber === selectedDay).map((day, index) => (
              <motion.div key={day.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                <DaySection day={day} isSelected={selectedDay === day.dayNumber} onClick={() => setSelectedDay(selectedDay === day.dayNumber ? null : day.dayNumber)} onActivityClick={(id) => { const a = day.activities.find(a => a.id === id); if (a) setActiveActivity(a); }} />
              </motion.div>
            ))}
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Map</h2>
            <div className="sticky top-24">
              <MapView days={trip.itinerary} selectedDay={selectedDay} onActivityClick={(a) => setActiveActivity(a)} className="h-[600px] shadow-lg shadow-slate-200/50" />
              {activeActivity && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-teal-200 bg-teal-50/80 p-4 backdrop-blur-sm">
                  <h4 className="font-semibold text-slate-900">{activeActivity.name}</h4>
                  <p className="mt-1 text-sm text-slate-600">{activeActivity.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{activeActivity.address}</span>
                    {activeActivity.openingHours && <span>🕐 {activeActivity.openingHours}</span>}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TripPageClient({ tripId }: { tripId: string }) {
  return <TripPageContent tripId={tripId} />;
}
