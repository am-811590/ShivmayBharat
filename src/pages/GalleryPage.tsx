import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Play, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import heroBanner from "@/assets/gallery-hero.png";

// Image paths from public/selected plantation - Plantation section (17 images)
const plantationImages = [
  "/selected plantation/IMG_20190603_094554 - Copy_result.webp",
  "/selected plantation/IMG_20180614_082512_result.webp",
  "/selected plantation/IMG_20180614_082409_result.webp",
  "/selected plantation/IMG_20180614_082331_result.webp",
  "/selected plantation/IMG_20180214_140621_result.webp",
  "/selected plantation/IMG_20180214_132551_result.webp",
  "/selected plantation/IMG_20180120_143847_result.webp",
  "/selected plantation/20170731_110552_result.webp",
  "/selected plantation/20170731_111824_result.webp",
  "/selected plantation/1000119108_result.webp",
  "/selected plantation/1634296567213_result.webp",
  "/selected plantation/DSC_0798_result.webp",
  "/selected plantation/DSC_0895_result.webp",
  "/selected plantation/DSC_0980_result.webp",
  "/selected plantation/IMG_20171025_160404_result.webp",
  "/selected plantation/IMG_20171025_161217_result.webp",
  "/selected plantation/IMG_20171225_082054_result.webp",
];

// River Restoration section (10 images)
const riverRestorationImages = [
  "/selected plantation/IMG-20190427-WA0046_result.webp",
  "/selected plantation/IMG_20190505_083448 - Copy_result.webp",
  "/selected plantation/IMG-20190511-WA0070_result.webp",
  "/selected plantation/IMG-20190505-WA0014_result.webp",
  "/selected plantation/IMG-20190511-WA0043_result.webp",
  "/selected plantation/IMG_20220920_162117_result.webp",
  // "/selected plantation/IMG-20190511-WA0030_result.webp",
];

// Community section (29 images)
const communityImages = [
  "/selected plantation/IMG_20180618_095207_result.webp",
  "/selected plantation/IMG_20190114_142403 - Copy_result.webp",
  "/selected plantation/IMG_20190124_124854 - Copy_result.webp",
  "/selected plantation/IMG_20181202_080602 - Copy_result.webp",
  "/selected plantation/IMG_20180930_201556 - Copy_result.webp",
  "/selected plantation/IMG_20180930_173349_result.webp",
  "/selected plantation/IMG_20180930_173308_result.webp",
  "/selected plantation/IMG_20180618_095210_result.webp",
  "/selected plantation/IMG_20180722_151547_result.webp",
  "/selected plantation/IMG_20180822_141642_result.webp",
  "/selected plantation/IMG_20180920_140545_result.webp",
  "/selected plantation/IMG_20180930_173126_result.webp",
  "/selected plantation/IMG_20180815_143758_result.webp",
  "/selected plantation/IMG_20180815_144335_result.webp",
  "/selected plantation/IMG_20180819_141715_result.webp",
  "/selected plantation/IMG_20180820_132622_result.webp",
  "/selected plantation/IMG_20180820_133726_result.webp",
  "/selected plantation/IMG_20180820_134303_result.webp",
  "/selected plantation/IMG_20181118_104558 - Copy_result.webp",
  "/selected plantation/IMG_20181118_104717 - Copy_result.webp",
  "/selected plantation/IMG_20181118_110144 - Copy_result.webp",
  "/selected plantation/IMG_20181202_080722 - Copy_result.webp",
  "/selected plantation/IMG_20181202_150832_result.webp",
  "/selected plantation/IMG_20181209_150129 - Copy_result.webp",
  "/selected plantation/IMG_20181210_124624_result.webp",
  "/selected plantation/IMG_20181216_083037 - Copy_result.webp",
  "/selected plantation/IMG_20181216_102558_result.webp",
];

