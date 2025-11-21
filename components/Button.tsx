import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center font-medium py-3 px-6 rounded-full transition-all duration-200 text-sm md:text-base";
  
  const variants = {
    // Mudança para Green-600 para combinar com a folha da logo
    primary: "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg",
    secondary: "bg-rose-300 hover:bg-rose-400 text-white shadow-sm",
    outline: "border-2 border-green-600 text-green-700 hover:bg-green-50",
    ghost: "bg-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};