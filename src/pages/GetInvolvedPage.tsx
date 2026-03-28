import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DonationCTA from "@/components/DonationCTA";
import { motion, AnimatePresence } from "framer-motion";
import { Users, HeartHandshake, Megaphone, ChevronDown, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import missionImage from "/selected plantation/IMG-20190605-WA0111_result.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { fetchToGAS } from "@/lib/gas";
import heroBanner from "@/assets/getInvolvedHero.png";

const opportunities = [
  { icon: Users, title: "Volunteer Programs", titleHi: "स्वयंसेवक कार्यक्रम", desc: "Join weekend plantation drives, lake cleanups, and nursery work. We welcome individuals, families, and groups.", descHi: "सप्ताहांत वृक्षारोपण अभियानों, झील सफाई और नर्सरी कार्य में शामिल हों। हम व्यक्तियों, परिवारों और समूहों का स्वागत करते हैं।", cta: "Sign Up to Volunteer", ctaHi: "स्वयंसेवक बनें" },
  { icon: HeartHandshake, title: "Community Participation", titleHi: "सामुदायिक भागीदारी", desc: "Engage with local initiatives — from school green clubs to neighbourhood tree adoption programs.", descHi: "स्थानीय पहलों में भाग लें — स्कूल ग्रीन क्लब से लेकर पड़ोस के वृक्ष गोद लेने के कार्यक्रमों तक।", cta: "Explore Programs", ctaHi: "कार्यक्रम देखें" },
  { icon: Megaphone, title: "Fundraising Campaigns", titleHi: "धन संग्रह अभियान", desc: "Start or support a fundraising campaign to plant trees, restore a lake, or sponsor a rural development project.", descHi: "पेड़ लगाने, झील को पुनर्स्थापित करने या ग्रामीण विकास परियोजना को प्रायोजित करने के लिए धन संग्रह अभियान शुरू करें या समर्थन करें।", cta: "Start a Campaign", ctaHi: "अभियान शुरू करें" },
];

const volunteerTestimonials = [
  { 
    quote: "Planting Belpatra trees under Shivmay Bharat Mission has connected me with my spiritual roots. Every morning, offering water to the sapling I planted brings peace to my soul.", 
    quoteHi: "शिवमय भारत मिशन के तहत बेलपत्र के पेड़ लगाने ने मुझे मेरी आध्यात्मिक जड़ों से जोड़ा। हर सुबह, मेरे द्वारा लगाए गए पौधे को जल अर्पित करने से मेरी आत्मा को शांति मिलती है।", 
    name: "Rajeshwari M.", 
    nameHi: "राजेश्वरी एम.", 
    role: "Spiritual Volunteer", 
    roleHi: "आध्यात्मिक स्वयंसेवक",
    location: "Varanasi",
    locationHi: "वाराणसी"
  },
  { 
    quote: "Teaching children about environmental conservation through our workshops has been incredible. Their enthusiasm for planting trees gives me hope for our future.", 
    quoteHi: "हमारी कार्यशालाओं के माध्यम से बच्चों को पर्यावरण संरक्षण के बारे में सिखाना अद्भुत रहा है। पेड़ लगाने के प्रति उनका उत्साह हमारे भविष्य के लिए आशा देता है।", 
    name: "Suresh K.", 
    nameHi: "सुरेश के.", 
    role: "Youth Mentor", 
    roleHi: "युवा मार्गदर्शक",
    location: "Pune",
    locationHi: "पुणे"
  },
  { 
    quote: "The plantation drive in our village transformed barren land into a green sanctuary. Now we have more birds and cleaner air. This is real change!", 
    quoteHi: "हमारे गांव में वृक्षारोपण अभियान ने बंजर भूमि को हरे-भरे अभयारण्य में बदल दिया। अब हमारे पास अधिक पक्षी और स्वच्छ हवा है। यह वास्तविक बदलाव है!", 
    name: "Lakshman R.", 
    nameHi: "लक्ष्मण आर.", 
    role: "Village Coordinator", 
    roleHi: "ग्राम समन्वयक",
    location: "Rajasthan",
    locationHi: "राजस्थान"
  },
  { 
    quote: "As a college student, I found purpose in this mission. We've organized 15 plantation events this year alone. Every sapling planted is a promise to Mother Earth.", 
    quoteHi: "एक कॉलेज छात्र के रूप में, मुझे इस मिशन में उद्देश्य मिला। हमने इस साल अकेले 15 वृक्षारोपण कार्यक्रम आयोजित किए हैं। लगाया गया हर पौधा धरती माता से एक वादा है।", 
    name: "Anjali S.", 
    nameHi: "अंजलि एस.", 
    role: "Student Volunteer", 
    roleHi: "छात्र स्वयंसेवक",
    location: "Delhi NCR",
    locationHi: "दिल्ली एनसीआर"
  },
  { 
    quote: "Working with the team to distribute 10,000 Belpatra saplings was challenging but rewarding. Seeing families nurture these sacred trees makes it all worthwhile.", 
    quoteHi: "टीम के साथ 10,000 बेलपत्र के पौधे वितरित करना चुनौतीपूर्ण लेकिन फलदायक था। परिवारों को इन पवित्र पेड़ों का पालन-पोषण करते देखना सब सार्थक कर देता है।", 
    name: "Manoj T.", 
    nameHi: "मनोज टी.", 
    role: "Distribution Lead", 
    roleHi: "वितरण प्रमुख",
    location: "Lucknow",
    locationHi: "लखनऊ"
  },
  { 
    quote: "My grandmother taught me about the significance of Bel tree. Now I'm passing that wisdom to the next generation while planting these sacred trees across our city.", 
    quoteHi: "मेरी दादी ने मुझे बेल वृक्ष के महत्व के बारे में सिखाया। अब मैं उस ज्ञान को अगली पीढ़ी तक पहुंचा रही हूं, साथ ही हमारे शहर भर में इन पवित्र पेड़ों को लगा रही हूं।", 
    name: "Vidya N.", 
    nameHi: "विद्या एन.", 
    role: "Tradition Keeper", 
    roleHi: "परंपरा संरक्षक",
    location: "Mysore",
    locationHi: "मैसूर"
  },
  { 
    quote: "The water conservation workshops opened my eyes. We've implemented rainwater harvesting in our community, and now we have enough water for our trees even in dry months.", 
    quoteHi: "जल संरक्षण कार्यशालाओं ने मेरी आंखें खोल दीं। हमने अपने समुदाय में वर्षा जल संचयन लागू किया है, और अब सूखे महीनों में भी हमारे पेड़ों के लिए पर्याप्त पानी है।", 
    name: "Arvind P.", 
    nameHi: "अरविंद पी.", 
    role: "Water Conservationist", 
    roleHi: "जल संरक्षणकर्ता",
    location: "Ahmedabad",
    locationHi: "अहमदाबाद"
  },
  { 
    quote: "What started as a weekend activity became my life's mission. Seeing 500+ families adopt Belpatra trees in our area fills my heart with gratitude.", 
    quoteHi: "जो सप्ताहांत की गतिविधि के रूप में शुरू हुआ, वह मेरे जीवन का मिशन बन गया। हमारे क्षेत्र में 500 से अधिक परिवारों को बेलपत्र के पेड़ गोद लेते देखकर मेरा दिल कृतज्ञता से भर जाता है।", 
    name: "Geeta V.", 
    nameHi: "गीता वी.", 
    role: "Community Mobilizer", 
    roleHi: "सामुदायिक संगठनकर्ता",
    location: "Indore",
    locationHi: "इंदौर"
  },
  { 
    quote: "The impact goes beyond trees. This mission brings people together, bridges communities, and revives our cultural connection with nature. Truly transformative!", 
    quoteHi: "प्रभाव पेड़ों से परे है। यह मिशन लोगों को एक साथ लाता है, समुदायों को जोड़ता है, और प्रकृति के साथ हमारे सांस्कृतिक संबंध को पुनर्जीवित करता है। वास्तव में परिवर्तनकारी!", 
    name: "Priyanka J.", 
    nameHi: "प्रियंका जे.", 
    role: "Social Activist", 
    roleHi: "सामाजिक कार्यकर्ता",
    location: "Kolkata",
    locationHi: "कोलकाता"
  },
  { 
    quote: "From corporate employee to full-time environmentalist - this journey transformed me. Planting Belpatra trees is not just about greenery; it's about preserving our heritage.", 
    quoteHi: "कॉर्पोरेट कर्मचारी से पूर्णकालिक पर्यावरणविद् तक - इस यात्रा ने मुझे बदल दिया। बेलपत्र के पेड़ लगाना केवल हरियाली के बारे में नहीं है; यह हमारी विरासत को संरक्षित करने के बारे में है।", 
    name: "Vikram S.", 
    nameHi: "विक्रम एस.", 
    role: "Environmental Champion", 
    roleHi: "पर्यावरण चैंपियन",
    location: "Mumbai",
    locationHi: "मुंबई"
  }
];

const faqsLeft = [
  { q: "How can I volunteer?", qHi: "मैं स्वयंसेवा कैसे कर सकता/सकती हूं?", a: "Simply fill out our volunteer sign-up form and we'll match you with upcoming drives near your location.", aHi: "बस हमारा स्वयंसेवक पंजीकरण फॉर्म भरें और हम आपको आपके स्थान के पास आगामी अभियानों से जोड़ देंगे।" },
  { q: "Is there a minimum time commitment?", qHi: "क्या न्यूनतम समय की प्रतिबद्धता है?", a: "No! You can join a single event or become a regular volunteer. We have opportunities for every schedule.", aHi: "नहीं! आप एक कार्यक्रम में शामिल हो सकते हैं या नियमित स्वयंसेवक बन सकते हैं।" },
  { q: "Can I volunteer as a family or group?", qHi: "क्या मैं परिवार या समूह के रूप में स्वयंसेवा कर सकता/सकती हूं?", a: "Absolutely! We welcome families, college groups, and community teams.", aHi: "बिल्कुल! हम परिवारों, कॉलेज समूहों और सामुदायिक टीमों का स्वागत करते हैं।" },
  { q: "Do I get a certificate?", qHi: "क्या मुझे प्रमाणपत्र मिलता है?", a: "Yes, we provide digital certificates of participation for all volunteers after each event.", aHi: "हां, हम प्रत्येक कार्यक्रम के बाद सभी स्वयंसेवकों को डिजिटल भागीदारी प्रमाणपत्र प्रदान करते हैं।" },
  { q: "What should I bring to a plantation drive?", qHi: "वृक्षारोपण अभियान में क्या लाना चाहिए?", a: "We provide all tools and saplings. Just bring water, sunscreen, comfortable shoes, and a positive attitude!", aHi: "हम सभी उपकरण और पौधे प्रदान करते हैं। बस पानी, सनस्क्रीन, आरामदायक जूते और सकारात्मक दृष्टिकोण लाएं!" },
];

const faqsRight = [
  { q: "Can I start a fundraising campaign?", qHi: "क्या मैं धन संग्रह अभियान शुरू कर सकता/सकती हूं?", a: "Yes! We support peer-to-peer fundraising. Reach out to us and we'll set up a dedicated campaign page.", aHi: "हां! हम पीयर-टू-पीयर फंडरेजिंग का समर्थन करते हैं। हमसे संपर्क करें।" },
  { q: "Are events held only in one city?", qHi: "क्या कार्यक्रम केवल एक शहर में होते हैं?", a: "No, we operate across India — multiple cities. Check our events page for details.", aHi: "नहीं, हम पूरे भारत में कई शहरों में काम करते हैं। विवरण के लिए हमारा कार्यक्रम पृष्ठ देखें।" },
  { q: "How is my donation used?", qHi: "मेरा दान कैसे उपयोग होता है?", a: "Every rupee is tracked. ₹11 plants one tree. We publish annual impact reports for full transparency.", aHi: "हर रुपये का हिसाब रखा जाता है। ₹11 से एक पेड़ लगता है। हम पूर्ण पारदर्शिता के लिए वार्षिक प्रभाव रिपोर्ट प्रकाशित करते हैं।" },
  { q: "Can schools participate?", qHi: "क्या स्कूल भाग ले सकते हैं?", a: "Yes! We have dedicated school programs including green clubs, workshops, and campus plantation drives.", aHi: "हां! हमारे पास स्कूलों के लिए समर्पित कार्यक्रम हैं जिनमें ग्रीन क्लब, कार्यशालाएं और कैम्पस वृक्षारोपण शामिल हैं।" },
  { q: "How do I stay updated about events?", qHi: "कार्यक्रमों के बारे में कैसे अपडेट रहूं?", a: "Subscribe to our newsletter or follow us on social media. We also send event alerts via email and WhatsApp.", aHi: "हमारे न्यूज़लेटर की सदस्यता लें या सोशल मीडिया पर फॉलो करें। हम ईमेल और व्हाट्सएप से भी अलर्ट भेजते हैं।" },
];

const nameRegex = /^[a-zA-Z\u0900-\u097F\s]+$/;

// Helper hook to get number of cards to show based on screen size
const useCardsPerView = () => {
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  return cardsPerView;
};

// Circular Infinite Carousel Component
const CircularInfiniteCarousel = ({ testimonials, t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const cardsPerView = useCardsPerView();
  const autoPlayRef = useRef<NodeJS.Timeout>();
  
  // Create a circular array by repeating the testimonials
  const circularTestimonials = [...testimonials, ...testimonials, ...testimonials];
  
  // Calculate the total number of sets needed to fill the screen
  const totalSets = Math.ceil(testimonials.length / cardsPerView);
  
  // Get current cards to display - always shows exactly cardsPerView cards
  const getCurrentCards = () => {
    const startIndex = currentIndex % testimonials.length;
    const cards = [];
    
    for (let i = 0; i < cardsPerView; i++) {
      const cardIndex = (startIndex + i) % testimonials.length;
      cards.push(testimonials[cardIndex]);
    }
    
    return cards;
  };

  // Handle next set - move forward by cardsPerView
  const nextSet = () => {
    setCurrentIndex((prev) => (prev + cardsPerView) % testimonials.length);
  };

  // Handle previous set - move backward by cardsPerView
  const prevSet = () => {
    setCurrentIndex((prev) => (prev - cardsPerView + testimonials.length) % testimonials.length);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSet();
      }, 2000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, cardsPerView]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const currentCards = getCurrentCards();
  
  // Calculate which set we're on (0 to totalSets-1)
  const currentSet = Math.floor(currentIndex / cardsPerView) % totalSets;

  return (
    <div 
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cards Container - Always shows exactly cardsPerView cards */}
      <div className="flex justify-center gap-6 flex-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSet}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex justify-center gap-6 flex-wrap"
          >
            {currentCards.map((vt, idx) => (
              <motion.div
                key={`${currentSet}-${idx}-${vt.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card rounded-lg p-6 border border-border w-[350px] md:w-[400px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-3" />
                <p className="text-foreground italic leading-relaxed mb-4 line-clamp-4">
                  "{t(vt.quote, vt.quoteHi)}"
                </p>
                <p className="font-semibold text-foreground text-sm">
                  {t(vt.name, vt.nameHi)}
                </p>
                <p className="text-muted-foreground text-xs">
                  {t(vt.role, vt.roleHi)}
                </p>
                {vt.location && (
                  <p className="text-muted-foreground text-xs mt-1">
                    {t(vt.location, vt.locationHi)}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prevSet}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          aria-label={t("Previous", "पिछला")}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* Dots Indicator - Shows all possible unique sets */}
        <div className="flex gap-2">
          {Array.from({ length: totalSets }).map((_, idx) => {
            // Calculate which unique combination of cards this dot represents
            const isActive = idx === currentSet;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * cardsPerView)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-primary w-6"
                    : "bg-border hover:bg-muted"
                }`}
                aria-label={`${t("Go to set", "सेट पर जाएं")} ${idx + 1}`}
              />
            );
          })}
        </div>
        
        <button
          onClick={nextSet}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          aria-label={t("Next", "अगला")}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const VolunteerForm = ({ t }: { t: (en: string, hi: string) => string }) => {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) {
      newErrors.firstName = t("First name is required", "पहला नाम आवश्यक है");
    } else if (!nameRegex.test(firstName)) {
      newErrors.firstName = t("Only letters allowed", "केवल अक्षर अनुमत हैं");
    }
    if (!lastName.trim()) {
      newErrors.lastName = t("Last name is required", "अंतिम नाम आवश्यक है");
    } else if (!nameRegex.test(lastName)) {
      newErrors.lastName = t("Only letters allowed", "केवल अक्षर अनुमत हैं");
    }
    if (!email.trim()) {
      newErrors.email = t("Email is required", "ईमेल आवश्यक है");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("Invalid email address", "अमान्य ईमेल पता");
    }
    if (!phone.trim()) {
      newErrors.phone = t("Phone number is required", "फोन नंबर आवश्यक है");
    } else if (!/^\+?[0-9\s\-]{7,15}$/.test(phone)) {
      newErrors.phone = t("Invalid phone number", "अमान्य फोन नंबर");
    }
    if (!interest) {
      newErrors.interest = t("Please select an interest area", "कृपया रुचि का क्षेत्र चुनें");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setIsSubmitting(true);
      try {
        await fetchToGAS({
          formType: 'getinvolved',
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          interest: interest
        });

        toast({
          title: t("Application submitted!", "आवेदन जमा हो गया!"),
          description: t("We'll get back to you soon.", "हम जल्द ही आपसे संपर्क करेंगे।"),
          variant: "default",
        });

        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setInterest("");
        setErrors({});
        
      } catch (error) {
        toast({
          title: t("Submission failed", "प्रस्तुति विफल"),
          description: t("Please try again later.", "कृपया बाद में पुनः प्रयास करें।"),
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const inputClass = "w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary";
  const errorClass = "text-destructive text-xs mt-1";

  return (
    <div className="p-8 flex flex-col justify-center space-y-4">
      <h3 className="font-serif text-xl text-foreground mb-2">{t("Join Our Green Movement", "हमारे हरित आंदोलन से जुड़ें")}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input 
            placeholder={t("First Name", "पहला नाम")} 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            className={`${inputClass} ${errors.firstName ? "border-destructive" : ""}`}
            disabled={isSubmitting}
          />
          {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
        </div>
        <div>
          <input 
            placeholder={t("Last Name", "अंतिम नाम")} 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            className={`${inputClass} ${errors.lastName ? "border-destructive" : ""}`}
            disabled={isSubmitting}
          />
          {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
        </div>
      </div>
      <div>
        <input 
          placeholder={t("Email Address", "ईमेल पता")} 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className={`${inputClass} ${errors.email ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>
      <div>
        <input 
          placeholder={t("Phone Number", "फोन नंबर")} 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          className={`${inputClass} ${errors.phone ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>
      <div>
        <select 
          value={interest} 
          onChange={(e) => setInterest(e.target.value)} 
          className={`${inputClass} ${errors.interest ? "border-destructive" : ""}`}
          disabled={isSubmitting}
        >
          <option value="">{t("Select Interest Area", "रुचि का क्षेत्र चुनें")}</option>
          <option value="tree-plantation">{t("Tree Plantation", "वृक्षारोपण")}</option>
          <option value="lake-cleanup">{t("Lake Cleanup", "झील सफाई")}</option>
          <option value="community">{t("Community Programs", "सामुदायिक कार्यक्रम")}</option>
          <option value="fundraising">{t("Fundraising", "धन संग्रह")}</option>
          <option value="other">{t("Other", "अन्य")}</option>
        </select>
        {errors.interest && <p className={errorClass}>{errors.interest}</p>}
      </div>
      <Button 
        className="w-full" 
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting 
          ? t("Submitting...", "जमा कर रहे हैं...") 
          : t("Submit Application", "आवेदन जमा करें")
        }
      </Button>
    </div>
  );
};

const GetInvolvedPage = () => {
  const [openFaqLeft, setOpenFaqLeft] = useState<number | null>(null);
  const [openFaqRight, setOpenFaqRight] = useState<number | null>(null);
  const { t } = useLanguage();

  const scrollToOpportunities = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const element = document.getElementById("opportunities");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <PageHero 
          title={t("Be the Change", "बदलाव बनें")} 
          subtitle={t("There are countless ways to contribute to a greener, more sustainable world. Find your path.", "एक हरी-भरी, अधिक टिकाऊ दुनिया में योगदान करने के अनगिनत तरीके हैं। अपना रास्ता खोजें।")} 
          image={heroBanner} 
          ctaText={t("Volunteer Now", "अभी स्वयंसेवक बनें")} 
          ctaLink="#opportunities"
        />

        {/* Opportunities */}
        <section className="py-16 md:py-24 bg-card" id="opportunities">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">{t("Ways to Help", "मदद के तरीके")}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">{t("Get Involved", "शामिल हों")}</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {opportunities.map((o, i) => (
                <motion.div key={o.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-secondary rounded-lg p-6 border border-border text-center">
                  <o.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                  <h3 className="font-serif text-xl text-foreground mb-2">{t(o.title, o.titleHi)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t(o.desc, o.descHi)}</p>
                  <Button size="sm" onClick={scrollToOpportunities}>{t(o.cta, o.ctaHi)}</Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer Testimonials - Circular Infinite Loop */}
        <section className="py-16 md:py-24 bg-secondary overflow-hidden">
          <div className="container max-w-full px-4 md:px-8">
            <motion.h2 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="font-serif text-3xl text-foreground text-center mb-12"
            >
              {t("Volunteer Stories", "स्वयंसेवक कहानियां")}
            </motion.h2>
            
            <CircularInfiniteCarousel testimonials={volunteerTestimonials} t={t} />
          </div>
        </section>

        {/* Sign Up Form */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <h2 className="font-serif text-3xl text-foreground text-center mb-10">{t("Volunteer Sign-Up", "स्वयंसेवक पंजीकरण")}</h2>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto bg-secondary rounded-xl border border-border overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="md:h-auto">
                  <img src={missionImage} alt={t("Happy volunteers planting trees together", "खुश स्वयंसेवक मिलकर पेड़ लगा रहे हैं")} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <VolunteerForm t={t} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-3xl text-foreground text-center mb-10">{t("Frequently Asked Questions", "अक्सर पूछे जाने वाले प्रश्न")}</motion.h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="space-y-3">
                {faqsLeft.map((faq, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <button onClick={() => setOpenFaqLeft(openFaqLeft === i ? null : i)} className="w-full bg-card rounded-lg p-4 border border-border text-left flex items-center justify-between">
                      <span className="font-medium text-foreground text-sm">{t(faq.q, faq.qHi)}</span>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openFaqLeft === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaqLeft === i && (
                      <div className="bg-card border border-t-0 border-border rounded-b-lg px-4 pb-4 pt-2">
                        <p className="text-muted-foreground text-sm leading-relaxed">{t(faq.a, faq.aHi)}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="space-y-3">
                {faqsRight.map((faq, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <button onClick={() => setOpenFaqRight(openFaqRight === i ? null : i)} className="w-full bg-card rounded-lg p-4 border border-border text-left flex items-center justify-between">
                      <span className="font-medium text-foreground text-sm">{t(faq.q, faq.qHi)}</span>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openFaqRight === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaqRight === i && (
                      <div className="bg-card border border-t-0 border-border rounded-b-lg px-4 pb-4 pt-2">
                        <p className="text-muted-foreground text-sm leading-relaxed">{t(faq.a, faq.aHi)}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <DonationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default GetInvolvedPage;