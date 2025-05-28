'use client';

import Link from 'next/link';

const FooterSection = () => {
  return (
    <footer className="py-16 bg-gradient-to-b from-deep-purple to-dark-space border-t border-electric-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-electric-purple rounded-lg"></div>
              <span className="text-xl font-bold font-display text-text-primary">NameCardAI</span>
            </div>
            <p className="text-text-secondary mb-4">
              Revolutionizing professional networking with AR-enhanced digital business cards.
            </p>
            <p className="text-sm text-text-secondary">
              © 2024 NameCardAI. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/demo" className="text-text-secondary hover:text-neon-blue transition-colors">Demo</Link></li>
              <li><Link href="/pricing" className="text-text-secondary hover:text-neon-blue transition-colors">Pricing</Link></li>
              <li><Link href="/features" className="text-text-secondary hover:text-neon-blue transition-colors">Features</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-text-secondary hover:text-neon-blue transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-text-secondary hover:text-neon-blue transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-text-secondary hover:text-neon-blue transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
