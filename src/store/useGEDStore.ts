import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ─── Types ────────────────────────────────────────────────────────────────────

export type GEDRole =
  | 'dg'           // المدير العام
  | 'deputy_dg'    // نائب المدير العام
  | 'dept_manager' // مدير إدارة
  | 'archive'      // مسؤول الأرشيف
  | 'secretary';   // سكرتاريا

export type CorrespondenceStatus = 'new' | 'processing' | 'completed' | 'archived';
export type CorrespondenceType = 'incoming' | 'outgoing' | 'internal';
export type Priority = 'urgent' | 'high' | 'normal' | 'low';

export interface GEDUser {
  id: string;
  name: string;
  email: string;
  role: GEDRole;
  department: string;
  avatar: string; // initials
  active: boolean;
  createdAt: string;
  permissions: {
    canCreate: boolean;
    canApprove: boolean;
    canArchive: boolean;
    canManageUsers: boolean;
    canViewAll: boolean;
  };
}

export interface Correspondence {
  id: string;
  ref: string;
  type: CorrespondenceType;
  subject: string;
  body: string;
  from: string;
  to: string[];
  cc?: string[];
  department?: string;
  priority: Priority;
  status: CorrespondenceStatus;
  date: string;
  dueDate?: string;
  attachments: { name: string; size: string; type: string }[];
  tags: string[];
  assignedTo?: string;
  approvedBy?: string;
  notes?: string;
  createdBy: string;
}

