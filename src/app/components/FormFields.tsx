'use client';

import React from 'react';

export interface FieldWrapperProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

const fieldClasses = (hasError: boolean) =>
  `w-full rounded-lg border bg-white px-3 py-2.5 text-base text-neutral-900 placeholder:text-neutral-400 transition focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-error focus:border-error focus:ring-error/20'
      : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20'
  }`;

function FieldWrapper({ label, htmlFor, error, hint, children }: FieldWrapperProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-1.5 block text-sm font-medium text-neutral-800"
        >
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 flex items-center gap-1 text-sm text-error">
          <span className="material-symbols-outlined text-[16px]">error</span>
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-neutral-600">{hint}</p>
      ) : null}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => (
    <FieldWrapper label={label} htmlFor={id} error={error} hint={hint}>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error || undefined}
        className={`${fieldClasses(!!error)} ${className}`}
        {...props}
      />
    </FieldWrapper>
  )
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = '', rows = 4, ...props }, ref) => (
    <FieldWrapper label={label} htmlFor={id} error={error} hint={hint}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        aria-invalid={!!error || undefined}
        className={`resize-none ${fieldClasses(!!error)} ${className}`}
        {...props}
      />
    </FieldWrapper>
  )
);
Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, id, className = '', children, ...props }, ref) => (
    <FieldWrapper label={label} htmlFor={id} error={error} hint={hint}>
      <select
        ref={ref}
        id={id}
        aria-invalid={!!error || undefined}
        className={`appearance-none ${fieldClasses(!!error)} ${className}`}
        {...props}
      >
        {children}
      </select>
    </FieldWrapper>
  )
);
Select.displayName = 'Select';
