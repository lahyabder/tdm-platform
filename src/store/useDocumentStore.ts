import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface DocumentMetadata {
    id: string;
    name: string;
    type: string;
    size: number;
    uploadDate: string;
    linkedEntity?: string; // Facility Ref or License ID
    fileUrl: string; // Mock URL
}

interface DocumentState {
    documents: DocumentMetadata[];
    addDocument: (doc: DocumentMetadata) => void;
    deleteDocument: (id: string) => void;
    getDocumentsByEntity: (entityId: string) => DocumentMetadata[];
}

export const useDocumentStore = create<DocumentState>()(
    persist(
        (set, get) => ({
            documents: [],
            addDocument: (doc) =>
                set((state) => ({
                    documents: [doc, ...state.documents]
                })),
            deleteDocument: (id) =>
                set((state) => ({
                    documents: state.documents.filter((d) => d.id !== id)
                })),
            getDocumentsByEntity: (entityId) => {
                return get().documents.filter((d) => d.linkedEntity === entityId);
            },
        }),
        {
            name: 'tdm-documents-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
