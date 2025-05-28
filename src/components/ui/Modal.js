'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  className = '',
  overlayClassName = ''
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className={cn(
          'absolute inset-0 bg-dark-space/80 backdrop-blur-sm transition-opacity',
          overlayClassName
        )}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={cn(
          'relative w-full mx-4 bg-surface-dark border border-electric-purple/30 rounded-2xl shadow-2xl shadow-neon-blue/20 transform transition-all',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-electric-purple/20">
            {title && (
              <h2 className="text-xl font-bold text-text-primary">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-light/50 hover:bg-surface-light text-text-secondary hover:text-text-primary transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Specialized Modal Components
export const ScheduleMeetingModal = ({ isOpen, onClose, cardData }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="📅 Schedule a Meeting" size="lg">
    <div className="space-y-6">
      {/* Meeting with */}
      <div className="flex items-center gap-4 p-4 bg-surface-light/30 rounded-lg">
        <div className="text-3xl">{cardData?.avatar}</div>
        <div>
          <h3 className="font-semibold text-text-primary">{cardData?.name}</h3>
          <p className="text-sm text-text-secondary">{cardData?.title} at {cardData?.company}</p>
        </div>
      </div>

      {/* Meeting Type */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-3">Meeting Type</label>
        <div className="grid grid-cols-2 gap-3">
          {['Video Call', 'Phone Call', 'In-Person', 'Coffee Chat'].map((type) => (
            <button
              key={type}
              className="p-3 border border-electric-purple/30 rounded-lg text-left hover:border-neon-blue/50 hover:bg-neon-blue/5 transition-colors"
            >
              <div className="font-medium text-text-primary">{type}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Date</label>
          <input
            type="date"
            className="w-full p-3 bg-surface-light/50 border border-electric-purple/30 rounded-lg text-text-primary focus:border-neon-blue focus:outline-none"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Time</label>
          <select className="w-full p-3 bg-surface-light/50 border border-electric-purple/30 rounded-lg text-text-primary focus:border-neon-blue focus:outline-none">
            <option>9:00 AM</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>2:00 PM</option>
            <option>3:00 PM</option>
            <option>4:00 PM</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">Message (Optional)</label>
        <textarea
          rows={3}
          placeholder="What would you like to discuss?"
          className="w-full p-3 bg-surface-light/50 border border-electric-purple/30 rounded-lg text-text-primary placeholder-text-secondary focus:border-neon-blue focus:outline-none resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button variant="primary" className="flex-1">
          📅 Send Meeting Request
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>

      {/* AI Suggestion */}
      <div className="p-4 bg-neon-blue/10 border border-neon-blue/20 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-lg">🤖</div>
          <div>
            <h4 className="font-medium text-neon-blue mb-1">AI Suggestion</h4>
            <p className="text-sm text-text-secondary">
              Based on {cardData?.name}'s calendar, Tuesday 2:00 PM would be optimal for a 30-minute discussion about {cardData?.industry} collaboration.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);

export const ResearchPortfolioModal = ({ isOpen, onClose, cardData }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="📊 Research Portfolio" size="xl">
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-surface-light/30 rounded-lg">
        <div className="text-3xl">{cardData?.avatar}</div>
        <div>
          <h3 className="font-semibold text-text-primary">{cardData?.name}</h3>
          <p className="text-sm text-text-secondary">{cardData?.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-cyber-green/20 text-cyber-green px-2 py-1 rounded">
              {cardData?.verification?.trustScore}% Trust Score
            </span>
            <span className="text-xs bg-electric-purple/20 text-electric-purple px-2 py-1 rounded">
              {cardData?.recentAchievements?.length} Achievements
            </span>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4">🚀 Current Projects</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cardData?.currentProjects?.map((project, index) => (
            <div key={index} className="p-4 border border-electric-purple/30 rounded-lg hover:border-neon-blue/50 transition-colors">
              <h5 className="font-medium text-text-primary mb-2">{project}</h5>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-neon-blue/20 text-neon-blue px-2 py-1 rounded">Active</span>
                <span className="text-text-secondary">2024</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4">🏆 Recent Achievements</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {cardData?.recentAchievements?.map((achievement, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-surface-light/30 rounded-lg">
              <div className="text-lg">✨</div>
              <div>
                <p className="text-text-primary text-sm">{achievement}</p>
                <p className="text-xs text-text-secondary mt-1">2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Interests */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4">💡 Expertise & Interests</h4>
        <div className="flex flex-wrap gap-2">
          {cardData?.aiPersonality?.interests?.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-electric-purple/20 text-electric-purple rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-electric-purple/20">
        <Button variant="primary" className="flex-1">
          📄 Download Full Portfolio
        </Button>
        <Button variant="outline">
          📧 Request Collaboration
        </Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  </Modal>
);

export const LinkedInConnectModal = ({ isOpen, onClose, cardData }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="🔗 Connect on LinkedIn" size="md">
    <div className="space-y-6">
      {/* Profile Preview */}
      <div className="flex items-center gap-4 p-4 bg-surface-light/30 rounded-lg">
        <div className="text-3xl">{cardData?.avatar}</div>
        <div>
          <h3 className="font-semibold text-text-primary">{cardData?.name}</h3>
          <p className="text-sm text-text-secondary">{cardData?.title}</p>
          <p className="text-sm text-electric-purple">{cardData?.company}</p>
        </div>
      </div>

      {/* Connection Message */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Personal Message (Optional)
        </label>
        <textarea
          rows={4}
          placeholder={`Hi ${cardData?.name?.split(' ')[0]}, I'd love to connect and learn more about your work in ${cardData?.industry}...`}
          className="w-full p-3 bg-surface-light/50 border border-electric-purple/30 rounded-lg text-text-primary placeholder-text-secondary focus:border-neon-blue focus:outline-none resize-none"
        />
        <p className="text-xs text-text-secondary mt-1">
          Personalized messages have 3x higher acceptance rates
        </p>
      </div>

      {/* Mutual Connections */}
      <div className="p-4 bg-neon-blue/10 border border-neon-blue/20 rounded-lg">
        <h4 className="font-medium text-neon-blue mb-2">🤝 Mutual Connections</h4>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-electric-purple to-neon-blue rounded-full flex items-center justify-center text-xs">👤</div>
            <div className="w-8 h-8 bg-gradient-to-r from-cyber-green to-matrix-green rounded-full flex items-center justify-center text-xs">👤</div>
            <div className="w-8 h-8 bg-gradient-to-r from-hologram-pink to-quantum-gold rounded-full flex items-center justify-center text-xs">👤</div>
          </div>
          <span className="text-sm text-text-secondary">12 mutual connections</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button variant="primary" className="flex-1">
          🔗 Send Connection Request
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>

      {/* Success Preview */}
      <div className="p-4 bg-cyber-green/10 border border-cyber-green/20 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-lg">✅</div>
          <div>
            <h4 className="font-medium text-cyber-green mb-1">Connection Preview</h4>
            <p className="text-sm text-text-secondary">
              Your request will be sent to {cardData?.name} with your personalized message. 
              They typically respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);

export default Modal;
