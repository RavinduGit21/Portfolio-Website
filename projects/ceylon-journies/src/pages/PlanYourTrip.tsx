import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import kandyTemple from '@/assets/kandy-temple.jpg';
import mirissaBeach from '@/assets/mirissa-beach.jpg';
import ellaDestination from '@/assets/ella-destination.jpg';
import yalaWildlife from '@/assets/yala-wildlife.jpg';

type Tour = {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  priceUSD: number;
  interests: string[];
  image: string;
};

const ALL_TOURS: Tour[] = [
  {
    id: 'cultural-heritage',
    title: 'Cultural Heritage Circuit',
    destination: 'Kandy & Sigiriya',
    durationDays: 5,
    priceUSD: 690,
    interests: ['culture', 'history'],
    image: kandyTemple,
  },
  {
    id: 'beach-escape',
    title: 'South Coast Beach Escape',
    destination: 'Galle & Mirissa',
    durationDays: 4,
    priceUSD: 540,
    interests: ['beach', 'relax'],
    image: mirissaBeach,
  },
  {
    id: 'hill-country-trails',
    title: 'Hill Country Trails',
    destination: 'Ella & Nuwara Eliya',
    durationDays: 6,
    priceUSD: 820,
    interests: ['nature', 'scenic'],
    image: ellaDestination,
  },
  {
    id: 'wildlife-safari',
    title: 'Yala Wildlife Safari',
    destination: 'Yala National Park',
    durationDays: 3,
    priceUSD: 430,
    interests: ['wildlife', 'adventure'],
    image: yalaWildlife,
  },
];

const ALL_INTERESTS = ['beach', 'culture', 'history', 'nature', 'scenic', 'wildlife', 'adventure', 'relax'];

const PlanYourTrip = () => {
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [duration, setDuration] = useState<'any' | '1-3' | '4-6' | '7+'>('any');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return ALL_TOURS.filter((t) => {
      const matchesQuery = query
        ? `${t.title} ${t.destination}`.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesPrice = t.priceUSD <= maxPrice;
      const matchesDuration =
        duration === 'any' ||
        (duration === '1-3' && t.durationDays <= 3) ||
        (duration === '4-6' && t.durationDays >= 4 && t.durationDays <= 6) ||
        (duration === '7+' && t.durationDays >= 7);
      const matchesInterests = selectedInterests.length
        ? selectedInterests.every((i) => t.interests.includes(i))
        : true;
      return matchesQuery && matchesPrice && matchesDuration && matchesInterests;
    });
  }, [query, maxPrice, duration, selectedInterests]);

  const toggleInterest = (value: string, checked: boolean) => {
    setSelectedInterests((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
  };

  const resetFilters = () => {
    setQuery('');
    setMaxPrice(1000);
    setDuration('any');
    setSelectedInterests([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-28 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">Plan Your Trip</h1>
          <p className="text-muted-foreground">Find the perfect itinerary using filters below.</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine by budget, duration, and interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <Input placeholder="Search by place or tour" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Budget (USD)</label>
                  <div className="px-1">
                    <Slider value={[maxPrice]} onValueChange={(v) => setMaxPrice(v[0])} min={200} max={2000} step={10} />
                  </div>
                  <div className="text-sm text-muted-foreground">Up to ${'{'}maxPrice{'}'}</div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select value={duration} onValueChange={(v) => setDuration(v as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1-3">1-3 days</SelectItem>
                      <SelectItem value="4-6">4-6 days</SelectItem>
                      <SelectItem value="7+">7+ days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Interests</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ALL_INTERESTS.map((i) => (
                      <label key={i} className="flex items-center gap-2 text-sm">
                        <Checkbox checked={selectedInterests.includes(i)} onCheckedChange={(c) => toggleInterest(i, Boolean(c))} />
                        <span className="capitalize">{i}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" onClick={resetFilters}>Reset</Button>
                  <Button className="bg-gradient-sunset hover:opacity-90 transition-opacity">Apply</Button>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-8 xl:col-span-9">
            {filtered.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No results</CardTitle>
                  <CardDescription>Try adjusting your filters.</CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((t) => (
                  <Card key={t.id} className="overflow-hidden">
                    <div className="h-40 w-full overflow-hidden">
                      <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle>{t.title}</CardTitle>
                      <CardDescription>
                        {t.destination} • {t.durationDays} days • ${'{'}t.priceUSD{'}'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {t.interests.map((i) => (
                          <span key={i} className="px-2 py-1 rounded-full bg-muted text-muted-foreground capitalize">
                            {i}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button className="w-full bg-gradient-sunset hover:opacity-90 transition-opacity">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlanYourTrip;


