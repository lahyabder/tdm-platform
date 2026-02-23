import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mediaFacilities as initialFacilities, MediaFacility } from '@/mock/mediaFacilities';

interface FacilityState {
    facilities: MediaFacility[];
    addFacility: (facility: MediaFacility) => void;
    updateFacility: (ref: string, updatedFacility: Partial<MediaFacility>) => void;
    deleteFacility: (ref: string) => void;
    getFacilityByRef: (ref: string) => MediaFacility | undefined;
}

export const useFacilityStore = create<FacilityState>()(
    persist(
        (set, get) => ({
            facilities: initialFacilities,
            addFacility: (facility) =>
                set((state) => ({
                    facilities: [...state.facilities, facility]
                })),
            updateFacility: (ref, updatedFacility) =>
                set((state) => ({
                    facilities: state.facilities.map((f) =>
                        f.ref === ref ? { ...f, ...updatedFacility } : f
                    )
                })),
            deleteFacility: (ref) =>
                set((state) => ({
                    facilities: state.facilities.filter((f) => f.ref !== ref)
                })),
            getFacilityByRef: (ref) => {
                return get().facilities.find((f) => f.ref === ref);
            },
        }),
        {
            name: 'tdm-facilities-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
