import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DonationCTA from "@/components/DonationCTA";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, TreePine, Droplets, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";
import agroImg from "@/assets/project-agroforestry.jpg";
import lakeImg from "@/assets/project-lake.jpg";
import urbanImg from "@/assets/project-urban.jpg";
import waterImg from "@/assets/project-water.jpg";
import energyImg from "@/assets/project-energy.jpg";

const categories = ["All", "Forestry", "Water", "Rural", "Climate", "Corporate"];

const allProjects = [
  { title: "Miyawaki Forest – HSR Layout", location: "Bengaluru", category: "Forestry", status: "Ongoing", trees: "5,000", img: urbanImg, desc: "Dense urban forest using the Miyawaki technique in a 2-acre plot." },
  { title: "Jakkur Lake Restoration", location: "Bengaluru", category: "Water", status: "Completed", trees: "2,500", img: lakeImg, desc: "Complete lake rejuvenation including desilting, bunding, and bird habitat creation." },
  { title: "Haveri Farmer Agroforestry", location: "Karnataka", category: "Rural", status: "Ongoing", trees: "25,000", img: agroImg, desc: "Integrating fruit and timber trees into existing farming systems for 500+ farmers." },
  { title: "Corporate Green Campus – TechPark", location: "Hyderabad", category: "Corporate", status: "Completed", trees: "8,000", img: urbanImg, desc: "Transforming a 15-acre corporate campus into a green ecosystem." },
  { title: "Watershed Management – Ramanagara", location: "Karnataka", category: "Water", status: "Ongoing", trees: "10,000", img: waterImg, desc: "Building check dams and recharge structures across 50 villages." },
  { title: "Solar + Forest Initiative", location: "Maharashtra", category: "Climate", status: "Ongoing", trees: "15,000", img: energyImg, desc: "Combining solar energy with strategic afforestation for carbon neutrality." },
  { title: "Avenue Plantation Drive", location: "Pune", category: "Forestry", status: "Completed", trees: "3,000", img: urbanImg, desc: "Planting shade trees along 8km of major roads in Pune city." },
  { title: "Rural Livelihood Program", location: "Dharwad", category: "Rural", status: "Ongoing", trees: "12,000", img: agroImg, desc: "Empowering farmers with mango and coconut saplings for long-term income." },
];

const ProjectsPage = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? allProjects : allProjects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <PageHero
          title="Our Projects"
          subtitle="Explore our ongoing and completed environmental initiatives across India."
          image={heroBanner}
        />

        {/* Featured Project */}
        <section className="py-16 md:py-20 bg-card">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">Featured</p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">Spotlight Project</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-8 items-center bg-secondary rounded-lg overflow-hidden max-w-4xl mx-auto">
              <img src={lakeImg} alt="Featured project" className="w-full h-64 md:h-full object-cover" loading="lazy" />
              <div className="p-8">
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-sm font-medium">Ongoing</span>
                <h3 className="font-serif text-2xl text-foreground mt-3 mb-2">Jakkur Lake Ecosystem Restoration</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">A comprehensive restoration of Jakkur Lake including desilting, native plantations, bird habitats, and community engagement programs.</p>
                <div className="flex gap-4 mb-4 text-sm">
                  <span className="flex items-center gap-1 text-primary"><MapPin className="w-4 h-4" /> Bengaluru</span>
                  <span className="flex items-center gap-1 text-leaf"><TreePine className="w-4 h-4" /> 2,500 trees</span>
                </div>
                <Button size="sm">View Details <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-card rounded-lg border border-border overflow-hidden group hover:shadow-lg transition-shadow"
                >
                  <div className="overflow-hidden h-40">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-primary font-medium">{p.category}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${p.status === "Ongoing" ? "bg-leaf/10 text-leaf" : "bg-sky/10 text-sky"}`}>{p.status}</span>
                    </div>
                    <h3 className="font-serif text-lg text-foreground mb-1">{p.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2"><MapPin className="w-3 h-3" />{p.location}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">{p.desc}</p>
                    <p className="text-primary font-medium text-xs">🌳 {p.trees} trees</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="py-16 md:py-20 bg-secondary">
          <div className="container text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="font-serif text-3xl text-foreground mb-4">Project Locations</h2>
              <p className="text-muted-foreground mb-8">Our initiatives span across Karnataka, Maharashtra, Telangana, and beyond.</p>
              <div className="bg-card border border-border rounded-lg h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-primary/30" />
                  <p className="text-sm">Interactive map coming soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <DonationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
