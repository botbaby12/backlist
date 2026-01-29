import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Listing } from '@/types/listing';

export function useListings(searchQuery: string = '') {
  return useQuery({
    queryKey: ['listings', searchQuery],
    queryFn: async (): Promise<Listing[]> => {
      let query = supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching listings:', error);
        throw error;
      }

      // Map database columns to frontend Listing type
      return (data || []).map((row) => ({
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
    },
  });
}
