export interface HealthIndicatorProps {
  score: number;
  size?: 'default' | 'large';
  showLabel?: boolean;
  showScore?: boolean;
}

interface HealthTier {
  color: string;
  label: string;
}

export function getHealthTier(score: number): HealthTier {
  const clamped = Math.min(100, Math.max(0, score));
  if (clamped <= 30) return { color: 'bg-red-500', label: 'Poor' };
  if (clamped <= 70) return { color: 'bg-yellow-500', label: 'Moderate' };
  return { color: 'bg-green-500', label: 'Good' };
}

export default function HealthIndicator({
  score,
  size = 'default',
  showLabel = true,
  showScore = true,
}: HealthIndicatorProps) {
  const clamped = Math.min(100, Math.max(0, score));
  const { color, label } = getHealthTier(clamped);

  const isLarge = size === 'large';

  return (
    <div className={`flex items-center ${isLarge ? 'gap-3' : 'gap-2'}`}>
      <div
        className={`rounded-full shrink-0 ${color} ${isLarge ? 'w-5 h-5' : 'w-3 h-3'}`}
        title={label}
      />
      {showScore && (
        <span
          className={
            isLarge
              ? 'text-lg font-semibold text-gray-700'
              : 'text-sm font-medium text-gray-700'
          }
        >
          {clamped}
        </span>
      )}
      {showLabel && (
        <span className={isLarge ? 'text-sm text-gray-400' : 'text-xs text-gray-400'}>
          {label}
        </span>
      )}
    </div>
  );
}
