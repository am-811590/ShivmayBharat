import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImpactStats from "@/components/ImpactStats";
import MissionSection from "@/components/MissionSection";
import BelpatraSection from "@/components/BelpatraSection";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import EventsSection from "@/components/EventsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import VideoSection from "@/components/VideoSection";
import DonationCTA from "@/components/DonationCTA";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pt-16 md:pt-20">
      <HeroSection />
      <ImpactStats />
      <MissionSection />
      <BelpatraSection />
      <GetInvolvedSection />
      <EventsSection />
      <TestimonialsSection />
      <GallerySection />
      <VideoSection />
      <DonationCTA />
    </main>
    <Footer />
  </div>
);

export default Index;
