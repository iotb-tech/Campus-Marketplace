import React from 'react';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface InlineAlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const variants: Record<
  AlertVariant,
  { container: string; iconColor: string; icon: string }
> = {
  success: {
    container: 'border-success/20 bg-success/5 text-neutral-800',
    iconColor: 'text-success',
    icon: 'check_circle',
  },
  error: {
    container: 'border-error/20 bg-error/5 text-neutral-800',
    iconColor: 'text-error',
    icon: 'error',
  },
  warning: {
    container: 'border-warning/20 bg-warning/5 text-neutral-800',
    iconColor: 'text-warning',
    icon: 'warning',
  },
  info: {
    container: 'border-primary-100 bg-primary-50 text-neutral-800',
    iconColor: 'text-primary-600',
    icon: 'info',
  },
};

const InlineAlert: React.FC<InlineAlertProps> = ({
  variant = 'info',
  title,
  children,
  onDismiss,
  className = '',
}) => {
  const v = variants[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm ${v.container} ${className}`}
    >
      <span className={`material-symbols-outlined mt-0.5 text-[18px] ${v.iconColor}`}>
        {v.icon}
      </span>
      <div className="grow">
        {title && <p className="font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 text-neutral-400 transition-colors hover:text-neutral-600"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      )}
    </div>
  );
};

export default InlineAlert;
