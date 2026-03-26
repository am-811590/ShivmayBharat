import { motion } from "framer-motion";
import { TreePine, Target, MapPin, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ImpactStats = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: TreePine, value: "3,86,000+", label: t("Trees Planted", "पेड़ लगाए गए"), color: "text-primary" },
    { icon: Target, value: "11 Crore", label: t("Target Trees", "लक्ष्य वृक्ष"), color: "text-sky" },
    { icon: MapPin, value: "15+", label: t("Cities Covered", "शहर कवर किए"), color: "text-earth" },
    { icon: Users, value: "10,000+", label: t("Volunteers Joined", "स्वयंसेवक जुड़े"), color: "text-leaf" },
  ];

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">{t("Our Mission Impact", "हमारे मिशन का प्रभाव")}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">{t("Growing a Greener and Healthier India", "एक हरा-भरा और स्वस्थ भारत बनाना")}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{t("Through Shivmay Bharat Mission, we aim to plant 11 crore Belpatra (Bilva) trees across India. These sacred trees not only improve environmental health but also revive our ancient spiritual traditions that respect nature.", "शिवमय भारत मिशन के माध्यम से, हमारा लक्ष्य पूरे भारत में 11 करोड़ बेलपत्र (बिल्व) वृक्ष लगाना है। ये पवित्र वृक्ष न केवल पर्यावरणीय स्वास्थ्य में सुधार करते हैं बल्कि प्रकृति का सम्मान करने वाली हमारी प्राचीन आध्यात्मिक परंपराओं को भी पुनर्जीवित करते हैं।")}</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
              <s.icon className={`w-10 h-10 mx-auto mb-3 ${s.color}`} />
              <p className="font-serif text-3xl md:text-4xl text-foreground">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
