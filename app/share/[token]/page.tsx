'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { mockTrips } from '@/lib/mock-data';
import { Trip } from '@/types';

export function generateStaticParams() {
  return mockTrips.map((trip) => ({
    token: trip.shareToken,
  }));
}

export default function SharePage() {
  const params = useParams();
  const token = params.token as string;
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const found = mockTrips.find(t => t.shareToken === token);
    if (found) setTrip(found);
  }, [token]);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-teal-500 border-t-transparent mb-4" />
          <p className="text-slate-500">Loading shared trip...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900">{trip.title}</h1>
          <p className="mt-2 text-slate-500">{trip.destination} · {trip.days} days</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <pre className="bg-slate-100 p-4 rounded-lg overflow-auto text-sm">
          {JSON.stringify(trip, null, 2)}
        </pre>
      </div>
    </div>
  );
}
