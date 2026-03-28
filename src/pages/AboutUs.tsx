import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DonationCTA from "@/components/DonationCTA";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Leaf, Users, Shield, BookOpen } from "lucide-react";

import aboutHero from "@/assets/about-hero.png";
import missionImage from "/selected plantation/IMG_20190804_114239_result.webp";
import visionImg from "/selected plantation/WhatsApp Image 2024-04-06 at 7.16.24 AM (1)_result.jpg";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useCallback, useState } from "react";

import founderImg from "/team-members/Durga_Prasad_Pandey.jpeg";
import gauravKumarPandey from "/team-members/Gaurav_Kumar_Pandey.jpeg";
import raviShankarPandey from "/team-members/Ravi_Shankar_Pandey.jpeg";
import ranjeetKushwaha from "/team-members/Ranjeet_Kushwaha.jpeg";
import gitaDevi from "/team-members/Gita_Devi.jpeg";
import manishPandey from "/team-members/Manish_Pandey.jpeg";
import jatinNagar from "/team-members/Jatin_Nagar.jpeg";

// ============================================
// CONFIGURATION OBJECT - EASY TO MODIFY
// ============================================

const CONFIG = {
  // Auto-slider settings
  slider: {
    images: [
      "/selected plantation/IMG-20190421-WA0018_result.webp",
      "/selected plantation/IMG_20220724_103409_result.webp",
      "/selected plantation/IMG-20190427-WA0046_result.webp",
      "/selected plantation/IMG_20180930_201556 - Copy_result.webp",
    ],
    interval: 3000,
    transitionDuration: 1000,
  },
  
  // Core values
  values: [
    { 
      icon: Leaf, 
      title: "Environmental Responsibility", 
      titleHi: "पर्यावरणीय जिम्मेदारी", 
      desc: "Protecting nature and promoting sustainable living.", 
      descHi: "प्रकृति की रक्षा करना और सतत जीवन को बढ़ावा देना。" 
    },
    { 
      icon: Users, 
      title: "Community Participation", 
      titleHi: "सामुदायिक भागीदारी", 
      desc: "Encouraging people to work together for environmental change.", 
      descHi: "पर्यावरण परिवर्तन के लिए लोगों को मिलकर काम करने के लिए प्रोत्साहित करना。" 
    },
    { 
      icon: Heart, 
      title: "Spiritual Harmony", 
      titleHi: "आध्यात्मिक सामंजस्य", 
      desc: "Connecting environmental conservation with ancient traditions.", 
      descHi: "पर्यावरण संरक्षण को प्राचीन परंपराओं से जोड़ना。" 
    },
    { 
      icon: Shield, 
      title: "Transparency", 
      titleHi: "पारदर्शिता", 
      desc: "Ensuring trust and accountability in all mission activities.", 
      descHi: "सभी मिशन गतिविधियों में विश्वास और जवाबदेही सुनिश्चित करना。" 
    },
  ],
  
  // Timeline events
  timeline: [
    { year: "2020", text: "Prakriti Foundation launched Shivmay Bharat Mission with a vision to plant 11 crore Belpatra trees.", textHi: "प्रकृति फाउंडेशन ने 11 करोड़ बेलपत्र वृक्ष लगाने की दृष्टि से शिवमय भारत मिशन शुरू किया。" },
    { year: "2021", text: "First major plantation drives conducted across 5 cities with community participation.", textHi: "सामुदायिक भागीदारी के साथ 5 शहरों में पहले बड़े वृक्षारोपण अभियान चलाए गए。" },
    { year: "2022", text: "Expanded to 10+ cities and engaged 3,000+ volunteers in plantation activities.", textHi: "10+ शहरों में विस्तार किया और वृक्षारोपण गतिविधियों में 3,000+ स्वयंसेवकों को जोड़ा。" },
    { year: "2023", text: "Crossed 1,00,000 Belpatra trees planted. Partnered with temples and spiritual organizations.", textHi: "1,00,000 बेलपत्र वृक्ष लगाने का आंकड़ा पार किया। मंदिरों और आध्यात्मिक संगठनों के साथ साझेदारी。" },
    { year: "2024", text: "Reached 3,86,000+ trees across 15+ cities with 10,000+ active volunteers.", textHi: "15+ शहरों में 10,000+ सक्रिय स्वयंसेवकों के साथ 3,86,000+ वृक्षों तक पहुंचे。" },
    { year: "2025", text: "Continuing towards 11 crore target with nationwide plantation drives and awareness campaigns.", textHi: "राष्ट्रव्यापी वृक्षारोपण अभियानों और जागरूकता कार्यक्रमों के साथ 11 करोड़ के लक्ष्य की ओर बढ़ रहे हैं。" },
  ],
  
  // Team members
  teamMembers: [
    {
      name: "Shri Durga Prasad Pandey",
      nameHi: "श्री दुर्गा प्रसाद पांडे",
      role: "Rastreey Adhyaksh, Shivmay Bharat Mission",
      roleHi: "राष्ट्रीय अध्यक्ष, शिवमय भारत मिशन",
      image: founderImg,
      isFounder: true,
    },
    {
      name: "Ravi Shankar Pandey",
      nameHi: "रवि शंकर पांडे",
      role: "Executive Director",
      roleHi: "कार्यकारी निदेशक",
      image: raviShankarPandey,
    },
    {
      name: "Ranjeet Kushwaha",
      nameHi: "रंजीत कुशवाहा",
      role: "Rashtriya Upadhyaksh, Prakriti Sena",
      roleHi: "राष्ट्रीय उपाध्यक्ष, प्रकृति सेना",
      image: ranjeetKushwaha,
    },
    {
      name: "Gaurav Kumar Pandey",
      nameHi: "गौरव कुमार पांडे",
      role: "Pracharak",
      roleHi: "प्रचारक",
      image: gauravKumarPandey,
    },
    {
      name: "Gita Devi",
      nameHi: "गीता देवी",
      role: "Rashtriya Mahasachiv, Shivmay Bharat Mission",
      roleHi: "राष्ट्रीय महासचिव, शिवमय भारत मिशन",
      image: gitaDevi,
    },
    {
      name: "Manish Pandey",
      nameHi: "मनीष पांडे",
      role: "Pradesh Adhyaksh (U.P.), Prakriti Sena",
      roleHi: "प्रदेश अध्यक्ष (उ.प्र.), प्रकृति सेना",
      image: manishPandey,
    },
    {
      name: "Jatin Nagar",
      nameHi: "जतिन नागर",
      role: "Vidhi Salahakar",
      roleHi: "विधि सलाहकार",
      image: jatinNagar,
    },
  ],
  
  // Spiritual significance
  spiritual: {
    shloka: {
      sanskrit: "त्रिदलं त्रिगुणाकारं त्रिनेत्रं च त्रियायुधम्।\nत्रिजन्मपापसंहारं एकबिल्वं शिवार्पणम्॥",
      meaning: "The three-leaved Belpatra symbolizes the three Gunas, representing the three eyes and divine form of Lord Shiva. Even a single Bilva leaf offered with devotion is believed to destroy the sins of three lifetimes.",
      meaningHi: "तीन दलों वाला बेलपत्र त्रिगुणों का प्रतीक है, जो भगवान शिव के तीन नेत्रों और उनके दिव्य स्वरूप का प्रतिनिधित्व करता है। श्रद्धा से अर्पित किया गया एक बिल्वपत्र भी तीन जन्मों के पापों का नाश करने वाला माना गया है।",
    },
    deities: [
      { en: "Brahma", hi: "ब्रह्मा" },
      { en: "Vishnu", hi: "विष्णु" },
      { en: "Mahesh", hi: "महेश" },
    ],
  },
  
  // Prakriti Foundation highlights
  foundationHighlights: [
    { en: "Environmental conservation", hi: "पर्यावरण संरक्षण" },
    { en: "Tree plantation drives", hi: "वृक्षारोपण अभियान" },
    { en: "Water conservation", hi: "जल संरक्षण" },
    { en: "Promoting sustainable living", hi: "सतत जीवन को बढ़ावा देना" },
    { en: "Community awareness programs", hi: "सामुदायिक जागरूकता कार्यक्रम" },
  ],
};

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Auto‑slider component
const AutoImageSlider = ({ images, interval = 3000, transitionDuration = 1000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`Slide ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-${transitionDuration} ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      ))}
    </div>
  );
};

// Responsive Team Carousel - Shows as carousel on mobile, single row on desktop
const ResponsiveTeamCarousel = ({ teamMembers }) => {
  const { t } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update current index when carousel scrolls
  useEffect(() => {
    if (!api) return;

    const updateIndex = () => {
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
    };

    api.on("select", updateIndex);
    updateIndex();

    return () => {
      api.off("select", updateIndex);
    };
  }, [api]);

  // Navigation handlers
  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  // If not mobile, show as single row without scrollbar
  if (!isMobile) {
    const memberCount = teamMembers.length;
    const imageSize = memberCount <= 5 ? "w-28 h-28" : "w-24 h-24";
    const gapSize = memberCount <= 5 ? "gap-6" : "gap-4";
    
    return (
      <div className={`w-full flex justify-center ${gapSize} flex-wrap`}>
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="text-center"
          >
            <div className={`${imageSize} rounded-full mx-auto mb-3 overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors duration-300`}>
              <img
                src={member.image}
                alt={t(member.name, member.nameHi)}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <p className="font-semibold text-foreground text-sm">
              {t(member.name, member.nameHi)}
            </p>
            <p className="text-muted-foreground text-xs max-w-[120px] mx-auto">
              {t(member.role, member.roleHi)}
            </p>
          </motion.div>
        ))}
      </div>
    );
  }

  // On mobile, show as carousel
  return (
    <div className="w-full max-w-md mx-auto">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent>
          {teamMembers.map((member, index) => (
            <CarouselItem key={index} className="basis-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center py-4 px-2"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-3 border-primary mb-4 shadow-lg">
                  <img 
                    src={member.image} 
                    alt={t(member.name, member.nameHi)} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                </div>
                <p className="font-semibold text-foreground text-lg mb-2 text-center">
                  {t(member.name, member.nameHi)}
                </p>
                <p className="text-muted-foreground text-sm text-center">
                  {t(member.role, member.roleHi)}
                </p>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows for Mobile */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button 
          onClick={scrollPrev}
          className="w-12 h-12 flex items-center justify-center text-primary hover:text-primary-dark transition-all duration-300 hover:scale-110"
          aria-label={t("Previous", "पिछला")}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        {/* Dots Indicator */}
        <div className="flex gap-2">
          {teamMembers.map((_, dotIndex) => (
            <button 
              key={dotIndex}
              onClick={() => api?.scrollTo(dotIndex)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out ${
                dotIndex === currentIndex 
                  ? "bg-primary w-6 scale-125" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`} 
              aria-label={`${t("Go to", "जाएँ")} ${dotIndex + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={scrollNext}
          className="w-12 h-12 flex items-center justify-center text-primary hover:text-primary-dark transition-all duration-300 hover:scale-110"
          aria-label={t("Next", "अगला")}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// Section wrapper for consistent styling - id is now optional with ?
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  id?: string;
  fullWidth?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = "", bg = "bg-card", id, fullWidth = false }) => {
  const baseClass = `py-16 md:py-24 ${bg}`;
  return (
    <section id={id} className={`${baseClass} ${className}`}>
      <div className={fullWidth ? "container max-w-full px-4 md:px-8" : "container max-w-6xl mx-auto px-4"}>
        {children}
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <PageHero
          title={t("About Shivmay Bharat Mission", "शिवमय भारत मिशन के बारे में")}
          subtitle={t(
            "A nationwide initiative by Prakriti Foundation to plant 11 crore Belpatra trees and build a greener, spiritually enriched India.",
            "प्रकृति फाउंडेशन द्वारा 11 करोड़ बेलपत्र वृक्ष लगाने और एक हरा-भरा, आध्यात्मिक रूप से समृद्ध भारत बनाने की राष्ट्रव्यापी पहल।"
          )}
          image={aboutHero}
        />

        {/* Mission Section */}
        <Section bg="bg-secondary">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 items-stretch"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={missionImage}
                alt={t("Our Mission", "हमारा मिशन")}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 flex items-center gap-3">
                <Target className="w-10 h-10 text-primary shrink-0" />
                {t("Our Mission", "हमारा मिशन")}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {t(
                    "Shivmay Bharat Mission is an environmental and spiritual movement led by Prakriti Foundation, Ghaziabad. This important effort connects the cultural tradition of Indian civilization with modern environmental consciousness.",
                    "शिवमय भारत मिशन प्रकृति फाउंडेशन, गाजियाबाद द्वारा संचालित एक पर्यावरणीय और आध्यात्मिक आंदोलन है। यह महत्वपूर्ण प्रयास भारतीय सभ्यता की सांस्कृतिक परंपरा को आधुनिक पर्यावरणीय चेतना से जोड़ता है।"
                  )}
                </p>
                <p>
                  {t(
                    "The mission aims to plant 11 crore Belpatra trees in front of 11 crore homes across India to promote ecological balance and revive ancient traditions that respect nature. When people plant trees themselves and take care of them, this work becomes a people's movement rather than just a government scheme.",
                    "इस मिशन का उद्देश्य पारिस्थितिक संतुलन को बढ़ावा देने और प्रकृति का सम्मान करने वाली प्राचीन परंपराओं को पुनर्जीवित करने के लिए पूरे भारत में 11 करोड़ घरों के सामने 11 करोड़ बेलपत्र वृक्ष लगाना है। जब लोग स्वयं वृक्ष लगाते हैं और उनकी देखभाल करते हैं, तो यह कार्य एक सरकारी योजना न रहकर जनआंदोलन का रूप ले लेता है।"
                  )}
                </p>
                <p>
                  {t(
                    "Our goal is to make India green, clean, and spiritually vibrant through collective participation.",
                    "हमारा लक्ष्य सामूहिक भागीदारी के माध्यम से भारत को हरा-भरा, स्वच्छ और आध्यात्मिक रूप से जीवंत बनाना है।"
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* Vision Section */}
        <Section bg="bg-card">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 items-stretch"
          >
            <div className="flex flex-col justify-center order-2 md:order-1">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 flex items-center gap-3">
                <Eye className="w-10 h-10 text-primary shrink-0" />
                {t("Our Vision", "हमारी दृष्टि")}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {t(
                    "We envision a future where every home nurtures a Belpatra tree, creating a greener India filled with clean air, healthy communities, and spiritual harmony.",
                    "हम एक ऐसे भविष्य की कल्पना करते हैं जहां हर घर एक बेलपत्र वृक्ष का पालन-पोषण करे, स्वच्छ हवा, स्वस्थ समुदायों और आध्यात्मिक सामंजस्य से भरा एक हरा-भरा भारत बनाए।"
                  )}
                </p>
                <p>
                  {t(
                    "This campaign of '11 Crore Belpatra Saplings, in Front of 11 Crore Homes' truly presents a vision of an India that is green, clean, and spiritually enriched. When there is a sacred Bel tree in front of every home, it will not only be a symbol of greenery but also of that cultural consciousness where nature and spirituality beautifully converge.",
                    "'11 करोड़ बेलपत्र के पौधे, 11 करोड़ घरों के आगे' का यह अभियान वास्तव में एक ऐसे भारत की कल्पना प्रस्तुत करता है जो हरित भी हो, स्वच्छ भी हो और आध्यात्मिक रूप से समृद्ध भी। जब प्रत्येक घर के सामने बेल का पवित्र वृक्ष होगा, तब वह केवल हरियाली का प्रतीक नहीं होगा, बल्कि उस सांस्कृतिक चेतना का प्रतीक भी होगा जिसमें प्रकृति और आध्यात्मिकता का सुंदर समन्वय दिखाई देता है।"
                  )}
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl order-1 md:order-2">
              <img
                src={visionImg}
                alt={t("Our Vision", "हमारी दृष्टि")}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </Section>

        {/* Prakriti Foundation Section */}
        <Section bg="bg-secondary">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 items-stretch"
          >
            <AutoImageSlider 
              images={CONFIG.slider.images} 
              interval={CONFIG.slider.interval}
              transitionDuration={CONFIG.slider.transitionDuration}
            />

            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                {t("About Prakriti Foundation", "प्रकृति फाउंडेशन के बारे में")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t(
                  "Prakriti Foundation is a social organization committed to:",
                  "प्रकृति फाउंडेशन एक सामाजिक संगठन है जो प्रतिबद्ध है:"
                )}
              </p>
              <ul className="space-y-3 mb-6">
                {CONFIG.foundationHighlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <Leaf className="w-5 h-5 text-primary shrink-0" />
                    <span>{t(item.en, item.hi)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "The foundation works towards creating a clean, green, and healthy India.",
                  "फाउंडेशन एक स्वच्छ, हरा-भरा और स्वस्थ भारत बनाने की दिशा में कार्य करता है।"
                )}
              </p>
            </div>
          </motion.div>
        </Section>

        {/* Spiritual Significance Section */}
        <Section bg="bg-card">
          <div className="container max-w-4xl text-center mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                {t("Spiritual Significance", "आध्यात्मिक महत्व")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t(
                  "In Indian religious tradition, the Bel or Bilva tree holds an extremely important place. Scientifically known as Aegle marmelos, this tree is considered most dear to Lord Shiva, and the tradition of offering Belpatra on the Shivalinga has been followed since ancient times.",
                  "भारतीय धार्मिक परंपरा में बेल या बिल्व वृक्ष का अत्यंत महत्वपूर्ण स्थान है। वैज्ञानिक रूप से इसे Aegle marmelos कहा जाता है। यह वृक्ष भगवान शिव को अत्यंत प्रिय माना जाता है और शिवलिंग पर बेलपत्र अर्पित करने की परंपरा प्राचीन काल से चली आ रही है।"
                )}
              </p>

              <div className="bg-secondary rounded-xl p-6 md:p-8 mb-8 border border-border">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="font-serif text-lg md:text-xl text-foreground italic leading-relaxed mb-3 whitespace-pre-line">
                  {CONFIG.spiritual.shloka.sanskrit}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(CONFIG.spiritual.shloka.meaning, CONFIG.spiritual.shloka.meaningHi)}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {t("The three leaves of Belpatra symbolize:", "बेलपत्र के तीन पत्ते प्रतीक हैं:")}
              </p>
              
              <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-8">
                {CONFIG.spiritual.deities.map((deity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-secondary rounded-xl p-6 shadow-sm text-center flex flex-col items-center justify-center"
                  >
                    <Leaf className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-serif text-lg text-foreground font-semibold">
                      {t(deity.en, deity.hi)}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <p className="text-foreground font-serif text-lg italic">
                {t(
                  "Offering Belpatra to Lord Shiva is believed to bring peace, health, and prosperity.",
                  "भगवान शिव को बेलपत्र अर्पित करने से शांति, स्वास्थ्य और समृद्धि प्राप्त होती है।"
                )}
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Timeline Section */}
        <Section bg="bg-secondary">
          <div className="container max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl text-foreground text-center mb-12"
            >
              {t("Our Journey", "हमारी यात्रा")}
            </motion.h2>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
              {CONFIG.timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`relative pl-12 md:pl-0 mb-8 md:w-1/2 ${
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-3.5 h-3.5 rounded-full bg-primary border-2 border-card z-10 left-2.5 ${
                      i % 2 === 0 ? "md:left-auto md:right-[-7px]" : "md:left-[-7px]"
                    }`}
                  />
                  <span className="text-primary font-bold text-sm">{item.year}</span>
                  <p className="text-foreground mt-1">{t(item.text, item.textHi)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Founder's Message Section */}
        <Section bg="bg-card">
          <div className="container max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-1"
              >
                <img
                  src={founderImg}
                  alt="Founder"
                  className="rounded-lg shadow-lg w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2"
              >
                <p className="text-primary font-medium uppercase tracking-widest text-sm mb-1">
                  {t("Founder's Message", "संस्थापक का संदेश")}
                </p>
                <p className="text-muted-foreground text-sm mb-3">
                  {t("Prakritiputra Bhai", "प्रकृतिपुत्र भाई")}
                </p>
                <blockquote className="font-serif text-xl md:text-2xl text-foreground italic leading-relaxed mb-4">
                  {t(
                    '"Nature is not separate from us; it is our mother and our responsibility. Through Shivmay Bharat Mission, we invite every citizen to plant a Belpatra tree and contribute to the health of our planet. Together we can create a greener and spiritually awakened India."',
                    '"प्रकृति हमसे अलग नहीं है; यह हमारी माँ और हमारी जिम्मेदारी है। शिवमय भारत मिशन के माध्यम से, हम हर नागरिक को बेलपत्र वृक्ष लगाने और हमारे ग्रह के स्वास्थ्य में योगदान देने के लिए आमंत्रित करते हैं। हम मिलकर एक हरा-भरा और आध्यात्मिक रूप से जागृत भारत बना सकते हैं।"'
                  )}
                </blockquote>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {t(
                    "Among the inspirations behind this campaign, the special contribution of Shri Durga Prasad Pandey is noteworthy, who is affectionately known as 'Prakritiputra Bhai'. His effort is that every person in society should join this campaign for nature conservation and accept tree planting as their social responsibility.",
                    "इस अभियान से जुड़े प्रेरणास्रोतों में श्री दुर्गा प्रसाद पांडेय का विशेष योगदान उल्लेखनीय है, जिन्हें स्नेहपूर्वक 'प्रकृतिपुत्र भाई' के रूप में जाना जाता है। उनका प्रयास है कि समाज का प्रत्येक व्यक्ति प्रकृति संरक्षण के इस अभियान से जुड़े और वृक्षारोपण को अपनी सामाजिक जिम्मेदारी के रूप में स्वीकार करे।"
                  )}
                </p>
                <p className="font-semibold text-foreground">
                  {t("Shri Durga Prasad Pandey", "श्री दुर्गा प्रसाद पांडे")}
                </p>
                <p className="text-muted-foreground text-sm">
                  {t("Founder, Prakriti Foundation", "संस्थापक, प्रकृति फाउंडेशन")}
                </p>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Core Values Section */}
        <Section bg="bg-secondary">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl text-foreground text-center mb-12"
            >
              {t("Core Values", "मूल मूल्य")}
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {CONFIG.values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-card rounded-lg p-6 text-center shadow-sm"
                >
                  <v.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    {t(v.title, v.titleHi)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(v.desc, v.descHi)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Team Members Section - Responsive Carousel */}
        <Section bg="bg-card" fullWidth={true}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-foreground text-center mb-12"
          >
            {t("Our Team", "हमारी टीम")}
          </motion.h2>
          
          <ResponsiveTeamCarousel teamMembers={CONFIG.teamMembers} />
        </Section>

        <DonationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;