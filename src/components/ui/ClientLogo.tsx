'use client';

import { useState } from 'react';

export function ClientLogo({ 
    src, 
    alt, 
    initials,
    imageClassName = "w-[70%] h-[70%] object-contain relative z-10 bg-white"
}: { 
    src: string; 
    alt: string; 
    initials: string;
    imageClassName?: string;
}) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 font-bold text-sm z-0">
                {initials}
            </div>
        );
    }

    return (
        <>
            <img 
                src={src} 
                alt={alt} 
                className={imageClassName}
                onError={() => setHasError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 font-bold text-sm -z-10">
                {initials}
            </div>
        </>
    );
}
