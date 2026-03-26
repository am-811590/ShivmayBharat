import { motion } from "framer-motion";
import missionImg from "/selected plantation/IMG_20190804_114239_result.webp";
import corporateHero from "/selected plantation/WhatsApp Image 2024-04-06 at 7.16.24 AM (1)_result.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const MissionSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-secondary" id="about-us">
      <div className="container">
        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch max-w-5xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={missionImg} alt="Belpatra tree plantation drive" className="rounded-lg shadow-lg w-full h-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">{t("Our Mission", "हमारा मिशन")}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              {t("Shivmay Bharat Mission", "शिवमय भारत मिशन")}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
              <p>
                {t(
                  "Shivmay Bharat Mission is a nationwide environmental initiative launched by Prakriti Foundation to plant Belpatra trees in front of homes across India. The mission combines environmental conservation with spiritual awareness, encouraging citizens to reconnect with nature while contributing to a healthier planet.",
                  "शिवमय भारत मिशन प्रकृति फाउंडेशन द्वारा शुरू की गई एक राष्ट्रव्यापी पर्यावरण पहल है जो पूरे भारत में घरों के सामने बेलपत्र वृक्ष लगाने के लिए है। यह मिशन पर्यावरण संरक्षण को आध्यात्मिक जागरूकता के साथ जोड़ता है।"
                )}
              </p>
              <p>
                {t(
                  "This campaign is not limited to tree planting alone — it is an effort to bring together nature conservation and spiritual awareness. The specialty of this campaign is that it strives to unite all sections of society. Children, youth, women, and elders — all are being inspired to participate.",
                  "यह अभियान केवल वृक्षारोपण तक सीमित नहीं है, बल्कि प्रकृति संरक्षण और आध्यात्मिक जागरूकता को एक साथ जोड़ने का प्रयास है। इस अभियान की विशेषता यह है कि यह समाज के सभी वर्गों को जोड़ने का प्रयास करता है। बच्चे, युवा, महिलाएँ और बुजुर्ग—सभी को इसमें सहभागी बनने के लिए प्रेरित किया जा रहा है।"
                )}
              </p>
              <p>
                {t(
                  "Our goal is to make India green, clean, and spiritually vibrant through collective participation.",
                  "हमारा लक्ष्य सामूहिक भागीदारी के माध्यम से भारत को हरा-भरा, स्वच्छ और आध्यात्मिक रूप से जीवंत बनाना है।"
                )}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Campaign Target */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl p-6 md:p-8 max-w-5xl mx-auto mb-16 shadow-sm border border-border"
        >
          <div className="text-center space-y-4 text-muted-foreground leading-relaxed text-justify md:text-center">
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
              {t("Campaign Progress & Target", "अभियान की प्रगति और लक्ष्य")}
            </h3>
            <p>
              {t(
                "Under the campaign, a special target for extensive tree planting has been set in Uttar Pradesh. According to the plan, approximately 3.51 crore Belpatra saplings are targeted to be planted across the state between Mahashivratri 2026 and 2029.",
                "अभियान के अंतर्गत विशेष रूप से उत्तर प्रदेश में व्यापक वृक्षारोपण का लक्ष्य निर्धारित किया गया है। योजना के अनुसार महाशिवरात्रि 2026 से 2029 के बीच पूरे प्रदेश में लगभग 3.51 करोड़ बेलपत्र के पौधे लगाने का लक्ष्य रखा गया है।"
              )}
            </p>
            <p>
              {t(
                "So far, lakhs of saplings have been planted under this mission, and the work is being carried forward in various regions including Haridwar, Varanasi, Ujjain, Rishikesh, Ayodhya, Delhi-NCR, Ghaziabad, and Noida.",
                "अब तक इस मिशन के अंतर्गत लाखों पौधे लगाए जा चुके हैं और यह कार्य हरिद्वार, वाराणसी, उज्जैन, ऋषिकेश, अयोध्या, दिल्ली-एनसीआर, गाजियाबाद और नोएडा जैसे विभिन्न क्षेत्रों में आगे बढ़ाया जा रहा है।"
              )}
            </p>
          </div>
        </motion.div>

        {/* Vision */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch max-w-5xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="md:order-2">
            <img src={corporateHero} alt="Green vision for India" className="rounded-lg shadow-lg w-full h-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:order-1">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">{t("Our Vision", "हमारी दृष्टि")}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              {t("A Shivmay Bharat", "एक शिवमय भारत")}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
              <p>
                {t(
                  "Our vision is to create a Shivmay Bharat – a nation filled with greenery, purity, and spiritual harmony. We envision a future where every home nurtures a Belpatra tree.",
                  "हमारी दृष्टि एक शिवमय भारत बनाने की है – हरियाली, शुद्धता और आध्यात्मिक सामंजस्य से भरा राष्ट्र। हम एक ऐसे भविष्य की कल्पना करते हैं जहां हर घर एक बेलपत्र वृक्ष का पालन-पोषण करे।"
                )}
              </p>
              <p>
                {t(
                  "This campaign of '11 Crore Belpatra Saplings, in Front of 11 Crore Homes' truly presents a vision of an India that is green, clean, and spiritually enriched. When there is a sacred Bel tree in front of every home, it will not only be a symbol of greenery but also a symbol of that cultural consciousness where nature and spirituality beautifully converge.",
                  "'11 करोड़ बेलपत्र के पौधे, 11 करोड़ घरों के आगे' का यह अभियान वास्तव में एक ऐसे भारत की कल्पना प्रस्तुत करता है जो हरित भी हो, स्वच्छ भी हो और आध्यात्मिक रूप से समृद्ध भी। जब प्रत्येक घर के सामने बेल का पवित्र वृक्ष होगा, तब वह केवल हरियाली का प्रतीक नहीं होगा, बल्कि उस सांस्कृतिक चेतना का प्रतीक भी होगा जिसमें प्रकृति और आध्यात्मिकता का सुंदर समन्वय दिखाई देता है।"
                )}
              </p>
            </div>
            <ul className="space-y-2 text-muted-foreground mt-4">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary shrink-0" /> {t("Cleaner air", "स्वच्छ हवा")}</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary shrink-0" /> {t("Stronger ecosystems", "मजबूत पारिस्थितिकी तंत्र")}</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary shrink-0" /> {t("Healthier communities", "स्वस्थ समुदाय")}</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary shrink-0" /> {t("Revival of sacred ecological traditions", "पवित्र पारिस्थितिक परंपराओं का पुनरुद्धार")}</li>
            </ul>
          </motion.div>
        </div>

        {/* Climate Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl p-6 md:p-8 max-w-5xl mx-auto text-center shadow-sm border border-border"
        >
          <p className="text-muted-foreground leading-relaxed">
            {t(
              "Today, the world is facing serious challenges like climate change, pollution, and deforestation. Diminishing greenery and rising pollution in cities are becoming a threat to human health. At such a time, extensive tree planting campaigns are essential for maintaining environmental balance. This sentiment can ultimately prove to be an important step towards realizing the dream of a 'Shivmay Bharat'.",
              "आज विश्व जलवायु परिवर्तन, प्रदूषण और वन विनाश जैसी गंभीर समस्याओं का सामना कर रहा है। शहरों में घटती हरियाली और बढ़ता प्रदूषण मानव स्वास्थ्य के लिए चुनौती बनता जा रहा है। ऐसे समय में वृक्षारोपण के व्यापक अभियान पर्यावरण संतुलन बनाए रखने के लिए अत्यंत आवश्यक हैं। यही भावना अंततः 'शिवमय भारत' के स्वप्न को साकार करने की दिशा में एक महत्वपूर्ण कदम सिद्ध हो सकती है।"
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
