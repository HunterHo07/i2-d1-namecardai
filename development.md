# NameCardAI - Development Plan & Technical Architecture

## 🛠 Tech Stack Details

### Core Framework
- **Next.js 15.3.2** - Latest version with App Router
- **React 19** - Latest with concurrent features
- **Tailwind CSS v4** - Latest version for styling
- **Node.js 18+** - Runtime environment

### 3D/AR Libraries
- **Three.js** - 3D graphics and WebGL rendering
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for Three.js
- **WebXR** - AR capabilities in browser

### Animation & Effects
- **GSAP** - Professional animation library
- **ScrollTrigger** - Scroll-based animations
- **Framer Motion** - React animation library (backup)

### Demo Engine
- **Phaser 3** - 2D game engine for interactive demos
- **Canvas API** - Custom 2D graphics

### Utilities
- **QR Code Generator** - For QR code creation
- **Web NFC API** - For NFC functionality
- **MediaDevices API** - Camera access
- **LocalStorage** - Data persistence

## 📱 Application Architecture

### Folder Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Route groups
│   │   ├── home/          # Homepage
│   │   ├── demo/          # Demo page
│   │   ├── pitch/         # Pitch deck
│   │   ├── why-us/        # Why us page
│   │   ├── landing/       # Landing page
│   │   ├── roadmap/       # Roadmap page
│   │   └── signup/        # Sign-up page
│   ├── components/        # Reusable components
│   │   ├── ui/           # Basic UI components
│   │   ├── 3d/           # Three.js components
│   │   ├── effects/      # Animation components
│   │   └── layout/       # Layout components
│   ├── lib/              # Utilities and helpers
│   ├── data/             # JSON data files
│   └── styles/           # Global styles
```

### Component Architecture
- **Atomic Design Pattern**: Atoms → Molecules → Organisms → Templates → Pages
- **Compound Components**: For complex UI patterns
- **Custom Hooks**: For reusable logic
- **Context Providers**: For global state

## 🎨 Design System

### Color Palette (Futuristic AI Theme)
```css
:root {
  /* Primary Colors */
  --neon-blue: #00f5ff;
  --electric-purple: #8b5cf6;
  --cyber-green: #00ff88;
  
  /* Background Colors */
  --dark-space: #0a0a0f;
  --deep-purple: #1a0b2e;
  --midnight-blue: #16213e;
  
  /* Accent Colors */
  --hologram-pink: #ff006e;
  --quantum-gold: #ffd700;
  --matrix-green: #00ff41;
}
```

### Typography
- **Primary Font**: Inter (modern, clean)
- **Display Font**: Orbitron (futuristic)
- **Mono Font**: JetBrains Mono (code/tech feel)

### Animation Principles
- **Easing**: Custom cubic-bezier curves
- **Duration**: 0.3s for micro, 0.6s for macro
- **Stagger**: 0.1s delays for sequential animations

## 📄 Page Specifications

### 1. HomePage (`/`)
**Sections (10+ with effects):**
1. **Hero Section** - Matrix effect background
2. **Problem Statement** - 3D tilt cards
3. **Solution Overview** - Typing text animation
4. **3-Step Process** - Scroll-triggered reveals
5. **MVP Feature Preview** - Carousel with parallax
6. **Competitor Comparison** - Interactive table
7. **Testimonials** - Floating cards
8. **Value Proposition** - Audio-responsive visuals
9. **Pricing Plans** - Hover transformations
10. **Trust Elements** - Smoke effects
11. **Early Adopter CTA** - Fireflies background
12. **Footer** - Gradient animations

### 2. DemoPage (`/demo`)
**Demo Levels (5+ layers):**
1. **QR Code Scan Simulation** - Live QR generator
2. **Camera Recognition Demo** - Webcam integration
3. **3D Card Renderer** - Interactive Three.js scene
4. **AR Overlay Preview** - WebXR simulation
5. **Name/Number Search** - Real-time filtering
6. **Card Customization** - Live preview editor
7. **Sharing Methods** - Multi-modal demo

### 3. Additional Pages
- **Pitch Deck** (`/pitch`) - Investor-focused presentation
- **Why Us** (`/why-us`) - Competitive advantages
- **Landing** (`/landing`) - Conversion-optimized
- **Roadmap** (`/roadmap`) - Development timeline
- **Sign-up** (`/signup`) - User registration simulation

## 🎯 Core Features Implementation

### 3D Card Renderer
```javascript
// Three.js card component
const Card3D = ({ cardData, animation }) => {
  // Geometry, materials, lighting
  // Animation loops
  // Interaction handlers
}
```

### AR Overlay System
```javascript
// WebXR integration
const AROverlay = ({ cardData }) => {
  // Camera access
  // Face detection
  // 3D overlay rendering
}
```

### Demo Engine
```javascript
// Phaser 3 game instance
const DemoEngine = {
  scenes: ['QRScan', 'CameraScan', 'CardRender'],
  // Interactive simulations
}
```

## 📊 Data Structure

### Card Data Model
```json
{
  "id": "unique-id",
  "name": "John Doe",
  "title": "Senior Developer",
  "company": "TechCorp",
  "avatar": "avatar-url",
  "background": "background-url",
  "effects": ["matrix", "particles"],
  "contact": {
    "email": "john@example.com",
    "phone": "+1234567890",
    "linkedin": "linkedin.com/in/johndoe"
  },
  "customization": {
    "theme": "cyber-blue",
    "animation": "float",
    "intro": "video-url"
  }
}
```

### User Preferences
```json
{
  "userId": "user-id",
  "preferences": {
    "theme": "dark",
    "animations": true,
    "sound": false
  },
  "favorites": ["card-id-1", "card-id-2"],
  "history": ["scan-1", "scan-2"]
}
```

## 🚀 Development Phases

### Phase 1: Foundation (Week 1)
- [x] Next.js setup with Tailwind
- [ ] Basic routing structure
- [ ] Design system implementation
- [ ] Core components library

### Phase 2: HomePage (Week 1-2)
- [ ] Hero section with Matrix effect
- [ ] All 12 sections with unique effects
- [ ] Responsive design
- [ ] Performance optimization

### Phase 3: DemoPage (Week 2-3)
- [ ] Three.js 3D card renderer
- [ ] Phaser 3 demo engine
- [ ] Camera integration
- [ ] QR code generation
- [ ] AR simulation

### Phase 4: Additional Pages (Week 3-4)
- [ ] Pitch deck presentation
- [ ] Why us competitive analysis
- [ ] Landing page optimization
- [ ] Roadmap visualization
- [ ] Sign-up flow simulation

### Phase 5: Polish & QA (Week 4)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Accessibility compliance
- [ ] Final bug fixes

## 🔧 Development Tools

### Package Management
```bash
# Core dependencies
npm install three @react-three/fiber @react-three/drei
npm install gsap phaser qrcode
npm install lucide-react clsx tailwind-merge

# Development tools
npm install --save-dev @types/three
```

### Build Configuration
- **Webpack**: Custom config for Three.js
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Husky**: Git hooks

## 📈 Performance Targets

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Bundle Size
- **Initial Load**: < 500KB gzipped
- **3D Assets**: Lazy loaded
- **Images**: WebP format, optimized

### Browser Support
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🧪 Testing Strategy

### Unit Tests
- Component rendering
- Utility functions
- Data transformations

### Integration Tests
- 3D scene rendering
- Camera functionality
- LocalStorage operations

### E2E Tests
- User flows
- Cross-browser compatibility
- Mobile responsiveness

### Performance Tests
- Bundle analysis
- Runtime performance
- Memory usage
