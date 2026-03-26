import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, TreePine, Droplets, Shield, Quote, ChevronDown, QrCode, Building2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { GAS_URL, RAZORPAY_KEY_ID } from "@/lib/gas";
// import { loadScript } from "@razorpay/react-razorpay"; // Native SDK - no npm needed
import donateHero from "@/assets/donate-hero.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCallback, useEffect } from "react";

const amounts = [500, 1000, 2500, 5000, 10000];

const impactMapEn: Record<number, string> = {
  500: "plants 5 native trees",
  1000: "plants 10 trees + maintenance for 1 year",
  2500: "restores 50 sqft of lakeside habitat",
  5000: "supports 1 farmer's agroforestry transition",
  10000: "funds a micro-watershed structure",
};

const impactMapHi: Record<number, string> = {
  500: "5 देशी पेड़ लगाता है",
  1000: "10 पेड़ + 1 साल का रखरखाव",
  2500: "50 वर्ग फीट झील किनारे का आवास पुनर्स्थापित करता है",
  5000: "1 किसान की कृषि वानिकी में सहायता करता है",
  10000: "एक सूक्ष्म-जलसंभर संरचना का वित्तपोषण करता है",
};

const stories = [
  { quote: "My ₹5,000 donation helped plant 50 trees in my hometown. I visit them every year and they're growing beautifully.", quoteHi: "मेरे ₹5,000 के दान से मेरे गृहनगर में 50 पेड़ लगे। मैं हर साल उन्हें देखने जाता हूं और वे खूबसूरती से बढ़ रहे हैं।", name: "Meena K.", nameHi: "मीना के.", location: "Bengaluru", locationHi: "बेंगलुरु" },
  { quote: "As a monthly donor, I love receiving updates about the trees planted with my contributions. It's deeply personal.", quoteHi: "मासिक दानदाता के रूप में, मुझे अपने योगदान से लगे पेड़ों के बारे में अपडेट प्राप्त करना पसंद है। यह बहुत व्यक्तिगत है।", name: "Sunil P.", nameHi: "सुनील पी.", location: "Mumbai", locationHi: "मुंबई" },
];

const faqsLeft = [
  { q: "Is my donation tax-deductible?", qHi: "क्या मेरा दान कर-कटौती योग्य है?", a: "Yes! All donations are eligible for 50% tax deduction under Section 80G of the Income Tax Act.", aHi: "हां! सभी दान आयकर अधिनियम की धारा 80G के तहत 50% कर कटौती के लिए पात्र हैं।" },
  { q: "How is my money used?", qHi: "मेरा पैसा कैसे उपयोग होता है?", a: "100% of your donation goes towards sapling procurement, site preparation, planting, and 3-year maintenance.", aHi: "आपके दान का 100% पौधा खरीद, स्थल तैयारी, रोपण और 3 साल के रखरखाव में जाता है।" },
  { q: "Can I donate for a specific project?", qHi: "क्या मैं किसी विशेष परियोजना के लिए दान कर सकता/सकती हूं?", a: "Yes, you can choose to direct your donation to a specific program like Lake Restoration or Agroforestry.", aHi: "हां, आप अपना दान झील पुनर्स्थापना या कृषि वानिकी जैसे विशिष्ट कार्यक्रम में दे सकते हैं।" },
  { q: "Do I receive a receipt?", qHi: "क्या मुझे रसीद मिलती है?", a: "Yes, we issue 80G receipts for all donations via email within 48 hours.", aHi: "हां, हम 48 घंटे के भीतर ईमेल द्वारा सभी दानों के लिए 80G रसीदें जारी करते हैं।" },
  { q: "Can I donate in someone's name?", qHi: "क्या मैं किसी के नाम पर दान कर सकता/सकती हूं?", a: "Absolutely! We offer gift-a-tree certificates where you can dedicate trees in someone's name.", aHi: "बिल्कुल! हम गिफ्ट-ए-ट्री प्रमाणपत्र प्रदान करते हैं जहां आप किसी के नाम पर पेड़ समर्पित कर सकते हैं।" },
];

