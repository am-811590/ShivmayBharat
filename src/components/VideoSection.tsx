import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Video {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descHi: string;
}

const videos: Video[] = [
  { id: "8g1wUpB4QMQ", title: "Plantation Drive", titleHi: "वृक्षारोपण अभियान", description: "Mass tree plantation activities.", descHi: "मास वृक्षारोपण गतिविधियाँ।" },
  { id: "brv4eWh7rAE", title: "River Restoration Work", titleHi: "नदी पुनर्स्थापन कार्य", description: "Efforts to revive water bodies.", descHi: "जल स्रोतों को पुनर्जीवित करने के प्रयास।" },
  { id: "nsFDsvIod-k", title: "Community Engagement", titleHi: "सामुदायिक सहभागिता", description: "Local community participation.", descHi: "स्थानीय सामुदायिक भागीदारी।" },
  { id: "CJzH8Md-5v4", title: "Environmental Awareness", titleHi: "पर्यावरण जागरूकता", description: "Awareness campaigns and events.", descHi: "जागरूकता अभियान और कार्यक्रम।" },
  { id: "Bs8C5I4om2k", title: "Tree Plantation Event", titleHi: "वृक्षारोपण कार्यक्रम", description: "Large scale plantation event.", descHi: "बड़े पैमाने का वृक्षारोपण कार्यक्रम।" },
  { id: "e17s-MM6JBg", title: "Conservation Efforts", titleHi: "संरक्षण प्रयास", description: "Nature conservation initiatives.", descHi: "प्रकृति संरक्षण पहल।" },
];

const VideoSection = () => {
  const [playing, setPlaying] = useState<number | null>(null);
  const { t, lang } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-secondary">
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
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            {t("See our impact in action through stories from the field.", "क्षेत्र की कहानियों के माध्यम से हमारे प्रभाव को क्रिया में देखें।")}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.08 }} 
              className="rounded-lg overflow-hidden border border-border bg-background"
            >
              <div className="relative aspect-video bg-muted cursor-pointer group" onClick={() => setPlaying(playing === i ? null : i)}>
                {playing === i ? (
                  <iframe 
                    src={`https://www.youtube.com/embed/${v.id}?autoplay=1`} 
                    className="w-full h-full" 
                    allow="autoplay; encrypted-media" 
                    allowFullScreen 
                    title={lang === "hi" ? v.titleHi : v.title} 
                  />
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
        
        <div className="text-center mt-8">
          <Button size="lg" asChild>
            <Link to="/gallery#videos">{t("View More", "और देखें")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
