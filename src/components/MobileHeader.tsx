import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterButton } from './FilterBar';
import { ListingFilters } from '@/types/filters';

interface MobileHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters?: ListingFilters;
  onOpenFilters?: () => void;
}

export function MobileHeader({
  searchQuery,
  onSearchChange,
  filters,
  onOpenFilters,
}: MobileHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="md:hidden flex items-center gap-3 p-4 pt-[max(1rem,env(safe-area-inset-top))] bg-card border-b border-border sticky top-0 z-40">
      {isSearchOpen ? (
        <>
          <Input
            type="search"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsSearchOpen(false);
              onSearchChange('');
            }}
          >
            <X className="h-5 w-5" />
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex-1">
            Backlist
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          {filters && onOpenFilters && (
            <FilterButton filters={filters} onClick={onOpenFilters} />
          )}
        </>
      )}
    </header>
  );
}
