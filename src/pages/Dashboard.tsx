import { useState, useMemo } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { ListingsGrid } from '@/components/ListingsGrid';
import { SearchBar } from '@/components/SearchBar';
import { useListings } from '@/hooks/useListings';
import { useSavedListings } from '@/hooks/useSavedListings';
import { DealGrade, ListingSource } from '@/types/listing';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrades, setSelectedGrades] = useState<DealGrade[]>([]);
  const [selectedSources, setSelectedSources] = useState<ListingSource[]>([]);
  const { savedIds, toggleSaved } = useSavedListings();
  const { data: listings, isLoading, error } = useListings(searchQuery);

  // Filter listings based on selected grades and sources
  const filteredListings = useMemo(() => {
    if (!listings) return [];
    
    return listings.filter(listing => {
      const gradeMatch = selectedGrades.length === 0 || selectedGrades.includes(listing.dealGrade);
      const sourceMatch = selectedSources.length === 0 || selectedSources.includes(listing.source);
      return gradeMatch && sourceMatch;
    });
  }, [listings, selectedGrades, selectedSources]);

  return (
    <AppLayout 
      searchQuery={searchQuery} 
      onSearchChange={setSearchQuery}
      selectedGrades={selectedGrades}
      selectedSources={selectedSources}
      onGradeChange={setSelectedGrades}
      onSourceChange={setSelectedSources}
    >
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
          <div className="flex items-center justify-center py-16">
            <p className="text-destructive">Failed to load listings. Please try again.</p>
          </div>
        ) : filteredListings && filteredListings.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredListings.length} of {listings?.length || 0} listings
            </p>
            <ListingsGrid 
              listings={filteredListings} 
              savedIds={savedIds} 
              onToggleSave={toggleSaved} 
            />
          </>
        ) : (
          <div className="flex items-center justify-center py-16">
            <p className="text-muted-foreground">No listings found.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
