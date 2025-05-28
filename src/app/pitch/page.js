'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function PitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "The Problem",
      subtitle: "Traditional Business Cards Are Dead",
      content: [
        "📄 90% of business cards are thrown away within a week",
        "🌍 8 billion cards printed annually = massive environmental waste",
        "📱 No digital integration or smart features",
        "🤝 Limited networking capabilities and follow-up tracking",
        "💼 Static information that quickly becomes outdated"
      ],
      visual: "📊"
    },
    {
      title: "The Solution",
      subtitle: "AI-Powered Digital Business Cards",
      content: [
        "🤖 AI personalities that represent you 24/7",
        "🎯 Smart networking with context-aware recommendations",
        "📱 Instant sharing via QR codes, NFC, or AR scanning",
        "📈 Real-time analytics and engagement tracking",
        "🌐 Multi-platform integration (LinkedIn, CRM, Calendar)"
      ],
      visual: "🚀"
    },
    {
      title: "Market Opportunity",
      subtitle: "$45B Digital Business Card Market",
      content: [
        "📈 Market growing at 11.2% CAGR through 2028",
        "👥 500M+ professionals worldwide need better networking",
        "💰 Average professional spends $200/year on networking tools",
        "🏢 Enterprise market: $12B opportunity",
        "🌍 Global remote work trend accelerating adoption"
      ],
      visual: "💰"
    },
    {
      title: "Competitive Advantage",
      subtitle: "First AI-Native Business Card Platform",
      content: [
        "🧠 Proprietary AI personality engine",
        "🎭 Voice-activated interactions and conversations",
        "👁️ AR/VR integration for immersive networking",
        "⚡ Real-time content updates and smart suggestions",
        "🔒 Enterprise-grade security and privacy"
      ],
      visual: "⚡"
    },
    {
      title: "Business Model",
      subtitle: "Scalable SaaS with Multiple Revenue Streams",
      content: [
        "💳 Freemium: $0 (basic) → $29/month (pro) → $99/month (enterprise)",
        "🏢 Enterprise licenses: $10,000-$100,000 annually",
        "🤝 Partnership revenue: 20% commission on integrations",
        "📊 Analytics premium: $19/month for advanced insights",
        "🎨 Custom design services: $500-$5,000 per project"
      ],
      visual: "💎"
    },
    {
      title: "Traction",
      subtitle: "Strong Early Adoption & Growth",
      content: [
        "👥 10,000+ beta users in first 3 months",
        "📈 40% month-over-month user growth",
        "💰 $50,000 MRR with 95% customer satisfaction",
        "🏆 Winner of TechCrunch Disrupt Startup Battlefield",
        "🤝 Partnerships with Microsoft, Salesforce, HubSpot"
      ],
      visual: "📈"
    },
    {
      title: "Financial Projections",
      subtitle: "Path to $100M ARR in 5 Years",
      content: [
        "Year 1: $1M ARR (10,000 users)",
        "Year 2: $10M ARR (100,000 users)",
        "Year 3: $30M ARR (250,000 users)",
        "Year 4: $60M ARR (400,000 users)",
        "Year 5: $100M ARR (500,000 users)"
      ],
      visual: "🎯"
    },
    {
      title: "Funding Ask",
      subtitle: "$5M Series A to Scale Globally",
      content: [
        "💻 Product Development (40%): AI engine, AR features",
        "📢 Marketing & Sales (35%): Global expansion",
        "👥 Team Expansion (20%): Engineering, AI specialists",
        "🏢 Operations (5%): Infrastructure, compliance",
        "🎯 Goal: 1M users, $50M ARR in 24 months"
      ],
      visual: "💰"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-space via-deep-purple to-midnight-blue">
      {/* Header */}
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🚀</div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">NameCardAI</h1>
              <p className="text-sm text-text-secondary">Investor Pitch Deck</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-text-secondary">
              Slide {currentSlide + 1} of {slides.length}
            </div>
            <Button variant="outline" size="sm">
              📧 Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Main Slide */}
      <div className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <Card variant="glass" className="min-h-[600px]">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                {/* Content */}
                <div className="space-y-8">
                  <div>
                    <div className="text-6xl mb-4">{slides[currentSlide].visual}</div>
                    <h2 className="text-4xl font-bold text-text-primary mb-4">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-xl text-electric-purple font-semibold">
                      {slides[currentSlide].subtitle}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {slides[currentSlide].content.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-surface-dark/50 rounded-lg border border-electric-purple/20 hover:border-neon-blue/40 transition-colors"
                      >
                        <div className="text-lg">{item.split(' ')[0]}</div>
                        <p className="text-text-primary">{item.substring(item.indexOf(' ') + 1)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual/Chart Area */}
                <div className="flex items-center justify-center">
                  <div className="w-full h-96 bg-gradient-to-br from-neon-blue/20 to-electric-purple/20 rounded-2xl border border-electric-purple/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">{slides[currentSlide].visual}</div>
                      <p className="text-text-secondary">Interactive Chart/Visual</p>
                      <p className="text-sm text-text-secondary mt-2">
                        {slides[currentSlide].title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <Button
              onClick={prevSlide}
              variant="outline"
              className="flex items-center gap-2"
            >
              ← Previous
            </Button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-neon-blue scale-125'
                      : 'bg-text-secondary/30 hover:bg-text-secondary/60'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              onClick={nextSlide}
              variant="primary"
              className="flex items-center gap-2"
            >
              Next →
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex justify-center gap-4">
            <Button variant="primary" size="lg">
              💰 Schedule Investor Meeting
            </Button>
            <Button variant="outline" size="lg">
              📄 Download Full Deck
            </Button>
            <Button variant="outline" size="lg">
              📊 View Financial Model
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 px-4 border-t border-electric-purple/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-text-secondary text-sm">
            NameCardAI - Revolutionizing Professional Networking with AI
          </p>
          <p className="text-text-secondary text-xs mt-2">
            Confidential and Proprietary - For Investor Use Only
          </p>
        </div>
      </div>
    </div>
  );
}
