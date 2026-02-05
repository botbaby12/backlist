import { DealGrade } from '@/types/listing';
import { cn } from '@/lib/utils';

interface DealBadgeProps {
  grade: DealGrade;
  className?: string;
}

const gradeConfig: Record<DealGrade, { label: string; bgClass: string; textClass: string }> = {
  steal: { label: 'Steal', bgClass: 'bg-emerald-100', textClass: 'text-emerald-700' },
  great: { label: 'Great', bgClass: 'bg-blue-100', textClass: 'text-blue-700' },
  good: { label: 'Good', bgClass: 'bg-green-100', textClass: 'text-green-700' },
  fair: { label: 'Fair', bgClass: 'bg-yellow-100', textClass: 'text-yellow-700' },
  pass: { label: 'Pass', bgClass: 'bg-gray-100', textClass: 'text-gray-600' },
};

export function DealBadge({ grade, className }: DealBadgeProps) {
  const config = gradeConfig[grade];
  
  return (
    <div
      className={cn(
        'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
        config.bgClass,
        config.textClass,
        className
      )}
    >
      {config.label}
    </div>
  );
}
