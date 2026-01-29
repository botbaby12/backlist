import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';

const STORAGE_KEY = 'backlist_saved_listings';

export function useSavedListings() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSaved = async () => {
      try {
        const stored = await storage.get(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setSavedIds(new Set(parsed));
        }
      } catch (e) {
        console.error('Error loading saved listings:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadSaved();
  }, []);

  const toggleSaved = useCallback((listingId: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(listingId)) {
        next.delete(listingId);
      } else {
        next.add(listingId);
      }
      // Save asynchronously
      storage.set(STORAGE_KEY, JSON.stringify([...next])).catch(console.error);
      return next;
    });
  }, []);

  const isSaved = useCallback((listingId: string) => savedIds.has(listingId), [savedIds]);

  return { savedIds, toggleSaved, isSaved, isLoading };
}
