'use client';

import { use } from 'react';

export default function AdminUsersPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);

    const t = {
        ar: {
            title: "إدارة المستخدمين",
            subtitle: "التحكم في صلاحيات الوصول ومديري النظام.",
            newUser: "مستخدم جديد",
            table: {
                name: "الاسم",
                email: "البريد الإلكتروني",
                role: "الدور",
                status: "الحالة",
                action: "الإجراءات"
            },
            roles: { admin: "مدير نظام", editor: "محرر", viewer: "مشاهد" },
            statuses: { active: "نشط", inactive: "غير نشط" }
        },
        fr: {
            title: "Gestion des Utilisateurs",
            subtitle: "Contrôle des accès et des administrateurs système.",
            newUser: "Nouvel utilisateur",
            table: {
                name: "Nom",
                email: "Email",
                role: "Rôle",
                status: "Statut",
                action: "Actions"
            },
            roles: { admin: "Administrateur", editor: "Éditeur", viewer: "Observateur" },
            statuses: { active: "Actif", inactive: "Inactif" }
        }
    }[locale as 'ar' | 'fr'];

    const users = [
        { id: 1, name: "Admin TDM", email: "admin@tdm.gov.mr", role: "admin", status: "active" },
        { id: 2, name: "Project Manager", email: "pm@tdm.gov.mr", role: "editor", status: "active" },
        { id: 3, name: "Legal Analyst", email: "legal@tdm.gov.mr", role: "editor", status: "inactive" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">{t.title}</h1>
                    <p className="text-slate-500 font-medium">{t.subtitle}</p>
                </div>
                <button className="px-4 py-2 bg-brand-green text-white font-bold rounded-sm hover:bg-brand-green/90 transition-colors text-sm shadow-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    {t.newUser}
                </button>
            </div>

            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left rtl:text-right text-slate-600">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-black">{t.table.name}</th>
                            <th className="px-6 py-4 font-black">{t.table.email}</th>
                            <th className="px-6 py-4 font-black">{t.table.role}</th>
                            <th className="px-6 py-4 font-black">{t.table.status}</th>
                            <th className="px-6 py-4 font-black text-center">{t.table.action}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                                <td className="px-6 py-4 font-mono text-xs">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-slate-100 rounded-sm text-[10px] font-black uppercase text-slate-600 border border-slate-200">
                                        {t.roles[user.role as keyof typeof t.roles]}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-brand-green' : 'bg-slate-300'}`}></div>
                                        <span className={`text-xs font-bold ${user.status === 'active' ? 'text-brand-green' : 'text-slate-400'}`}>
                                            {t.statuses[user.status as keyof typeof t.statuses]}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-slate-400 hover:text-brand-green transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