// All images combined with categories
const allImages = [
  // Plantations (17 images)
  { src: plantationImages[0], alt: "Plantation drive activity", altHi: "वृक्षारोपण अभियान गतिविधि", category: "Plantations" },
  { src: plantationImages[1], alt: "Sapling plantation in progress", altHi: "पौधारोपण प्रगति पर", category: "Plantations" },
  { src: plantationImages[2], alt: "Community plantation event", altHi: "सामुदायिक वृक्षारोपण कार्यक्रम", category: "Plantations" },
  { src: plantationImages[3], alt: "Tree planting initiative", altHi: "वृक्षारोपण पहल", category: "Plantations" },
  { src: plantationImages[4], alt: "Tree nursery activity", altHi: "पौधशाला गतिविधि", category: "Plantations" },
  { src: plantationImages[5], alt: "Young saplings growth", altHi: "युवा पौध की वृद्धि", category: "Plantations" },
  { src: plantationImages[6], alt: "Community tree planting", altHi: "सामुदायिक वृक्षारोपण", category: "Plantations" },
  { src: plantationImages[7], alt: "Early morning plantation", altHi: "प्रातःकालीन वृक्षारोपण", category: "Plantations" },
  { src: plantationImages[8], alt: "Mass tree planting", altHi: "मास वृक्षारोपण", category: "Plantations" },
  { src: plantationImages[9], alt: "Sapling distribution", altHi: "पौध वितरण", category: "Plantations" },
  { src: plantationImages[10], alt: "Field plantation work", altHi: "क्षेत्र वृक्षारोपण कार्य", category: "Plantations" },
  { src: plantationImages[11], alt: "Professional photography", altHi: "पेशेवर फोटोग्राफी", category: "Plantations" },
  { src: plantationImages[12], alt: "Landscape plantation", altHi: "परिदृश्य वृक्षारोपण", category: "Plantations" },
  { src: plantationImages[13], alt: "Tree planting session", altHi: "वृक्षारोपण सत्र", category: "Plantations" },
  { src: plantationImages[14], alt: "Group plantation drive", altHi: "समूह वृक्षारोपण अभियान", category: "Plantations" },
  { src: plantationImages[15], alt: "Winter plantation", altHi: "शीतकालीन वृक्षारोपण", category: "Plantations" },
  { src: plantationImages[16], alt: "Christmas tree event", altHi: "क्रिसमस वृक्ष कार्यक्रम", category: "Plantations" },

  // River Restoration (6 images)
  { src: riverRestorationImages[0], alt: "River restoration project", altHi: "नदी पुनर्स्थापन परियोजना", category: "River Restoration" },
  { src: riverRestorationImages[1], alt: "Water body rejuvenation", altHi: "जल स्रोत पुनर्जीवन", category: "River Restoration" },
  { src: riverRestorationImages[2], alt: "River cleanup activity", altHi: "नदी सफाई गतिविधि", category: "River Restoration" },
  { src: riverRestorationImages[3], alt: "River conservation work", altHi: "नदी संरक्षण कार्य", category: "River Restoration" },
  { src: riverRestorationImages[4], alt: "River restoration efforts", altHi: "नदी पुनर्स्थापन प्रयास", category: "River Restoration" },
  { src: riverRestorationImages[5], alt: "River cleaning drive", altHi: "नदी सफाई अभियान", category: "River Restoration" },
  // { src: riverRestorationImages[6], alt: "River cleaning drive", altHi: "नदी सफाई अभियान", category: "River Restoration" },

  // Community (29 images)
  { src: communityImages[0], alt: "Community gathering", altHi: "सामुदायिक समागम", category: "Community" },
  { src: communityImages[1], alt: "Local community event", altHi: "स्थानीय सामुदायिक कार्यक्रम", category: "Community" },
  { src: communityImages[2], alt: "Village community activity", altHi: "ग्राम सामुदायिक गतिविधि", category: "Community" },
  { src: communityImages[3], alt: "Community participation", altHi: "सामुदायिक भागीदारी", category: "Community" },
  { src: communityImages[4], alt: "Community meeting", altHi: "सामुदायिक बैठक", category: "Community" },
  { src: communityImages[5], alt: "Village development", altHi: "ग्राम विकास", category: "Community" },
  { src: communityImages[6], alt: "Local initiative", altHi: "स्थानीय पहल", category: "Community" },
  { src: communityImages[7], alt: "Community work", altHi: "सामुदायिक कार्य", category: "Community" },
  { src: communityImages[8], alt: "Group activity", altHi: "समूह गतिविधि", category: "Community" },
  { src: communityImages[9], alt: "Volunteer gathering", altHi: "स्वयंसेवक समागम", category: "Community" },
  { src: communityImages[10], alt: "Team collaboration", altHi: "टीम सहयोग", category: "Community" },
  { src: communityImages[11], alt: "Group discussion", altHi: "समूह चर्चा", category: "Community" },
  { src: communityImages[12], alt: "Community outreach", altHi: "सामुदायिक संपर्क", category: "Community" },
  { src: communityImages[13], alt: "Local engagement", altHi: "स्थानीय सहभागिता", category: "Community" },
  { src: communityImages[14], alt: "Summer community event", altHi: "ग्रीष्मकालीन सामुदायिक कार्यक्रम", category: "Community" },
  { src: communityImages[15], alt: "Field community work", altHi: "क्षेत्र सामुदायिक कार्य", category: "Community" },
  { src: communityImages[16], alt: "Group plantation meeting", altHi: "समूह वृक्षारोपण बैठक", category: "Community" },
  { src: communityImages[17], alt: "Community tree session", altHi: "सामुदायिक वृक्ष सत्र", category: "Community" },
  { src: communityImages[18], alt: "Local group activity", altHi: "स्थानीय समूह गतिविधि", category: "Community" },
  { src: communityImages[19], alt: "Village collaboration", altHi: "ग्राम सहयोग", category: "Community" },
  { src: communityImages[20], alt: "Community field day", altHi: "सामुदायिक क्षेत्र दिवस", category: "Community" },
  { src: communityImages[21], alt: "Group volunteer work", altHi: "समूह स्वयंसेवक कार्य", category: "Community" },
  { src: communityImages[22], alt: "Team community drive", altHi: "टीम सामुदायिक अभियान", category: "Community" },
  { src: communityImages[23], alt: "Local meeting session", altHi: "स्थानीय बैठक सत्र", category: "Community" },
  { src: communityImages[24], alt: "Village group event", altHi: "ग्राम समूह कार्यक्रम", category: "Community" },
  { src: communityImages[25], alt: "Community development day", altHi: "सामुदायिक विकास दिवस", category: "Community" },
  { src: communityImages[26], alt: "Group outreach program", altHi: "समूह संपर्क कार्यक्रम", category: "Community" },
  { src: communityImages[27], alt: "Volunteer team meeting", altHi: "स्वयंसेवक टीम बैठक", category: "Community" },
  { src: communityImages[28], alt: "Local collaboration event", altHi: "स्थानीय सहयोग कार्यक्रम", category: "Community" },
];

