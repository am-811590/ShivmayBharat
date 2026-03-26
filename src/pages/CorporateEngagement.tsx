import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PartnersStrip from "@/components/PartnersStrip";
import { motion } from "framer-motion";
import { TreePine, Droplets, Leaf, Users, BarChart3, Download, Calendar, Quote, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import corporateHero from "@/assets/corporate-hero.jpg";

const csrModels = [
  { icon: TreePine, title: "Tree Plantation Drives", desc: "Organize large-scale plantation drives for employees across 50+ locations. Each drive includes site selection, sapling procurement, and long-term maintenance." },
  { icon: Droplets, title: "Lake Rejuvenation", desc: "Adopt a lake for comprehensive restoration — desilting, bunding, native plantations, and community stewardship setup." },
  { icon: Leaf, title: "Carbon Offset Programs", desc: "Plant verified carbon-sequestering forests to offset your organization's carbon footprint with measurable impact data." },
  { icon: Users, title: "Employee Engagement", desc: "Team-building plantation events, nature walks, and environmental workshops that boost morale and ESG credentials." },
];

const benefits = [
  "Tax benefits under Section 80G",
  "CSR compliance under Companies Act 2013",
  "Verified impact reports with geo-tagged data",
  "Employee engagement and team building",
  "Brand visibility through joint campaigns",
  "ESG score improvement and sustainability reporting",
];

const testimonials = [
  { quote: "SayTrees helped us plant 10,000 trees as part of our carbon neutrality goal. Their execution was flawless.", name: "CSR Head", company: "Leading IT Company" },
  { quote: "Our employee volunteering partnership with SayTrees has been the highlight of our CSR calendar for 3 years running.", name: "HR Director", company: "Global Manufacturing Firm" },
];

const CorporateEngagement = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pt-16 md:pt-20">
      <PageHero
        title="Partner With Us for Sustainable Impact"
        subtitle="Align your CSR goals with measurable environmental action. Together, we can create a greener, more sustainable future."
        image={corporateHero}
        ctaText="Schedule a Consultation"
        ctaLink="/get-involved"
        secondaryCtaText="Download CSR Brochure"
        secondaryCtaLink="/resources"
      />

      {/* CSR Models */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">Collaboration Models</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">How We Partner</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {csrModels.map((m, i) => (
              <motion.div key={m.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-secondary rounded-lg p-6 border border-border">
                <m.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-serif text-xl text-foreground mb-2">{m.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">Why Partner</p>
              <h2 className="font-serif text-3xl text-foreground mb-4">Benefits for Your Organization</h2>
              <p className="text-muted-foreground leading-relaxed">We provide end-to-end CSR solutions with transparent reporting, measurable impact, and seamless execution.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-3xl text-primary-foreground text-center mb-10">Corporate Impact So Far</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "50+", label: "Corporate Partners" },
              { val: "1,00,000+", label: "Trees via CSR" },
              { val: "200+", label: "Drives Conducted" },
              { val: "25,000+", label: "Employees Engaged" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="font-serif text-3xl text-primary-foreground">{s.val}</p>
                <p className="text-primary-foreground/70 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PartnersStrip />

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-4xl">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-3xl text-foreground text-center mb-12">What Our Partners Say</motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-secondary rounded-lg p-6 border border-border">
                <Quote className="w-8 h-8 text-primary/30 mb-3" />
                <p className="text-foreground italic leading-relaxed mb-4">"{t.quote}"</p>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.company}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Ready to Make an Impact?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">Schedule a free consultation to explore CSR partnerships tailored to your organization's goals.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2"><Calendar className="w-5 h-5" /> Schedule Consultation</Button>
              <Button size="lg" variant="outline" className="gap-2"><Download className="w-5 h-5" /> Download CSR Brochure</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default CorporateEngagement;
