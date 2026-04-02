import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DonationCTA from "@/components/DonationCTA";
import { motion } from "framer-motion";
import { TreePine, Droplets, Building, Sprout, Sun, BookOpen, ArrowRight } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

// Real plantation images from public/selected plantation
const agroImg = "./selected plantation/IMG_20180614_082512_result.webp";
const riverImg = "./selected plantation/IMG-20190427-WA0046_result.webp";
const urbanImg = "./selected plantation/IMG_20180618_095207_result.webp";
const waterImg = "./selected plantation/IMG-20190505-WA0029_result.webp";
const energyImg = "./selected plantation/IMG_20190603_094554 - Copy_result.webp";
import heroBanner from "@/assets/ourWorkHero.jpg";
const programs = [
  { 
    icon: Sprout, 
    title: "Agroforestry",
    titleHi: "कृषि वानिकी",
    desc: "We integrate trees into farmland to restore soil health and create resilient ecosystems. By working closely with farmers, we introduce multi-purpose species that provide shade, improve water retention, and enrich biodiversity. This approach not only strengthens crop productivity but also opens new income streams. Over time, degraded lands begin to heal, turning fields into sustainable green assets. Our model ensures that nature and livelihood grow together, not apart.",
    descHi: "हम खेती में पेड़ों को शामिल कर मिट्टी की गुणवत्ता सुधारते हैं और टिकाऊ पारिस्थितिकी तंत्र बनाते हैं। किसानों के साथ मिलकर हम ऐसे पेड़ लगाते हैं जो छाया देते हैं, जल संरक्षण बढ़ाते हैं और जैव विविधता को समृद्ध करते हैं। इससे फसल उत्पादन बेहतर होता है और आय के नए स्रोत बनते हैं। धीरे-धीरे बंजर भूमि फिर से उपजाऊ बन जाती है। हमारा मॉडल प्रकृति और आजीविका को साथ लेकर चलता है।",
    impact: "50,000+ trees on farmland",
    impactHi: "50,000+ पेड़ खेतों में",
    img: agroImg,
    imageDesc: "Community planting saplings in rural farmland.",
    imageDescHi: "ग्रामीण क्षेत्रों में पौधारोपण करते समुदाय के सदस्य।"
  },

  { 
    icon: Droplets, 
    title: "River Restoration",
    titleHi: "नदी पुनर्स्थापन",
    desc: "Our river restoration efforts revive dying water bodies through scientific and community-driven methods. We focus on desilting, strengthening riverbanks, and planting native species that support aquatic life. Local communities play a central role in maintaining these ecosystems long after intervention. As rivers return to life, groundwater levels improve and biodiversity flourishes. What was once dry begins to flow again—bringing life back to entire regions.",
    descHi: "हम नदियों और जल स्रोतों को वैज्ञानिक और सामुदायिक प्रयासों से पुनर्जीवित करते हैं। इसमें गाद निकालना, किनारों को मजबूत करना और स्थानीय पौधों का रोपण शामिल है। समुदाय इन परियोजनाओं को आगे भी संभालते हैं। नदियों के पुनर्जीवित होने से भूजल स्तर बढ़ता है और जैव विविधता लौटती है। सूखी धारा फिर बहने लगती है और पूरे क्षेत्र में जीवन लौट आता है।",
    impact: "45+ rivers restored",
    impactHi: "45+ नदियाँ पुनर्जीवित",
    img: riverImg,
    imageDesc: "Restoring water bodies with community participation.",
    imageDescHi: "समुदाय की भागीदारी से जल स्रोतों का पुनर्जीवन।"
  },

  { 
    icon: Building, 
    title: "Urban Forestry",
    titleHi: "शहरी वानिकी",
    desc: "In dense urban spaces, we create pockets of green that restore balance to concrete landscapes. From roadside plantations to micro-forests, every initiative is designed to improve air quality and reduce heat. These green zones become breathing spaces for communities, offering shade and ecological relief. Over time, they transform how cities feel and function. Even in the busiest streets, nature finds its way back.",
    descHi: "घने शहरी क्षेत्रों में हम हरियाली के छोटे-छोटे स्थान बनाते हैं जो कंक्रीट के बीच संतुलन लाते हैं। सड़क किनारे पौधारोपण और माइक्रो-फॉरेस्ट जैसे प्रयास वायु गुणवत्ता सुधारते हैं और तापमान कम करते हैं। ये क्षेत्र लोगों के लिए सुकून भरे स्थान बनते हैं। धीरे-धीरे शहर का माहौल बदलने लगता है और प्रकृति फिर से अपनी जगह बना लेती है।",
    impact: "80+ urban sites greened",
    impactHi: "80+ शहरी स्थल हरित",
    img: urbanImg,
    imageDesc: "Transforming city spaces with greenery.",
    imageDescHi: "शहरी क्षेत्रों को हरियाली से बदलना।"
  },

  { 
    icon: Droplets, 
    title: "Water Conservation",
    titleHi: "जल संरक्षण",
    desc: "We build sustainable water systems that capture, store, and recharge groundwater in water-scarce regions. Through check dams, recharge wells, and rainwater harvesting, we ensure every drop is valued. These structures not only support agriculture but also secure drinking water for communities. Over time, dry lands regain moisture and resilience. Water stops being a crisis—and becomes a resource again.",
    descHi: "हम जल संकट वाले क्षेत्रों में जल संरक्षण और भूजल पुनर्भरण के लिए संरचनाएँ बनाते हैं। चेक डैम, रिचार्ज वेल और वर्षा जल संचयन के माध्यम से हर बूंद का सही उपयोग किया जाता है। इससे खेती और पेयजल दोनों को सहारा मिलता है। समय के साथ सूखी जमीन में नमी लौटती है और जल संकट कम होता है।",
    impact: "200+ water structures built",
    impactHi: "200+ जल संरचनाएँ निर्मित",
    img: waterImg,
    imageDesc: "Restoring water bodies for groundwater recharge.",
    imageDescHi: "भूजल पुनर्भरण के लिए जल स्रोतों का पुनर्जीवन।"
  },

  { 
    icon: Sun, 
    title: "Clean Energy & Climate Action",
    titleHi: "स्वच्छ ऊर्जा और जलवायु कार्य",
    desc: "We promote clean energy solutions like solar adoption while offsetting carbon through large-scale plantation. Our initiatives reduce dependence on fossil fuels and create long-term environmental impact. Communities benefit from lower energy costs and sustainable alternatives. At the same time, trees absorb carbon and restore ecological balance. It’s a dual approach—cut emissions and rebuild nature.",
    descHi: "हम सौर ऊर्जा जैसे स्वच्छ विकल्पों को बढ़ावा देते हैं और बड़े स्तर पर वृक्षारोपण के माध्यम से कार्बन को कम करते हैं। इससे जीवाश्म ईंधन पर निर्भरता घटती है और पर्यावरण संतुलन बेहतर होता है। लोगों को सस्ती और टिकाऊ ऊर्जा मिलती है। साथ ही पेड़ कार्बन अवशोषित कर प्रकृति को पुनर्जीवित करते हैं।",    impact: "1,500+ tonnes CO₂ offset",
    impactHi: "1,500+ टन CO₂ कम",
    img: energyImg,
    imageDesc: "Afforestation for climate sustainability.",
    imageDescHi: "जलवायु संतुलन हेतु वृक्षारोपण।"
  },

  { 
    icon: BookOpen, 
    title: "Climate Education",
    titleHi: "जलवायु शिक्षा",
    desc: "We engage students and communities through workshops and awareness programs focused on sustainability. By simplifying complex environmental challenges, we empower people to take everyday action. Schools become hubs of change where young minds grow into responsible citizens. This knowledge spreads across families and communities. Change begins with awareness—and we plant that seed early.",
    descHi: "हम कार्यशालाओं और जागरूकता कार्यक्रमों के माध्यम से छात्रों और समुदायों को पर्यावरण के प्रति जागरूक करते हैं। जटिल विषयों को सरल बनाकर हम लोगों को छोटे-छोटे कदम उठाने के लिए प्रेरित करते हैं। स्कूल परिवर्तन के केंद्र बनते हैं और युवा जिम्मेदार नागरिक बनते हैं। यही ज्ञान समाज में फैलता है और बदलाव की शुरुआत करता है।",
    impact: "10,000+ students reached",
    impactHi: "10,000+ छात्र पहुंचे",
    img: "./selected plantation/IMG-20190717-WA0056_result.webp",
    imageDesc: "Awareness sessions in communities and schools.",
    imageDescHi: "समुदायों और स्कूलों में जागरूकता कार्यक्रम।"
  },
];

