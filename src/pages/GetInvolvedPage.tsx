import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DonationCTA from "@/components/DonationCTA";
import { motion } from "framer-motion";
import { Users, HeartHandshake, Megaphone, ChevronDown, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  { quote: "Volunteering on weekends has been the most fulfilling experience. Seeing saplings I planted grow into trees gives me immense joy.", quoteHi: "सप्ताहांत में स्वयंसेवा करना सबसे संतोषजनक अनुभव रहा है। मेरे लगाए पौधों को पेड़ बनते देखकर अपार खुशी मिलती है।", name: "Deepa R.", nameHi: "दीपा आर.", role: "Weekend Volunteer", roleHi: "सप्ताहांत स्वयंसेवक" },
  { quote: "The community participation program helped our neighbourhood adopt 50 trees. Now our street is the greenest in the area!", quoteHi: "सामुदायिक भागीदारी कार्यक्रम ने हमारे मोहल्ले को 50 पेड़ गोद लेने में मदद की। अब हमारी गली क्षेत्र में सबसे हरी-भरी है!", name: "Karthik S.", nameHi: "कार्तिक एस.", role: "Community Volunteer", roleHi: "सामुदायिक स्वयंसेवक" },
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

        // Reset form
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

        {/* Volunteer Testimonials */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container max-w-4xl">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-3xl text-foreground text-center mb-12">{t("Volunteer Stories", "स्वयंसेवक कहानियां")}</motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {volunteerTestimonials.map((vt, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-lg p-6 border border-border">
                  <Quote className="w-8 h-8 text-primary/30 mb-3" />
                  <p className="text-foreground italic leading-relaxed mb-4">"{t(vt.quote, vt.quoteHi)}"</p>
                  <p className="font-semibold text-foreground text-sm">{t(vt.name, vt.nameHi)}</p>
                  <p className="text-muted-foreground text-xs">{t(vt.role, vt.roleHi)}</p>
                </motion.div>
              ))}
            </div>
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