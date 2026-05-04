'use client';

import { use, useEffect, useState } from 'react';

export default function AdminUsersPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const isAr = locale === 'ar';

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

    const [isClient, setIsClient] = useState(false);
    const [users, setUsers] = useState([
        { id: '1', name: "Admin TDM", email: "admin@tdm.gov.mr", role: "admin", status: "active", permissions: ['all'] },
        { id: '2', name: "Project Manager", email: "pm@tdm.gov.mr", role: "editor", status: "active", permissions: ['content', 'projects'] },
        { id: '3', name: "Legal Analyst", email: "legal@tdm.gov.mr", role: "editor", status: "inactive", permissions: ['legal'] },
    ]);

    const [editingUser, setEditingUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSaveUser = (userData: any) => {
        if (editingUser?.id) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...userData, id: u.id } : u));
        } else {
            setUsers([...users, { ...userData, id: Date.now().toString() }]);
        }
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleDeleteUser = (id: string) => {
        if (confirm(isAr ? 'هل أنت متأكد من حذف هذا المستخدم؟' : 'Supprimer cet utilisateur ?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    if (!isClient) return null;

    const availablePermissions = [
        { id: 'content', label: isAr ? 'إدارة المحتوى' : 'Contenu' },
        { id: 'projects', label: isAr ? 'إدارة المشاريع' : 'Projets' },
        { id: 'facilities', label: isAr ? 'المنشآت الإعلامية' : 'Installations' },
        { id: 'live', label: isAr ? 'البث المباشر' : 'Live Streaming' },
        { id: 'legal', label: isAr ? 'القوانين والتراخيص' : 'Légal & Licences' },
        { id: 'users', label: isAr ? 'إدارة المستخدمين' : 'Utilisateurs' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">{t.title}</h1>
                    <p className="text-slate-500 font-medium">{t.subtitle}</p>
                </div>
                <button 
                    onClick={() => { setEditingUser({ name: '', email: '', role: 'editor', status: 'active', permissions: [] }); setIsModalOpen(true); }}
                    className="px-6 py-3 bg-brand-green text-white font-black rounded-sm hover:bg-brand-green/90 transition-all text-sm shadow-lg shadow-brand-green/20 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    {t.newUser}
                </button>
            </div>

            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left rtl:text-right text-slate-600">
                    <thead className="text-[10px] text-slate-400 uppercase bg-slate-50 border-b border-slate-200 tracking-widest">
                        <tr>
                            <th className="px-8 py-5 font-black">{t.table.name}</th>
                            <th className="px-8 py-5 font-black">{t.table.email}</th>
                            <th className="px-8 py-5 font-black">{t.table.role}</th>
                            <th className="px-8 py-5 font-black">{t.table.status}</th>
                            <th className="px-8 py-5 font-black text-center">{t.table.action}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black border border-slate-200">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="font-black text-slate-900">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 font-mono text-xs text-slate-500">{user.email}</td>
                                <td className="px-8 py-5">
                                    <span className="px-3 py-1.5 bg-slate-100 rounded-sm text-[10px] font-black uppercase text-slate-600 border border-slate-200">
                                        {t.roles[user.role as keyof typeof t.roles]}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full ${user.status === 'active' ? 'bg-brand-green shadow-[0_0_10px_rgba(0,169,92,0.4)]' : 'bg-slate-300'}`}></div>
                                        <span className={`text-xs font-black uppercase tracking-tighter ${user.status === 'active' ? 'text-brand-green' : 'text-slate-400'}`}>
                                            {t.statuses[user.status as keyof typeof t.statuses]}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button 
                                            onClick={() => { setEditingUser(user); setIsModalOpen(true); }}
                                            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-brand-green hover:bg-brand-green/10 rounded-full transition-all"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-brand-red hover:bg-brand-red/10 rounded-full transition-all"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-sm w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                                {editingUser?.id ? (isAr ? 'تعديل مستخدم' : 'Edit User') : (isAr ? 'إضافة مستخدم جديد' : 'New User')}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="admin-label">{t.table.name}</label>
                                    <input 
                                        className="admin-input" 
                                        value={editingUser.name} 
                                        onChange={e => setEditingUser({...editingUser, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="admin-label">{t.table.email}</label>
                                    <input 
                                        className="admin-input font-mono text-xs" 
                                        value={editingUser.email} 
                                        onChange={e => setEditingUser({...editingUser, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="admin-label">{t.table.role}</label>
                                    <select 
                                        className="admin-input" 
                                        value={editingUser.role} 
                                        onChange={e => setEditingUser({...editingUser, role: e.target.value})}
                                    >
                                        <option value="admin">{t.roles.admin}</option>
                                        <option value="editor">{t.roles.editor}</option>
                                        <option value="viewer">{t.roles.viewer}</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="admin-label">{t.table.status}</label>
                                    <select 
                                        className="admin-input" 
                                        value={editingUser.status} 
                                        onChange={e => setEditingUser({...editingUser, status: e.target.value})}
                                    >
                                        <option value="active">{t.statuses.active}</option>
                                        <option value="inactive">{t.statuses.inactive}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="admin-label text-brand-yellow">{isAr ? 'كلمة المرور' : 'Mot de passe'}</label>
                                <input 
                                    type="password"
                                    placeholder={editingUser?.id ? (isAr ? 'اتركه فارغاً للحفاظ على القديمة' : 'Laisser vide pour ne pas changer') : (isAr ? 'أدخل كلمة المرور' : 'Entrez le mot de passe')}
                                    className="admin-input bg-slate-50 border-brand-yellow/20 focus:border-brand-yellow" 
                                    value={editingUser.password || ''} 
                                    onChange={e => setEditingUser({...editingUser, password: e.target.value})}
                                />
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <label className="admin-label text-brand-green">{isAr ? 'صلاحيات الوصول' : 'Access Permissions'}</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {availablePermissions.map(perm => (
                                        <label key={perm.id} className="flex items-center gap-3 p-4 border border-slate-100 rounded-sm hover:bg-slate-50 cursor-pointer transition-colors group">
                                            <input 
                                                type="checkbox" 
                                                className="w-5 h-5 rounded border-slate-300 text-brand-green focus:ring-brand-green"
                                                checked={editingUser.permissions.includes(perm.id) || editingUser.role === 'admin'}
                                                disabled={editingUser.role === 'admin'}
                                                onChange={e => {
                                                    const perms = [...editingUser.permissions];
                                                    if (e.target.checked) perms.push(perm.id);
                                                    else {
                                                        const idx = perms.indexOf(perm.id);
                                                        if (idx > -1) perms.splice(idx, 1);
                                                    }
                                                    setEditingUser({...editingUser, permissions: perms});
                                                }}
                                            />
                                            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{perm.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-3 font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase text-xs tracking-widest"
                            >
                                {isAr ? 'إلغاء' : 'Annuler'}
                            </button>
                            <button 
                                onClick={() => handleSaveUser(editingUser)}
                                className="px-10 py-3 bg-brand-green text-white font-black rounded-sm hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20 uppercase text-xs tracking-widest"
                            >
                                {isAr ? 'حفظ البيانات' : 'Enregistrer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
