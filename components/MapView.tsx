'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Activity, ItineraryDay } from '@/types';
import { cn } from '@/lib/utils';

// Demo token - in production, use environment variable
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN_HERE';

const dayColors = [
  '#0d9488', // teal
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#84cc16', // lime
  '#f97316', // orange
];

interface MapViewProps {
  days: ItineraryDay[];
  selectedDay?: number | null;
  onActivityClick?: (activity: Activity) => void;
  className?: string;
}

export function MapView({ days, selectedDay, onActivityClick, className }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [139.7525, 35.6846], // Default: Tokyo
        zoom: 11,
      });

      map.current.on('load', () => {
        setIsLoaded(true);
      });

      map.current.on('error', () => {
        setMapError(true);
      });
    } catch {
      setMapError(true);
    }

    return () => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update markers when days or selectedDay changes
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    const mapInstance = map.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Filter days to show
    const visibleDays = selectedDay 
      ? days.filter(d => d.dayNumber === selectedDay)
      : days;

    // Add markers for each visible activity
    visibleDays.forEach((day, dayIndex) => {
      const color = dayColors[day.dayNumber % dayColors.length];
      
      day.activities.forEach((activity, actIndex) => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'map-marker';
        el.innerHTML = `
          <div style="
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            background: ${color};
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            border: 2px solid white;
            cursor: pointer;
            transition: transform 0.2s;
          ">
            <span style="
              transform: rotate(45deg);
              color: white;
              font-size: 11px;
              font-weight: 700;
              font-family: system-ui, sans-serif;
            ">${actIndex + 1}</span>
          </div>
        `;

        el.addEventListener('mouseenter', () => {
          el.querySelector('div')!.style.transform = 'rotate(-45deg) scale(1.15)';
        });
        el.addEventListener('mouseleave', () => {
          el.querySelector('div')!.style.transform = 'rotate(-45deg) scale(1)';
        });
        el.addEventListener('click', () => {
          onActivityClick?.(activity);
        });

        const marker = new mapboxgl.Marker(el)
          .setLngLat([activity.lng, activity.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 20, closeButton: false })
              .setHTML(`
                <div style="padding: 8px; font-family: system-ui, sans-serif;">
                  <p style="font-weight: 600; font-size: 13px; color: #1e293b; margin: 0 0 4px 0;">${activity.name}</p>
                  <p style="font-size: 11px; color: #64748b; margin: 0;">${activity.type}</p>
                </div>
              `)
          )
          .addTo(mapInstance);

        markersRef.current.push(marker);
      });

      // Draw route line for this day
      if (day.activities.length > 1) {
        const sourceId = `route-day-${day.dayNumber}`;
        const layerId = `route-layer-day-${day.dayNumber}`;
        
        // Remove existing source/layer if present
        if (mapInstance.getLayer(layerId)) mapInstance.removeLayer(layerId);
        if (mapInstance.getSource(sourceId)) mapInstance.removeSource(sourceId);

        const coordinates = day.activities.map(a => [a.lng, a.lat]);

        mapInstance.addSource(sourceId, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates,
            },
          },
        });

        mapInstance.addLayer({
          id: layerId,
          type: 'line',
          source: sourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': color,
            'line-width': 3,
            'line-opacity': 0.8,
            'line-dasharray': [2, 2],
          },
        });
      }
    });

    // Fit bounds to show all markers
    if (markersRef.current.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      visibleDays.forEach(day => {
        day.activities.forEach(activity => {
          bounds.extend([activity.lng, activity.lat]);
        });
      });
      mapInstance.fitBounds(bounds, { padding: 60, maxZoom: 14 });
    }
  }, [days, selectedDay, isLoaded, onActivityClick]);

  if (mapError) {
    return (
      <div className={cn('relative overflow-hidden rounded-2xl bg-slate-100', className)}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
          <MapIconFallback />
          <p className="mt-3 text-sm font-medium text-slate-500">Map Preview</p>
          <p className="mt-1 text-xs text-slate-400">Add NEXT_PUBLIC_MAPBOX_TOKEN to enable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden rounded-2xl', className)}>
      <div ref={mapContainer} className="h-full w-full min-h-[300px]" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
        </div>
      )}
    </div>
  );
}

function MapIconFallback() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
