import { Heart, Sparkles, MapPin, Gauge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { SourceIcon } from './SourceIcon';
import { DealBadge } from './DealBadge';
import { Listing } from '@/types/listing';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  listing: Listing;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

// Stock car photos for when no image is available
const STOCK_PHOTOS = [
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
];

// Get a consistent stock photo based on listing id
function getStockPhoto(id: string): string {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return STOCK_PHOTOS[hash % STOCK_PHOTOS.length];
}

export function ListingCard({ listing, isSaved, onToggleSave }: ListingCardProps) {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const formatMileage = (mileage: number) =>
    new Intl.NumberFormat('en-US').format(mileage) + 'k mi';

  const hasImage = listing.imageUrl && listing.imageUrl.trim() !== '';
  const displayImage = hasImage ? listing.imageUrl : getStockPhoto(listing.id);

  const handleCardClick = () => {
    if (listing.originalUrl) {
      window.open(listing.originalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card 
      className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <AspectRatio ratio={4 / 3}>
          <img
            src={displayImage}
            alt={listing.title}
            className="object-cover w-full h-full"
            onError={(e) => {
              // Fallback to stock photo if image fails to load
              e.currentTarget.src = getStockPhoto(listing.id);
            }}
          />
        </AspectRatio>
        
        {/* Source badge */}
        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2">
          <SourceIcon source={listing.source} className="text-[8px] md:text-[10px] px-1 md:px-1.5 py-0.5" />
        </div>
        
        {/* Deal badge - Shows the deal rating (steal/great/good/fair/pass) - Bottom left */}
        <div className="absolute bottom-2 left-1.5 md:bottom-2 md:left-2">
          <DealBadge grade={listing.dealGrade} className="text-[8px] md:text-[10px] px-1.5 md:px-2 py-0.5" />
        </div>
        
        {/* Save button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md',
            'transition-all duration-200'
          )}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            onToggleSave(listing.id);
          }}
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              isSaved ? 'fill-destructive text-destructive' : 'text-muted-foreground'
            )}
          />
        </Button>
      </div>

      <CardContent className="p-3">
        <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 mb-1.5">
          {listing.title}
        </h3>
        
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
          <span className="flex items-center gap-0.5">
            <MapPin className="h-3 w-3" />
            {listing.location || listing.distance || 'Unknown'}
          </span>
          <span className="flex items-center gap-0.5">
            <Gauge className="h-3 w-3" />
            {formatMileage(Math.round(listing.mileage / 1000))}
          </span>
        </div>

        <div>
          <p className="text-base font-bold text-foreground">
            {formatPrice(listing.price)}
          </p>
          {listing.estimatedValue > 0 && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" />
              Est. {formatPrice(listing.estimatedValue)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
