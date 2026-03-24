import { Trip, Activity, TravelStyle, ItineraryDay } from '@/types';

export const mockActivities: Activity[] = [
  {
    id: 'a1',
    name: 'Senso-ji Temple',
    type: 'attraction',
    address: '2 Chome-3-1 Asakusa, Taito City, Tokyo',
    lat: 35.7147,
    lng: 139.7966,
    description: 'Tokyo\'s oldest and most significant Buddhist temple, featuring the iconic Thunder Gate (Kaminarimon) and a vibrant shopping street.',
    durationMinutes: 120,
    openingHours: '6:00 AM - 5:00 PM',
    order: 1,
  },
  {
    id: 'a2',
    name: 'Tokyo Skytree',
    type: 'attraction',
    address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo',
    lat: 35.7101,
    lng: 139.8107,
    description: 'The tallest tower in Japan at 634m, offering breathtaking panoramic views of Tokyo from the observation decks.',
    durationMinutes: 150,
    openingHours: '10:00 AM - 9:00 PM',
    order: 2,
  },
  {
    id: 'a3',
    name: 'Sushi Dai',
    type: 'restaurant',
    address: 'Toyosu Market, 4 Chome-9-1 Toyosu, Koto City, Tokyo',
    lat: 35.6427,
    lng: 139.7851,
    description: 'Famous sushi restaurant at Toyosu Market, serving the freshest catches of the day from the legendary tuna auctions.',
    durationMinutes: 60,
    openingHours: '5:30 AM - 2:00 PM',
    order: 3,
  },
  {
    id: 'a4',
    name: 'Meiji Jingu Shrine',
    type: 'attraction',
    address: '1-1 Yoyogikamizonocho, Shibuya City, Tokyo',
    lat: 35.6764,
    lng: 139.6993,
    description: 'A serene Shinto shrine nestled in a forest of 100,000 trees, dedicated to Emperor Meiji and Empress Shoken.',
    durationMinutes: 90,
    openingHours: 'Sunrise - Sunset',
    order: 4,
  },
  {
    id: 'a5',
    name: 'Shibuya Crossing',
    type: 'attraction',
    address: 'Shibuya Station, Shibuya City, Tokyo',
    lat: 35.6595,
    lng: 139.7004,
    description: 'The world\'s busiest pedestrian crossing, where up to 3,000 people cross at once in a spectacular organized chaos.',
    durationMinutes: 30,
    openingHours: '24 hours',
    order: 5,
  },
  {
    id: 'a6',
    name: 'Ichiran Ramen Shibuya',
    type: 'restaurant',
    address: '1-22-7 Jinnan, Shibuya City, Tokyo',
    lat: 35.6612,
    lng: 139.6995,
    description: 'Iconic tonkotsu ramen chain famous for its individual booth seating and customizable spice levels.',
    durationMinutes: 45,
    openingHours: '24 hours',
    order: 6,
  },
  {
    id: 'a7',
    name: 'Shinjuku Gyoen National Garden',
    type: 'nature',
    address: '11 Naitomachi, Shinjuku City, Tokyo',
    lat: 35.6852,
    lng: 139.7100,
    description: 'One of Tokyo\'s largest and most beautiful parks, featuring French, English, and Japanese garden styles.',
    durationMinutes: 120,
    openingHours: '9:00 AM - 4:30 PM',
    order: 7,
  },
  {
    id: 'a8',
    name: 'teamLab Borderless',
    type: 'entertainment',
    address: 'Azabudai Hills, 2-6-2 Azabudai, Minato City, Tokyo',
    lat: 35.6624,
    lng: 139.7403,
    description: 'Immersive digital art museum where art movements beyond boundaries create a seamless, borderless experience.',
    durationMinutes: 180,
    openingHours: '10:00 AM - 9:00 PM',
    order: 8,
  },
];

