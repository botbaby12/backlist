import { useQuery } from '@tanstack/react-query';
import { Listing } from '@/types/listing';

const API_BASE_URL = '/api';

export function useListings(searchQuery: string = '') {
  return useQuery({
    queryKey: ['listings', searchQuery],
    queryFn: async (): Promise<Listing[]> => {
      const params = new URLSearchParams({
        limit: '100',
        ...(searchQuery && { search: searchQuery })
      });
      
      const response = await fetch(`${API_BASE_URL}/listings?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      
      const data = await response.json();
      return data.listings || [];
    },
    refetchInterval: 30000, // Poll every 30 seconds for new listings
    staleTime: 10000, // Consider data stale after 10 seconds
  });
}
