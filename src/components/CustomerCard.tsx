import { Customer } from '../data/mock-customers';

export interface CustomerCardProps {
  customer: Customer;
  onClick?: (customer: Customer) => void;
}

function getHealthIndicator(score: number): { color: string; label: string } {
  if (score <= 30) return { color: 'bg-red-500', label: 'Poor' };
  if (score <= 70) return { color: 'bg-yellow-500', label: 'Moderate' };
  return { color: 'bg-green-500', label: 'Good' };
}

export default function CustomerCard({ customer, onClick }: CustomerCardProps) {
  const { name, company, healthScore, domains } = customer;
  const { color, label } = getHealthIndicator(healthScore);

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-full max-w-[400px] min-h-[120px] hover:shadow-md hover:border-gray-300 transition-shadow cursor-pointer"
      onClick={() => onClick?.(customer)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(customer) : undefined}
    >
      {/* Header: name, company, health indicator */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-500 truncate">{company}</p>
        </div>
        <div className="flex flex-col items-center shrink-0">
          <div className={`w-4 h-4 rounded-full ${color}`} title={label} />
          <span className="text-sm font-medium text-gray-700 mt-1">{healthScore}</span>
          <span className="text-xs text-gray-400">{label}</span>
        </div>
      </div>

      {/* Domains */}
      {domains && domains.length > 0 && (
        <div className="border-t border-gray-100 pt-3">
          {domains.length > 1 && (
            <p className="text-xs font-medium text-gray-500 mb-1">
              {domains.length} domains
            </p>
          )}
          <ul className="space-y-0.5">
            {domains.map((domain) => (
              <li key={domain} className="text-xs text-blue-600 truncate">
                {domain}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
