import { DealGrade } from '@/types/listing';
import { cn } from '@/lib/utils';

interface DealBadgeProps {
  grade: DealGrade;
  className?: string;
}

export function DealBadge({ grade, className }: DealBadgeProps) {
  const isSteal = grade === 'steal';
  
  return (
    <div
      className={cn(
        'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
        isSteal 
          ? 'bg-emerald-100 text-emerald-700' 
          : 'bg-gray-100 text-gray-600',
        className
      )}
    >
      {isSteal ? '🔥 Steal' : 'Pass'}
    </div>
  );
}
