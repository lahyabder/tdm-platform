'use client';

import { useState, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGEDStore, CorrespondenceType, Priority, Correspondence } from '@/store/useGEDStore';

export default function ComposePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params) as any;
  const isAr = locale === 'ar';
  const router = useRouter();
  const { users, addCorrespondence } = useGEDStore();

  const [type, setType] = useState<CorrespondenceType>('incoming');
  const [form, setForm] = useState({
    subject: '', from: '', to: [] as string[], cc: [] as string[],
    body: '', priority: 'normal' as Priority, dueDate: '', tags: '',
    department: '', notes: '',
  });
  const [files, setFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const upd = (k: keyof typeof form, v: any) => setForm(f => ({ ...f, [k]: v }));
  const toggleUser = (id: string) => upd('to', form.to.includes(id) ? form.to.filter(u => u !== id) : [...form.to, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString().split('T')[0];
    const refPfx = { incoming: 'IN', outgoing: 'OUT', internal: 'INT' }[type];
    const newRef = `TDM-${refPfx}-2025-${String(Date.now()).slice(-3)}`;

    const c: Correspondence = {
      id: `c${Date.now()}`,
      ref: newRef,
      type,
      subject: form.subject,
      body: form.body,
      from: type === 'outgoing' || type === 'internal' ? 'TDM' : form.from,
      to: form.to.length ? form.to : [form.from],
      cc: form.cc,
      department: form.department,
      priority: form.priority,
      status: 'new',
      date: now,
      dueDate: form.dueDate || undefined,
      attachments: files.map(f => ({ name: f, size: '—', type: 'PDF' })),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdBy: 'u1',
    };
    addCorrespondence(c);
    setSubmitted(true);
    setTimeout(() => router.push(`/${locale}/admin/ged/${type === 'incoming' ? 'incoming' : type === 'outgoing' ? 'outgoing' : 'internal'}`), 1500);
  };

  const typeButtons: { val: CorrespondenceType; label: string; color: string }[] = [
    { val: 'incoming', label: isAr ? 'واردة' : 'Entrante', color: 'bg-blue-600' },
    { val: 'outgoing', label: isAr ? 'صادرة' : 'Sortante', color: 'bg-violet-600' },
    { val: 'internal', label: isAr ? 'داخلية / مذكرة' : 'Interne / Note', color: 'bg-emerald-600' },
  ];

  if (submitted) return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-slate-800">{isAr ? 'تم الإنشاء بنجاح!' : 'Créé avec succès!'}</h3>
        <p className="text-slate-500 text-sm mt-1">{isAr ? 'جارٍ التوجيه...' : 'Redirection en cours...'}</p>
      </div>
    </div>
  );

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Type Selector */}
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800 mb-3">{isAr ? 'نوع المراسلة' : 'Type de correspondance'}</h2>
          <div className="flex gap-2">
            {typeButtons.map(b => (
              <button key={b.val} onClick={() => setType(b.val)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border-2 transition-all ${type === b.val ? `${b.color} text-white border-transparent` : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Subject */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'الموضوع *' : 'Objet *'}</label>
            <input required value={form.subject} onChange={e => upd('subject', e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              placeholder={isAr ? 'موضوع المراسلة...' : 'Objet de la correspondance...'} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* From */}
            {type === 'incoming' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'المرسِل *' : 'Expéditeur *'}</label>
                <input required value={form.from} onChange={e => upd('from', e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                  placeholder={isAr ? 'اسم الجهة المرسِلة...' : 'Nom de l\'expéditeur...'} />
              </div>
            )}

            {/* Priority */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'الأولوية' : 'Priorité'}</label>
              <select value={form.priority} onChange={e => upd('priority', e.target.value as Priority)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30">
                <option value="urgent">{isAr ? 'عاجل' : 'Urgent'}</option>
                <option value="high">{isAr ? 'مرتفع' : 'Élevé'}</option>
                <option value="normal">{isAr ? 'عادي' : 'Normal'}</option>
                <option value="low">{isAr ? 'منخفض' : 'Faible'}</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'الموعد النهائي' : 'Échéance'}</label>
              <input type="date" value={form.dueDate} onChange={e => upd('dueDate', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30" />
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'الإدارة المعنية' : 'Service concerné'}</label>
              <select value={form.department} onChange={e => upd('department', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30">
                <option value="">{isAr ? 'اختر إدارة' : 'Choisir un service'}</option>
                {['الإدارة العامة', 'قسم التراخيص', 'المديرية التقنية', 'المديرية المالية', 'الشؤون القانونية', 'الأرشيف والتوثيق', 'السكرتاريا'].map(d => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Assign to team */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{isAr ? 'إسناد إلى (الفريق)' : 'Assigner à (équipe)'}</label>
            <div className="flex flex-wrap gap-2">
              {users.filter(u => u.active).map(u => (
                <button type="button" key={u.id} onClick={() => toggleUser(u.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${form.to.includes(u.id) ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-green/50'}`}>
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[9px]">{u.avatar}</span>
                  {u.name}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'نص المراسلة *' : 'Contenu *'}</label>
            <textarea required rows={6} value={form.body} onChange={e => upd('body', e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30 resize-none"
              placeholder={isAr ? 'نص المراسلة...' : 'Contenu de la correspondance...'} />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'المرفقات' : 'Pièces jointes'}</label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center text-slate-400 hover:border-brand-green/40 transition-colors cursor-pointer">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <p className="text-sm font-bold">{isAr ? 'اسحب الملفات هنا أو انقر للاختيار' : 'Glissez ou cliquez pour sélectionner'}</p>
              <p className="text-xs mt-1">PDF, DOCX, XLSX — {isAr ? 'حجم أقصى 20MB' : 'Max 20MB'}</p>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'الوسوم (مفصولة بفاصلة)' : 'Tags (séparés par virgule)'}</label>
            <input value={form.tags} onChange={e => upd('tags', e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              placeholder={isAr ? 'ترخيص، إذاعة، عاجل...' : 'licence, radio, urgent...'} />
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={() => router.back()}
              className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
              {isAr ? 'إلغاء' : 'Annuler'}
            </button>
            <button type="submit"
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
              {isAr ? 'حفظ وإرسال' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
