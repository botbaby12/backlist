import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Listing } from '@/types/listing';
import { ListingFilters, DEFAULT_FILTERS } from '@/types/filters';

export function useListings(
  searchQuery: string = '',
  filters: ListingFilters = DEFAULT_FILTERS
) {
  return useQuery({
    queryKey: ['listings', searchQuery, filters],
    queryFn: async (): Promise<Listing[]> => {
      let query = supabase.from('listings').select('*');

      // Text search
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      // Price filters
      if (filters.priceMin !== null) {
        query = query.gte('price', filters.priceMin);
      }
      if (filters.priceMax !== null) {
        query = query.lte('price', filters.priceMax);
      }

      // Mileage filter
      if (filters.mileageMax !== null) {
        query = query.lte('mileage', filters.mileageMax);
      }

      // Source filter
      if (filters.sources.length > 0) {
        query = query.in('source', filters.sources);
      }

      // Deal grade filter
      if (filters.dealGrade !== null) {
        query = query.eq('deal_grade', filters.dealGrade);
      }

      // Sorting
      switch (filters.sortBy) {
        case 'price_low':
          query = query.order('price', { ascending: true });
          break;
        case 'price_high':
          query = query.order('price', { ascending: false });
          break;
        case 'mileage_low':
          query = query.order('mileage', { ascending: true });
          break;
        case 'best_deal':
          // Sort by biggest gap between estimated_value and price (best savings first)
          query = query.order('price', { ascending: true });
          break;
        case 'newest':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching listings:', error);
        throw error;
      }

      let listings: Listing[] = (data || []).map((row) => ({
        id: row.id,
        title: row.title,
        price: Number(row.price),
        estimatedValue: Number(row.estimated_value),
        mileage: row.mileage,
        location: row.location,
        distance: row.distance || '',
        postedDate: row.posted_date || '',
        source: row.source as Listing['source'],
        imageUrl: row.image_url || '',
        originalUrl: row.original_url,
        dealGrade: row.deal_grade as Listing['dealGrade'],
      }));

      // Client-side sort for best_deal (savings = estimatedValue - price)
      if (filters.sortBy === 'best_deal') {
        listings.sort(
          (a, b) =>
            (b.estimatedValue - b.price) - (a.estimatedValue - a.price)
        );
      }

      return listings;
    },
  });
}
