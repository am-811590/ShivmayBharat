import { motion } from "framer-motion";
import { Leaf, Wind, Heart, Shield, Sun, BookOpen, Flower2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const benefits = [
  { icon: Wind, en: "Purifies air and improves oxygen levels", hi: "हवा को शुद्ध करता है और ऑक्सीजन स्तर में सुधार करता है" },
  { icon: Heart, en: "Possesses powerful medicinal properties", hi: "शक्तिशाली औषधीय गुण रखता है" },
  { icon: Shield, en: "Strengthens immunity and digestion", hi: "रोग प्रतिरोधक क्षमता और पाचन को मजबूत करता है" },
  { icon: Sun, en: "Symbolically represents Brahma, Vishnu, and Mahesh", hi: "प्रतीकात्मक रूप से ब्रह्मा, विष्णु और महेश का प्रतिनिधित्व करता है" },
  { icon: Leaf, en: "Sacred offering to Lord Shiva", hi: "भगवान शिव को पवित्र अर्पण" },
  { icon: Flower2, en: "Grows in minimal resources and is highly resilient", hi: "कम संसाधनों में भी विकसित होता है और अत्यंत लचीला होता है" },
];

const BelpatraSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">
            {t("Importance of Belpatra", "बेलपत्र का महत्व")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            {t("Why Belpatra Tree?", "बेलपत्र वृक्ष क्यों?")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center max-w-3xl mx-auto mb-8 leading-relaxed space-y-4"
        >
          <p>
            {t(
              "Belpatra, also known as the Bilva Tree (Aegle marmelos), holds immense importance in both Ayurveda and Sanatan Dharma. In Indian culture, nature is not just a physical resource but the foundation of life and spiritual consciousness.",
              "बेलपत्र, जिसे बिल्व वृक्ष (Aegle marmelos) भी कहा जाता है, आयुर्वेद और सनातन धर्म दोनों में अत्यधिक महत्व रखता है। भारतीय संस्कृति में प्रकृति को केवल भौतिक संसाधन नहीं, बल्कि जीवन और आध्यात्मिक चेतना का आधार माना गया है।"
            )}
          </p>
          <p>
            {t(
              "The Vedas, Upanishads, and Puranas consider trees, rivers, and mountains as manifestations of divinity. The Belpatra tree is especially dear to Lord Shiva, and the tradition of offering Belpatra on the Shivalinga has been followed since ancient times.",
              "वेदों, उपनिषदों और पुराणों में वृक्षों, नदियों और पर्वतों को देवत्व का स्वरूप माना गया है। बेल वृक्ष भगवान शिव को अत्यंत प्रिय माना जाता है और शिवलिंग पर बेलपत्र अर्पित करने की परंपरा प्राचीन काल से चली आ रही है।"
            )}
          </p>
        </motion.div>

        {/* Sacred Shloka */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-secondary rounded-xl p-6 md:p-8 max-w-3xl mx-auto mb-10 text-center shadow-sm border border-border"
        >
          <BookOpen className="w-8 h-8 text-primary mx-auto mb-4" />
          <p className="font-serif text-lg md:text-xl text-foreground italic leading-relaxed mb-3">
            "त्रिदलं त्रिगुणाकारं त्रिनेत्रं च त्रियायुधम्।<br />
            त्रिजन्मपापसंहारं एकबिल्वं शिवार्पणम्॥"
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t(
              "The three-leaved Belpatra symbolizes the three Gunas, representing the three eyes and divine form of Lord Shiva. Even a single Bilva leaf offered with devotion is believed to destroy the sins of three lifetimes.",
              "तीन दलों वाला बेलपत्र त्रिगुणों का प्रतीक है, जो भगवान शिव के तीन नेत्रों और उनके दिव्य स्वरूप का प्रतिनिधित्व करता है। श्रद्धा से अर्पित किया गया एक बिल्वपत्र भी तीन जन्मों के पापों का नाश करने वाला माना गया है।"
            )}
          </p>
        </motion.div>

        {/* Ayurvedic & Environmental Significance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center max-w-3xl mx-auto mb-10 leading-relaxed space-y-4"
        >
          <p>
            {t(
              "The significance of the Bel tree is not limited to religion alone — it is equally important from medicinal and environmental perspectives. In Ayurveda, its fruit, leaves, roots, and bark are described as useful in treating numerous ailments — from digestive problems to strengthening immunity.",
              "बेल वृक्ष का महत्व केवल धार्मिक दृष्टि से ही नहीं, बल्कि औषधीय और पर्यावरणीय दृष्टि से भी अत्यंत महत्वपूर्ण है। आयुर्वेद में इसके फल, पत्ते, जड़ और छाल को अनेक रोगों के उपचार में उपयोगी बताया गया है — पाचन संबंधी समस्याओं से लेकर रोग प्रतिरोधक क्षमता बढ़ाने तक।"
            )}
          </p>
          <p>
            {t(
              "Additionally, this tree purifies the atmosphere and helps maintain environmental balance by providing oxygen. Trees like Bel, which grow even with minimal resources and possess numerous beneficial properties, can prove especially useful in this direction.",
              "इसके अतिरिक्त यह वृक्ष वातावरण को शुद्ध करता है और ऑक्सीजन प्रदान कर पर्यावरण संतुलन बनाए रखने में सहायक होता है। बेल जैसे वृक्ष, जो कम संसाधनों में भी विकसित हो जाते हैं और अनेक उपयोगी गुणों से युक्त होते हैं, इस दिशा में विशेष रूप से उपयोगी सिद्ध हो सकते हैं।"
            )}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex items-start gap-4 bg-secondary rounded-lg p-5 shadow-sm"
            >
              <b.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <p className="text-foreground text-sm">{t(b.en, b.hi)}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-foreground font-serif text-lg italic"
        >
          {t(
            "Planting Belpatra is both an act of devotion and environmental responsibility.",
            "बेलपत्र लगाना भक्ति और पर्यावरणीय जिम्मेदारी दोनों का कार्य है।"
          )}
        </motion.p>
      </div>
    </section>
  );
};

export default BelpatraSection;
