import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
    addLicense: (license: License) => void;
    updateLicense: (id: string, updatedLicense: Partial<License>) => void;
    deleteLicense: (id: string) => void;
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
        legislationId: "LOI-045-2010"
    },
    {
        id: "LIC-RAD-045-2022",
        facilityRef: "RAD-2022-045",
        issueDate: "2022-05-15",
        expiryDate: "2028-05-15",
        validityYears: 6,
        renewalThresholdDays: 60,
        status: "active",
        legislationId: "LOI-045-2010"
    },
    {
        id: "LIC-TV-088-2021",
        facilityRef: "TV-2021-088",
        issueDate: "2021-03-01",
        expiryDate: "2026-03-01",
        validityYears: 5,
        renewalThresholdDays: 60,
        status: "pending",
        legislationId: "LOI-045-2010"
    }
];

export const useLicenseStore = create<LicenseState>()(
    persist(
        (set, get) => ({
            licenses: initialLicenses,
            addLicense: (license) =>
                set((state) => ({
                    licenses: [...state.licenses, license]
                })),
            updateLicense: (id, updatedLicense) =>
                set((state) => ({
                    licenses: state.licenses.map((l) =>
                        l.id === id ? { ...l, ...updatedLicense } : l
                    )
                })),
            deleteLicense: (id) =>
                set((state) => ({
                    licenses: state.licenses.filter((l) => l.id !== id)
                })),
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
