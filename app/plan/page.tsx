'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { generateMockTrip } from '@/lib/mock-data';
import { TravelStyle, BudgetLevel } from '@/types';
import { 
  MapPin, Calendar, Users, Wallet, Sparkles, 
  ChevronRight, Globe, Camera, Utensils, Trees, Music, 
  AlertCircle, CheckCircle2, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const travelStyleOptions = [
  { value: 'culture', label: 'Culture & History', icon: Globe },
  { value: 'adventure', label: 'Adventure', icon: Camera },
  { value: 'food', label: 'Food & Cuisine', icon: Utensils },
  { value: 'nature', label: 'Nature & Outdoors', icon: Trees },
  { value: 'photography', label: 'Photography', icon: Camera },
  { value: 'nightlife', label: 'Nightlife', icon: Music },
];

const budgetOptions = [
  { value: 'budget', label: '💰 Budget — Backpacker friendly' },
  { value: 'moderate', label: '💳 Moderate — Comfortable travel' },
  { value: 'luxury', label: '💎 Luxury — Premium experiences' },
];

function PlanPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDestination = searchParams.get('destination') || '';

  const [step, setStep] = useState<'form' | 'loading' | 'done'>('form');
  const [tripId, setTripId] = useState<string | null>(null);

  const [destination, setDestination] = useState(initialDestination);
  const [days, setDays] = useState('5');
  const [travelers, setTravelers] = useState('2');
  const [budget, setBudget] = useState<BudgetLevel>('moderate');
  const [selectedStyles, setSelectedStyles] = useState<TravelStyle[]>([]);
  const [error, setError] = useState('');

  const toggleStyle = (style: TravelStyle) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleGenerate = async () => {
    if (!destination.trim()) {
      setError('Please enter a destination');
      return;
    }
    if (selectedStyles.length === 0) {
      setError('Please select at least one travel style');
      return;
    }

    setError('');
    setStep('loading');

    try {
      const trip = await generateMockTrip({
        destination: destination.trim(),
        days: parseInt(days),
        travelers: parseInt(travelers),
        budget,
        travelStyles: selectedStyles,
      });
      setTripId(trip.id);
      // Store in sessionStorage for the trip page to pick up
      sessionStorage.setItem(`trip-${trip.id}`, JSON.stringify(trip));
      setStep('done');
    } catch {
      setError('Something went wrong. Please try again.');
      setStep('form');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/50 to-white py-12 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/25 mb-5">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  Plan Your Dream Trip
                </h1>
                <p className="mt-3 text-slate-600">
                  Tell us about your ideal journey and we'll create it instantly.
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
                {/* Destination */}
                <Input
                  label="Where do you want to go?"
                  placeholder="e.g. Tokyo, Japan"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />

                {/* Days & Travelers */}
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="How many days?"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    options={[
                      { value: '1', label: '1 day' },
                      { value: '2', label: '2 days' },
                      { value: '3', label: '3 days' },
                      { value: '4', label: '4 days' },
                      { value: '5', label: '5 days' },
                      { value: '6', label: '6 days' },
                      { value: '7', label: '7 days' },
                      { value: '10', label: '10 days' },
                      { value: '14', label: '14 days' },
                    ]}
                  />
                  <Select
                    label="Number of travelers"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    options={[
                      { value: '1', label: 'Solo' },
                      { value: '2', label: '2 people' },
                      { value: '3', label: '3 people' },
                      { value: '4', label: '4 people' },
                      { value: '5', label: '5 people' },
                      { value: '6', label: '6+ people' },
                    ]}
                  />
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    What's your budget level?
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setBudget(opt.value as BudgetLevel)}
                        className={cn(
                          'flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all',
                          budget === opt.value
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        )}
                      >
                        <div className={cn(
                          'h-5 w-5 rounded-full border-2 flex items-center justify-center',
                          budget === opt.value ? 'border-teal-500 bg-teal-500' : 'border-slate-300'
                        )}>
                          {budget === opt.value && (
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          )}
                        </div>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Styles */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    What kind of experiences do you want? <span className="text-slate-400 font-normal">(select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {travelStyleOptions.map((opt) => {
                      const isSelected = selectedStyles.includes(opt.value as TravelStyle);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleStyle(opt.value as TravelStyle)}
                          className={cn(
                            'flex items-center gap-2.5 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-medium transition-all',
                            isSelected
                              ? 'border-teal-500 bg-teal-50 text-teal-700'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          )}
                        >
                          <opt.icon className={cn('h-4 w-4', isSelected ? 'text-teal-600' : 'text-slate-400')} />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                {/* Submit */}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={!destination.trim() || selectedStyles.length === 0}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate My Trip
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-center text-xs text-slate-400">
                  AI-generated itinerary in under 30 seconds · No account needed
                </p>
              </div>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              {/* Animated globe */}
              <div className="relative mb-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 shadow-2xl shadow-teal-500/30"
                >
                  <Globe className="h-16 w-16 text-white" />
                </motion.div>
                {/* Orbiting dots */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 h-3 w-3 rounded-full bg-teal-400"
                    style={{ originX: '0px', originY: '0px' }}
                    animate={{ 
                      rotate: [0, 360],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.67,
                      ease: 'linear',
                    }}
                  />
                ))}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Crafting your itinerary...
              </h2>
              <p className="text-slate-500 mb-8">
                Our AI is designing the perfect trip for <strong>{destination}</strong>
              </p>

              {/* Progress indicators */}
              <div className="space-y-3 w-full max-w-xs">
                {[
                  'Analyzing destinations & attractions',
                  'Finding best restaurants & cafes',
                  'Calculating optimal routes & timing',
                  'Formatting your personalized itinerary',
                ].map((text, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.8 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      className="h-2 w-2 rounded-full bg-teal-500"
                    />
                    <span className="text-sm text-slate-600">{text}</span>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-teal-400" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'done' && tripId && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 shadow-2xl shadow-teal-500/30 mb-6"
              >
                <CheckCircle2 className="h-10 w-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Your trip is ready! 🎉
              </h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                We've created a personalized itinerary for <strong>{destination}</strong>. 
                Review it, explore the map, and customize as you like.
              </p>
              <Button size="lg" onClick={() => { window.location.href = `/#/trip/${tripId}`; }}>
                View My Itinerary
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function PlanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
      </div>
    }>
      <PlanPageContent />
    </Suspense>
  );
}
