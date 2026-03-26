import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import founderImg from "@/assets/founder.jpg";
import missionImage from "@/assets/mission-image.jpg";
import projectUrban from "@/assets/project-urban.jpg";

const testimonials = [
  {
    quote: "This mission beautifully connects spirituality with environmental protection. Planting Belpatra trees is both service to nature and devotion to Lord Shiva.",
    quoteHi: "यह मिशन आध्यात्मिकता को पर्यावरण संरक्षण से खूबसूरती से जोड़ता है। बेलपत्र वृक्ष लगाना प्रकृति की सेवा और भगवान शिव की भक्ति दोनों है।",
    name: "Volunteer",
    nameHi: "स्वयंसेवक",
    role: "Ghaziabad",
    roleHi: "गाजियाबाद",
    image: founderImg,
  },
  {
    quote: "I planted my first Belpatra tree through this mission. It feels like contributing to the future of our planet.",
    quoteHi: "मैंने इस मिशन के माध्यम से अपना पहला बेलपत्र वृक्ष लगाया। ऐसा लगता है जैसे हमारे ग्रह के भविष्य में योगदान दे रहे हैं।",
    name: "Community Member",
    nameHi: "समुदाय सदस्य",
    role: "",
    roleHi: "",
    image: missionImage,
  },
  {
    quote: "Shivmay Bharat Mission is inspiring thousands of people to care for nature again.",
    quoteHi: "शिवमय भारत मिशन हजारों लोगों को फिर से प्रकृति की देखभाल करने के लिए प्रेरित कर रहा है।",
    name: "Environmental Supporter",
    nameHi: "पर्यावरण समर्थक",
    role: "",
    roleHi: "",
    image: projectUrban,
  },
];

const TestimonialsSection = () => {
  const [idx, setIdx] = useState(0);
  const { t } = useLanguage();

  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-3xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12">{t("What People Say", "लोग क्या कहते हैं")}</h2>
        <div className="relative min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-primary mb-4">
                <img src={testimonials[idx].image} alt={t(testimonials[idx].name, testimonials[idx].nameHi)} className="w-full h-full object-cover" />
              </div>
              <Quote className="w-10 h-10 text-primary/30 mb-4" />
              <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
                "{t(testimonials[idx].quote, testimonials[idx].quoteHi)}"
              </p>
              <p className="mt-6 font-semibold text-foreground">
                – {t(testimonials[idx].name, testimonials[idx].nameHi)}
                {testimonials[idx].role ? `, ${t(testimonials[idx].role, testimonials[idx].roleHi)}` : ""}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors" aria-label={t("Previous testimonial", "पिछला प्रशंसापत्र")}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === idx ? "bg-primary" : "bg-border"}`} aria-label={`${t("Go to testimonial", "प्रशंसापत्र पर जाएं")} ${i + 1}`} />
          ))}
          <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors" aria-label={t("Next testimonial", "अगला प्रशंसापत्र")}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
