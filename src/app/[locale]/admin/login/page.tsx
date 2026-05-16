'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const t = {
        ar: {
            title: "تسجيل الدخول",
            subtitle: "بوابة الإدارة المركزية - شركة البث الإذاعي والتلفزي الموريتاني",
            username: "اسم المستخدم",
            password: "كلمة المرور",
            login: "دخول",
            error: "بيانات الاعتماد غير صحيحة. يرجى المراجعة."
        },
        fr: {
            title: "Connexion",
            subtitle: "Portail d'Administration - Société Mauritanienne de Radiodiffusion et de Télévision",
            username: "Nom d'utilisateur",
            password: "Mot de passe",
            login: "Se connecter",
            error: "Identifiants incorrects. Veuillez vérifier."
        }
    }[locale as 'ar' | 'fr'];

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                router.push(`/${locale}/admin/pages/home`);
                router.refresh();
            } else {
                setError(t.error);
            }
        } catch (err) {
            setError(t.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red"></div>

            <div className="max-w-md w-full mx-auto p-8 bg-white shadow-xl rounded-sm border border-slate-200 z-10 relative">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-slate-900 rounded-sg mx-auto mb-4 flex items-center justify-center shadow-inner">
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-green to-brand-yellow">TDM</span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-800 mb-2">{t.title}</h1>
                    <p className="text-sm text-slate-500 font-medium">{t.subtitle}</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-brand-red/10 border-s-4 border-brand-red text-brand-red text-sm font-bold flex items-center gap-2">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">{t.username}</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-sm focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green outline-none transition-all text-slate-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">{t.password}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-sm focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green outline-none transition-all text-slate-900"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-sm transition-colors shadow-md relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-green/20 to-brand-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10">{t.login}</span>
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-slate-400 font-mono">
                    TDM System v1.0.0 &copy; 2026
                </div>
            </div>
        </div>
    );
}
