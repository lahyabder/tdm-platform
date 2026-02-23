import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {

        const baseClass = "inline-flex items-center justify-center font-medium rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

        const sizeClasses = {
            sm: "px-3 py-1.5 text-xs",
            md: "px-4 py-2 text-sm",
            lg: "px-6 py-3 text-base"
        };

        const variantClasses = {
            primary: "bg-brand-green text-white hover:bg-brand-green/90 focus:ring-brand-green",
            secondary: "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-800",
            outline: "bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
            danger: "bg-brand-red text-white hover:bg-brand-red/90 focus:ring-brand-red"
        };

        return (
            <button
                ref={ref}
                className={`${baseClass} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