const faqsRight = [
  { q: "Is there a minimum donation amount?", qHi: "क्या न्यूनतम दान राशि है?", a: "No minimum! Every contribution matters. Even ₹100 helps us procure saplings.", aHi: "कोई न्यूनतम नहीं! हर योगदान मायने रखता है। ₹100 भी पौधे खरीदने में मदद करता है।" },
  { q: "Can I set up a monthly donation?", qHi: "क्या मैं मासिक दान सेट कर सकता/सकती हूं?", a: "Yes, use our recurring donation toggle to set up automatic monthly contributions.", aHi: "हां, स्वचालित मासिक योगदान सेट करने के लिए हमारे आवर्ती दान विकल्प का उपयोग करें।" },
  { q: "How do I know my donation made an impact?", qHi: "मुझे कैसे पता चलेगा कि मेरे दान से प्रभाव पड़ा?", a: "We send geo-tagged photos of planted trees, quarterly updates, and annual reports to all donors.", aHi: "हम सभी दानदाताओं को लगाए गए पेड़ों की जियो-टैग्ड फोटो, त्रैमासिक अपडेट और वार्षिक रिपोर्ट भेजते हैं।" },
  { q: "Can NRIs donate?", qHi: "क्या NRI दान कर सकते हैं?", a: "Yes, we accept international donations. All donations are FCRA compliant.", aHi: "हां, हम अंतर्राष्ट्रीय दान स्वीकार करते हैं। सभी दान FCRA अनुपालन हैं।" },
  { q: "What payment methods do you accept?", qHi: "आप कौन से भुगतान तरीके स्वीकार करते हैं?", a: "We accept UPI, bank transfers, credit/debit cards, and cheques.", aHi: "हम UPI, बैंक ट्रांसफर, क्रेडिट/डेबिट कार्ड और चेक स्वीकार करते हैं।" },
];

