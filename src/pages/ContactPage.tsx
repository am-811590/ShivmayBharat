import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchToGAS } from "@/lib/gas";
import heroBanner from "@/assets/contactUsHero.png";

const nameRegex = /^[a-zA-Z\u0900-\u097F\s]+$/;

const ContactForm = ({ t }: { t: (en: string, hi: string) => string }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t("Full name is required", "पूरा नाम आवश्यक है");
    else if (!nameRegex.test(name)) e.name = t("Only letters allowed", "केवल अक्षर अनुमत हैं");
    if (!email.trim()) e.email = t("Email is required", "ईमेल आवश्यक है");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t("Invalid email address", "अमान्य ईमेल पता");
    if (phone.trim() && !/^\+?[0-9\s\-]{7,15}$/.test(phone)) e.phone = t("Invalid phone number", "अमान्य फोन नंबर");
    if (!subject.trim()) e.subject = t("Subject is required", "विषय आवश्यक है");
    if (!message.trim()) e.message = t("Message is required", "संदेश आवश्यक है");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setIsSubmitting(true);
      try {
        await fetchToGAS({
          formType: 'contact',
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject: subject.trim(),
          message: message.trim()
        });

        toast({
          title: t("Message sent!", "संदेश भेजा गया!"),
          description: t("We'll get back to you soon.", "हम जल्द ही आपसे संपर्क करेंगे।"),
          variant: "default",
        });
        
        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
        setErrors({});
        
      } catch (error) {
        toast({
          title: t("Error", "त्रुटि"),
          description: t("Failed to send message. Please try again later.", "संदेश भेजने में विफल। कृपया बाद में पुनः प्रयास करें।"),
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const inputClass = "w-full px-3 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary";
  const errorClass = "text-destructive text-xs mt-1";

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-lg border border-border p-6 flex flex-col">
      <h2 className="font-serif text-2xl text-foreground mb-6">{t("Send Us a Message", "हमें संदेश भेजें")}</h2>
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <input 
              placeholder={t("Full Name", "पूरा नाम")} 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className={`${inputClass} ${errors.name ? "border-destructive" : ""}`}
              disabled={isSubmitting}
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>
          <div>
            <input 
              placeholder={t("Email", "ईमेल")} 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={`${inputClass} ${errors.email ? "border-destructive" : ""}`}
              disabled={isSubmitting}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>
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
          <input 
            placeholder={t("Subject", "विषय")} 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            className={`${inputClass} ${errors.subject ? "border-destructive" : ""}`}
            disabled={isSubmitting}
          />
          {errors.subject && <p className={errorClass}>{errors.subject}</p>}
        </div>
        <div className="flex-1 flex flex-col">
          <textarea 
            placeholder={t("Your Message", "आपका संदेश")} 
            rows={6} 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            className={`${inputClass} resize-none flex-1 ${errors.message ? "border-destructive" : ""}`}
            disabled={isSubmitting}
          />
          {errors.message && <p className={errorClass}>{errors.message}</p>}
        </div>
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? t("Sending...", "भेज रहे हैं...") 
            : t("Send Message", "संदेश भेजें")
          }
        </Button>
      </div>
    </motion.div>
  );
};

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <PageHero 
          title={t("Contact Us", "संपर्क करें")} 
          subtitle={t("Get in touch with our team. We'd love to hear from you.", "हमारी टीम से संपर्क करें। हम आपसे सुनना पसंद करेंगे।")} 
          image={heroBanner} 
        />

        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                className="bg-card rounded-lg border border-border p-6 flex flex-col"
              >
                <h2 className="font-serif text-2xl text-foreground mb-6">{t("Get In Touch", "संपर्क में रहें")}</h2>
                <div className="space-y-5 flex-1">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{t("Address", "पता")}</p>
                      <p className="text-muted-foreground text-sm">
                        {t("Prakriti Foundation, Ghaziabad, Uttar Pradesh, India", "प्रकृति फाउंडेशन, गाजियाबाद, उत्तर प्रदेश, भारत")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{t("Phone", "फोन")}</p>
                      <p className="text-muted-foreground text-sm">+91 80 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{t("Email", "ईमेल")}</p>
                      <p className="text-muted-foreground text-sm">info@prakritifoundation.org</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{t("Working Hours", "कार्य समय")}</p>
                      <p className="text-muted-foreground text-sm">
                        {t("Mon – Sat: 9:00 AM – 6:00 PM", "सोम – शनि: सुबह 9:00 – शाम 6:00")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border border-border h-48 mt-6">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112035.73688189775!2d77.3400656738281!3d28.669440899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sGhaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    title={t("Prakriti Foundation Location", "प्रकृति फाउंडेशन स्थान")} 
                  />
                </div>
              </motion.div>

              {/* Contact Form */}
              <ContactForm t={t} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;