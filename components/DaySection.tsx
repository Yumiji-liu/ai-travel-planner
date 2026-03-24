'use client';

import { ItineraryDay } from '@/types';
import { ActivityCard } from './ActivityCard';
import { formatDate } from '@/lib/utils';
import { Calendar, Sun, Cloud, CloudRain } from 'lucide-react';

interface DaySectionProps {
  day: ItineraryDay;
  isSelected?: boolean;
  onActivityClick?: (activityId: string) => void;
  onClick?: () => void;
}

export function DaySection({ day, isSelected, onActivityClick, onClick }: DaySectionProps) {
  return (
    <div 
      onClick={onClick}
      className={`rounded-2xl border transition-all duration-200 ${
        isSelected 
          ? 'border-teal-400 bg-teal-50/50 shadow-lg shadow-teal-500/10' 
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
          isSelected ? 'bg-teal-500 text-white' : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600'
        }`}>
          <Calendar className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Day {day.dayNumber}</h3>
          <p className="text-sm text-slate-500">{formatDate(day.date)}</p>
        </div>
        <div className="ml-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <Sun className="h-3.5 w-3.5 text-amber-500" />
            {day.activities.length} activities
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {day.activities.length === 0 ? (
          <p className="text-center py-6 text-slate-400 text-sm">No activities planned yet.</p>
        ) : (
          day.activities.map((activity) => (
            <div key={activity.id} className="relative">
              <div className="absolute -left-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-slate-200 bg-white z-10" />
              {activity.order < day.activities.length && (
                <div className="absolute -left-[11px] top-[calc(50%+14px)] h-8 w-0.5 bg-slate-200" />
              )}
              <ActivityCard 
                activity={activity} 
                onClick={() => onActivityClick?.(activity.id)}
                compact 
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
