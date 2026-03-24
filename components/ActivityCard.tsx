'use client';

import { Activity } from '@/types';
import { formatDuration } from '@/lib/utils';
import { Clock, MapPin, Camera, Utensils, Hotel, ShoppingBag, Zap, Trees, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons = {
  attraction: Camera,
  restaurant: Utensils,
  hotel: Hotel,
  transport: Zap,
  shopping: ShoppingBag,
  entertainment: Music,
  nature: Trees,
};

const typeColors = {
  attraction: 'bg-rose-100 text-rose-600',
  restaurant: 'bg-amber-100 text-amber-600',
  hotel: 'bg-indigo-100 text-indigo-600',
  transport: 'bg-yellow-100 text-yellow-600',
  shopping: 'bg-pink-100 text-pink-600',
  entertainment: 'bg-purple-100 text-purple-600',
  nature: 'bg-green-100 text-green-600',
};

interface ActivityCardProps {
  activity: Activity;
  onClick?: () => void;
  compact?: boolean;
}

export function ActivityCard({ activity, onClick, compact = false }: ActivityCardProps) {
  const Icon = typeIcons[activity.type] || Camera;
  const colorClass = typeColors[activity.type] || typeColors.attraction;

  return (
    <div 
      onClick={onClick}
      className={cn(
        'group relative rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-200',
        'hover:border-teal-300 hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-0.5',
        onClick && 'cursor-pointer'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', colorClass)}>
          <Icon className="h-5 w-5" />
        </div>
        
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-slate-900 truncate">{activity.name}</h4>
          
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDuration(activity.durationMinutes)}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate max-w-[120px]">{activity.address}</span>
            </span>
          </div>

          {!compact && activity.description && (
            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
              {activity.description}
            </p>
          )}

          {!compact && activity.openingHours && (
            <p className="mt-2 text-xs text-slate-400">
              🕐 {activity.openingHours}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
