import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inventory_2',
  title,
  description,
  action,
  className = '',
}) => (
  <div
    className={`flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-white px-6 py-16 text-center ${className}`}
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-500">
      <span className="material-symbols-outlined text-[28px]">{icon}</span>
    </div>
    <h3 className="mt-4 text-xl font-semibold text-neutral-900">{title}</h3>
    {description && (
      <p className="mt-1.5 max-w-sm text-sm text-neutral-600">{description}</p>
    )}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
