'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { generateQRCode } from '@/lib/utils';
import SimpleCard3D from '@/components/3d/SimpleCard3D';
import SimpleCarousel from '@/components/3d/SimpleCarousel';
import ARSimulation from '@/components/3d/ARSimulation';
import VoiceInteraction from '@/components/ai/VoiceInteraction';
import TiltCard, { EnhancedTiltCard } from '@/components/effects/TiltCard';
import { sampleCards, generateDynamicContent } from '@/data/sampleCards';

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState('live-showcase');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCard, setScannedCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(sampleCards[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const videoRef = useRef(null);

  // Generate QR code on component mount
  useEffect(() => {
    const generateQR = async () => {
      const cardUrl = `https://namecardai.com/card/${selectedCard.id}`;
      const qrUrl = await generateQRCode(cardUrl);
      if (qrUrl) {
        setQrCodeUrl(qrUrl);
      }
    };
    generateQR();
  }, [selectedCard.id]);

  const demos = [
    {
      id: 'live-showcase',
      title: '🌟 Live Card Showcase',
      description: 'See 5 finished AI business cards in action - ready to use!',
      icon: '🎭',
      featured: true,
      priority: 1
    },
    {
      id: 'ai-showcase',
      title: 'AI-Powered Cards',
      description: 'Experience next-level AI business cards with voice interaction',
      icon: '🤖',
      featured: true,
      priority: 2
    },
    {
      id: '3d-hologram',
      title: '3D Holographic Cards',
      description: 'Immersive 3D business cards with real-time animations',
      icon: '🎯',
      featured: true
    },
    {
      id: 'ar-simulation',
      title: 'AR Face Recognition',
      description: 'Advanced AR overlay with face detection and card matching',
      icon: '👁️',
      featured: true
    },
    {
      id: 'smart-search',
      title: 'AI Smart Search',
      description: 'Intelligent card discovery with context-aware recommendations',
      icon: '🔍'
    },
    {
      id: 'qr-scan',
      title: 'QR Code Scan',
      description: 'Instant card access via QR code with 3D reveal animation',
      icon: '📱'
    },
    {
      id: 'voice-assistant',
      title: 'Voice Assistant',
      description: 'Talk to AI personas and get personalized responses',
      icon: '🎤'
    },
    {
      id: 'card-customizer',
      title: 'Live Customizer',
      description: 'Real-time card editing with instant 3D preview',
      icon: '🎨'
    }
  ];

  // Enhanced demo handlers
  const handleScanSimulation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedCard(selectedCard);
    }, 2000);
  };

  const handleCardSelection = (card) => {
    setSelectedCard(card);
    setScannedCard(null);
  };

  const handleSmartSearch = async (query) => {
    setIsSearching(true);
    setSearchQuery(query);

    // Simulate AI-powered search
    await new Promise(resolve => setTimeout(resolve, 1000));

    const results = sampleCards.filter(card =>
      card.name.toLowerCase().includes(query.toLowerCase()) ||
      card.company.toLowerCase().includes(query.toLowerCase()) ||
      card.title.toLowerCase().includes(query.toLowerCase()) ||
      card.industry.toLowerCase().includes(query.toLowerCase()) ||
      card.aiPersonality.interests.some(interest =>
        interest.toLowerCase().includes(query.toLowerCase())
      )
    );

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleVoiceInteraction = (data) => {
    console.log('Voice interaction:', data);
    // Handle voice interaction data
  };

  const handleARCardDetected = (card) => {
    setScannedCard(card);
    console.log('AR card detected:', card);
  };

  const Card3DPreview = ({ card }) => (
    <div className="relative w-full max-w-md mx-auto">
      <div className="aspect-[1.6/1] bg-gradient-to-br from-neon-blue via-electric-purple to-hologram-pink rounded-2xl shadow-2xl shadow-neon-blue/30 transform hover:scale-105 hover:rotate-3 transition-all duration-500 group">
        <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm p-6 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{card.avatar}</div>
            <div>
              <h3 className="text-xl font-bold text-white">{card.name}</h3>
              <p className="text-white/80 text-sm">{card.title}</p>
            </div>
          </div>
          
          {/* Company */}
          <div className="text-center">
            <p className="text-white/90 font-semibold">{card.company}</p>
            <p className="text-white/70 text-sm italic">{card.aiPersonality?.voiceIntro?.substring(0, 50)}...</p>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-1">
            <p className="text-white/80 text-xs">{card.email}</p>
            <p className="text-white/80 text-xs">{card.phone}</p>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-neon-blue rounded-full animate-ping"></div>
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-electric-purple rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-hologram-pink rounded-full animate-bounce"></div>
      </div>
    </div>
  );

  const QRScanDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-text-primary mb-4">QR Code Scan Demo</h3>
        <p className="text-text-secondary">Scan the QR code below to see the magic happen</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* QR Code */}
        <div className="text-center">
          <div className="bg-white p-6 rounded-2xl inline-block mb-4">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="Demo QR Code" className="w-48 h-48" />
            ) : (
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleScanSimulation}
            disabled={isScanning}
            variant="primary"
            size="lg"
          >
            {isScanning ? 'Scanning...' : 'Simulate Scan'}
          </Button>
        </div>
        
        {/* Result */}
        <div>
          {isScanning ? (
            <div className="text-center">
              <div className="animate-pulse text-6xl mb-4">📱</div>
              <p className="text-text-secondary">Scanning QR code...</p>
            </div>
          ) : scannedCard ? (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-text-primary">Card Found!</h4>
              <Card3DPreview card={scannedCard} />
              <div className="text-center">
                <Button variant="outline" size="sm">
                  Save to Contacts
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-text-secondary">
              <div className="text-6xl mb-4">👆</div>
              <p>Scan the QR code to see the result</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const CameraDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-text-primary mb-4">Camera Recognition Demo</h3>
        <p className="text-text-secondary">Point your camera to find digital business cards</p>
      </div>
      
      <div className="bg-dark-space/50 rounded-2xl p-6 border border-electric-purple/20">
        <div className="aspect-video bg-gradient-to-br from-midnight-blue to-deep-purple rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="text-center">
            <div className="text-4xl mb-4">📷</div>
            <p className="text-text-secondary">Camera feed simulation</p>
            <p className="text-sm text-text-secondary mt-2">In real app: Live camera with face detection</p>
          </div>
          
          {/* Scanning overlay */}
          <div className="absolute inset-4 border-2 border-neon-blue/50 rounded-lg">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-blue"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-blue"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-blue"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-blue"></div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="primary">
            Start Camera Recognition
          </Button>
        </div>
      </div>
    </div>
  );

  const Card3DDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-text-primary mb-4">3D Card Renderer</h3>
        <p className="text-text-secondary">Interactive 3D business cards with real-time animations</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card3DPreview card={selectedCard} />
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Customization Options</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Theme</label>
              <div className="grid grid-cols-3 gap-2">
                {['cyber-blue', 'neon-purple', 'matrix-green'].map((theme) => (
                  <button
                    key={theme}
                    className="p-2 rounded-lg border border-electric-purple/30 hover:border-neon-blue/50 transition-colors"
                  >
                    <div className={`w-full h-8 rounded bg-gradient-to-r ${
                      theme === 'cyber-blue' ? 'from-neon-blue to-electric-purple' :
                      theme === 'neon-purple' ? 'from-electric-purple to-hologram-pink' :
                      'from-cyber-green to-matrix-green'
                    }`}></div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-text-secondary mb-2">Effects</label>
              <div className="space-y-2">
                {['Matrix Rain', 'Particle Glow', 'Hologram Flicker'].map((effect) => (
                  <label key={effect} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-text-secondary">{effect}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Live Showcase Demo - 5 Finished Cards
  const LiveShowcaseDemo = () => {
    const [showcaseMode, setShowcaseMode] = useState('carousel'); // 'carousel', 'grid', 'tilt'
    const [selectedShowcaseCard, setSelectedShowcaseCard] = useState(0);

    const handleCarouselSelect = (card, index) => {
      setSelectedShowcaseCard(index);
      setSelectedCard(card);
    };

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-text-primary mb-4">
            🌟 <span className="bg-gradient-to-r from-neon-blue to-electric-purple bg-clip-text text-transparent">
              Live Card Showcase
            </span>
          </h3>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-6">
            Experience 5 production-ready AI business cards. These are fully functional demos showing
            exactly what users will get with NameCardAI.
          </p>

          {/* Showcase Mode Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { id: 'carousel', label: '360° Carousel', icon: '🎠' },
              { id: 'grid', label: '3D Grid', icon: '🎯' },
              { id: 'tilt', label: 'Tilt Effects', icon: '🎭' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setShowcaseMode(mode.id)}
                className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
                  showcaseMode === mode.id
                    ? 'border-neon-blue bg-neon-blue/10 text-neon-blue scale-105'
                    : 'border-electric-purple/30 bg-surface-dark/50 text-text-secondary hover:border-neon-blue/50'
                }`}
              >
                <span className="text-lg mr-2">{mode.icon}</span>
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase Content */}
        {showcaseMode === 'carousel' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold text-text-primary text-center">
              360° Rotating Carousel
            </h4>
            <SimpleCarousel
              cards={sampleCards}
              onCardSelect={handleCarouselSelect}
              activeCardIndex={selectedShowcaseCard}
            />

            {/* Selected Card Details */}
            <div className="max-w-4xl mx-auto">
              <Card variant="glass" className="p-6">
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-xl font-bold text-text-primary mb-4">
                        {sampleCards[selectedShowcaseCard]?.name}
                      </h5>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-text-secondary">Position:</span>
                          <p className="text-text-primary">{sampleCards[selectedShowcaseCard]?.title}</p>
                        </div>
                        <div>
                          <span className="text-sm text-text-secondary">Company:</span>
                          <p className="text-text-primary">{sampleCards[selectedShowcaseCard]?.company}</p>
                        </div>
                        <div>
                          <span className="text-sm text-text-secondary">AI Personality:</span>
                          <p className="text-text-primary text-sm">
                            {sampleCards[selectedShowcaseCard]?.aiPersonality?.voiceIntro}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h6 className="text-lg font-semibold text-text-primary">Live Stats</h6>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-surface-dark/50 rounded-lg text-center">
                          <div className="text-lg font-bold text-neon-blue">
                            {sampleCards[selectedShowcaseCard]?.cardAnalytics?.totalViews?.toLocaleString()}
                          </div>
                          <div className="text-xs text-text-secondary">Total Views</div>
                        </div>
                        <div className="p-3 bg-surface-dark/50 rounded-lg text-center">
                          <div className="text-lg font-bold text-cyber-green">
                            {sampleCards[selectedShowcaseCard]?.cardAnalytics?.engagementRate}%
                          </div>
                          <div className="text-xs text-text-secondary">Engagement</div>
                        </div>
                        <div className="p-3 bg-surface-dark/50 rounded-lg text-center">
                          <div className="text-lg font-bold text-quantum-gold">
                            {sampleCards[selectedShowcaseCard]?.verification?.trustScore}%
                          </div>
                          <div className="text-xs text-text-secondary">Trust Score</div>
                        </div>
                        <div className="p-3 bg-surface-dark/50 rounded-lg text-center">
                          <div className="text-lg font-bold text-hologram-pink">
                            {sampleCards[selectedShowcaseCard]?.cardAnalytics?.uniqueConnections?.toLocaleString()}
                          </div>
                          <div className="text-xs text-text-secondary">Connections</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        {sampleCards[selectedShowcaseCard]?.availableActions?.slice(0, 3).map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <span className="mr-2">{action.icon}</span>
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {showcaseMode === 'grid' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold text-text-primary text-center">
              3D Interactive Grid
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, index) => (
                <div key={card.id} className="h-80">
                  <SimpleCard3D
                    cardData={card}
                    theme={card.cardTheme?.background || 'cyber'}
                    className="h-full cursor-pointer"
                    onClick={() => {
                      setSelectedCard(card);
                      setSelectedShowcaseCard(index);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {showcaseMode === 'tilt' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold text-text-primary text-center">
              3D Tilt Effects
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, index) => (
                <EnhancedTiltCard
                  key={card.id}
                  preset="nft"
                  className="h-64 cursor-pointer"
                  onClick={() => {
                    setSelectedCard(card);
                    setSelectedShowcaseCard(index);
                  }}
                >
                  <Card variant="glass" className="h-full">
                    <CardContent className="p-6 h-full flex flex-col justify-between">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-3xl">{card.avatar}</div>
                        <div>
                          <h5 className="font-bold text-text-primary">{card.name}</h5>
                          <p className="text-sm text-text-secondary">{card.title}</p>
                        </div>
                      </div>

                      <div className="text-center mb-4">
                        <p className="font-semibold text-electric-purple">{card.company}</p>
                        <p className="text-xs text-text-secondary mt-2">
                          {card.industry}
                        </p>
                      </div>

                      <div className="flex justify-between text-xs">
                        <span className="text-cyber-green">
                          {card.cardAnalytics?.totalViews?.toLocaleString()} views
                        </span>
                        <span className="text-quantum-gold">
                          {card.verification?.trustScore}% trust
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </EnhancedTiltCard>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-neon-blue/10 to-electric-purple/10 rounded-2xl border border-neon-blue/20">
          <h4 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Create Your AI Business Card?
          </h4>
          <p className="text-text-secondary mb-6">
            These are real, production-ready examples. Your card will have the same level of sophistication and interactivity.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" size="lg">
              🚀 Start Creating
            </Button>
            <Button variant="outline" size="lg">
              📞 Book Demo Call
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Advanced Demo Components
  const AIShowcaseDemo = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-text-primary mb-4">
          AI-Powered Business Cards
        </h3>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Experience the future of networking with AI-enhanced business cards featuring voice interaction,
          dynamic content, and intelligent recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card Selection */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Select a Card</h4>
          {sampleCards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardSelection(card)}
              className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                selectedCard.id === card.id
                  ? 'border-neon-blue bg-neon-blue/10'
                  : 'border-electric-purple/30 bg-surface-dark/50 hover:border-electric-purple/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{card.avatar}</div>
                <div>
                  <div className="font-semibold text-text-primary">{card.name}</div>
                  <div className="text-sm text-text-secondary">{card.title}</div>
                  <div className="text-xs text-electric-purple">{card.company}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 3D Card Display */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">3D Holographic Card</h4>
          <SimpleCard3D
            cardData={selectedCard}
            theme={selectedCard.cardTheme?.background || 'cyber'}
            className="h-80"
          />

          {/* Card Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-surface-dark/50 rounded-lg">
              <div className="text-lg font-bold text-neon-blue">
                {selectedCard.cardAnalytics?.totalViews.toLocaleString()}
              </div>
              <div className="text-xs text-text-secondary">Total Views</div>
            </div>
            <div className="p-3 bg-surface-dark/50 rounded-lg">
              <div className="text-lg font-bold text-cyber-green">
                {selectedCard.cardAnalytics?.engagementRate}%
              </div>
              <div className="text-xs text-text-secondary">Engagement</div>
            </div>
          </div>
        </div>

        {/* AI Features */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">AI Features</h4>

          {/* Voice Interaction */}
          <VoiceInteraction
            cardData={selectedCard}
            isActive={voiceActive}
            onInteraction={handleVoiceInteraction}
          />
        </div>
      </div>
    </div>
  );

  const HologramDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-text-primary mb-4">
          3D Holographic Business Cards
        </h3>
        <p className="text-text-secondary">
          Immersive 3D business cards with real-time animations and interactive elements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <SimpleCard3D
            cardData={selectedCard}
            theme={selectedCard.cardTheme?.background || 'cyber'}
            className="h-96"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">Customization</h4>

            {/* Theme Selection */}
            <div className="space-y-3">
              <label className="block text-sm text-text-secondary">Theme</label>
              <div className="grid grid-cols-3 gap-2">
                {['cyber', 'matrix', 'neon'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setSelectedCard({...selectedCard, cardTheme: {...selectedCard.cardTheme, background: theme}})}
                    className={`p-3 rounded-lg border transition-colors ${
                      selectedCard.cardTheme?.background === theme
                        ? 'border-neon-blue bg-neon-blue/10'
                        : 'border-electric-purple/30 hover:border-neon-blue/50'
                    }`}
                  >
                    <div className={`w-full h-8 rounded mb-2 ${
                      theme === 'cyber' ? 'bg-gradient-to-r from-neon-blue to-electric-purple' :
                      theme === 'matrix' ? 'bg-gradient-to-r from-cyber-green to-matrix-green' :
                      'bg-gradient-to-r from-hologram-pink to-quantum-gold'
                    }`}></div>
                    <div className="text-xs text-text-secondary capitalize">{theme}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Personality Traits */}
            <div className="space-y-3">
              <label className="block text-sm text-text-secondary">AI Personality</label>
              <div className="flex flex-wrap gap-2">
                {selectedCard.aiPersonality?.personalityTraits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-electric-purple/20 text-electric-purple rounded-full text-xs"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="space-y-3">
              <label className="block text-sm text-text-secondary">Recent Achievements</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedCard.recentAchievements?.map((achievement, index) => (
                  <div key={index} className="text-xs text-text-secondary p-2 bg-surface-dark/50 rounded">
                    • {achievement}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ARSimulationDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-text-primary mb-4">
          AR Face Recognition & Card Overlay
        </h3>
        <p className="text-text-secondary">
          Advanced augmented reality with real-time face detection and intelligent card matching
        </p>
      </div>

      <ARSimulation
        cardData={selectedCard}
        isActive={cameraActive}
        onCardDetected={handleARCardDetected}
      />

      {scannedCard && (
        <div className="mt-6 p-4 bg-surface-dark/50 rounded-lg border border-cyber-green/30">
          <h4 className="text-lg font-semibold text-cyber-green mb-2">Card Detected!</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-text-secondary text-sm mb-2">Detected Person:</p>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{scannedCard.avatar}</div>
                <div>
                  <div className="font-semibold text-text-primary">{scannedCard.name}</div>
                  <div className="text-sm text-text-secondary">{scannedCard.title}</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="primary" size="sm" className="w-full">
                Connect on LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Save to Contacts
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const SmartSearchDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-text-primary mb-4">
          AI-Powered Smart Search
        </h3>
        <p className="text-text-secondary">
          Intelligent card discovery with context-aware recommendations and semantic search
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, company, skills, or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSmartSearch(searchQuery)}
            className="w-full p-4 bg-surface-dark/50 border border-electric-purple/30 rounded-lg text-text-primary placeholder-text-secondary focus:border-neon-blue focus:outline-none"
          />
          <Button
            onClick={() => handleSmartSearch(searchQuery)}
            disabled={isSearching}
            className="absolute right-2 top-2"
            size="sm"
          >
            {isSearching ? '🔄' : '🔍'}
          </Button>
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex flex-wrap gap-2 mt-4">
          {['AI', 'Blockchain', 'Design', 'CEO', 'Developer'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSmartSearch(suggestion)}
              className="px-3 py-1 bg-electric-purple/20 text-electric-purple rounded-full text-sm hover:bg-electric-purple/30 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="text-lg font-semibold text-text-primary">
              Search Results ({searchResults.length})
            </h4>
            {searchResults.map((card) => (
              <div
                key={card.id}
                className="p-4 bg-surface-dark/50 border border-electric-purple/30 rounded-lg hover:border-neon-blue/50 transition-colors cursor-pointer"
                onClick={() => handleCardSelection(card)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{card.avatar}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-text-primary">{card.name}</div>
                    <div className="text-sm text-text-secondary">{card.title} at {card.company}</div>
                    <div className="text-xs text-electric-purple mt-1">
                      {card.aiPersonality.interests.slice(0, 3).join(', ')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-cyber-green">
                      {card.verification.trustScore}% Trust Score
                    </div>
                    <div className="text-xs text-text-secondary">
                      {card.cardAnalytics.totalViews.toLocaleString()} views
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderDemo = () => {
    switch (activeDemo) {
      case 'live-showcase':
        return <LiveShowcaseDemo />;
      case 'ai-showcase':
        return <AIShowcaseDemo />;
      case '3d-hologram':
        return <HologramDemo />;
      case 'ar-simulation':
        return <ARSimulationDemo />;
      case 'smart-search':
        return <SmartSearchDemo />;
      case 'qr-scan':
        return <QRScanDemo />;
      case 'voice-assistant':
        return (
          <div className="max-w-2xl mx-auto">
            <VoiceInteraction
              cardData={selectedCard}
              isActive={true}
              onInteraction={handleVoiceInteraction}
            />
          </div>
        );
      case 'card-customizer':
        return <HologramDemo />; // Reuse hologram demo for customization
      default:
        return <AIShowcaseDemo />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-space via-deep-purple to-midnight-blue">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              <span className="bg-gradient-to-r from-neon-blue to-electric-purple bg-clip-text text-transparent">
                Live Demo
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Experience the future of networking with our interactive demos. See how NameCardAI transforms traditional business cards into immersive AR experiences.
            </p>
          </div>

          {/* Featured Demos */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4 text-center">
              🌟 Featured AI Demos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {demos.filter(demo => demo.featured).map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    activeDemo === demo.id
                      ? 'border-neon-blue bg-neon-blue/10 scale-105 shadow-2xl shadow-neon-blue/20'
                      : 'border-electric-purple/30 bg-surface-dark/50 hover:border-neon-blue/50 hover:bg-surface-light/50 hover:scale-102'
                  }`}
                >
                  <div className="text-4xl mb-4">{demo.icon}</div>
                  <h3 className="font-bold text-text-primary text-lg mb-2">{demo.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{demo.description}</p>
                  {activeDemo === demo.id && (
                    <div className="mt-4 flex items-center gap-2 text-neon-blue text-sm">
                      <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                      Currently Active
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* All Demos Navigation */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
              All Demo Features
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {demos.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    activeDemo === demo.id
                      ? 'border-neon-blue bg-neon-blue/10 scale-105'
                      : 'border-electric-purple/30 bg-surface-dark/50 hover:border-electric-purple/60 hover:bg-surface-light/50'
                  } ${demo.featured ? 'ring-2 ring-quantum-gold/30' : ''}`}
                >
                  <div className="text-2xl mb-1">{demo.icon}</div>
                  <h4 className="font-semibold text-text-primary text-xs mb-1">{demo.title}</h4>
                  <p className="text-xs text-text-secondary line-clamp-2">{demo.description}</p>
                  {demo.featured && (
                    <div className="text-xs text-quantum-gold mt-1">⭐ Featured</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Demo Content */}
          <Card variant="glass" className="p-8">
            <CardContent>
              {renderDemo()}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
