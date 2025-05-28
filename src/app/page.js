import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ProcessSection from '@/components/sections/ProcessSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PricingSection from '@/components/sections/PricingSection';
import FooterSection from '@/components/sections/FooterSection';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section - Matrix Effect Background */}
      <HeroSection />

      {/* Problem Statement - 3D Tilt Cards */}
      <ProblemSection />

      {/* Solution Overview - Typing Text Animation */}
      <SolutionSection />

      {/* 3-Step Process - Scroll-triggered Reveals */}
      <ProcessSection />

      {/* MVP Feature Preview - Carousel with Parallax */}
      <FeaturesSection />

      {/* Pricing Plans - Hover Transformations */}
      <PricingSection />

      {/* More sections coming soon... */}
      <section className="py-20 bg-gradient-to-b from-dark-space to-midnight-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            More Amazing Sections Coming Soon...
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            We're building testimonials, competitor comparisons, trust elements, and more interactive demos.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-surface-dark/50 rounded-lg border border-electric-purple/20">
              <div className="text-2xl mb-2">💬</div>
              <div className="text-sm text-text-secondary">Testimonials</div>
            </div>
            <div className="p-4 bg-surface-dark/50 rounded-lg border border-electric-purple/20">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm text-text-secondary">Comparisons</div>
            </div>
            <div className="p-4 bg-surface-dark/50 rounded-lg border border-electric-purple/20">
              <div className="text-2xl mb-2">🛡️</div>
              <div className="text-sm text-text-secondary">Trust Elements</div>
            </div>
            <div className="p-4 bg-surface-dark/50 rounded-lg border border-electric-purple/20">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-sm text-text-secondary">Early Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
