export type ActivityType = 
  | 'attraction' 
  | 'restaurant' 
  | 'hotel' 
  | 'transport' 
  | 'shopping' 
  | 'entertainment' 
  | 'nature';

export type BudgetLevel = 'budget' | 'moderate' | 'luxury';

export type TravelStyle = 
  | 'culture' 
  | 'adventure' 
  | 'food' 
  | 'relaxation' 
  | 'photography' 
  | 'nightlife';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  address: string;
  lat: number;
  lng: number;
  description: string;
  durationMinutes: number;
  openingHours?: string;
  imageUrl?: string;
  order: number;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  summary: string;
  activities: Activity[];
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  days: number;
  travelers: number;
  budget: BudgetLevel;
  travelStyles: TravelStyle[];
  status: 'draft' | 'published' | 'shared';
  shareToken?: string;
  createdAt: string;
  updatedAt: string;
  itinerary: ItineraryDay[];
}

export interface TripFormData {
  destination: string;
  days: number;
  travelers: number;
  budget: BudgetLevel;
  travelStyles: TravelStyle[];
}
