'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const VoiceInteraction = ({ cardData, isActive = false, onInteraction }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [conversation, setConversation] = useState([]);
  const [voiceLevel, setVoiceLevel] = useState(0);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech Recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript(finalTranscript);
            handleVoiceInput(finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
      }

      // Speech Synthesis
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }
    }
  }, []);

  // AI Response Generator
  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    const { aiPersonality, recentAchievements, currentProjects, availableActions } = cardData;

    // Context-aware responses
    if (input.includes('hello') || input.includes('hi') || input.includes('introduce')) {
      return aiPersonality.voiceIntro;
    }
    
    if (input.includes('project') || input.includes('working on')) {
      const project = currentProjects[Math.floor(Math.random() * currentProjects.length)];
      return `I'm currently working on ${project}. It's really exciting because it combines ${aiPersonality.interests.slice(0, 2).join(' and ')}.`;
    }
    
    if (input.includes('achievement') || input.includes('accomplishment')) {
      const achievement = recentAchievements[Math.floor(Math.random() * recentAchievements.length)];
      return `One of my recent achievements is ${achievement}. I'm particularly proud of this because it aligns with my passion for ${aiPersonality.interests[0]}.`;
    }
    
    if (input.includes('meet') || input.includes('schedule') || input.includes('coffee')) {
      return `I'd love to meet! You can schedule a meeting through my calendar link, or we can connect on LinkedIn first. What works best for you?`;
    }
    
    if (input.includes('contact') || input.includes('reach')) {
      return `The best way to reach me is via email at ${cardData.email}, or you can connect with me on LinkedIn. I typically respond within 24 hours.`;
    }
    
    if (input.includes('company') || input.includes('work')) {
      return `I work at ${cardData.company}, where we focus on ${cardData.industry}. We're doing some groundbreaking work in ${aiPersonality.interests[0]}.`;
    }

    // Default responses based on personality
    const responses = [
      `That's interesting! As someone who's ${aiPersonality.personalityTraits.join(', ')}, I'd love to explore that topic further.`,
      `Great question! My experience in ${cardData.industry} has taught me that ${aiPersonality.interests[0]} is key to innovation.`,
      `I appreciate your curiosity! Feel free to reach out anytime to discuss ${aiPersonality.interests.slice(0, 2).join(' or ')}.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Handle voice input
  const handleVoiceInput = async (input) => {
    setIsListening(false);
    setIsProcessing(true);
    
    // Add user message to conversation
    const userMessage = { type: 'user', content: input, timestamp: Date.now() };
    setConversation(prev => [...prev, userMessage]);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate AI response
    const response = generateAIResponse(input);
    setAiResponse(response);
    
    // Add AI response to conversation
    const aiMessage = { type: 'ai', content: response, timestamp: Date.now() };
    setConversation(prev => [...prev, aiMessage]);
    
    setIsProcessing(false);
    
    // Speak the response
    speakResponse(response);
    
    // Trigger interaction callback
    onInteraction && onInteraction({ type: 'voice_interaction', input, response });
  };

  // Text-to-speech
  const speakResponse = (text) => {
    if (synthRef.current && text) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      // Try to use a more natural voice
      const voices = synthRef.current.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') ||
        voice.lang.includes('en-US')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  // Start/stop listening
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
        setTranscript('');
      }
    }
  };

  // Voice level visualization
  const VoiceVisualizer = () => {
    const bars = Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2 bg-neon-blue rounded-full transition-all duration-150 ${
          isListening ? 'animate-pulse' : ''
        }`}
        style={{
          height: `${Math.random() * 40 + 10}px`,
          animationDelay: `${i * 0.1}s`
        }}
      />
    ));

    return (
      <div className="flex items-end gap-1 h-12 justify-center">
        {bars}
      </div>
    );
  };

  // AI Avatar Animation
  const AIAvatar = () => (
    <div className="relative">
      <div className={`text-6xl transition-all duration-300 ${
        isSpeaking ? 'animate-bounce' : 
        isProcessing ? 'animate-pulse' : 
        isListening ? 'animate-ping' : ''
      }`}>
        🤖
      </div>
      
      {/* Status indicator */}
      <div className="absolute -bottom-2 -right-2">
        <div className={`w-4 h-4 rounded-full ${
          isSpeaking ? 'bg-cyber-green animate-pulse' :
          isProcessing ? 'bg-quantum-gold animate-spin' :
          isListening ? 'bg-neon-blue animate-ping' :
          'bg-text-secondary/50'
        }`} />
      </div>
    </div>
  );

  return (
    <Card variant="glass" className="p-6">
      <CardContent>
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              AI Voice Assistant
            </h3>
            <p className="text-text-secondary">
              Talk to {cardData.name}'s AI persona
            </p>
          </div>

          {/* AI Avatar */}
          <div className="flex justify-center">
            <AIAvatar />
          </div>

          {/* Voice Visualizer */}
          {isListening && (
            <div className="flex justify-center">
              <VoiceVisualizer />
            </div>
          )}

          {/* Status Display */}
          <div className="text-center">
            {isListening && (
              <p className="text-neon-blue">🎤 Listening...</p>
            )}
            {isProcessing && (
              <p className="text-quantum-gold">🧠 Processing...</p>
            )}
            {isSpeaking && (
              <p className="text-cyber-green">🔊 Speaking...</p>
            )}
            {!isListening && !isProcessing && !isSpeaking && (
              <p className="text-text-secondary">Ready to chat</p>
            )}
          </div>

          {/* Conversation History */}
          {conversation.length > 0 && (
            <div className="max-h-40 overflow-y-auto space-y-2 bg-dark-space/50 rounded-lg p-4">
              {conversation.slice(-4).map((message, index) => (
                <div
                  key={index}
                  className={`text-sm ${
                    message.type === 'user' 
                      ? 'text-neon-blue text-right' 
                      : 'text-cyber-green text-left'
                  }`}
                >
                  <strong>{message.type === 'user' ? 'You' : cardData.name}:</strong>
                  <br />
                  {message.content}
                </div>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleListening}
              variant={isListening ? 'danger' : 'primary'}
              size="lg"
              disabled={isProcessing || isSpeaking}
            >
              {isListening ? '🛑 Stop' : '🎤 Talk'}
            </Button>
            
            {aiResponse && (
              <Button
                onClick={() => speakResponse(aiResponse)}
                variant="outline"
                size="lg"
                disabled={isSpeaking}
              >
                🔊 Repeat
              </Button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            {cardData.availableActions?.slice(0, 4).map((action, index) => (
              <button
                key={index}
                onClick={() => handleVoiceInput(`Tell me about ${action.label.toLowerCase()}`)}
                className="p-2 text-xs bg-surface-dark/50 border border-electric-purple/30 rounded-lg text-text-secondary hover:text-neon-blue hover:border-neon-blue/50 transition-colors"
              >
                {action.icon} {action.label}
              </button>
            ))}
          </div>

          {/* Browser Support Warning */}
          {typeof window !== 'undefined' && !('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window) && (
            <div className="text-center text-hologram-pink text-sm">
              ⚠️ Voice recognition not supported in this browser
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceInteraction;
