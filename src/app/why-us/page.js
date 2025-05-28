'use client';

import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function WhyUsPage() {
  const advantages = [
    {
      icon: "🧠",
      title: "AI-First Approach",
      description: "Built from the ground up with artificial intelligence at the core",
      details: [
        "Proprietary AI personality engine",
        "Natural language processing for conversations",
        "Machine learning for networking recommendations",
        "Predictive analytics for engagement optimization"
      ]
    },
    {
      icon: "⚡",
      title: "Cutting-Edge Technology",
      description: "Latest tech stack for unmatched performance and scalability",
      details: [
        "Real-time 3D rendering and AR integration",
        "Voice recognition and synthesis",
        "Blockchain-based verification system",
        "Edge computing for instant responses"
      ]
    },
    {
      icon: "🎯",
      title: "User-Centric Design",
      description: "Obsessively focused on user experience and satisfaction",
      details: [
        "Intuitive interface with zero learning curve",
        "Accessibility-first design principles",
        "Mobile-optimized for on-the-go networking",
        "Continuous user feedback integration"
      ]
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "Bank-level security with privacy-by-design architecture",
      details: [
        "End-to-end encryption for all data",
        "GDPR and CCPA compliant",
        "SOC 2 Type II certified",
        "Zero-trust security model"
      ]
    },
    {
      icon: "🌍",
      title: "Global Scalability",
      description: "Built to serve millions of users across all continents",
      details: [
        "Multi-language support (50+ languages)",
        "Cultural adaptation for local markets",
        "99.99% uptime with global CDN",
        "Auto-scaling cloud infrastructure"
      ]
    },
    {
      icon: "🤝",
      title: "Strategic Partnerships",
      description: "Integrated with the tools professionals already use",
      details: [
        "Native CRM integrations (Salesforce, HubSpot)",
        "Calendar sync (Google, Outlook, Apple)",
        "Social media connections (LinkedIn, Twitter)",
        "Video conferencing (Zoom, Teams, Meet)"
      ]
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      background: "Former Google AI Research Director",
      avatar: "👩‍💼",
      achievements: ["PhD in AI from Stanford", "15+ years in tech leadership", "3 successful exits"]
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      background: "Ex-Tesla Autopilot Lead Engineer",
      avatar: "👨‍💻",
      achievements: ["MIT Computer Science", "20+ patents in AI/ML", "Built systems for 100M+ users"]
    },
    {
      name: "Alex Kim",
      role: "Head of Product",
      background: "Former Airbnb Product Director",
      avatar: "👨‍🎨",
      achievements: ["Design thinking expert", "10+ years product leadership", "User experience innovator"]
    }
  ];

  const metrics = [
    { label: "Customer Satisfaction", value: "98%", icon: "😊" },
    { label: "Uptime Guarantee", value: "99.99%", icon: "⚡" },
    { label: "Response Time", value: "<100ms", icon: "🚀" },
    { label: "Security Incidents", value: "0", icon: "🔒" },
    { label: "Countries Served", value: "50+", icon: "🌍" },
    { label: "Languages Supported", value: "25+", icon: "🗣️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-space via-deep-purple to-midnight-blue">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              <span className="bg-gradient-to-r from-neon-blue via-electric-purple to-hologram-pink bg-clip-text text-transparent">
                Why Choose NameCardAI?
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              We're not just another digital business card platform. We're the future of professional networking, 
              powered by cutting-edge AI and built by industry veterans.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
            {metrics.map((metric, index) => (
              <Card key={index} variant="glass" className="text-center p-6">
                <CardContent>
                  <div className="text-3xl mb-2">{metric.icon}</div>
                  <div className="text-2xl font-bold text-neon-blue mb-1">{metric.value}</div>
                  <div className="text-sm text-text-secondary">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Our Competitive Advantages
            </h2>
            <p className="text-lg text-text-secondary">
              What sets us apart from traditional business card solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} variant="glass" className="h-full">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{advantage.icon}</div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {advantage.description}
                  </p>
                  <ul className="space-y-2">
                    {advantage.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-electric-purple mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              World-Class Team
            </h2>
            <p className="text-lg text-text-secondary">
              Industry veterans with proven track records at top tech companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} variant="glass">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {member.name}
                  </h3>
                  <p className="text-electric-purple font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-text-secondary mb-4">
                    {member.background}
                  </p>
                  <div className="space-y-1">
                    {member.achievements.map((achievement, idx) => (
                      <div key={idx} className="text-sm text-text-secondary">
                        • {achievement}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card variant="glass" className="p-12">
            <CardContent>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Ready to Experience the Future?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Join thousands of professionals who have already transformed their networking with NameCardAI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg">
                  🚀 Start Free Trial
                </Button>
                <Button variant="outline" size="lg">
                  📞 Schedule Demo
                </Button>
                <Button variant="outline" size="lg">
                  📊 View Case Studies
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
