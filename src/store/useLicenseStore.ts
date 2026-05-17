import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

export type LicenseStatus = 'active' | 'expired' | 'pending' | 'suspended';

export interface License {
    id: string; // License Number
    facilityRef: string;
    issueDate: string;
    expiryDate: string;
    validityYears: number;
    renewalThresholdDays: number; // e.g. 60
    status: LicenseStatus;
    legislationId: string;
    notes?: string;
}

interface LicenseState {
    licenses: License[];
    isLoading: boolean;
    fetchLicenses: () => Promise<void>;
    addLicense: (license: License) => Promise<void>;
    updateLicense: (id: string, updatedLicense: Partial<License>) => Promise<void>;
    deleteLicense: (id: string) => Promise<void>;
    getLicenseById: (id: string) => License | undefined;
}

const initialLicenses: License[] = [
    {
        id: "LIC-TV-001-2023",
        facilityRef: "TV-2023-001",
        issueDate: "2023-01-01",
        expiryDate: "2027-12-31",
        validityYears: 5,
        renewalThresholdDays: 60,
        status: "active",
        legislationId: "LOI-2010-045"
    },
    {
        id: "LIC-RAD-045-2022",
        facilityRef: "RAD-2022-045",
        issueDate: "2022-05-15",
        expiryDate: "2028-05-15",
        validityYears: 6,
        renewalThresholdDays: 60,
        status: "active",
        legislationId: "LOI-2010-045"
    },
    {
        id: "LIC-TV-088-2021",
        facilityRef: "TV-2021-088",
        issueDate: "2021-03-01",
        expiryDate: "2026-03-01",
        validityYears: 5,
        renewalThresholdDays: 60,
        status: "pending",
        legislationId: "LOI-2010-045"
    }
];

export const useLicenseStore = create<LicenseState>()(
    persist(
        (set, get) => ({
            licenses: initialLicenses,
            isLoading: false,

            fetchLicenses: async () => {
                try {
                    set({ isLoading: true });
                    const { data, error } = await supabase.from('licenses').select('*');
                    if (!error && data && data.length > 0) {
                        const mapped = data.map(item => ({
                            id: item.id,
                            facilityRef: item.facility_ref,
                            issueDate: item.issue_date,
                            expiryDate: item.expiry_date,
                            validityYears: item.validity_years,
                            renewalThresholdDays: item.renewal_threshold_days,
                            status: item.status,
                            legislationId: item.legislation_id,
                            notes: item.notes || ''
                        }));
                        
                        const unique = Array.from(new Map(mapped.map(l => [l.id, l])).values());
                        set({ licenses: unique, isLoading: false });
                    } else {
                        set({ isLoading: false });
                    }
                } catch (e) {
                    console.error('Fetch licenses error:', e);
                    set({ isLoading: false });
                }
            },

            addLicense: async (license) => {
                const res = await fetch('/api/admin/licenses', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(license)
                });
                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to add license');
                }
                set((state) => ({
                    licenses: [...state.licenses, license]
                }));
            },

            updateLicense: async (id, updatedLicense) => {
                const current = get().licenses.find(l => l.id === id);
                if (!current) return;
                const full = { ...current, ...updatedLicense };
                
                const res = await fetch('/api/admin/licenses', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(full)
                });
                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to update license');
                }
                
                set((state) => ({
                    licenses: state.licenses.map((l) =>
                        l.id === id ? full : l
                    )
                }));
            },

            deleteLicense: async (id) => {
                const res = await fetch(`/api/admin/licenses?id=${id}`, {
                    method: 'DELETE'
                });
                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to delete license');
                }
                
                set((state) => ({
                    licenses: state.licenses.filter((l) => l.id !== id)
                }));
            },

            getLicenseById: (id) => {
                return get().licenses.find((l) => l.id === id);
            },
        }),
        {
            name: 'tdm-licenses-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
