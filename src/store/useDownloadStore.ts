import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
    addFile: (file: DownloadableFile) => void;
    updateFile: (id: string, updated: Partial<DownloadableFile>) => void;
    deleteFile: (id: string) => void;
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
        (set) => ({
            files: initialFiles,
            addFile: (file) => set((state) => ({ files: [file, ...state.files] })),
            updateFile: (id, updated) => set((state) => ({
                files: state.files.map((f) => f.id === id ? { ...f, ...updated } : f)
            })),
            deleteFile: (id) => set((state) => ({
                files: state.files.filter((f) => f.id !== id)
            })),
        }),
        {
            name: 'tdm-download-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
