import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2';
  
  const variants = {
    primary: 'bg-[#1a4d3a] text-white hover:bg-[#2d8659]',
    secondary: 'bg-[#2d8659] text-white hover:bg-[#1a4d3a]',
    outline: 'border-2 border-[#2d8659] text-[#2d8659] hover:bg-[#2d8659] hover:text-white',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

