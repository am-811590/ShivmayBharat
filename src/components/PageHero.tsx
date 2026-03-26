import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

const PageHero = ({ title, subtitle, image, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink }: PageHeroProps) => (
  <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
    <div className="absolute inset-0 bg-foreground/60" />
    <div className="relative z-10 container text-center px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight max-w-4xl mx-auto"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
      {(ctaText || secondaryCtaText) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {ctaText && ctaLink && (
            <Button size="lg" asChild>
              <Link to={ctaLink}>{ctaText}</Link>
            </Button>
          )}
          {secondaryCtaText && secondaryCtaLink && (
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to={secondaryCtaLink}>{secondaryCtaText}</Link>
            </Button>
          )}
        </motion.div>
      )}
    </div>
  </section>
);

export default PageHero;
