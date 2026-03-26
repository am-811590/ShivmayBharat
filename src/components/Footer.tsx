import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import NewsletterForm from "./NewsletterForm";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-primary-foreground/80 py-12">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-primary-foreground font-serif text-xl mb-3">
              <img src={logo} alt="Shivmay Bharat Logo" className="w-8 h-8 object-contain" />
              {t("Shivmay Bharat", "शिवमय भारत")}
            </Link>
            <p className="text-sm leading-relaxed text-primary-foreground/60 mb-5 max-w-sm">
              {t(
                "Shivmay Bharat Mission by Prakriti Foundation – planting 11 crore Belpatra trees to build a greener, spiritually enriched India.",
                "प्रकृति फाउंडेशन द्वारा शिवमय भारत मिशन – एक हरा-भरा, आध्यात्मिक रूप से समृद्ध भारत बनाने के लिए 11 करोड़ बेलपत्र वृक्ष लगाना।"
              )}
            </p>
            <div className="mb-4">
              <p className="text-xs uppercase tracking-wider text-primary-foreground/40 mb-2">{t("Subscribe to our newsletter", "हमारे न्यूज़लेटर की सदस्यता लें")}</p>
              <NewsletterForm />
            </div>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 text-sm uppercase tracking-wider">{t("Quick Links", "त्वरित लिंक")}</h4>
            <ul className="space-y-2 text-sm">
              {[
                { en: "About Us", hi: "हमारे बारे में", path: "/about" },
                { en: "Our Work", hi: "हमारा कार्य", path: "/our-work" },
                { en: "Our Team", hi: "हमारी टीम", path: "/team" },
                { en: "Get Involved", hi: "शामिल हों", path: "/get-involved" },
                { en: "Donate", hi: "दान करें", path: "/donate" },
              ].map((l) => (
                <li key={l.en}>
                  <Link to={l.path} className="hover:text-primary-foreground transition-colors">{t(l.en, l.hi)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 text-sm uppercase tracking-wider">{t("Explore", "एक्सप्लोर करें")}</h4>
            <ul className="space-y-2 text-sm">
              {[
                { en: "Gallery", hi: "गैलरी", path: "/gallery" },
                { en: "Media Coverage", hi: "मीडिया कवरेज", path: "/resources" },
                { en: "Contact", hi: "संपर्क", path: "/contact" },
              ].map((l) => (
                <li key={l.en}>
                  <Link to={l.path} className="hover:text-primary-foreground transition-colors">{t(l.en, l.hi)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground mb-3 text-sm uppercase tracking-wider">{t("Contact", "संपर्क")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />{t("India", "भारत")}</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" />info@prakritifoundation.org</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" />+91 98765 43210</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} {t("Prakriti Foundation – Shivmay Bharat Mission. All rights reserved.", "प्रकृति फाउंडेशन – शिवमय भारत मिशन। सर्वाधिकार सुरक्षित।")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

