import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchToGAS } from "@/lib/gas";

interface NewsletterFormProps {
  className?: string;
  containerClassName?: string;
}

const NewsletterForm = ({ className = "", containerClassName = "" }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    // Reset error
    setEmailError("");
    
    // Validate email
    if (!email.trim()) {
      setEmailError(t("Email is required", "ईमेल आवश्यक है"));
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError(t("Invalid email address", "अमान्य ईमेल पता"));
      return;
    }
    
    setLoading(true);
    
    try {
      // Send data to Google Sheets via fetchToGAS
      await fetchToGAS({ 
        formType: 'newsletter', 
        email: email.trim() 
      });
      
      // Show success toast
      toast({ 
        title: t("Subscribed!", "सदस्यता ली!"), 
        description: t("You'll receive our newsletter soon.", "आपको जल्द ही हमारा न्यूज़लेटर मिलेगा।"),
        variant: "default"
      });
      
      // Clear email on success
      setEmail("");
      
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      
      // Show error toast
      toast({ 
        title: t("Subscription failed", "सदस्यता विफल"), 
        description: t("Please try again later.", "कृपया बाद में पुनः प्रयास करें।"), 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSubscribe();
    }
  };

  const inputClass = `bg-primary-foreground/10 border text-primary-foreground placeholder:text-primary-foreground/30 text-sm rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-1 focus:ring-primary ${emailError ? "border-destructive" : "border-primary-foreground/10"}`;

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <div className={`flex gap-2 ${className}`}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => { 
            setEmail(e.target.value); 
            setEmailError(""); 
          }} 
          onKeyPress={handleKeyPress}
          placeholder={t("Your email", "आपका ईमेल")} 
          disabled={loading}
          className={inputClass}
          aria-label={t("Email address for newsletter", "न्यूज़लेटर के लिए ईमेल पता")}
        />
        <Button 
          size="sm" 
          className="shrink-0" 
          onClick={handleSubscribe} 
          disabled={loading}
          aria-label={t("Subscribe to newsletter", "न्यूज़लेटर की सदस्यता लें")}
        >
          {loading ? (
            <span className="flex items-center gap-1">
              <span className="animate-pulse">...</span>
            </span>
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
      {emailError && (
        <p className="text-destructive text-xs mt-1 ml-1" role="alert">
          {emailError}
        </p>
      )}
    </div>
  );
};

export default NewsletterForm;