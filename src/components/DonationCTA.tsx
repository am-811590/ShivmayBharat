import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const DonationCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-4">
            {t("Every Tree Counts. Every Rupee Matters.", "हर वृक्ष मायने रखता है। हर रुपया महत्वपूर्ण है।")}
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            {t(
              "Your donation helps us plant Belpatra trees, restore ecosystems, and empower communities. Join thousands of supporters making a difference.",
              "आपका दान हमें बेलपत्र वृक्ष लगाने, पारिस्थितिकी तंत्र को बहाल करने और समुदायों को सशक्त बनाने में मदद करता है।"
            )}
          </p>
          <Button size="lg" variant="secondary" className="gap-2 text-base" asChild>
            <Link to="/donate"><Heart className="w-5 h-5" /> {t("Donate Now", "अभी दान करें")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationCTA;
