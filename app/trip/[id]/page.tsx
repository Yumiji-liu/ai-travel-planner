import TripPageClient from "./TripPageClient";
import { mockTrips } from "@/lib/mock-data";

export function generateStaticParams() {
  return mockTrips.map((trip) => ({
    id: trip.id,
  }));
}

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TripPageClient tripId={id} />;
}