const videos = [
  { id: "8g1wUpB4QMQ", title: "Plantation Drive", titleHi: "वृक्षारोपण अभियान", description: "Mass tree plantation activities.", descHi: "मास वृक्षारोपण गतिविधियाँ।" },
  { id: "brv4eWh7rAE", title: "River Restoration Work", titleHi: "नदी पुनर्स्थापन कार्य", description: "Efforts to revive water bodies.", descHi: "जल स्रोतों को पुनर्जीवित करने के प्रयास।" },
  { id: "nsFDsvIod-k", title: "Community Engagement", titleHi: "सामुदायिक सहभागिता", description: "Local community participation.", descHi: "स्थानीय सामुदायिक सहभागिता।" },
  { id: "CJzH8Md-5v4", title: "Environmental Awareness", titleHi: "पर्यावरण जागरूकता", description: "Awareness campaigns and events.", descHi: "जागरूकता अभियान और कार्यक्रम।" },
  { id: "Bs8C5I4om2k", title: "Tree Plantation Event", titleHi: "वृक्षारोपण कार्यक्रम", description: "Large scale plantation event.", descHi: "बड़े पैमाने पर वृक्षारोपण कार्यक्रम।" },
  { id: "e17s-MM6JBg", title: "Conservation Efforts", titleHi: "संरक्षण प्रयास", description: "Nature conservation initiatives.", descHi: "प्रकृति संरक्षण पहल।" },
  { id: "1Ag4MVd1g3", title: "Facebook Video", titleHi: "फेसबुक वीडियो", description: "Additional video content.", descHi: "अतिरिक्त वीडियो सामग्री।", type: "facebook" },
];

const galleryCategories = [
  { en: "All", hi: "सभी" },
  { en: "Plantations", hi: "वृक्षारोपण" },
  { en: "River Restoration", hi: "नदी पुनर्स्थापन" },
  { en: "Community", hi: "समुदाय" },
];

