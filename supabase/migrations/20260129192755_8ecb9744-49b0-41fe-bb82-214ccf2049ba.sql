-- Create listings table
CREATE TABLE public.listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  estimated_value NUMERIC NOT NULL,
  mileage INTEGER NOT NULL,
  location TEXT NOT NULL,
  distance TEXT,
  posted_date TEXT,
  source TEXT NOT NULL CHECK (source IN ('craigslist', 'facebook', 'carscom', 'autotrader')),
  image_url TEXT,
  original_url TEXT NOT NULL UNIQUE,
  deal_grade TEXT NOT NULL CHECK (deal_grade IN ('steal', 'pass')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public read for now, can add auth later)
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to listings
CREATE POLICY "Anyone can view listings" 
ON public.listings 
FOR SELECT 
USING (true);

-- Create saved_listings table for user favorites
CREATE TABLE public.saved_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, listing_id)
);

-- Enable RLS
ALTER TABLE public.saved_listings ENABLE ROW LEVEL SECURITY;

-- Users can only see their own saved listings
CREATE POLICY "Users can view their own saved listings" 
ON public.saved_listings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can save listings" 
ON public.saved_listings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave their listings" 
ON public.saved_listings 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_listings_updated_at
BEFORE UPDATE ON public.listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();