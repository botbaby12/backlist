import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'backlist_saved_listings';

export function useSavedListings() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedIds(new Set(parsed));
      } catch (e) {
        console.error('Error parsing saved listings:', e);
      }
    }
  }, []);

  const toggleSaved = useCallback((listingId: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(listingId)) {
        next.delete(listingId);
      } else {
        next.add(listingId);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isSaved = useCallback((listingId: string) => savedIds.has(listingId), [savedIds]);

  return { savedIds, toggleSaved, isSaved };
}
