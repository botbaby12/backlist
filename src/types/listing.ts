export type ListingSource = 'craigslist' | 'facebook' | 'carscom' | 'autotrader';

export type DealGrade = 'steal' | 'great' | 'good' | 'fair' | 'pass';

export type Transmission = 'manual' | 'automatic';

export interface Listing {
  id: string;
  title: string;
  price: number;
  estimatedValue: number;
  mileage: number;
  location: string;
  distance: string;
  postedDate: string;
  source: ListingSource;
  imageUrl: string;
  originalUrl: string;
  dealGrade: DealGrade | null;
  transmission?: Transmission;
}
