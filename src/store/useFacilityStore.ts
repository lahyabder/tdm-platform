import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mediaFacilities as initialFacilities, MediaFacility } from '@/mock/mediaFacilities';
import { supabase } from '@/lib/supabase';

interface FacilityState {
    facilities: MediaFacility[];
    isLoading: boolean;
    fetchFacilities: () => Promise<void>;
    addFacility: (facility: MediaFacility) => Promise<void>;
    updateFacility: (ref: string, updatedFacility: Partial<MediaFacility>) => Promise<void>;
    deleteFacility: (ref: string) => Promise<void>;
    getFacilityByRef: (ref: string) => MediaFacility | undefined;
}

export const useFacilityStore = create<FacilityState>()(
    persist(
        (set, get) => ({
            facilities: initialFacilities,
            isLoading: false,

            fetchFacilities: async () => {
                try {
                    set({ isLoading: true });
                    const { data, error } = await supabase.from('facilities').select('*');
                    
                    if (!error && data) {
                        const mappedFacilities = data.map(item => ({
                            ref: item.ref,
                            name: { ar: item.name_ar || '', fr: item.name_fr || '' },
                            type: item.type || 'tv',
                            city: { ar: item.city_ar || '', fr: item.city_fr || '' },
                            status: item.status || 'active',
                            expiryDate: item.expiry_date || '',
                            legislationRef: item.legislation_ref || ''
                        }));
                        
                        // Merge logic: prefer Supabase data but keep local ones not in Supabase
                        set((state) => {
                            const supabaseRefs = new Set(mappedFacilities.map(f => f.ref));
                            const localOnly = state.facilities.filter(f => !supabaseRefs.has(f.ref));
                            return { 
                                facilities: [...mappedFacilities, ...localOnly], 
                                isLoading: false 
                            };
                        });
                    } else {
                        set({ isLoading: false });
                    }
                } catch (err) {
                    console.error('Fetch facilities error:', err);
                    set({ isLoading: false });
                }
            },

            addFacility: async (facility) => {
                const res = await fetch('/api/admin/facilities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ref: facility.ref,
                        name_ar: facility.name.ar,
                        name_fr: facility.name.fr,
                        type: facility.type,
                        city_ar: facility.city.ar,
                        city_fr: facility.city.fr,
                        status: facility.status,
                        expiry_date: facility.expiryDate,
                        legislation_ref: facility.legislationRef
                    })
                });

                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to add facility on server');
                }
                
                set((state) => ({
                    facilities: [...state.facilities, facility]
                }));
            },

            updateFacility: async (ref, updatedFacility) => {
                const current = get().facilities.find(f => f.ref === ref);
                if (!current) return;

                const full = { ...current, ...updatedFacility };
                
                const res = await fetch('/api/admin/facilities', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ref,
                        name_ar: full.name.ar,
                        name_fr: full.name.fr,
                        type: full.type,
                        city_ar: full.city.ar,
                        city_fr: full.city.fr,
                        status: full.status,
                        expiry_date: full.expiryDate,
                        legislation_ref: full.legislationRef
                    })
                });

                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to update facility on server');
                }

                set((state) => ({
                    facilities: state.facilities.map((f) =>
                        f.ref === ref ? full : f
                    )
                }));
            },

            deleteFacility: async (ref) => {
                const res = await fetch(`/api/admin/facilities?ref=${ref}`, {
                    method: 'DELETE'
                });

                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to delete facility on server');
                }

                set((state) => ({
                    facilities: state.facilities.filter((f) => f.ref !== ref)
                }));
            },

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
