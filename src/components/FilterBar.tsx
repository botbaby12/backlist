import { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ListingFilters, DEFAULT_FILTERS, SortOption } from '@/types/filters';
import { ListingSource } from '@/types/listing';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filters: ListingFilters;
  onFiltersChange: (filters: ListingFilters) => void;
}

const SOURCE_OPTIONS: { value: ListingSource; label: string }[] = [
  { value: 'craigslist', label: 'Craigslist' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'carscom', label: 'Cars.com' },
  { value: 'autotrader', label: 'AutoTrader' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'mileage_low', label: 'Mileage: Low to High' },
  { value: 'best_deal', label: 'Best Deals' },
];

function getActiveFilterCount(filters: ListingFilters): number {
  let count = 0;
  if (filters.priceMin !== null) count++;
  if (filters.priceMax !== null) count++;
  if (filters.mileageMax !== null) count++;
  if (filters.sources.length > 0) count++;
  if (filters.dealGrade !== null) count++;
  if (filters.sortBy !== 'newest') count++;
  return count;
}

function FilterControls({
  filters,
  onFiltersChange,
}: FilterBarProps) {
  const toggleSource = (source: ListingSource) => {
    const sources = filters.sources.includes(source)
      ? filters.sources.filter((s) => s !== source)
      : [...filters.sources, source];
    onFiltersChange({ ...filters, sources });
  };

  return (
    <div className="space-y-5">
      {/* Sort */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
          Sort By
        </Label>
        <Select
          value={filters.sortBy}
          onValueChange={(v) => onFiltersChange({ ...filters, sortBy: v as SortOption })}
        >
          <SelectTrigger className="w-full h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
          Price Range
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.priceMin ?? ''}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                priceMin: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="h-9 text-sm"
          />
          <span className="text-muted-foreground text-sm">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.priceMax ?? ''}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                priceMax: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="h-9 text-sm"
          />
        </div>
      </div>

      {/* Max Mileage */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
          Max Mileage
        </Label>
        <Input
          type="number"
          placeholder="e.g. 100000"
          value={filters.mileageMax ?? ''}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              mileageMax: e.target.value ? Number(e.target.value) : null,
            })
          }
          className="h-9 text-sm"
        />
      </div>

      {/* Source */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
          Source
        </Label>
        <div className="flex flex-wrap gap-2">
          {SOURCE_OPTIONS.map((opt) => {
            const isActive = filters.sources.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggleSource(opt.value)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:bg-accent'
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Deal Grade */}
      <div>
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
          Deal Grade
        </Label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFiltersChange({ ...filters, dealGrade: null })}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              filters.dealGrade === null
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-foreground border-border hover:bg-accent'
            )}
          >
            All
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, dealGrade: 'steal' })}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              filters.dealGrade === 'steal'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-background text-foreground border-border hover:bg-accent'
            )}
          >
            Steal
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, dealGrade: 'great' })}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              filters.dealGrade === 'great'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-background text-foreground border-border hover:bg-accent'
            )}
          >
            Great
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, dealGrade: 'good' })}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              filters.dealGrade === 'good'
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-background text-foreground border-border hover:bg-accent'
            )}
          >
            Good
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, dealGrade: 'fair' })}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              filters.dealGrade === 'fair'
                ? 'bg-yellow-600 text-white border-yellow-600'
                : 'bg-background text-foreground border-border hover:bg-accent'
            )}
          >
            Fair
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, dealGrade: 'pass' })}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              filters.dealGrade === 'pass'
                ? 'bg-gray-600 text-white border-gray-600'
                : 'bg-background text-foreground border-border hover:bg-accent'
            )}
          >
            Pass
          </button>
        </div>
      </div>
    </div>
  );
}