const DonatePage = () => {
  const { toast } = useToast();
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState(1000);
  const [custom, setCustom] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [openFaqLeft, setOpenFaqLeft] = useState<number | null>(null);
  const [openFaqRight, setOpenFaqRight] = useState<number | null>(null);
  const { t } = useLanguage();

  const activeAmount = isCustom ? Number(custom) || 0 : selected;

  const nameRegex = /^[a-zA-Z\u0900-\u097F\s]+$/;
  const validateDonor = () => {
    const errors: Record<string, string> = {};
    if (!donorName.trim()) errors.donorName = t("Donor name required", "दानदाता का नाम आवश्यक");
    else if (!nameRegex.test(donorName)) errors.donorName = t("Only letters allowed", "केवल अक्षर अनुमत");
    if (!email.trim()) errors.email = t("Email required", "ईमेल आवश्यक");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t("Invalid email", "अमान्य ईमेल");
    if (!phone.trim() || !/^\+?[0-9\s\-]{7,15}$/.test(phone)) errors.phone = t("Valid phone required", "वैध फोन आवश्यक");
    if (activeAmount === 0) errors.amount = t("Select amount", "राशि चुनें");
    return errors;
  };

  const [razorpayInstance, setRazorpayInstance] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      const rzp = new (window as any).Razorpay({
        key: RAZORPAY_KEY_ID,
        currency: 'INR',
        name: 'Prakriti Foundation',
        description: 'Support tree planting and lake restoration',
        image: 'https://your-logo-url.com/logo.png', // Optional
        theme: {
          color: '#10b981'
        },
        handler: async (response: any) => {
          try {
            const formData = {
              formType: 'donate',
              donorName,
              email,
              phone,
              amount: activeAmount,
              payment_id: response.razorpay_payment_id,
              status: response.razorpay_status || 'created',
              method: response.method
            };
            const gasRes = await fetch(GAS_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            });
            const gasResult = await gasRes.json();
            if (gasResult.success) {
              toast({
                title: t("Payment Successful!", "भुगतान सफल!"),
                description: t(`₹${activeAmount.toLocaleString()} donated. Tx ID: ${response.razorpay_payment_id}. 80G receipt emailed soon.`, `₹${activeAmount.toLocaleString()} दान। Tx ID: ${response.razorpay_payment_id}। 80G रसीद शीघ्र ईमेल।`)
              });
              setDonorName(""); setEmail(""); setPhone(""); setSelected(1000); setCustom(""); setIsCustom(false);
            }
          } catch (error) {
            toast({ title: t("Payment Recorded", "भुगतान दर्ज"), description: t("Payment successful but record failed. Contact us.", "भुगतान सफल किंतु रिकॉर्ड विफल। संपर्क करें।"), variant: "destructive" });
          }
        },
        prefill: {
          name: donorName,
          email,
          contact: phone
        },
        modal: {
          ondismiss: () => {
            toast({ title: t("Payment Cancelled", "भुगतान रद्द") });
          }
        }
      });
      setRazorpayInstance(rzp);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePay = () => {
    const errors = validateDonor();
    if (Object.keys(errors).length === 0 && activeAmount > 0 && razorpayInstance) {
      razorpayInstance.open({
        amount: activeAmount * 100, // paise
        ...razorpayInstance.options
      });
    } else {
      toast({ title: t("Please fill all fields", "सभी फील्ड भरें"), variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${donateHero})` }} />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative z-10 container text-center px-4 py-20">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight max-w-3xl mx-auto">
              {t("Your Contribution", "आपका योगदान")} <span className="text-accent">{t("Plants Hope", "आशा रोपता है")}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4 text-primary-foreground/80 text-lg max-w-xl mx-auto">
              {t("Every rupee goes directly towards planting trees, restoring lakes, and empowering communities.", "हर रुपया सीधे पेड़ लगाने, झीलों को बहाल करने और समुदायों को सशक्त बनाने में जाता है।")}
            </motion.p>
          </div>
        </section>

        {/* Donation Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-background rounded-lg border border-border p-8">
              <h2 className="font-serif text-2xl text-foreground text-center mb-6">{t("Choose Your Impact", "अपना प्रभाव चुनें")}</h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                {amounts.map((amt) => (
                  <button key={amt} onClick={() => { setSelected(amt); setIsCustom(false); }} className={`py-3 rounded-lg text-sm font-semibold transition-colors border ${!isCustom && selected === amt ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary"}`}>
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="mb-6">
                <input type="number" placeholder={t("Custom Amount (₹)", "कस्टम राशि (₹)")} value={custom} onChange={(e) => { setCustom(e.target.value); setIsCustom(true); }} onFocus={() => setIsCustom(true)} className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
              </div>
              {activeAmount > 0 && (
                <div className="bg-secondary rounded-lg p-4 mb-6 text-center">
                  <p className="text-sm text-foreground"><span className="font-semibold text-primary">₹{activeAmount.toLocaleString()}</span> {t(impactMapEn[activeAmount] || `plants approximately ${Math.floor(activeAmount / 100)} trees`, impactMapHi[activeAmount] || `लगभग ${Math.floor(activeAmount / 100)} पेड़ लगाता है`)}</p>
                </div>
              )}
              <div className="space-y-4">
                <input placeholder={t("Donor Full Name", "दानदाता का पूरा नाम")} value={donorName} onChange={(e) => setDonorName(e.target.value)} className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-primary" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder={t("Email", "ईमेल")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-4 py-3 bg-card border border-border rounded-lg focus:ring-primary" />
                  <input placeholder={t("Phone", "फोन")} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="px-4 py-3 bg-card border border-border rounded-lg focus:ring-primary" />
                </div>
                <Button size="lg" className="w-full text-base gap-2" onClick={handlePay} disabled={activeAmount === 0 || !razorpayInstance}><Heart className="w-5 h-5" /> {t("Pay Securely with Razorpay", "Razorpay से सुरक्षित भुगतान")} ₹{activeAmount.toLocaleString()}</Button>
                <p className="text-xs text-muted-foreground text-center">{t("100% secure payments. 80G receipts auto-sent.", "100% सुरक्षित। 80G रसीद स्वतः।")}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* QR Code & Bank Details */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container max-w-4xl">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-3xl text-foreground text-center mb-10">{t("Other Ways to Donate", "दान करने के अन्य तरीके")}</motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-lg border border-border p-8 text-center">
                <QrCode className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-3">{t("Scan & Pay via UPI", "UPI से स्कैन और भुगतान करें")}</h3>
                <div className="w-48 h-48 mx-auto bg-secondary rounded-lg border-2 border-dashed border-border flex items-center justify-center mb-4">
                  <div className="text-center">
                    <QrCode className="w-20 h-20 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">UPI QR Code</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">UPI ID: <span className="font-semibold text-foreground">prakritifoundation@upi</span></p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-lg border border-border p-8">
                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-4 text-center">{t("Bank Transfer Details", "बैंक ट्रांसफर विवरण")}</h3>
                <div className="space-y-3">
                  {[
                    { label: t("Account Name", "खाता नाम"), value: "Prakriti Foundation" },
                    { label: t("Account Number", "खाता संख्या"), value: "1234 5678 9012 3456" },
                    { label: t("Bank Name", "बैंक का नाम"), value: "State Bank of India" },
                    { label: t("Branch", "शाखा"), value: t("Ghaziabad Main Branch", "गाजियाबाद मुख्य शाखा") },
                    { label: t("IFSC Code", "IFSC कोड"), value: "SBIN0001234" },
                    { label: t("Account Type", "खाता प्रकार"), value: t("Current Account", "चालू खाता") },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-border pb-2 last:border-0">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-secondary rounded-md p-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-xs text-muted-foreground">{t("Please share transaction details at", "कृपया लेनदेन विवरण साझा करें")} <span className="text-foreground">donate@prakritifoundation.org</span></p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="py-16 bg-background">
          <div className="container max-w-3xl text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h3 className="font-serif text-2xl text-foreground mb-4">{t("Where Your Money Goes", "आपका पैसा कहां जाता है")}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary rounded-lg p-4 border border-border"><TreePine className="w-8 h-8 mx-auto mb-2 text-primary" /><p className="font-bold text-foreground">70%</p><p className="text-xs text-muted-foreground">{t("Planting & Maintenance", "रोपण और रखरखाव")}</p></div>
                <div className="bg-secondary rounded-lg p-4 border border-border"><Droplets className="w-8 h-8 mx-auto mb-2 text-sky" /><p className="font-bold text-foreground">20%</p><p className="text-xs text-muted-foreground">{t("Water & Community", "जल और समुदाय")}</p></div>
                <div className="bg-secondary rounded-lg p-4 border border-border"><Shield className="w-8 h-8 mx-auto mb-2 text-earth" /><p className="font-bold text-foreground">10%</p><p className="text-xs text-muted-foreground">{t("Admin & Operations", "प्रशासन और संचालन")}</p></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Donor Stories */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container max-w-4xl">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-3xl text-foreground text-center mb-12">{t("Donor Stories", "दानदाता कहानियां")}</motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {stories.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-lg p-6 border border-border">
                  <Quote className="w-8 h-8 text-primary/30 mb-3" />
                  <p className="text-foreground italic leading-relaxed mb-4">"{t(s.quote, s.quoteHi)}"</p>
                  <p className="font-semibold text-foreground text-sm">{t(s.name, s.nameHi)}</p>
                  <p className="text-muted-foreground text-xs">{t(s.location, s.locationHi)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-3xl text-foreground text-center mb-10">{t("Donation FAQs", "दान संबंधी प्रश्न")}</motion.h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="space-y-3">
                {faqsLeft.map((faq, i) => (
                  <div key={i}>
                    <button onClick={() => setOpenFaqLeft(openFaqLeft === i ? null : i)} className="w-full bg-card rounded-lg p-4 border border-border text-left flex items-center justify-between">
                      <span className="font-medium text-foreground text-sm">{t(faq.q, faq.qHi)}</span>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openFaqLeft === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaqLeft === i && (
                      <div className="bg-card border border-t-0 border-border rounded-b-lg px-4 pb-4 pt-2">
                        <p className="text-muted-foreground text-sm leading-relaxed">{t(faq.a, faq.aHi)}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {faqsRight.map((faq, i) => (
                  <div key={i}>
                    <button onClick={() => setOpenFaqRight(openFaqRight === i ? null : i)} className="w-full bg-card rounded-lg p-4 border border-border text-left flex items-center justify-between">
                      <span className="font-medium text-foreground text-sm">{t(faq.q, faq.qHi)}</span>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openFaqRight === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaqRight === i && (
                      <div className="bg-card border border-t-0 border-border rounded-b-lg px-4 pb-4 pt-2">
                        <p className="text-muted-foreground text-sm leading-relaxed">{t(faq.a, faq.aHi)}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DonatePage;
