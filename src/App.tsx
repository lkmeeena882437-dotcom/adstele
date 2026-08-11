import { useEffect } from 'react';
import BackgroundEnvironment from './components/BackgroundEnvironment';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import ServicesSection from './components/ServicesSection';
import NichesSection from './components/NichesSection';
import AIArchitectSection from './components/AIArchitectSection';
import ConfiguratorSection from './components/ConfiguratorSection';
import PricingSection from './components/PricingSection';
import AutomationWorkflow from './components/AutomationWorkflow';
import CommandCenter from './components/CommandCenter';
import WhyUsSection from './components/WhyUsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import LegalSections from './components/LegalSections';
import MobileStickyCTA from './components/MobileStickyCTA';
import { trackEvent } from './utils/analytics';

export default function App() {
  useEffect(() => {
    trackEvent('page_view');
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Living background environment */}
      <BackgroundEnvironment />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero */}
        <HeroSection />

        {/* Problem / Platform */}
        <ProblemSection />

        {/* Services */}
        <ServicesSection />

        {/* Niches */}
        <NichesSection />

        {/* AI Growth Architect */}
        <AIArchitectSection />

        {/* Configurator */}
        <ConfiguratorSection />

        {/* Pricing */}
        <PricingSection />

        {/* Automation Workflow */}
        <AutomationWorkflow />

        {/* Command Center */}
        <CommandCenter />

        {/* Why Us + Trust */}
        <WhyUsSection />

        {/* FAQ */}
        <FAQSection />

        {/* Contact */}
        <ContactSection />

        {/* Final CTA */}
        <FinalCTA />

        {/* Legal sections */}
        <LegalSections />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile sticky CTA */}
      <MobileStickyCTA />
    </div>
  );
}
