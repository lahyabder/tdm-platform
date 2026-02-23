import React from 'react';

export const Table = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    {children}
                </table>
            </div>
        </div>
    );
};

export const TableHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-xs tracking-wider">
            <tr>{children}</tr>
        </thead>
    );
};

export const TableRow = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return (
        <tr className={`border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors ${className}`}>
            {children}
        </tr>
    );
};

export const TableHead = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return (
        <th className={`px-6 py-4 ${className}`}>
            {children}
        </th>
    );
};

export const TableCell = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return (
        <td className={`px-6 py-4 align-middle ${className}`}>
            {children}
        </td>
    );
};
