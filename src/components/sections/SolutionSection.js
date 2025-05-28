'use client';

import { EnhancedTypingText } from '@/components/effects/TypingText';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const SolutionSection = () => {
  const features = [
    "AR-powered digital business cards",
    "Multiple sharing methods: QR, NFC, camera scan",
    "Works without app downloads",
    "Real-time 3D animations",
    "Name/number recognition technology"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-deep-purple to-dark-space relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-cyber-green to-neon-blue bg-clip-text text-transparent">
              Our Solution
            </span>
          </h2>
          
          <div className="text-2xl md:text-3xl text-text-primary mb-8">
            <EnhancedTypingText
              preset="subtitle"
              texts={features}
              speed={60}
              deleteSpeed={30}
              pauseTime={2000}
              loop={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-text-primary mb-6">
              The Future of Professional Identity
            </h3>
            <p className="text-lg text-text-secondary mb-8">
              NameCardAI combines cutting-edge AR technology with practical networking needs. 
              Share your professional identity through immersive 3D experiences that people actually remember.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "✨ AR-enhanced visual storytelling",
                "🔄 Multiple sharing methods",
                "📱 No app downloads required",
                "🎯 Instant recognition technology"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-cyber-green">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="primary" size="lg">
              See How It Works
            </Button>
          </div>

          <div className="relative">
            <Card variant="neon" className="p-8">
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🚀</div>
                    <p className="text-text-secondary">Interactive Demo Coming Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
