'use client';

import { useState } from 'react';

export function ClientLogo({ 
    src, 
    alt, 
    initials,
    imageClassName = "w-full h-full object-cover rounded-xl"
}: { 
    src: string; 
    alt: string; 
    initials: string;
    imageClassName?: string;
}) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-dark flex items-center justify-center text-brand-green font-black text-sm z-0">
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
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-dark flex items-center justify-center text-brand-green font-black text-sm -z-10">
                {initials}
            </div>
        </>
    );
}
