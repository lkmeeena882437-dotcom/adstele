import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import ServicesSection from './components/ServicesSection';
import AutomationWorkflow from './components/AutomationWorkflow';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import LegalSections from './components/LegalSections';
import Footer from './components/Footer';
import MobileStickyCTA from './components/MobileStickyCTA';
import BackgroundEnvironment from './components/BackgroundEnvironment';

function App() {
  return (
    <div className="relative min-h-screen bg-slate-50 selection:bg-ice-200 selection:text-ice-900 font-[var(--font-sans)] text-slate-800">
      <BackgroundEnvironment />
      <Navbar />

      <main className="relative z-10 overflow-hidden">
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <AutomationWorkflow />
        <PricingSection />
        <ContactSection />
        <LegalSections />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}

export default App;
