import { DealGrade } from '@/types/listing';
import { cn } from '@/lib/utils';

interface DealBadgeProps {
  grade: DealGrade;
  className?: string;
}

const gradeConfig: Record<DealGrade, { label: string; bg: string; text: string }> = {
  steal: { label: 'STEAL', bg: 'bg-emerald-500', text: 'text-white' },
  great: { label: 'GREAT', bg: 'bg-green-500', text: 'text-white' },
  good: { label: 'GOOD', bg: 'bg-blue-500', text: 'text-white' },
  fair: { label: 'FAIR', bg: 'bg-yellow-500', text: 'text-white' },
  pass: { label: 'PASS', bg: 'bg-gray-400', text: 'text-white' },
};

export function DealBadge({ grade, className }: DealBadgeProps) {
  const config = gradeConfig[grade] || gradeConfig.pass;
  
  return (
    <div
      className={cn(
        'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
        config.bg,
        config.text,
        className
      )}
    >
      {config.label}
    </div>
  );
}
