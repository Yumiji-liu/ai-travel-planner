'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, MapPin, Clock, Globe2, Shield, Zap, ChevronRight, Star, Users } from 'lucide-react';
import dynamic from 'next/dynamic';

const TripPageClient = dynamic(() => import('./trip/[id]/TripPageClient'), { ssr: false });

const features = [
  {
    icon: Zap,
    title: '30-Second Planning',
    description: 'Describe your dream trip and get a complete itinerary in under a minute.',
  },
  {
    icon: MapPin,
    title: 'AI-Curated Stops',
    description: 'Handpicked attractions, restaurants, and hidden gems tailored to your style.',
  },
  {
    icon: Globe2,
    title: 'Interactive Maps',
    description: 'Visualize your entire journey on a beautiful, day-by-day map.',
  },
  {
    icon: Shield,
    title: 'Always Free',
    description: 'Core features are 100% free. No credit card required.',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    avatar: 'SM',
    text: 'Planned my entire Tokyo trip in 5 minutes. The AI understood exactly what I wanted!',
    rating: 5,
  },
  {
    name: 'James K.',
    avatar: 'JK',
    text: 'The map view is incredible. Saved me so much time researching routes.',
    rating: 5,
  },
  {
    name: 'Elena R.',
    avatar: 'ER',
    text: 'As a solo traveler, having a structured itinerary made my Paris trip so much easier.',
    rating: 5,
  },
];

export default function HomePage() {
  const [destination, setDestination] = useState('');
  const [tripId, setTripId] = useState<string | null>(null);

  // Handle hash routing for trip pages (#/trip/:id)
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/^#\/trip\/(.+)$/);
    if (match) {
      setTripId(match[1]);
    }
  }, []);

  // Early return for trip pages via hash routing
  if (tripId) {
    return <TripPageClient tripId={tripId} />;
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-teal-50/50 pt-16 pb-24 sm:pt-24 sm:pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />
          <div className="absolute top-60 -left-20 h-60 w-60 rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-amber-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-4 py-1.5 text-sm font-medium text-teal-700 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>Powered by Advanced AI</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            >
              Your perfect trip,{' '}
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                planned in seconds
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl"
            >
              Tell us where you want to go, how long you have, and what you love. 
              Our AI creates a personalized itinerary with routes, timing, and insider tips.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Where do you want to go? (e.g. Tokyo, Paris...)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-14 w-full rounded-2xl border-2 border-slate-200 bg-white pl-12 pr-36 text-base text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20 sm:text-lg shadow-lg shadow-slate-200/50"
                />
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <Link href={destination ? `/plan?destination=${encodeURIComponent(destination)}` : '/plan'}>
                    <Button size="lg" className="h-10 px-6 text-sm font-semibold">
                      Plan Now
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 flex items-center gap-2 text-sm text-slate-500"
            >
              <div className="flex -space-x-2">
                {['SM', 'JK', 'ER', 'PL', 'AN'].map((initials, i) => (
                  <div
                    key={i}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-teal-400 to-cyan-400 text-[10px] font-bold text-white"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span>Trusted by <strong className="text-slate-700">2,400+</strong> travelers this month</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need for a great trip
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From inspiration to itinerary, we've got you covered.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-6 text-center hover:border-teal-200 transition-colors"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/25">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-teal-50/50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Three steps to your perfect trip
            </h2>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Tell us your preferences',
                description: 'Share your destination, travel dates, budget, and interests. The more detail, the better your itinerary.',
              },
              {
                step: '02',
                title: 'AI generates your itinerary',
                description: 'Our AI analyzes thousands of travel resources to create a day-by-day plan tailored just for you.',
              },
              {
                step: '03',
                title: 'Explore & customize',
                description: 'View your trip on an interactive map, edit activities, and share with travel companions.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="text-7xl font-extrabold text-teal-100/80 select-none">
                  {item.step}
                </div>
                <h3 className="-mt-6 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/plan">
              <Button size="lg" className="px-10">
                Start Planning Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Loved by travelers worldwide
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-slate-700">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <span className="text-sm font-medium text-slate-900">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Ready to plan your next adventure?
          </h2>
          <p className="mt-6 text-lg text-teal-100">
            Join thousands of travelers who've discovered a smarter way to plan.
            It takes less than a minute to get started.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row justify-center">
            <Link href="/plan">
              <Button variant="secondary" size="lg" className="bg-white text-teal-700 hover:bg-teal-50 shadow-xl">
                <MapPin className="mr-2 h-5 w-5" />
                Start Free — No Signup Required
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                View Demo Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
