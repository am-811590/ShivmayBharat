import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TreePine, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const GetInvolvedSection = () => {
  const { t } = useLanguage();

  const options = [
    {
      icon: TreePine,
      title: t("Plant a Belpatra Tree", "बेलपत्र वृक्ष लगाएं"),
      desc: t("Plant a sacred Belpatra tree near your home and become part of this historic green movement.", "अपने घर के पास एक पवित्र बेलपत्र वृक्ष लगाएं और इस ऐतिहासिक हरित आंदोलन का हिस्सा बनें।"),
      cta: t("Start Planting", "रोपण शुरू करें"),
      link: "/get-involved",
    },
    {
      icon: Users,
      title: t("Volunteer With Us", "हमारे साथ स्वयंसेवा करें"),
      desc: t("Join our plantation drives and environmental awareness campaigns across cities and villages.", "शहरों और गांवों में हमारे वृक्षारोपण अभियानों और पर्यावरण जागरूकता कार्यक्रमों में शामिल हों।"),
      cta: t("Become Volunteer", "स्वयंसेवक बनें"),
      link: "/get-involved",
    },
    {
      icon: Heart,
      title: t("Support the Mission", "मिशन का समर्थन करें"),
      desc: t("Your contribution helps us expand plantation drives and reach more communities.", "आपका योगदान हमें वृक्षारोपण अभियानों का विस्तार करने और अधिक समुदायों तक पहुंचने में मदद करता है।"),
      cta: t("Donate Now", "अभी दान करें"),
      link: "/donate",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-primary" id="get-involved">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground">{t("Get Involved", "शामिल हों")}</h2>
          <p className="mt-3 text-primary-foreground/70 max-w-xl mx-auto">{t("There are many ways you can contribute to a greener future.", "आप हरे भविष्य में कई तरह से योगदान कर सकते हैं।")}</p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {options.map((o, i) => (
            <motion.div key={o.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 text-center border border-primary-foreground/10">
              <o.icon className="w-10 h-10 mx-auto mb-4 text-accent" />
              <h3 className="font-serif text-xl text-primary-foreground mb-2">{o.title}</h3>
              <p className="text-primary-foreground/70 text-sm mb-4 leading-relaxed">{o.desc}</p>
              <Button variant="secondary" size="sm" asChild><Link to={o.link}>{o.cta}</Link></Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
