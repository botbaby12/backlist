import { ListingSource } from '@/types/listing';
import { cn } from '@/lib/utils';

const sourceConfig: Record<ListingSource, { label: string; bgClass: string }> = {
  craigslist: { label: 'Craigslist', bgClass: 'bg-purple-600' },
  facebook: { label: 'Facebook', bgClass: 'bg-blue-600' },
  carscom: { label: 'cars.com', bgClass: 'bg-purple-500' },
  autotrader: { label: 'Autotrader', bgClass: 'bg-orange-500' },
};

interface SourceIconProps {
  source: ListingSource;
  className?: string;
}

export function SourceIcon({ source, className }: SourceIconProps) {
  const config = sourceConfig[source];
  
  return (
    <div
      className={cn(
        'px-2 py-1 rounded text-[10px] font-semibold text-white shadow-sm',
        config.bgClass,
        className
      )}
    >
      {config.label}
    </div>
  );
}
