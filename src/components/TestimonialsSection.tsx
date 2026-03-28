import { useRef, useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import ranjeetKushwaha from "/team-members/Ranjeet_Kushwaha.jpeg";
import raviShankarPandey from "/team-members/Ravi_Shankar_Pandey.jpeg";
import manishPandey from "/team-members/Manish_Pandey.jpeg";
import gauravKumarPandey from "/team-members/Gaurav_Kumar_Pandey.jpeg";
import gitaDevi from "/team-members/Gita_Devi.jpeg";
import jatinNagar from "/team-members/Jatin_Nagar.jpeg";

const testimonials = [
  {
    quote: "Our duty towards nature is as sacred as our duty towards the nation. Prakriti Sena stands committed to building a generation that protects, nurtures, and reveres the environment.",
    quoteHi: "प्रकृति के प्रति हमारा कर्तव्य उतना ही पवित्र है जितना राष्ट्र के प्रति। प्रकृति सेना एक ऐसी पीढ़ी के निर्माण के लिए प्रतिबद्ध है जो पर्यावरण की रक्षा, संवर्धन और सम्मान करे।",
    name: "Ranjeet Kushwaha",
    nameHi: "रंजीत कुशवाहा",
    role: "Rashtriya Upadhyaksh, Prakriti Sena",
    roleHi: "राष्ट्रीय उपाध्यक्ष, प्रकृति सेना",
    image: ranjeetKushwaha,
  },
  {
    quote: "Shivmay Bharat is not just a mission—it is a movement where spirituality guides environmental responsibility. Through initiatives like Belpatra plantation, we are restoring balance between devotion and nature.",
    quoteHi: "शिवमय भारत केवल एक मिशन नहीं, बल्कि एक आंदोलन है जहाँ आध्यात्मिकता पर्यावरणीय जिम्मेदारी का मार्गदर्शन करती है। बेलपत्र वृक्षारोपण जैसे प्रयासों के माध्यम से हम भक्ति और प्रकृति के बीच संतुलन स्थापित कर रहे हैं।",
    name: "Ravi Shankar Pandey",
    nameHi: "रवि शंकर पांडे",
    role: "Executive Director",
    roleHi: "कार्यकारी निदेशक",
    image: raviShankarPandey,
  },
  {
    quote: "At the grassroots level, change begins with action. In Uttar Pradesh, we are turning awareness into impact—one plantation, one volunteer, one step at a time.",
    quoteHi: "जमीनी स्तर पर परिवर्तन कार्यों से शुरू होता है। उत्तर प्रदेश में हम जागरूकता को प्रभाव में बदल रहे हैं—एक पौधारोपण, एक स्वयंसेवक, एक कदम के साथ।",
    name: "Manish Pandey",
    nameHi: "मनीष पांडे",
    role: "Pradesh Adhyaksh (U.P.), Prakriti Sena",
    roleHi: "प्रदेश अध्यक्ष (उ.प्र.), प्रकृति सेना",
    image: manishPandey,
  },
    {
    quote: "Awareness is the first seed of change. As a Pracharak, my mission is to carry the message of Shivmay Bharat to every corner—so that every individual feels connected to nature and takes a step towards its protection.",
    quoteHi: "जागरूकता ही परिवर्तन का पहला बीज है। एक प्रचारक के रूप में मेरा उद्देश्य शिवमय भारत के संदेश को हर कोने तक पहुँचाना है—ताकि हर व्यक्ति प्रकृति से जुड़ाव महसूस करे और उसके संरक्षण की दिशा में कदम बढ़ाए।",
    name: "Gaurav Kumar Pandey",
    nameHi: "गौरव कुमार पांडेय",
    role: "Pracharak",
    roleHi: "प्रचारक",
    image: gauravKumarPandey,
  },
  {
    quote: "A mission grows stronger when its roots are organized and its vision is clear. Shivmay Bharat is building a structured movement where devotion, discipline, and environmental responsibility walk together.",
    quoteHi: "कोई भी मिशन तब मजबूत होता है जब उसकी जड़ें संगठित हों और उसका दृष्टिकोण स्पष्ट हो। शिवमय भारत एक ऐसा सशक्त आंदोलन बना रहा है जहाँ भक्ति, अनुशासन और पर्यावरणीय जिम्मेदारी साथ-साथ चलते हैं।",
    name: "Gita Devi",
    nameHi: "गीता देवी",
    role: "Rashtriya Mahasachiv, Shivmay Bharat Mission",
    roleHi: "राष्ट्रीय महासचिव, शिवमय भारत मिशन",
    image: gitaDevi,
  },
  {
    quote: "True progress stands on the foundation of integrity and lawful action. Our mission ensures that every step towards environmental protection is guided by responsibility, ethics, and the framework of law.",
    quoteHi: "सच्ची प्रगति ईमानदारी और विधिक आधार पर खड़ी होती है। हमारा मिशन यह सुनिश्चित करता है कि पर्यावरण संरक्षण की दिशा में उठाया गया हर कदम जिम्मेदारी, नैतिकता और कानून के ढांचे के भीतर हो।",
    name: "Jatin Nagar",
    nameHi: "जतिन नागर",
    role: "Vidhi Salahakar",
    roleHi: "विधि सलाहकार",
    image: jatinNagar,
  },
];

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const carouselRef = useRef<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-slide interval
  useEffect(() => {
    if (!inView || !carouselRef.current) return;

    const interval = setInterval(() => {
      carouselRef.current?.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [inView]);

  // Listen to carousel events to update current index
  useEffect(() => {
    if (!carouselRef.current) return;

    const updateIndex = () => {
      const index = carouselRef.current?.selectedScrollSnap() ?? 0;
      setCurrentIndex(index);
    };

    // Initial index
    updateIndex();

    // Subscribe to select event
    carouselRef.current.on("select", updateIndex);

    return () => {
      carouselRef.current?.off("select", updateIndex);
    };
  }, [carouselRef.current]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      carouselRef.current?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      carouselRef.current?.scrollNext();
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="container max-w-3xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12">{t("What People Say", "लोग क्या कहते हैं")}</h2>
        <Carousel
          setApi={(api) => (carouselRef.current = api)}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-2xl mx-auto"
        > 
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center pt-2 md:pt-6"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-primary mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={t(testimonial.name, testimonial.nameHi)} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <Quote className="w-10 h-10 text-primary/30 mb-4" />
                  <p className="text-lg md:text-xl text-foreground leading-relaxed italic px-4">
                    "{t(testimonial.quote, testimonial.quoteHi)}"
                  </p>
                  <p className="mt-6 font-semibold text-foreground">
                    – {t(testimonial.name, testimonial.nameHi)}
                    {testimonial.role ? `, ${t(testimonial.role, testimonial.roleHi)}` : ""}
                  </p>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel> 
        {/* Navigation buttons and dots */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button 
            onClick={() => carouselRef.current?.scrollPrev()} 
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors" 
            aria-label={t("Previous testimonial", "पिछला प्रशंसापत्र")}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Dots for all testimonials */}
          <div className="flex gap-2">
            {testimonials.map((_, dotIndex) => {
              const isActive = dotIndex === currentIndex;
              return (
                <button 
                  key={dotIndex}
                  onClick={() => carouselRef.current?.scrollTo(dotIndex)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out ${
                    isActive 
                      ? "bg-primary scale-125 ring-2 ring-primary/50" 
                      : "bg-border hover:bg-muted hover:scale-110"
                  }`} 
                  aria-label={`${t("Go to testimonial", "प्रशंसापत्र पर जाएं")} ${dotIndex + 1}`}
                />
              );
            })}
          </div>
          
          <button 
            onClick={() => carouselRef.current?.scrollNext()} 
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors" 
            aria-label={t("Next testimonial", "अगला प्रशंसापत्र")}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;