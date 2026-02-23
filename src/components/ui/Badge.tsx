import React from 'react';

type BadgeProps = {
    children: React.ReactNode;
    variant?: 'success' | 'danger' | 'warning' | 'neutral' | 'official';
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral' }) => {
    const variants = {
        success: 'bg-brand-green/10 text-brand-green border-brand-green/20',
        danger: 'bg-brand-red/10 text-brand-red border-brand-red/20',
        warning: 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30', // yellow needs slightly higher opacity border sometimes
        neutral: 'bg-slate-100 text-slate-700 border-slate-200',
        official: 'bg-slate-800 text-white border-slate-700 shadow-sm'
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold border ${variants[variant]}`}>
            {children}
        </span>
    );
};
