'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const PricingSection = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  const plans = [
    {
      id: 'free',
      name: 'Free',
      tagline: 'Get Started',
      description: 'Perfect for trying out NameCardAI',
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      features: [
        'Basic 3D card with random preset effect',
        'QR code sharing',
        '5 card saves per month',
        'NameCardAI branding',
        'Basic analytics',
        'Community support'
      ],
      limitations: [
        'Limited customization',
        'No NFC sharing',
        'No camera scan',
        'Basic effects only'
      ],
      cta: 'Start Free',
      color: 'from-text-secondary to-text-secondary'
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'Most Popular',
      description: 'For professionals who want to stand out',
      monthlyPrice: 15,
      yearlyPrice: 150,
      popular: true,
      features: [
        'Choose from 20+ preset AR styles',
        'Custom intro templates',
        'QR + NFC + Camera scan sharing',
        'Unlimited card saves',
        'Advanced analytics',
        'Remove branding',
        'Priority support',
        'Custom colors & fonts'
      ],
      limitations: [],
      cta: 'Go Pro',
      color: 'from-neon-blue to-electric-purple'
    },
    {
      id: 'premium',
      name: 'Premium',
      tagline: 'Full Power',
      description: 'For creators who demand the best',
      monthlyPrice: 35,
      yearlyPrice: 350,
      popular: false,
      features: [
        'Fully custom animated AR intros',
        '3D avatar creation',
        'Video overlay capabilities',
        'Advanced analytics dashboard',
        'White-label options',
        'API access',
        'Custom integrations',
        'Dedicated account manager'
      ],
      limitations: [],
      cta: 'Go Premium',
      color: 'from-hologram-pink to-quantum-gold'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'Custom Solution',
      description: 'For teams and organizations',
      monthlyPrice: 99,
      yearlyPrice: 990,
      popular: false,
      features: [
        'Everything in Premium',
        'Team management dashboard',
        'Company branding',
        'CRM integration',
        'Bulk card creation',
        'Advanced security',
        'Custom development',
        'On-premise deployment'
      ],
      limitations: [],
      cta: 'Contact Sales',
      color: 'from-cyber-green to-matrix-green'
    }
  ];

  const PricingCard = ({ plan, index }) => {
    const isHovered = hoveredPlan === plan.id;
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const savings = billingCycle === 'yearly' ? Math.round(((plan.monthlyPrice * 12) - plan.yearlyPrice) / (plan.monthlyPrice * 12) * 100) : 0;

    return (
      <div
        className={`relative transition-all duration-500 ${
          isHovered ? 'scale-105 z-10' : 'scale-100 z-0'
        } ${plan.popular ? 'md:-mt-8' : ''}`}
        onMouseEnter={() => setHoveredPlan(plan.id)}
        onMouseLeave={() => setHoveredPlan(null)}
      >
        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-gradient-to-r from-neon-blue to-electric-purple px-4 py-1 rounded-full text-sm font-semibold text-white">
              {plan.tagline}
            </div>
          </div>
        )}

        <Card
          variant={plan.popular ? 'neon' : 'glass'}
          className={`h-full relative overflow-hidden ${
            plan.popular ? 'border-2 border-neon-blue' : ''
          }`}
          hover={false}
          glow={isHovered}
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5 ${
            isHovered ? 'opacity-10' : ''
          } transition-opacity duration-500`} />

          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-2xl mb-2">
              {plan.name}
            </CardTitle>

            <div className="text-sm text-text-secondary mb-4">
              {plan.description}
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-text-primary">
                  ${price}
                </span>
                <span className="text-text-secondary ml-1">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>

              {savings > 0 && (
                <div className="text-sm text-cyber-green mt-1">
                  Save {savings}% with yearly billing
                </div>
              )}
            </div>

            <Button
              variant={plan.popular ? 'primary' : 'outline'}
              size="lg"
              className="w-full mb-6"
            >
              {plan.cta}
            </Button>
          </CardHeader>

          <CardContent className="relative z-10">
            {/* Features */}
            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-text-primary">Included:</h4>
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-cyber-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
                  </div>
                  <span className="text-sm text-text-secondary">{feature}</span>
                </div>
              ))}
            </div>

            {/* Limitations */}
            {plan.limitations.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-electric-purple/20">
                <h4 className="font-semibold text-text-primary">Limitations:</h4>
                {plan.limitations.map((limitation, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-hologram-pink/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-hologram-pink rounded-full"></div>
                    </div>
                    <span className="text-sm text-text-secondary">{limitation}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          {/* Hover Effect Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 ${
            isHovered ? 'opacity-5' : ''
          } transition-opacity duration-500 pointer-events-none`} />
        </Card>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-deep-purple to-dark-space relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-quantum-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyber-green/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-neon-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-quantum-gold to-cyber-green bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Start free and upgrade as you grow. All plans include our core AR technology.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-text-primary' : 'text-text-secondary'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                billingCycle === 'yearly' ? 'bg-neon-blue' : 'bg-surface-dark'
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-text-primary' : 'text-text-secondary'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="text-sm text-cyber-green font-semibold">Save up to 17%</span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-text-secondary mb-6">
            Need a custom solution? We've got you covered.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12 p-6 bg-surface-dark/50 rounded-2xl border border-electric-purple/20">
          <div className="text-2xl mb-2">💰</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            30-Day Money-Back Guarantee
          </h3>
          <p className="text-text-secondary">
            Try NameCardAI risk-free. If you're not completely satisfied, we'll refund your money.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
