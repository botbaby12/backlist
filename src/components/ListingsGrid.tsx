import { ListingCard } from './ListingCard';
import { Listing } from '@/types/listing';

interface ListingsGridProps {
  listings: Listing[];
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
}

export function ListingsGrid({ listings, savedIds, onToggleSave }: ListingsGridProps) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground text-lg">No listings found</p>
        <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          isSaved={savedIds.has(listing.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}
