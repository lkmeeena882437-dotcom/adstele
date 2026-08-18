import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import BackgroundEnvironment from './components/BackgroundEnvironment';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import ServicesSection from './components/ServicesSection';
import AutomationWorkflow from './components/AutomationWorkflow';
import ComparisonSection from './components/ComparisonSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import LegalSections from './components/LegalSections';
import Footer from './components/Footer';
import MobileStickyCTA from './components/MobileStickyCTA';

export default function App() {
  return (
    <div className="relative min-h-screen bg-slate-50 selection:bg-ice-200 selection:text-ice-900 text-slate-800">
      <Preloader />
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />
      <BackgroundEnvironment />
      <Navbar />
      <main className="relative z-10 overflow-hidden">
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <AutomationWorkflow />
        <ComparisonSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
        <LegalSections />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
