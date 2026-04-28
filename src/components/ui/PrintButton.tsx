'use client';

export default function PrintButton({ label }: { label: string }) {
    return (
        <button 
            onClick={() => window.print()}
            className="px-6 py-2 border border-slate-300 bg-white text-slate-700 font-bold rounded-sm hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2 mx-auto print:hidden"
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            {label}
        </button>
    );
}
