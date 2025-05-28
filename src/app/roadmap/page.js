'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function RoadmapPage() {
  const [selectedQuarter, setSelectedQuarter] = useState('Q1-2024');

  const roadmapData = {
    'Q1-2024': {
      title: 'Q1 2024 - Foundation & Launch',
      status: 'completed',
      progress: 100,
      features: [
        { name: 'Core AI Business Card Platform', status: 'completed', icon: '🤖' },
        { name: 'QR Code & NFC Sharing', status: 'completed', icon: '📱' },
        { name: 'Basic Analytics Dashboard', status: 'completed', icon: '📊' },
        { name: 'Mobile App (iOS/Android)', status: 'completed', icon: '📲' },
        { name: 'LinkedIn Integration', status: 'completed', icon: '🔗' }
      ]
    },
    'Q2-2024': {
      title: 'Q2 2024 - AI Enhancement',
      status: 'completed',
      progress: 100,
      features: [
        { name: 'Voice-Activated AI Personalities', status: 'completed', icon: '🎤' },
        { name: 'Smart Networking Recommendations', status: 'completed', icon: '🧠' },
        { name: 'Advanced 3D Card Rendering', status: 'completed', icon: '🎯' },
        { name: 'CRM Integrations (Salesforce, HubSpot)', status: 'completed', icon: '💼' },
        { name: 'Multi-language Support (10 languages)', status: 'completed', icon: '🌍' }
      ]
    },
    'Q3-2024': {
      title: 'Q3 2024 - AR & Enterprise',
      status: 'in-progress',
      progress: 75,
      features: [
        { name: 'AR Face Recognition & Card Overlay', status: 'completed', icon: '👁️' },
        { name: 'Enterprise Team Management', status: 'completed', icon: '🏢' },
        { name: 'Advanced Security & Compliance', status: 'in-progress', icon: '🔒' },
        { name: 'API Platform for Developers', status: 'in-progress', icon: '⚙️' },
        { name: 'White-label Solutions', status: 'planned', icon: '🏷️' }
      ]
    },
    'Q4-2024': {
      title: 'Q4 2024 - Scale & Intelligence',
      status: 'planned',
      progress: 25,
      features: [
        { name: 'AI-Powered Meeting Scheduling', status: 'in-progress', icon: '📅' },
        { name: 'Blockchain Verification System', status: 'planned', icon: '⛓️' },
        { name: 'Advanced Analytics & Insights', status: 'planned', icon: '📈' },
        { name: 'Video Business Cards', status: 'planned', icon: '🎥' },
        { name: 'Global Marketplace Launch', status: 'planned', icon: '🌐' }
      ]
    },
    'Q1-2025': {
      title: 'Q1 2025 - Next-Gen Features',
      status: 'planned',
      progress: 0,
      features: [
        { name: 'VR/Metaverse Integration', status: 'planned', icon: '🥽' },
        { name: 'AI-Generated Content Creation', status: 'planned', icon: '✨' },
        { name: 'Smart Contract Networking', status: 'planned', icon: '📜' },
        { name: 'Holographic Display Support', status: 'planned', icon: '🔮' },
        { name: 'Neural Interface Compatibility', status: 'research', icon: '🧬' }
      ]
    },
    'Q2-2025': {
      title: 'Q2 2025 - Global Expansion',
      status: 'planned',
      progress: 0,
      features: [
        { name: 'Multi-language AI (50+ languages)', status: 'planned', icon: '🗣️' },
        { name: 'Regional Data Centers', status: 'planned', icon: '🌍' },
        { name: 'Local Partnership Program', status: 'planned', icon: '🤝' },
        { name: 'Cultural Adaptation Engine', status: 'planned', icon: '🎭' },
        { name: 'Government & Enterprise Rollout', status: 'planned', icon: '🏛️' }
      ]
    }
  };

  const quarters = Object.keys(roadmapData);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-cyber-green';
      case 'in-progress': return 'text-neon-blue';
      case 'planned': return 'text-electric-purple';
      case 'research': return 'text-quantum-gold';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'planned': return '📋';
      case 'research': return '🔬';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-space via-deep-purple to-midnight-blue">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              <span className="bg-gradient-to-r from-neon-blue via-electric-purple to-hologram-pink bg-clip-text text-transparent">
                Product Roadmap
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Our journey to revolutionize professional networking with AI. 
              See what we've built and what's coming next.
            </p>
          </div>

          {/* Timeline Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {quarters.map((quarter) => {
              const data = roadmapData[quarter];
              return (
                <button
                  key={quarter}
                  onClick={() => setSelectedQuarter(quarter)}
                  className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
                    selectedQuarter === quarter
                      ? 'border-neon-blue bg-neon-blue/10 text-neon-blue scale-105'
                      : 'border-electric-purple/30 bg-surface-dark/50 text-text-secondary hover:border-neon-blue/50'
                  }`}
                >
                  <div className="font-semibold">{quarter}</div>
                  <div className="text-xs mt-1">
                    {data.progress}% Complete
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected Quarter Details */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card variant="glass" className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-text-primary mb-2">
                    {roadmapData[selectedQuarter].title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className={`font-semibold ${getStatusColor(roadmapData[selectedQuarter].status)}`}>
                      {getStatusIcon(roadmapData[selectedQuarter].status)} 
                      {roadmapData[selectedQuarter].status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="text-text-secondary">
                      {roadmapData[selectedQuarter].progress}% Complete
                    </span>
                  </div>
                </div>
                
                {/* Progress Circle */}
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(139, 92, 246, 0.3)"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#00f5ff"
                      strokeWidth="2"
                      strokeDasharray={`${roadmapData[selectedQuarter].progress}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-neon-blue">
                      {roadmapData[selectedQuarter].progress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-surface-dark/50 rounded-full h-2 mb-8">
                <div 
                  className="bg-gradient-to-r from-neon-blue to-electric-purple h-2 rounded-full transition-all duration-500"
                  style={{ width: `${roadmapData[selectedQuarter].progress}%` }}
                />
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmapData[selectedQuarter].features.map((feature, index) => (
                  <div
                    key={index}
                    className="p-4 bg-surface-dark/30 rounded-lg border border-electric-purple/20 hover:border-neon-blue/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{feature.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary mb-2">
                          {feature.name}
                        </h4>
                        <div className={`text-sm font-medium ${getStatusColor(feature.status)}`}>
                          {getStatusIcon(feature.status)} {feature.status.replace('-', ' ').toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card variant="glass" className="p-12">
            <CardContent>
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                The Future of Networking
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                We're building more than just digital business cards. We're creating the infrastructure 
                for the next generation of professional relationships, powered by AI and enhanced by emerging technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg">
                  🎯 Join Our Beta Program
                </Button>
                <Button variant="outline" size="lg">
                  📧 Get Updates
                </Button>
                <Button variant="outline" size="lg">
                  💡 Suggest Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
