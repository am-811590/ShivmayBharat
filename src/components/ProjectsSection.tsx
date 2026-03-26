import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import agroImg from "@/assets/project-agroforestry.jpg";
import lakeImg from "@/assets/project-lake.jpg";
import urbanImg from "@/assets/project-urban.jpg";
import waterImg from "@/assets/project-water.jpg";
import energyImg from "@/assets/project-energy.jpg";

const projects = [
  { title: "Agroforestry", desc: "Integrating trees with farming to boost biodiversity, soil health, and farmer livelihoods.", img: agroImg },
  { title: "Urban Forestry", desc: "Transforming city landscapes with tree-lined avenues, pocket forests, and green corridors.", img: urbanImg },
  { title: "Lake Restoration", desc: "Reviving urban and rural lakes through desilting, bunding, and native plantation drives.", img: lakeImg },
  { title: "Water Conservation", desc: "Building check dams, recharge wells, and rainwater harvesting systems.", img: waterImg },
  { title: "Climate Education", desc: "Empowering youth with environmental knowledge through workshops and school programs.", img: energyImg },
];

const ProjectsSection = () => (
  <section className="py-16 md:py-24 bg-card" id="projects">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">What We Do</p>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground">Featured Projects</h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Driving environmental change through focused, community-led initiatives.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group bg-background rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
          >
            <div className="overflow-hidden h-48">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-xl text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">{p.desc}</p>
              <Button variant="link" className="p-0 h-auto text-primary" asChild>
                <Link to="/projects">Learn More →</Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
