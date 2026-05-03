import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const INITIAL_CONTENT = {
    home: {
        id: 'home',
        title: { ar: "نحن نصل بكم للجميع", fr: "Connecting The Nation" },
        sections: {
            hero: {
                title: { ar: "شركة البث الإذاعي والتلفزي الموريتاني (TDM)", fr: "Télédiffusion de Mauritanie (TDM)" },
                subtitle: { 
                    ar: "المحرك التقني للسيادة الإعلامية الموريتانية، نربط الوطن بالعالم عبر أحدث تكنولوجيات البث الرقمي والفضائي.",
                    fr: "Le moteur technologique de la souveraineté médiatique mauritanienne, connectant la nation au monde via les dernières technologies."
                },
                cta: {
                    services: { ar: "خدماتنا الاستراتيجية", fr: "Services Stratégiques" },
                    live: { ar: "البث المباشر", fr: "Live Streaming" }
                }
            },
            stats: {
                items: [
                    { id: 'sites', value: '120+', label: { ar: "موقع بث", fr: "Sites de diffusion" } },
                    { id: 'channels', value: '45+', label: { ar: "قناة تلفزيونية", fr: "Chaînes TV" } },
                    { id: 'radios', value: '24', label: { ar: "محطة إذاعية", fr: "Stations Radio" } },
                    { id: 'projects', value: '98%', label: { ar: "تغطية وطنية", fr: "Couverture" } }
                ]
            }
        }
    },
    about: {
        id: 'about',
        title: { ar: "ريادة المشهد الرقمي", fr: "Excellence Digitale" },
        sections: {
            director_word: {
                title: { ar: "كلمة المدير العام", fr: "Mot du Directeur" },
                author: { ar: "د. محمد ولد سيد أحمد فال ول الوداني", fr: "Dr Mohamed Ould Sid'Ahmed Fal" },
                image: "/images/dg.png",
                content: {
                    ar: "شركاؤنا وزوارنا الأعزاء،\nيسعدني أن أرحب بكم في المنصة المحدثة لشركة البث الإذاعي والتلفزي الموريتاني. إننا نعمل وفق رؤية استراتيجية تهدف إلى عصرنة الإعلام الوطني وتوطيد السيادة الرقمية لموريتانيا عبر بنية تحتية عالمية المستوى.",
                    fr: "Chers partenaires et visiteurs,\nC'est un honneur de vous accueillir sur la plateforme modernisée de la TDM. Nous travaillons selon une vision stratégique visant à moderniser les médias nationaux."
                }
            }
        }
    }
    // Add more if needed, but this covers the essentials
};

async function publishAll() {
    console.log("🚀 Starting Cloud Content Publication...");
    
    for (const [key, content] of Object.entries(INITIAL_CONTENT)) {
        console.log(`Publishing page: ${key}...`);
        const { error } = await supabase
            .from('page_content')
            .upsert({ 
                page_key: key, 
                content: content,
                updated_at: new Date().toISOString()
            });
            
        if (error) console.error(`Error publishing ${key}:`, error.message);
        else console.log(`✅ ${key} published successfully.`);
    }

    console.log("✨ All updates have been published to the cloud!");
}

publishAll();
