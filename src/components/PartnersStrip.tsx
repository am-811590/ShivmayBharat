import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const partners = [
  "Infosys", "Wipro", "TCS", "Bosch", "SAP", "Accenture", "Shell", "HDFC Bank",
];

const PartnersStrip = () => (
  <section className="py-12 bg-card border-y border-border">
    <div className="container">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Trusted by Leading Organizations</p>
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {partners.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            <Building2 className="w-5 h-5" />
            <span className="font-semibold text-lg">{name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersStrip;
