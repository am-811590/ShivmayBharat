import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram } from "lucide-react";
import founderImg from "/team-members/Durga_Prasad_Pandey.jpeg";
import gauravKumarPandey from "/team-members/Gaurav_Kumar_Pandey.jpeg";
import raviShankarPandey from "/team-members/Ravi_Shankar_Pandey.jpeg";
import ranjeetKushwaha from "/team-members/Ranjeet_Kushwaha.jpeg";
import gitaDevi from "/team-members/Gita_Devi.jpeg";
import manishPandey from "/team-members/Manish_Pandey.jpeg";
import jatinNagar from "/team-members/Jatin_Nagar.jpeg";
import kavithaNair from "@/assets/donate-hero.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import aboutHero from "@/assets/galleryHero.png";

const teamMembers = [
  {
    name: "Shri Durga Prasad Pandey",
    nameHi: "श्री दुर्गा प्रसाद पांडेय",
    role: "Rastreey Adhyaksh, Shivmay Bharat Mission",
    roleHi: "राष्ट्रीय अध्यक्ष, शिवमय भारत मिशन",
    image: founderImg,
    instagram: "#",
    facebook: "#",
    twitter: "#",
  },
  {
    name: "Ravi Shankar Pandey",
    nameHi: "रवि शंकर पांडे",
    role: "Executive Director",
    roleHi: "कार्यकारी निदेशक",
    image: raviShankarPandey,
    instagram: "#",
    facebook: "#",
    twitter: "#",
  },
  {
    name: "Ranjeet Rushwaha",
    nameHi: "रंजीत कुशवाहा",
    role: "Rashtriya Upadhyaksh, Prakriti sena",
    roleHi: "राष्ट्रीय उपाध्यक्ष, प्रकृति सेना",
    image: ranjeetKushwaha,
    instagram: "#",
    facebook: "#",
    twitter: "#",
  },
  {
    name: "Gaurav Kumar Pandey",
    nameHi: "गौरव कुमार पांडेय",
    role: "Pracharak",
    roleHi: "प्रचारक",
    image: gauravKumarPandey,
    instagram: "#",
    facebook: "#",
    twitter: "#",
  },
  {
    name: "Gita Devi",
    nameHi: "गीता देवी",
    role: "Rashtriya Mahasachiv, Shivmay Bharat Mission",
    roleHi: "राष्ट्रीय महासचिव, शिवमय भारत मिशन",
    image: gitaDevi,
    instagram: "#",
    facebook: "#",
    twitter: "#",
  },
  {
    name: "Manish Pandey",
    nameHi: "मनीष पांड",
    role: "Pradesh Adhyaksh (U.P.), Prakriti Sena",
    roleHi: "प्रदेश अध्यक्ष (उ.प्र.), प्रकृति सेना",
    image: manishPandey,
    instagram: "#",
    facebook: "#",
    twitter: "#",
  },
  {
    name: "Jatin Nagar",
    nameHi: "जतिन नागर",
    role: "Vidhi Salahakar",
    roleHi: "विधि सलाहकार",
    image: jatinNagar,
    instagram: "#",
    facebook: "#",
    twitter: "#",
  },
  // {
  //   name: "Kavitha Nair",
  //   nameHi: "कविता नायर",
  //   role: "Volunteer Coordinator",
  //   roleHi: "स्वयंसेवक समन्वयक",
  //   image: kavithaNair,
  //   instagram: "#",
  //   facebook: "#",
  //   twitter: "#",
  // },
];
const TeamPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <PageHero title={t("Meet Our Team", "हमारी टीम से मिलें")} subtitle={t("The passionate people behind Shivmay Bharat Mission who dedicate their lives to a greener planet.", "शिवमय भारत मिशन के पीछे जुनूनी लोग जो अपना जीवन एक हरे ग्रह के लिए समर्पित करते हैं।")} image={aboutHero} />

        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">{t("Our People", "हमारे लोग")}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">{t("Leadership & Team", "नेतृत्व और टीम")}</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-t-xl aspect-[5/5]">
                    <img
                      src={member.image}
                      alt={t(member.name, member.nameHi)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Social icons slide in from the left */}
                    <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col items-center justify-center gap-3 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300">
                      <a href={member.instagram} className="w-8 h-8 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors" aria-label="Instagram">
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a href={member.facebook} className="w-8 h-8 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors" aria-label="Facebook">
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a href={member.twitter} className="w-8 h-8 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors" aria-label="Twitter">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="bg-card rounded-b-xl p-4 text-center border border-t-0 border-border">
                    <h3 className="font-serif text-lg text-foreground">{t(member.name, member.nameHi)}</h3>
                    <p className="text-muted-foreground text-sm">{t(member.role, member.roleHi)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;