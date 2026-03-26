import { motion } from "framer-motion";
import { useState } from "react";
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import ImageLightbox from "@/components/ImageLightbox";

const mediaCoverage = [
  { title: "ग्रीन गाजियाबाद अभियान", titleHi: "ग्रीन गाजियाबाद अभियान", date: "Jul 2019", dateHi: "जुलाई 2019", excerpt: "Green Ghaziabad campaign with Belpatra plantation drive.", excerptHi: "बेलपत्र वृक्षारोपण अभियान के साथ ग्रीन गाजियाबाद अभियान।", image: "/press-coverage/press-1_result.webp" },
  { title: "पर्यावरण के सिपाही", titleHi: "पर्यावरण के सिपाही", date: "Jul 2019", dateHi: "जुलाई 2019", excerpt: "Environmental warriors for Green Ghaziabad.", excerptHi: "ग्रीन गाजियाबाद के लिए पर्यावरण के सिपाही।", image: "/press-coverage/press-2_result.webp" },
  { title: "बेलपत्र का पौधा भेंट", titleHi: "बेलपत्र का पौधा भेंट", date: "Aug 2022", dateHi: "अगस्त 2022", excerpt: "Belpatra saplings distributed at community event.", excerptHi: "सामुदायिक कार्यक्रम में बेलपत्र के पौधे भेंट।", image: "/press-coverage/press-3_result.webp" },
  { title: "भंडारे में बेल के पौधे", titleHi: "भंडारे में बेल के पौधे", date: "Aug 2022", dateHi: "अगस्त 2022", excerpt: "Bel saplings gifted at Bhandara with MLA.", excerptHi: "विधायक के साथ भंडारे में बेल के पौधे वितरित।", image: "/press-coverage/press-4_result.webp" },
  { title: "हनुमान चालीसा - हिन्दुस्तान", titleHi: "हनुमान चालीसा - हिन्दुस्तान", date: "Aug 2022", dateHi: "अगस्त 2022", excerpt: "Hindustan coverage of Hanuman Chalisa event.", excerptHi: "हनुमान चालीसा कार्यक्रम की हिन्दुस्तान में कवरेज।", image: "/press-coverage/press-5_result.webp" },
  { title: "बनारस में बेलपत्र रोपण", titleHi: "बनारस में बेलपत्र रोपण", date: "Oct 2022", dateHi: "अक्टूबर 2022", excerpt: "111 Belpatra saplings planted at Varanasi.", excerptHi: "वाराणसी में 111 बेलपत्र के पौधे लगाए।", image: "/press-coverage/press-6_result.webp" },
  { title: "पर्यावरण संरक्षण बैठक", titleHi: "पर्यावरण संरक्षण बैठक", date: "Feb 2023", dateHi: "फरवरी 2023", excerpt: "Prakriti Foundation meeting on conservation.", excerptHi: "संरक्षण पर प्रकृति फाउंडेशन की बैठक।", image: "/press-coverage/press-7_result.webp" },
  { title: "शिवमय दिल्ली शुभारंभ", titleHi: "शिवमय दिल्ली शुभारंभ", date: "Aug 2023", dateHi: "अगस्त 2023", excerpt: "MP Manoj Tiwari launches Shivmay Delhi.", excerptHi: "सांसद मनोज तिवारी ने शिवमय दिल्ली का शुभारंभ किया।", image: "/press-coverage/press-8_result.webp" },
];

const EventsSection = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const lightboxImages = mediaCoverage.map((r) => ({
    src: r.image,
    alt: t(r.title, r.titleHi),
  }));

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">{t("In The News", "समाचारों में")}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">{t("Press Coverage", "प्रेस कवरेज")}</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{t("Paper cuttings, news features, and media recognition of our environmental work.", "हमारे पर्यावरणीय कार्य की अखबार कटिंग, समाचार फीचर और मीडिया मान्यता।")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaCoverage.map((r, i) => (
            <motion.div
              key={t(r.title, r.titleHi)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-lg overflow-hidden group relative aspect-[3/3] cursor-pointer"
              onClick={() => setSelectedImage(i)}
            >
              <img src={r.image} alt={t(r.title, r.titleHi)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/75 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs text-primary-foreground/70">{t(r.date, r.dateHi)}</span>
                  </div>
                  <h3 className="font-serif text-sm md:text-base text-primary-foreground mb-1.5 leading-snug">{t(r.title, r.titleHi)}</h3>
                  <p className="text-primary-foreground/70 text-xs leading-relaxed">{t(r.excerpt, r.excerptHi)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link to="/resources">{t("View All Coverage", "सभी कवरेज देखें")}</Link>
          </Button>
        </div>
      </div>

      <ImageLightbox
        images={lightboxImages}
        selectedIndex={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNavigate={setSelectedImage}
      />
    </section>
  );
};

export default EventsSection;
