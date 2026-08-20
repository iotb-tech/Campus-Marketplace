'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  type = 'button',
}) => {
  const baseStyles = 'font-medium rounded-lg transition-colors duration-200 active:opacity-80 whitespace-nowrap';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-blue-600 border border-gray-300 hover:bg-gray-300',
    outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100',
  };
  
  const sizes = {
    sm: 'py-1 px-2 sm:px-3 text-xs sm:text-sm',
    md: 'py-2 px-3 sm:px-4 text-sm sm:text-base',
    lg: 'py-3 px-4 sm:px-6 text-base sm:text-lg',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;