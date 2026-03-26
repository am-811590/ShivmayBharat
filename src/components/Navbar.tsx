import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", labelHi: "होम", path: "/" },
  { label: "About Us", labelHi: "हमारे बारे में", path: "/about" },
  { label: "Our Work", labelHi: "हमारा कार्य", path: "/our-work" },
  { label: "Our Team", labelHi: "हमारी टीम", path: "/team" },
  
  { label: "Gallery", labelHi: "गैलरी", path: "/gallery" },
  { label: "Press Coverage", labelHi: "प्रेस कवरेज", path: "/resources" },
  { label: "Get Involved", labelHi: "शामिल हों", path: "/get-involved" },
  { label: "Contact", labelHi: "संपर्क", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl md:text-2xl text-primary">
          <img src={logo} alt="Shivmay Bharat Logo" className="w-9 h-9 object-contain" />
          {t("Shivmay Bharat", "शिवमय भारत")}
        </Link>

        <div className="hidden xl:flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              {t(item.label, item.labelHi)}
            </Link>
          ))}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-colors border border-border rounded-md px-2.5 py-1.5"
          >
            <Globe className="w-4 h-4" />
            {lang === "en" ? "हिंदी" : "English"}
          </button>
          <Button size="sm" asChild>
            <Link to="/donate">{t("Donate", "दान करें")}</Link>
          </Button>
        </div>

        <button
          className="xl:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-card border-b border-border pb-4 animate-fade-in">
          <div className="container flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium py-1 ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
                onClick={() => setOpen(false)}
              >
                {t(item.label, item.labelHi)}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-colors w-fit"
            >
              <Globe className="w-4 h-4" />
              {lang === "en" ? "हिंदी" : "English"}
            </button>
            <Button size="sm" className="w-fit" asChild>
              <Link to="/donate" onClick={() => setOpen(false)}>{t("Donate", "दान करें")}</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
