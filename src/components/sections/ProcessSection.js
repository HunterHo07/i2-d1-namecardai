'use client';

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Card",
      description: "Design your AR-enhanced digital business card with our intuitive editor",
      icon: "🎨"
    },
    {
      number: "02", 
      title: "Share Instantly",
      description: "Share via QR, NFC, camera scan, or just your name - no app required",
      icon: "📤"
    },
    {
      number: "03",
      title: "Make Impact",
      description: "Recipients see your 3D animated card with immersive AR experience",
      icon: "✨"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-space to-midnight-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-quantum-gold to-hologram-pink bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-text-secondary">
            Three simple steps to revolutionize your networking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-neon-blue to-electric-purple rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-quantum-gold rounded-full flex items-center justify-center text-dark-space font-bold text-sm">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                {step.title}
              </h3>
              
              <p className="text-text-secondary">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
