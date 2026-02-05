export type ListingSource = 'craigslist' | 'facebook' | 'carscom' | 'autotrader';

export type DealGrade = 'steal' | 'great' | 'good' | 'fair' | 'pass';

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
  dealGrade: DealGrade;
  margin?: number;
  year?: number;
  transmission?: string;
  vin?: string;
  exterior?: string;
  interior?: string;
  make?: string;
  model?: string;
}
