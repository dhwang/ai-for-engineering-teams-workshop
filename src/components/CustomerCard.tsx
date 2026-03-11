import { Customer } from '../data/mock-customers';
import HealthIndicator from './HealthIndicator';

export interface CustomerCardProps {
  customer: Customer;
  onClick?: (customer: Customer) => void;
}

export default function CustomerCard({ customer, onClick }: CustomerCardProps) {
  const { name, company, healthScore, domains } = customer;

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-full max-w-[400px] min-h-[120px] hover:shadow-md hover:border-gray-300 transition-shadow cursor-pointer"
      onClick={() => onClick?.(customer)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(customer) : undefined}
    >
      {/* Typography hierarchy: name > company > health score > domains */}
      <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
      <p className="text-sm text-gray-500 truncate mb-2">{company}</p>

      {/* Health score */}
      <div className="mb-3">
        <HealthIndicator score={healthScore} />
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
