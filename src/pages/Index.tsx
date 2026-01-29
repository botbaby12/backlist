import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { ListingsGrid } from '@/components/ListingsGrid';
import { SearchBar } from '@/components/SearchBar';
import { useListings } from '@/hooks/useListings';
import { useSavedListings } from '@/hooks/useSavedListings';
import { mockListings } from '@/data/mockListings';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { savedIds, toggleSaved } = useSavedListings();
  const { data: listings, isLoading, error } = useListings(searchQuery);

  // Fallback to mock data if no listings in DB yet
  const displayListings = listings && listings.length > 0 
    ? listings 
    : mockListings.filter((listing) =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <AppLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      {/* Desktop header */}
      <div className="hidden md:flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Listings</h2>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Listings grid */}
      <div className="p-4 md:p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-muted-foreground">Loading listings...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-destructive text-lg mb-2">Failed to load listings</p>
            <p className="text-muted-foreground text-sm">
              {listings && listings.length === 0 ? 'Showing sample data instead' : 'Please try again later'}
            </p>
          </div>
        ) : (
          <ListingsGrid
            listings={displayListings}
            savedIds={savedIds}
            onToggleSave={toggleSaved}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