export interface GEDDocument {
  id: string;
  ref: string;
  title: string;
  category: string;
  department: string;
  content?: string;
  fileUrl?: string;
  fileType: string;
  fileSize: string;
  version: string;
  status: 'draft' | 'active' | 'archived';
  confidential: boolean;
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const INITIAL_USERS: GEDUser[] = [
  {
    id: 'u1', name: 'محمد ولد أحمد', email: 'dg@tdm.mr', role: 'dg',
    department: 'الإدارة العامة', avatar: 'مأ', active: true, createdAt: '2025-01-01',
    permissions: { canCreate: true, canApprove: true, canArchive: true, canManageUsers: true, canViewAll: true }
  },
  {
    id: 'u2', name: 'أمينة بنت محمود', email: 'deputy@tdm.mr', role: 'deputy_dg',
    department: 'الإدارة العامة', avatar: 'أم', active: true, createdAt: '2025-01-01',
    permissions: { canCreate: true, canApprove: true, canArchive: true, canManageUsers: false, canViewAll: true }
  },
  {
    id: 'u3', name: 'إبراهيم ولد سيد', email: 'tech@tdm.mr', role: 'dept_manager',
    department: 'المديرية التقنية', avatar: 'إس', active: true, createdAt: '2025-01-15',
    permissions: { canCreate: true, canApprove: false, canArchive: false, canManageUsers: false, canViewAll: false }
  },
  {
    id: 'u4', name: 'فاطمة بنت الشيخ', email: 'archive@tdm.mr', role: 'archive',
    department: 'الأرشيف والتوثيق', avatar: 'فش', active: true, createdAt: '2025-02-01',
    permissions: { canCreate: false, canApprove: false, canArchive: true, canManageUsers: false, canViewAll: true }
  },
  {
    id: 'u5', name: 'خديجة بنت سالم', email: 'secretary@tdm.mr', role: 'secretary',
    department: 'السكرتاريا', avatar: 'خس', active: true, createdAt: '2025-02-15',
    permissions: { canCreate: true, canApprove: false, canArchive: false, canManageUsers: false, canViewAll: false }
  },
];

const INITIAL_CORRESPONDENCES: Correspondence[] = [
  {
    id: 'c1', ref: 'TDM-IN-2025-001', type: 'incoming',
    subject: 'طلب تجديد ترخيص قناة المستقبل الفضائية',
    body: 'السادة المحترمون، نتقدم بطلب تجديد ترخيص البث...',
    from: 'قناة المستقبل الفضائية', to: ['u1', 'u2'], cc: ['u5'],
    department: 'قسم التراخيص', priority: 'high', status: 'processing',
    date: '2025-04-20', dueDate: '2025-05-20',
    attachments: [{ name: 'طلب-الترخيص.pdf', size: '2.4 MB', type: 'PDF' }],
    tags: ['ترخيص', 'تلفزيون'], assignedTo: 'u2', createdBy: 'u5'
  },
  {
    id: 'c2', ref: 'TDM-OUT-2025-012', type: 'outgoing',
    subject: 'إشعار انتهاء مهلة تقديم تقرير الامتثال السنوي',
    body: 'نُعلمكم بانتهاء مهلة تقديم تقرير الامتثال...',
    from: 'TDM', to: ['إذاعة موريتانيا'], department: 'قسم التراخيص',
    priority: 'urgent', status: 'completed',
    date: '2025-04-22', attachments: [{ name: 'إشعار-الامتثال.pdf', size: '0.8 MB', type: 'PDF' }],
    tags: ['امتثال', 'إذاعة'], approvedBy: 'u1', createdBy: 'u2'
  },
  {
    id: 'c3', ref: 'TDM-INT-2025-007', type: 'internal',
    subject: 'مذكرة داخلية: جدول اجتماعات مجلس الإدارة Q2 2025',
    body: 'إلى جميع المديرين، يسعدنا إبلاغكم بجدول اجتماعات الربع الثاني...',
    from: 'u1', to: ['u2', 'u3'], department: 'الإدارة العامة',
    priority: 'normal', status: 'completed', date: '2025-04-18',
    attachments: [], tags: ['اجتماعات', 'مجلس الإدارة'], createdBy: 'u1'
  },
  {
    id: 'c4', ref: 'TDM-IN-2025-002', type: 'incoming',
    subject: 'استفسار شركة نواكشوط للإعلام حول شروط الترخيص الرقمي',
    body: 'يرجى الاطلاع على استفساراتنا المرفقة...',
    from: 'شركة نواكشوط للإعلام', to: ['u3'], priority: 'normal',
    status: 'new', date: '2025-04-26', dueDate: '2025-05-10',
    attachments: [{ name: 'استفسار-رقمي.pdf', size: '1.2 MB', type: 'PDF' }],
    tags: ['رقمي', 'ترخيص'], createdBy: 'u5'
  },
  {
    id: 'c5', ref: 'TDM-INT-2025-008', type: 'internal',
    subject: 'مذكرة: تحديث إجراءات أمان الشبكة',
    body: 'تُعلم المديرية التقنية بضرورة تحديث كلمات المرور...',
    from: 'u3', to: ['u1', 'u2', 'u4', 'u5'], department: 'المديرية التقنية',
    priority: 'high', status: 'processing', date: '2025-04-25',
    attachments: [], tags: ['أمان', 'تقني'], createdBy: 'u3'
  },
];

const INITIAL_DOCUMENTS: GEDDocument[] = [
  {
    id: 'd1', ref: 'TDM-DOC-2025-001', title: 'اللائحة العامة لتنظيم قطاع الإعلام',
    category: 'لوائح', department: 'الإدارة العامة', fileType: 'PDF', fileSize: '2.4 MB',
    version: '3.1', status: 'active', confidential: false, tags: ['تنظيم', 'إعلام'],
    createdBy: 'u1', createdAt: '2025-01-15', updatedAt: '2025-03-01'
  },
  {
    id: 'd2', ref: 'TDM-DOC-2025-002', title: 'دليل منح التراخيص الإعلامية',
    category: 'إجراءات', department: 'قسم التراخيص', fileType: 'PDF', fileSize: '5.1 MB',
    version: '2.0', status: 'active', confidential: false, tags: ['تراخيص'],
    createdBy: 'u2', createdAt: '2025-02-10', updatedAt: '2025-02-10'
  },
  {
    id: 'd3', ref: 'TDM-DOC-2025-003', title: 'الميزانية التقديرية 2025 — سري',
    category: 'مالية', department: 'المديرية المالية', fileType: 'XLSX', fileSize: '1.8 MB',
    version: '1.0', status: 'active', confidential: true, tags: ['مالية', 'ميزانية'],
    createdBy: 'u1', createdAt: '2024-12-30', updatedAt: '2025-01-05'
  },
];

// ─── Store ────────────────────────────────────────────────────────────────────

interface GEDState {
  users: GEDUser[];
  correspondences: Correspondence[];
  documents: GEDDocument[];
  currentUserId: string;

  // User actions
  addUser: (user: GEDUser) => void;
  updateUser: (id: string, data: Partial<GEDUser>) => void;
  deleteUser: (id: string) => void;
  toggleUserActive: (id: string) => void;

  // Correspondence actions
  addCorrespondence: (c: Correspondence) => void;
  updateCorrespondence: (id: string, data: Partial<Correspondence>) => void;
  updateStatus: (id: string, status: CorrespondenceStatus) => void;
  deleteCorrespondence: (id: string) => void;

  // Document actions
  addDocument: (doc: GEDDocument) => void;
  updateDocument: (id: string, data: Partial<GEDDocument>) => void;
  deleteDocument: (id: string) => void;
  archiveDocument: (id: string) => void;

