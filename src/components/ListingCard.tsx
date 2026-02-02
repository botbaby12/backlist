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

export function ListingCard({ listing, isSaved, onToggleSave }: ListingCardProps) {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const formatMileage = (mileage: number) =>
    new Intl.NumberFormat('en-US').format(mileage) + 'k mi';

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card">
      <div className="relative">
        <AspectRatio ratio={4 / 3}>
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        
        {/* Source badge */}
        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2">
          <SourceIcon source={listing.source} className="text-[8px] md:text-[10px] px-1 md:px-1.5 py-0.5" />
        </div>
        
        {/* Deal badge */}
        <div className="absolute bottom-10 left-1.5 md:top-2 md:right-2 md:bottom-auto md:left-auto">
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
            e.preventDefault();
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
            {listing.distance}
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
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500" />
            Est. {formatPrice(listing.estimatedValue)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
