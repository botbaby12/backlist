import { cn } from '@/lib/utils';

interface ManualTransmissionIconProps {
  className?: string;
}

export function ManualTransmissionIcon({ className }: ManualTransmissionIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-4 w-4', className)}
    >
      {/* Vertical lines for each column */}
      <line x1="4" y1="5" x2="4" y2="19" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="20" y1="5" x2="20" y2="12" />

      {/* Horizontal bar connecting tops */}
      <line x1="4" y1="12" x2="20" y2="12" />

      {/* Gear position dots */}
      <circle cx="4" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="4" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="20" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="20" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