// Mobile filter sheet (bottom drawer)
export function MobileFilterSheet({
  filters,
  onFiltersChange,
  open,
  onOpenChange,
}: FilterBarProps & { open: boolean; onOpenChange: (open: boolean) => void }) {
  const activeCount = getActiveFilterCount(filters);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center justify-between">
            <span>Filters</span>
            {activeCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFiltersChange(DEFAULT_FILTERS)}
                className="text-xs text-muted-foreground"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">Filter and sort car listings</SheetDescription>
        </SheetHeader>
        <FilterControls filters={filters} onFiltersChange={onFiltersChange} />
        <div className="mt-6 pb-[env(safe-area-inset-bottom)]">
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Show Results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Desktop inline filter bar
export function DesktopFilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const [expanded, setExpanded] = useState(false);
  const activeCount = getActiveFilterCount(filters);

  return (
    <div className="hidden md:block border-b border-border bg-card/50">
      {/* Compact bar */}
      <div className="flex items-center gap-3 px-6 py-3">
        <Button
          variant={expanded ? 'default' : 'outline'}
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="gap-1.5"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {activeCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {activeCount}
            </Badge>
          )}
        </Button>

        {/* Quick sort */}
        <Select
          value={filters.sortBy}
          onValueChange={(v) => onFiltersChange({ ...filters, sortBy: v as SortOption })}
        >
          <SelectTrigger className="w-[180px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Active filter pills */}
        {filters.sources.length > 0 && (
          <Badge variant="secondary" className="gap-1 text-xs">
            {filters.sources.length} source{filters.sources.length > 1 ? 's' : ''}
            <button onClick={() => onFiltersChange({ ...filters, sources: [] })}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        {filters.dealGrade && (
          <Badge variant="secondary" className="gap-1 text-xs capitalize">
            {filters.dealGrade}
            <button onClick={() => onFiltersChange({ ...filters, dealGrade: null })}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        {(filters.priceMin !== null || filters.priceMax !== null) && (
          <Badge variant="secondary" className="gap-1 text-xs">
            ${filters.priceMin?.toLocaleString() ?? '0'} - ${filters.priceMax?.toLocaleString() ?? 'Any'}
            <button onClick={() => onFiltersChange({ ...filters, priceMin: null, priceMax: null })}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        {filters.mileageMax !== null && (
          <Badge variant="secondary" className="gap-1 text-xs">
            {'<'} {filters.mileageMax.toLocaleString()} mi
            <button onClick={() => onFiltersChange({ ...filters, mileageMax: null })}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}

        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFiltersChange(DEFAULT_FILTERS)}
            className="text-xs text-muted-foreground ml-auto"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Expanded filter panel */}
      {expanded && (
        <div className="px-6 pb-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Price Range */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Price Range
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.priceMin ?? ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    priceMin: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="h-8 text-xs"
              />
              <span className="text-muted-foreground text-xs">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.priceMax ?? ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    priceMax: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="h-8 text-xs"
              />
            </div>
          </div>

          {/* Max Mileage */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Max Mileage
            </Label>
            <Input
              type="number"
              placeholder="e.g. 100000"
              value={filters.mileageMax ?? ''}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  mileageMax: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="h-8 text-xs"
            />
          </div>

          {/* Source */}
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Source
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {SOURCE_OPTIONS.map((opt) => {
                const isActive = filters.sources.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      const sources = isActive
                        ? filters.sources.filter((s) => s !== opt.value)
                        : [...filters.sources, opt.value];
                      onFiltersChange({ ...filters, sources });
                    }}
                    className={cn(
                      'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-border hover:bg-accent'
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deal Grade */}
          <div className="col-span-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Deal Grade
            </Label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => onFiltersChange({ ...filters, dealGrade: null })}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                  filters.dealGrade === null
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:bg-accent'
                )}
              >
                All
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, dealGrade: 'steal' })}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                  filters.dealGrade === 'steal'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-background text-foreground border-border hover:bg-accent'
                )}
              >
                Steal
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, dealGrade: 'great' })}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                  filters.dealGrade === 'great'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-background text-foreground border-border hover:bg-accent'
                )}
              >
                Great
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, dealGrade: 'good' })}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                  filters.dealGrade === 'good'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-background text-foreground border-border hover:bg-accent'
                )}
              >
                Good
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, dealGrade: 'fair' })}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                  filters.dealGrade === 'fair'
                    ? 'bg-yellow-600 text-white border-yellow-600'
                    : 'bg-background text-foreground border-border hover:bg-accent'
                )}
              >
                Fair
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, dealGrade: 'pass' })}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                  filters.dealGrade === 'pass'
                    ? 'bg-gray-600 text-white border-gray-600'
                    : 'bg-background text-foreground border-border hover:bg-accent'
                )}
              >
                Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Filter button for mobile header
export function FilterButton({
  filters,
  onClick,
}: {
  filters: ListingFilters;
  onClick: () => void;
}) {
  const activeCount = getActiveFilterCount(filters);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground relative"
      onClick={onClick}
    >
      <SlidersHorizontal className="h-5 w-5" />
      {activeCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
          {activeCount}
        </span>
      )}
    </Button>
  );
}
