import SharePageClient from './SharePageClient';
import { mockTrips } from '@/lib/mock-data';

export function generateStaticParams() {
  return mockTrips.map((trip) => ({
    token: trip.shareToken,
  }));
}

export default async function SharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <SharePageClient token={token} />;
}