  // Helpers
  getUserById: (id: string) => GEDUser | undefined;
  getCorrespondencesByType: (type: CorrespondenceType) => Correspondence[];
  getStats: () => {
    incoming: number; outgoing: number; internal: number; documents: number;
    pending: number; urgent: number;
  };
}

let refCounter = { c: 100, d: 10 };

export const useGEDStore = create<GEDState>()(
  persist(
    (set, get) => ({
      users: INITIAL_USERS,
      correspondences: INITIAL_CORRESPONDENCES,
      documents: INITIAL_DOCUMENTS,
      currentUserId: 'u1',

      addUser: (user) => set((s) => ({ users: [...s.users, user] })),
      updateUser: (id, data) => set((s) => ({
        users: s.users.map((u) => u.id === id ? { ...u, ...data } : u)
      })),
      deleteUser: (id) => set((s) => ({ users: s.users.filter((u) => u.id !== id) })),
      toggleUserActive: (id) => set((s) => ({
        users: s.users.map((u) => u.id === id ? { ...u, active: !u.active } : u)
      })),

      addCorrespondence: (c) => set((s) => ({ correspondences: [c, ...s.correspondences] })),
      updateCorrespondence: (id, data) => set((s) => ({
        correspondences: s.correspondences.map((c) => c.id === id ? { ...c, ...data } : c)
      })),
      updateStatus: (id, status) => set((s) => ({
        correspondences: s.correspondences.map((c) => c.id === id ? { ...c, status } : c)
      })),
      deleteCorrespondence: (id) => set((s) => ({
        correspondences: s.correspondences.filter((c) => c.id !== id)
      })),

      addDocument: (doc) => set((s) => ({ documents: [doc, ...s.documents] })),
      updateDocument: (id, data) => set((s) => ({
        documents: s.documents.map((d) => d.id === id ? { ...d, ...data } : d)
      })),
      deleteDocument: (id) => set((s) => ({ documents: s.documents.filter((d) => d.id !== id) })),
      archiveDocument: (id) => set((s) => ({
        documents: s.documents.map((d) => d.id === id ? { ...d, status: 'archived' } : d)
      })),

      getUserById: (id) => get().users.find((u) => u.id === id),
      getCorrespondencesByType: (type) => get().correspondences.filter((c) => c.type === type),
      getStats: () => {
        const { correspondences, documents } = get();
        return {
          incoming: correspondences.filter((c) => c.type === 'incoming').length,
          outgoing: correspondences.filter((c) => c.type === 'outgoing').length,
          internal: correspondences.filter((c) => c.type === 'internal').length,
          documents: documents.filter((d) => d.status === 'active').length,
          pending: correspondences.filter((c) => c.status === 'new' || c.status === 'processing').length,
          urgent: correspondences.filter((c) => c.priority === 'urgent').length,
        };
      },
    }),
    {
      name: 'tdm-ged-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ─── Role Labels ──────────────────────────────────────────────────────────────
export const ROLE_LABELS: Record<GEDRole, { ar: string; fr: string; color: string }> = {
  dg:           { ar: 'المدير العام',         fr: 'Directeur Général',       color: 'bg-purple-100 text-purple-800 border-purple-200' },
  deputy_dg:    { ar: 'نائب المدير العام',    fr: 'Directeur Général Adj.',   color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  dept_manager: { ar: 'مدير إدارة',           fr: 'Chef de service',          color: 'bg-blue-100 text-blue-800 border-blue-200' },
  archive:      { ar: 'مسؤول الأرشيف',        fr: 'Responsable Archives',     color: 'bg-amber-100 text-amber-800 border-amber-200' },
  secretary:    { ar: 'سكرتاريا',             fr: 'Secrétariat',              color: 'bg-slate-100 text-slate-700 border-slate-200' },
};

export const STATUS_LABELS: Record<CorrespondenceStatus, { ar: string; color: string }> = {
  new:        { ar: 'جديد',           color: 'bg-sky-100 text-sky-700 border-sky-200' },
  processing: { ar: 'قيد المعالجة',   color: 'bg-amber-100 text-amber-700 border-amber-200' },
  completed:  { ar: 'مكتمل',         color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  archived:   { ar: 'مؤرشف',         color: 'bg-slate-100 text-slate-600 border-slate-200' },
};

export const PRIORITY_LABELS: Record<Priority, { ar: string; color: string }> = {
  urgent: { ar: 'عاجل',    color: 'bg-red-100 text-red-700 border-red-200' },
  high:   { ar: 'مرتفع',  color: 'bg-orange-100 text-orange-700 border-orange-200' },
  normal: { ar: 'عادي',   color: 'bg-slate-100 text-slate-600 border-slate-200' },
  low:    { ar: 'منخفض',  color: 'bg-green-100 text-green-700 border-green-200' },
};