export const mockTrips: Trip[] = [
  {
    id: 'trip-1',
    title: '7-Day Tokyo Adventure',
    destination: 'Tokyo, Japan',
    days: 7,
    travelers: 2,
    budget: 'moderate',
    travelStyles: ['culture', 'food'] as TravelStyle[],
    status: 'published',
    shareToken: 'tokyo-2024-abc123',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    itinerary: [
      {
        id: 'day-1',
        dayNumber: 1,
        date: '2024-04-01',
        summary: 'Arrive in Tokyo and explore the historic Asakusa district.',
        activities: [
          { ...mockActivities[0], order: 1 },
          { ...mockActivities[1], order: 2 },
          { ...mockActivities[2], order: 3 },
        ],
      },
      {
        id: 'day-2',
        dayNumber: 2,
        date: '2024-04-02',
        summary: 'Discover Shibuya, Harajuku and the spiritual side of Tokyo.',
        activities: [
          { ...mockActivities[3], order: 1 },
          { ...mockActivities[4], order: 2 },
          { ...mockActivities[5], order: 3 },
        ],
      },
      {
        id: 'day-3',
        dayNumber: 3,
        date: '2024-04-03',
        summary: 'Nature and art exploration in central Tokyo.',
        activities: [
          { ...mockActivities[6], order: 1 },
          { ...mockActivities[7], order: 2 },
        ],
      },
    ],
  },
  {
    id: 'trip-2',
    title: '5-Day Paris Getaway',
    destination: 'Paris, France',
    days: 5,
    travelers: 1,
    budget: 'luxury',
    travelStyles: ['culture', 'photography'] as TravelStyle[],
    status: 'published',
    shareToken: 'paris-2024-xyz789',
    createdAt: '2024-03-10T08:00:00Z',
    updatedAt: '2024-03-10T08:00:00Z',
    itinerary: [
      {
        id: 'day-p1',
        dayNumber: 1,
        date: '2024-05-01',
        summary: 'Arrival and Eiffel Tower exploration.',
        activities: [
          {
            id: 'p1',
            name: 'Eiffel Tower',
            type: 'attraction',
            address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
            lat: 48.8584,
            lng: 2.2945,
            description: 'The iconic iron lattice tower and symbol of Paris, offering stunning views from its three observation decks.',
            durationMinutes: 180,
            openingHours: '9:30 AM - 11:45 PM',
            order: 1,
          },
          {
            id: 'p2',
            name: 'Le Jules Verne',
            type: 'restaurant',
            address: 'Eiffel Tower, 2nd Floor, Avenue Anatole France, 75007 Paris',
            lat: 48.8580,
            lng: 2.2942,
            description: 'Michelin-starred restaurant on the Eiffel Tower\'s second floor, operated by chef Alain Ducasse.',
            durationMinutes: 120,
            openingHours: '12:00 PM - 1:30 PM, 7:00 PM - 9:30 PM',
            order: 2,
          },
        ],
      },
    ],
  },
];

// Simulated AI generation
export async function generateMockTrip(formData: {
  destination: string;
  days: number;
  travelers: number;
  budget: string;
  travelStyles: string[];
}): Promise<Trip> {
  await new Promise(resolve => setTimeout(resolve, 3500 + Math.random() * 1500));

  const destinations: Record<string, { lat: number; lng: number; activities: Activity[] }> = {
    'Tokyo': {
      lat: 35.6762,
      lng: 139.6503,
      activities: [
        { id: 't1', name: 'Senso-ji Temple', type: 'attraction', lat: 35.7147, lng: 139.7966, address: '2-3-1 Asakusa, Tokyo', description: 'Historic Buddhist temple', durationMinutes: 120, openingHours: '6AM-5PM', order: 1 },
        { id: 't2', name: 'Shibuya Crossing', type: 'attraction', lat: 35.6595, lng: 139.7004, address: 'Shibuya, Tokyo', description: 'World\'s busiest intersection', durationMinutes: 30, openingHours: '24 hours', order: 2 },
        { id: 't3', name: 'Meiji Jingu Shrine', type: 'attraction', lat: 35.6764, lng: 139.6993, address: '1-1 Yoyogikamizonocho, Tokyo', description: 'Serene Shinto shrine', durationMinutes: 90, openingHours: 'Sunrise-Sunset', order: 3 },
      ]
    },
    'Paris': {
      lat: 48.8566,
      lng: 2.3522,
      activities: [
        { id: 'p1', name: 'Eiffel Tower', type: 'attraction', lat: 48.8584, lng: 2.2945, address: 'Champ de Mars, Paris', description: 'Iconic Paris landmark', durationMinutes: 180, openingHours: '9:30AM-11:45PM', order: 1 },
        { id: 'p2', name: 'Louvre Museum', type: 'attraction', lat: 48.8606, lng: 2.3376, address: 'Rue de Rivoli, Paris', description: 'World\'s largest art museum', durationMinutes: 240, openingHours: '9AM-6PM', order: 2 },
        { id: 'p3', name: 'Montmartre', type: 'attraction', lat: 48.8867, lng: 2.3431, address: 'Montmartre, Paris', description: 'Historic artistic neighborhood', durationMinutes: 150, openingHours: 'Open 24h', order: 3 },
      ]
    }
  };

  const dest = destinations[formData.destination] || destinations['Tokyo'];
  
  const itinerary: ItineraryDay[] = Array.from({ length: formData.days }, (_, i) => ({
    id: `day-${Date.now()}-${i}`,
    dayNumber: i + 1,
    date: new Date(Date.now() + (i + 1) * 86400000).toISOString().split('T')[0],
    summary: `Day ${i + 1} in ${formData.destination}`,
    activities: dest.activities.slice(0, 3 + Math.floor(Math.random() * 2)).map((act, j) => ({
      id: `act-${Date.now()}-${i}-${j}`,
      name: act.name,
      type: act.type,
      lat: act.lat + (Math.random() - 0.5) * 0.01,
      lng: act.lng + (Math.random() - 0.5) * 0.01,
      address: `${act.lat}, ${act.lng}`,
      description: act.description,
      durationMinutes: act.durationMinutes,
      openingHours: '9:00 AM - 6:00 PM',
      order: j + 1,
    })),
  }));

  return {
    id: `trip-${Date.now()}`,
    title: `${formData.days}-Day ${formData.destination} Adventure`,
    destination: formData.destination,
    days: formData.days,
    travelers: formData.travelers,
    budget: formData.budget as any,
    travelStyles: formData.travelStyles as any[],
    status: 'published',
    shareToken: `${formData.destination.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    itinerary,
  };
}
