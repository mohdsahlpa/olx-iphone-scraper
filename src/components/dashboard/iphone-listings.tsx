"use client";

import { useState, useEffect, useMemo } from 'react';
import type { iPhoneListing } from '@/lib/mock-data';
import { mockIPhoneListings, getAvailableModels } from '@/lib/mock-data';
import { IPhoneCard } from './iphone-card';
import { IPhoneFilter } from './iphone-filter';
import { Spinner } from '@/components/ui/spinner';

// Simulate API call
const fetchListings = async (): Promise<iPhoneListing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockIPhoneListings);
    }, 500); // Simulate network delay
  });
};

export function IPhoneListings() {
  const [listings, setListings] = useState<iPhoneListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  
  const availableModels = useMemo(() => getAvailableModels(), []);

  useEffect(() => {
    const loadListings = async () => {
      setIsLoading(true);
      const data = await fetchListings();
      setListings(data);
      setIsLoading(false);
    };
    loadListings();
  }, []);

  const filteredListings = useMemo(() => {
    if (!selectedModel) {
      return listings;
    }
    return listings.filter((listing) => listing.model === selectedModel);
  }, [listings, selectedModel]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Spinner className="h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <IPhoneFilter
        models={availableModels}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredListings.map((listing) => (
            <IPhoneCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No listings found for the selected model.</p>
        </div>
      )}
    </div>
  );
}
