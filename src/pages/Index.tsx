import { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { ListingsGrid } from '@/components/ListingsGrid';
import { SearchBar } from '@/components/SearchBar';
import { mockListings } from '@/data/mockListings';
import { useSavedListings } from '@/hooks/useSavedListings';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { savedIds, toggleSaved } = useSavedListings();

  const filteredListings = mockListings.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      {/* Desktop header */}
      <div className="hidden md:flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Listings</h2>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Listings grid */}
      <div className="p-4 md:p-6">
        <ListingsGrid 
          listings={filteredListings} 
          savedIds={savedIds} 
          onToggleSave={toggleSaved} 
        />
      </div>
    </AppLayout>
  );
};

export default Index;
