import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MobileHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function MobileHeader({ searchQuery, onSearchChange }: MobileHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="md:hidden flex items-center gap-3 p-4 bg-card border-b border-border sticky top-0 z-40">
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
        </>
      )}
    </header>
  );
}
