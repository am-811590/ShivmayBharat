import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";
import projectUrban from "@/assets/project-urban.jpg";
import projectLake from "@/assets/project-lake.jpg";
import corporateHero from "@/assets/corporate-hero.jpg";

const posts = [
  {
    date: "Feb 20, 2026",
    title: "How Agroforestry Is Changing Farmer Lives in Karnataka",
    excerpt: "Discover how integrating trees with crops is boosting income and soil health for smallholder farmers.",
    category: "Agroforestry",
    image: projectUrban,
  },
  {
    date: "Feb 12, 2026",
    title: "5 Lakes Restored in 2025: A Year in Review",
    excerpt: "Our lake restoration program brought back biodiversity and groundwater levels across Bengaluru.",
    category: "Impact",
    image: projectLake,
  },
  {
    date: "Jan 28, 2026",
    title: "Corporate Volunteering: Why It Matters for ESG",
    excerpt: "How employee-driven tree planting is becoming a core ESG strategy for India's top companies.",
    category: "Corporate",
    image: corporateHero,
  },
];

const BlogPreview = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
        <p className="text-primary font-medium uppercase tracking-widest text-sm mb-2">From Our Blog</p>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground">Latest Stories</h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card rounded-lg border border-border overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
          >
            <div className="overflow-hidden h-48">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <CalendarDays className="w-3.5 h-3.5" />
                {post.date}
                <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm text-xs">{post.category}</span>
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">{post.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
              <Button variant="link" className="p-0 h-auto text-primary justify-start" asChild>
                <Link to="/resources">Read More <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BlogPreview;
