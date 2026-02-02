import { AppLayout } from '@/components/AppLayout';
import { ListingsGrid } from '@/components/ListingsGrid';
import { mockListings } from '@/data/mockListings';
import { useSavedListings } from '@/hooks/useSavedListings';
import { Heart } from 'lucide-react';

const SavedPage = () => {
  const { savedIds, toggleSaved } = useSavedListings();

  const savedListings = mockListings.filter((listing) => savedIds.has(listing.id));

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Saved Listings</h2>
        <span className="text-muted-foreground">{savedListings.length} saved</span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {savedListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-foreground text-lg font-medium">No saved listings yet</p>
            <p className="text-muted-foreground text-sm mt-1">
              Tap the heart icon on any listing to save it here
            </p>
          </div>
        ) : (
          <ListingsGrid 
            listings={savedListings} 
            savedIds={savedIds} 
            onToggleSave={toggleSaved} 
          />
        )}
      </div>
    </AppLayout>
  );
};

export default SavedPage;
