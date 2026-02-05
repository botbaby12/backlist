import { ListingSource, DealGrade } from './listing';

export type SortOption = 'newest' | 'price_low' | 'price_high' | 'mileage_low' | 'best_deal';

export interface ListingFilters {
  priceMin: number | null;
  priceMax: number | null;
  mileageMax: number | null;
  sources: ListingSource[];
  dealGrade: DealGrade | null;
  sortBy: SortOption;
}

export const DEFAULT_FILTERS: ListingFilters = {
  priceMin: null,
  priceMax: null,
  mileageMax: null,
  sources: [],
  dealGrade: null,
  sortBy: 'newest',
};
