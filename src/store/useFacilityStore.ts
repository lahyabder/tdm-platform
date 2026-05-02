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
                    
                    if (!error && data && data.length > 0) {
                        const mappedFacilities = data.map(item => ({
                            ref: item.ref,
                            name: { ar: item.name_ar || '', fr: item.name_fr || '' },
                            type: item.type || 'tv',
                            city: { ar: item.city_ar || '', fr: item.city_fr || '' },
                            status: item.status || 'active',
                            expiryDate: item.expiry_date || '',
                            legislationRef: item.legislation_ref || ''
                        }));
                        set({ facilities: mappedFacilities, isLoading: false });
                    } else {
                        set({ isLoading: false });
                    }
                } catch (err) {
                    console.error('Fetch facilities error:', err);
                    set({ isLoading: false });
                }
            },

            addFacility: async (facility) => {
                await supabase.from('facilities').insert([{
                    ref: facility.ref,
                    name_ar: facility.name.ar,
                    name_fr: facility.name.fr,
                    type: facility.type,
                    city_ar: facility.city.ar,
                    city_fr: facility.city.fr,
                    status: facility.status,
                    expiry_date: facility.expiryDate,
                    legislation_ref: facility.legislationRef
                }]);
                
                set((state) => ({
                    facilities: [...state.facilities, facility]
                }));
            },

            updateFacility: async (ref, updatedFacility) => {
                const current = get().facilities.find(f => f.ref === ref);
                if (!current) return;

                const full = { ...current, ...updatedFacility };
                
                await supabase.from('facilities').update({
                    name_ar: full.name.ar,
                    name_fr: full.name.fr,
                    type: full.type,
                    city_ar: full.city.ar,
                    city_fr: full.city.fr,
                    status: full.status,
                    expiry_date: full.expiryDate,
                    legislation_ref: full.legislationRef
                }).eq('ref', ref);

                set((state) => ({
                    facilities: state.facilities.map((f) =>
                        f.ref === ref ? full : f
                    )
                }));
            },

            deleteFacility: async (ref) => {
                await supabase.from('facilities').delete().eq('ref', ref);
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
