import { useQuery } from '@tanstack/react-query';
import { Listing } from '@/types/listing';
import { mockListings } from '@/data/mockListings';

const API_BASE_URL = '/api';

export function useListings(searchQuery: string = '') {
  return useQuery({
    queryKey: ['listings', searchQuery],
    queryFn: async (): Promise<Listing[]> => {
      try {
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
      } catch {
        // Fall back to mock data when API is unavailable (local dev)
        if (searchQuery) {
          return mockListings.filter(l =>
            l.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        return mockListings;
      }
    },
    refetchInterval: 30000, // Poll every 30 seconds for new listings
    staleTime: 10000, // Consider data stale after 10 seconds
  });
}
