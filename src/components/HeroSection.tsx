import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, HandHelping, TreePine, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBanner from "@/assets/hero-slide1.png";
import missionImage from "@/assets/hero-slide6.png";
import aboutHero from "@/assets/hero-slide3.png";
import donateHero from "@/assets/hero-slide4.png";

const slides = [
  {
    image: heroBanner,
    headline: "11 Crore Belpatra Trees for 11 Crore Homes",
    headlineHi: "11 करोड़ घरों के लिए 11 करोड़ बेलपत्र वृक्ष",
    text: "A national environmental and spiritual movement to plant Belpatra trees across India and restore harmony between nature and humanity.",
    textHi: "पूरे भारत में बेलपत्र वृक्ष लगाने और प्रकृति व मानवता के बीच सामंजस्य बहाल करने का एक राष्ट्रीय पर्यावरण और आध्यात्मिक आंदोलन।",
    btn1: { label: "Join the Mission", labelHi: "मिशन से जुड़ें", link: "/get-involved" },
    btn2: { label: "Plant a Tree", labelHi: "पेड़ लगाएं", link: "/donate" },
  },
  {
    image: missionImage,
    headline: "Plant Trees. Protect Nature. Serve Humanity.",
    headlineHi: "पेड़ लगाएं। प्रकृति की रक्षा करें। मानवता की सेवा करें।",
    text: "Belpatra trees purify the air, improve health, and carry deep spiritual significance in Sanatan culture.",
    textHi: "बेलपत्र वृक्ष हवा को शुद्ध करते हैं, स्वास्थ्य सुधारते हैं और सनातन संस्कृति में गहरा आध्यात्मिक महत्व रखते हैं।",
    btn1: { label: "Become a Volunteer", labelHi: "स्वयंसेवक बनें", link: "/get-involved" },
    btn2: { label: "Support the Mission", labelHi: "मिशन का समर्थन करें", link: "/donate" },
  },
  {
    image: aboutHero,
    headline: "A Green India Begins With You",
    headlineHi: "हरा-भरा भारत आपसे शुरू होता है",
    text: "Every Belpatra tree planted today becomes a source of oxygen, medicine, and spirituality for generations.",
    textHi: "आज लगाया गया हर बेलपत्र वृक्ष पीढ़ियों के लिए ऑक्सीजन, औषधि और आध्यात्मिकता का स्रोत बनता है।",
    btn1: { label: "Donate Now", labelHi: "अभी दान करें", link: "/donate" },
    btn2: { label: "Get Involved", labelHi: "शामिल हों", link: "/get-involved" },
  },
  {
    image: donateHero,
    headline: "Shivmay Bharat – Nature Meets Spirituality",
    headlineHi: "शिवमय भारत – प्रकृति और आध्यात्मिकता का मिलन",
    text: "Together we are building a greener and spiritually enriched India through the sacred Belpatra tree.",
    textHi: "हम मिलकर पवित्र बेलपत्र वृक्ष के माध्यम से एक हरा-भरा और आध्यात्मिक रूप से समृद्ध भारत बना रहे हैं।",
    btn1: { label: "Explore Mission", labelHi: "मिशन जानें", link: "/about" },
    btn2: { label: "Join Plantation Drive", labelHi: "वृक्षारोपण अभियान से जुड़ें", link: "/events" },
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-foreground/60" />

      <button onClick={prev} className="absolute left-4 z-20 p-2 rounded-full bg-background/20 hover:bg-background/40 text-primary-foreground transition-colors" aria-label="Previous slide">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-4 z-20 p-2 rounded-full bg-background/20 hover:bg-background/40 text-primary-foreground transition-colors" aria-label="Next slide">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="relative z-10 container text-center px-4">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-primary-foreground/80 font-medium tracking-widest uppercase text-sm mb-4">
          {t("Shivmay Bharat Mission", "शिवमय भारत मिशन")}
        </motion.p>
        <AnimatePresence mode="wait">
          <motion.h1 key={current} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }} className="font-serif text-4xl sm:text-5xl md:text-7xl text-primary-foreground leading-tight max-w-5xl mx-auto">
            {t(slide.headline, slide.headlineHi)}
          </motion.h1>
        </AnimatePresence>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="mt-6 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          {t(slide.text, slide.textHi)}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="gap-2 text-base" asChild>
            <Link to={slide.btn1.link}><TreePine className="w-5 h-5" /> {t(slide.btn1.label, slide.btn1.labelHi)}</Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 text-base border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground/10" asChild>
            <Link to={slide.btn2.link}><Leaf className="w-5 h-5" /> {t(slide.btn2.label, slide.btn2.labelHi)}</Link>
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 z-20 flex gap-2 left-1/2 -translate-x-1/2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-primary-foreground/40"}`} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;