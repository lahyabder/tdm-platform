'use client';

import { useState, use } from 'react';
import { useGEDStore, GEDUser, GEDRole, ROLE_LABELS } from '@/store/useGEDStore';

const PERM_LABELS: Record<string, { ar: string }> = {
  canCreate:      { ar: 'إنشاء مراسلات' },
  canApprove:     { ar: 'اعتماد / توقيع' },
  canArchive:     { ar: 'الأرشفة' },
  canManageUsers: { ar: 'إدارة المستخدمين' },
  canViewAll:     { ar: 'عرض جميع الملفات' },
};

const PERM_MATRIX: Record<GEDRole, (keyof GEDUser['permissions'])[]> = {
  dg:           ['canCreate', 'canApprove', 'canArchive', 'canManageUsers', 'canViewAll'],
  deputy_dg:    ['canCreate', 'canApprove', 'canArchive', 'canViewAll'],
  dept_manager: ['canCreate'],
  archive:      ['canArchive', 'canViewAll'],
  secretary:    ['canCreate'],
};

export default function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params) as any;
  const isAr = locale === 'ar';
  const { users, addUser, updateUser, deleteUser, toggleUserActive } = useGEDStore();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<GEDUser | null>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'secretary' as GEDRole, department: '' });

  const upd = (k: keyof typeof form, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name || !form.email) return;
    const perms = PERM_MATRIX[form.role];
    const permissions = {
      canCreate: perms.includes('canCreate'),
      canApprove: perms.includes('canApprove'),
      canArchive: perms.includes('canArchive'),
      canManageUsers: perms.includes('canManageUsers'),
      canViewAll: perms.includes('canViewAll'),
    };
    const initials = form.name.split(' ').map(w => w[0]).join('').slice(0, 2);
    if (editing) {
      updateUser(editing.id, { ...form, permissions });
      setEditing(null);
    } else {
      addUser({ id: `u${Date.now()}`, ...form, avatar: initials, active: true, createdAt: new Date().toISOString().split('T')[0], permissions });
      setShowAdd(false);
    }
    setForm({ name: '', email: '', role: 'secretary', department: '' });
  };

  const startEdit = (u: GEDUser) => { setEditing(u); setForm({ name: u.name, email: u.email, role: u.role, department: u.department }); setShowAdd(true); };

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800">{isAr ? 'الفريق والصلاحيات' : 'Équipe & Permissions'}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{isAr ? 'إدارة أعضاء الفريق وتحديد صلاحيات كل منهم' : 'Gérer les membres et leurs permissions'}</p>
        </div>
        <button onClick={() => { setShowAdd(!showAdd); setEditing(null); setForm({ name: '', email: '', role: 'secretary', department: '' }); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {isAr ? 'إضافة عضو' : 'Ajouter un membre'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAdd && (
        <div className="bg-white rounded-xl border-2 border-brand-green/20 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4">{editing ? (isAr ? 'تعديل العضو' : 'Modifier le membre') : (isAr ? 'إضافة عضو جديد' : 'Nouveau membre')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'الاسم الكامل *' : 'Nom complet *'}</label>
              <input value={form.name} onChange={e => upd('name', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                placeholder={isAr ? 'الاسم...' : 'Nom...'} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'البريد الإلكتروني *' : 'Email *'}</label>
              <input type="email" value={form.email} onChange={e => upd('email', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                placeholder="exemple@tdm.mr" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'المنصب' : 'Rôle'}</label>
              <select value={form.role} onChange={e => upd('role', e.target.value as GEDRole)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30">
                {(Object.keys(ROLE_LABELS) as GEDRole[]).map(r => (
                  <option key={r} value={r}>{ROLE_LABELS[r].ar}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'الإدارة' : 'Service'}</label>
              <select value={form.department} onChange={e => upd('department', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30">
                <option value="">{isAr ? 'اختر إدارة' : 'Choisir'}</option>
                {['الإدارة العامة', 'قسم التراخيص', 'المديرية التقنية', 'المديرية المالية', 'الشؤون القانونية', 'الأرشيف والتوثيق', 'السكرتاريا'].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Auto permissions preview */}
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-2">{isAr ? 'الصلاحيات التلقائية للمنصب:' : 'Permissions automatiques du rôle:'}</p>
            <div className="flex flex-wrap gap-2">
              {PERM_MATRIX[form.role].map(p => (
                <span key={p} className="px-2 py-1 bg-brand-green/10 text-brand-green text-xs font-bold rounded-full border border-brand-green/20">
                  ✓ {PERM_LABELS[p]?.ar}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => { setShowAdd(false); setEditing(null); }} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg">{isAr ? 'إلغاء' : 'Annuler'}</button>
            <button onClick={handleSave} className="px-6 py-2 bg-brand-green text-white text-sm font-bold rounded-lg hover:bg-brand-green/90">{isAr ? 'حفظ' : 'Enregistrer'}</button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {[isAr ? 'العضو' : 'Membre', isAr ? 'المنصب' : 'Rôle', isAr ? 'الإدارة' : 'Service', isAr ? 'الصلاحيات' : 'Permissions', isAr ? 'الحالة' : 'Statut', ''].map((h, i) => (
                <th key={i} className="px-4 py-3 text-start text-xs font-bold text-slate-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center text-xs font-black shrink-0">{u.avatar}</div>
                    <div>
                      <p className="font-bold text-slate-800">{u.name}</p>
                      <p className="text-[10px] text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 text-xs font-bold border rounded-full ${ROLE_LABELS[u.role].color}`}>
                    {ROLE_LABELS[u.role].ar}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">{u.department}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(Object.entries(u.permissions) as [string, boolean][])
                      .filter(([, v]) => v)
                      .map(([k]) => (
                        <span key={k} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded border border-emerald-100">
                          {PERM_LABELS[k]?.ar}
                        </span>
                      ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleUserActive(u.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border transition-colors ${u.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${u.active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                    {u.active ? (isAr ? 'نشط' : 'Actif') : (isAr ? 'معطل' : 'Inactif')}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(u)} className="text-blue-600 text-xs font-bold hover:underline">{isAr ? 'تعديل' : 'Modifier'}</button>
                    {u.id !== 'u1' && (
                      <button onClick={() => deleteUser(u.id)} className="text-red-500 text-xs font-bold hover:underline">{isAr ? 'حذف' : 'Supprimer'}</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permissions Reference */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-bold text-slate-800 mb-4">{isAr ? 'مرجع الصلاحيات حسب المنصب' : 'Référentiel des permissions par rôle'}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-2 text-start text-slate-500 font-bold">{isAr ? 'الصلاحية' : 'Permission'}</th>
                {(Object.keys(ROLE_LABELS) as GEDRole[]).map(r => (
                  <th key={r} className="pb-2 text-center px-2">
                    <span className={`px-2 py-0.5 rounded-full border font-bold ${ROLE_LABELS[r].color}`}>{ROLE_LABELS[r].ar}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {(Object.keys(PERM_LABELS) as (keyof GEDUser['permissions'])[]).map(p => (
                <tr key={p} className="hover:bg-slate-50">
                  <td className="py-2 font-bold text-slate-600">{PERM_LABELS[p].ar}</td>
                  {(Object.keys(ROLE_LABELS) as GEDRole[]).map(r => (
                    <td key={r} className="py-2 text-center">
                      {PERM_MATRIX[r].includes(p)
                        ? <span className="text-emerald-600 font-black text-base">✓</span>
                        : <span className="text-slate-200 font-black text-base">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