const GalleryPage = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [visibleVideosCount, setVisibleVideosCount] = useState(6);
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (window.location.hash === '#videos') {
      const element = document.getElementById('videos');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  // For "All" filter, show 8 latest from each category
  const getFilteredImages = () => {
    if (filter === "All") {
      const categories = ["Plantations", "River Restoration", "Community"];
      let result: typeof allImages = [];
      categories.forEach((cat) => {
        const catImages = allImages.filter((img) => img.category === cat).slice(0, 8);
        result = [...result, ...catImages];
      });
      return result.slice(0, visibleCount);
    }
    return allImages.filter((img) => img.category === filter).slice(0, visibleCount);
  };

  const filteredImages = getFilteredImages();

  // Calculate total available for current filter
  const getTotalCount = () => {
    if (filter === "All") {
      return plantationImages.length + riverRestorationImages.length + communityImages.length;
    }
    if (filter === "Plantations") return plantationImages.length;
    if (filter === "River Restoration") return riverRestorationImages.length;
    if (filter === "Community") return communityImages.length;
    return 0;
  };

  const totalAvailable = getTotalCount();
  const showViewMore = visibleCount < totalAvailable;

  const handleFilterChange = (category: string) => {
    setFilter(category);
    setVisibleCount(8);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <PageHero 
          title={t("Gallery", "गैलरी")} 
          subtitle={t("Explore our impact through photos and videos from the field.", "क्षेत्र से फोटो और वीडियो के माध्यम से हमारे प्रभाव का अन्वेषण करें।")} 
          image={heroBanner} 
        />

        {/* Photo Gallery */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-center mb-8"
            >
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">
                {t("Our Impact in Pictures", "तस्वीरों में हमारा प्रभाव")}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                {t("Photo Gallery", "फोटो गैलरी")}
              </h2>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {galleryCategories.map((cat) => (
                <button 
                  key={cat.en} 
                  onClick={() => handleFilterChange(cat.en)} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === cat.en 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  {lang === "hi" ? cat.hi : cat.en}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredImages.map((img, i) => (
                <motion.div 
                  key={`${img.src}-${i}`} 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.04 }} 
                  className="overflow-hidden rounded-lg cursor-pointer group aspect-[4/3] relative" 
                  onClick={() => setSelected(i)}
                >
                  <img 
                    src={img.src} 
                    alt={lang === "hi" ? img.altHi : img.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-end">
                    <p className="text-primary-foreground text-xs p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {lang === "hi" ? img.altHi : img.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View More Button */}
            {showViewMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                >
                  {t("View More", "और देखें")} ({totalAvailable - visibleCount} {t("more", "अधिक")}) <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Video Gallery */}
        <section id="videos" className="py-16 md:py-24 bg-card">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-center mb-12"
            >
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">
                {t("Watch & Learn", "देखें और सीखें")}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                {t("Videos & Documentaries", "वीडियो और वृत्तचित्र")}
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.slice(0, visibleVideosCount).map((v, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.08 }} 
                  className="rounded-lg overflow-hidden border border-border bg-background"
                >
                  <div className="relative aspect-video bg-muted cursor-pointer group" onClick={() => setPlayingVideo(playingVideo === i ? null : i)}>
                    {playingVideo === i ? (
                      v.type === 'facebook' ? (
                        <iframe 
                          src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=${v.id}&show_text=false&width=560`} 
                          className="w-full h-full" 
                          allowFullScreen 
                          title={lang === "hi" ? v.titleHi : v.title} 
                        />
                      ) : (
                        <iframe 
                          src={`https://www.youtube.com/embed/${v.id}?autoplay=1`} 
                          className="w-full h-full" 
                          allow="autoplay; encrypted-media" 
                          allowFullScreen 
                          title={lang === "hi" ? v.titleHi : v.title} 
                        />
                      )
                    ) : (
                      <>
                        <img 
                          src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} 
                          alt={lang === "hi" ? v.titleHi : v.title} 
                          className="w-full h-full object-cover" 
                          loading="lazy" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 group-hover:bg-foreground/40 transition-colors">
                          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base text-foreground mb-1">
                      {lang === "hi" ? v.titleHi : v.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {lang === "hi" ? v.descHi : v.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {videos.length > 6 && visibleVideosCount < videos.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleVideosCount((prev) => prev + 3)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                >
                  {t("View More", "और देखें")} ({videos.length - visibleVideosCount} {t("more", "अधिक")}) <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {selected !== null && (
          <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <button 
              className="absolute top-4 right-4 text-primary-foreground" 
              onClick={() => setSelected(null)} 
              aria-label={t("Close", "बंद करें")}
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={filteredImages[selected].src} 
              alt={lang === "hi" ? filteredImages[selected].altHi : filteredImages[selected].alt} 
              className="max-w-full max-h-[85vh] rounded-lg object-contain" 
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;

