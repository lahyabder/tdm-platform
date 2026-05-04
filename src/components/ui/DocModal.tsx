'use client';

import { useEffect } from 'react';

interface DocModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title: string;
}

export default function DocModal({ isOpen, onClose, url, title }: DocModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md" onClick={onClose}></div>
            
            <div className="relative w-full max-w-6xl h-full bg-brand-card rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-brand-dark/50">
                    <h3 className="text-xl font-bold text-white truncate max-w-[80%]">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/5 hover:bg-brand-red/20 hover:text-brand-red transition-all text-slate-300"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* PDF Content */}
                <div className="flex-1 bg-white">
                    <iframe 
                        src={`${url}#toolbar=0&navpanes=0`} 
                        className="w-full h-full border-none"
                        title={title}
                    />
                </div>

                {/* Footer */}
                <div className="p-4 bg-brand-dark/50 flex justify-end gap-4">
                    <a 
                        href={url} 
                        download 
                        className="px-6 py-2 rounded-xl bg-brand-green text-white font-bold text-sm hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        تحميل نسخة
                    </a>
                </div>
            </div>
        </div>
    );
}