const OurWork = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <PageHero
          title={t("Our Work", "हमारा कार्य")}
          subtitle={t("From planting forests to restoring rivers — discover how we're building a sustainable future across India.", "जंगल लगाने से लेकर झीलों को पुनर्स्थापित करने तक — जानिए कैसे हम पूरे भारत में एक सतत भविष्य बना रहे हैं।")}
          image={heroBanner}
        />

        {/* Impact Numbers */}
        <section className="py-12 bg-card">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { val: "3,50,000+", label: t("Trees Planted", "पेड़ लगाए") },
                { val: "45+", label: t("Rivers Restored", "झीलें पुनर्स्थापित") },
                { val: "120+", label: t("Project Sites", "परियोजना स्थल") },
                { val: "7", label: t("Program Areas", "कार्यक्रम क्षेत्र") },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <p className="font-serif text-3xl text-primary">{s.val}</p>
                  <p className="text-muted-foreground text-sm">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">{t("Our Programs", "हमारे कार्यक्रम")}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">{t("Environmental Initiatives", "पर्यावरणीय पहल")}</h2>
            </motion.div>
            <div className="space-y-12">
              {programs.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 gap-8 items-center">
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <img src={p.img} alt={p.title} className="rounded-lg shadow-md w-full h-64 object-cover" loading="lazy" />
                    {p.imageDesc && (
                      <p className="text-muted-foreground text-sm mt-2 italic">
                        {t(p.imageDesc, p.imageDescHi)}
                      </p>
                    )}
                  </div>
                  <div className={i % 2 === 1 ? "md:order-1" : ""}>
                    <div className="flex items-center gap-3 mb-2">
                      <p.icon className="w-7 h-7 text-primary" />
                      <h3 className="font-serif text-2xl text-foreground">
                        {t(p.title, p.titleHi)}
                      </h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {t(p.desc, p.descHi)}
                    </p>

                    <p className="text-primary font-medium text-sm mb-4">
                      📊 {t(p.impact, p.impactHi)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        <DonationCTA />

      </main>
      <Footer />
    </div>
  );
};

export default OurWork;

