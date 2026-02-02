export type ListingSource = 'craigslist' | 'facebook' | 'carscom' | 'autotrader';

export type DealGrade = 'steal' | 'pass';

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
}
