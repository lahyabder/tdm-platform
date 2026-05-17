import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

export interface DownloadableFile {
    id: string;
    title: { ar: string; fr: string };
    type: 'pdf' | 'docx' | 'xlsx';
    size: string;
    url: string;
    category: 'forms' | 'technical' | 'guides';
}

interface DownloadState {
    files: DownloadableFile[];
    isLoading: boolean;
    fetchFiles: () => Promise<void>;
    addFile: (file: DownloadableFile) => Promise<void>;
    updateFile: (id: string, updated: Partial<DownloadableFile>) => Promise<void>;
    deleteFile: (id: string) => Promise<void>;
}

const initialFiles: DownloadableFile[] = [
    {
        id: '1',
        title: { ar: 'استمارة طلب ترخيص قناة تلفزيونية', fr: 'Formulaire de demande de licence TV' },
        type: 'pdf',
        size: '1.2 MB',
        url: '/documents/licence-tv-form.pdf',
        category: 'forms'
    },
    {
        id: '2',
        title: { ar: 'دفتر الشروط الفنية للبث الرقمي', fr: 'Cahier des charges techniques TNT' },
        type: 'pdf',
        size: '3.5 MB',
        url: '/documents/tnt-specs.pdf',
        category: 'technical'
    },
    {
        id: '3',
        title: { ar: 'دليل المستخدم لمنصة البيانات المفتوحة', fr: 'Guide utilisateur Open Data' },
        type: 'pdf',
        size: '850 KB',
        url: '/documents/user-guide.pdf',
        category: 'guides'
    }
];

export const useDownloadStore = create<DownloadState>()(
    persist(
        (set, get) => ({
            files: initialFiles,
            isLoading: false,

            fetchFiles: async () => {
                try {
                    set({ isLoading: true });
                    const { data, error } = await supabase.from('downloads').select('*');
                    if (!error && data && data.length > 0) {
                        const mapped = data.map(item => ({
                            id: item.id,
                            title: { ar: item.title_ar || '', fr: item.title_fr || '' },
                            type: item.type || 'pdf',
                            size: item.size || '',
                            url: item.url || '',
                            category: item.category || 'forms'
                        }));
                        
                        const unique = Array.from(new Map(mapped.map(f => [f.id, f])).values());
                        set({ files: unique, isLoading: false });
                    } else {
                        set({ isLoading: false });
                    }
                } catch (e) {
                    console.error('Fetch downloads error:', e);
                    set({ isLoading: false });
                }
            },

            addFile: async (file) => {
                const res = await fetch('/api/admin/downloads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(file)
                });
                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to add file');
                }
                set((state) => ({ files: [file, ...state.files] }));
            },

            updateFile: async (id, updated) => {
                const current = get().files.find(f => f.id === id);
                if (!current) return;
                const full = { ...current, ...updated };
                
                const res = await fetch('/api/admin/downloads', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(full)
                });
                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to update file');
                }
                
                set((state) => ({
                    files: state.files.map((f) => f.id === id ? full : f)
                }));
            },

            deleteFile: async (id) => {
                const res = await fetch(`/api/admin/downloads?id=${id}`, {
                    method: 'DELETE'
                });
                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to delete file');
                }
                
                set((state) => ({
                    files: state.files.filter((f) => f.id !== id)
                }));
            },
        }),
        {
            name: 'tdm-download-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
