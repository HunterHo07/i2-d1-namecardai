import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "NameCardAI - Your Name. Reinvented.",
  description: "AR-enhanced digital business cards that let you share stunning, interactive profiles via QR, NFC, facial recognition, or camera scan—no app required.",
  keywords: "digital business cards, AR business cards, QR code, NFC, networking, professional identity",
  authors: [{ name: "NameCardAI Team" }],
  creator: "NameCardAI",
  publisher: "NameCardAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://namecardai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "NameCardAI - Your Name. Reinvented.",
    description: "AR-enhanced digital business cards that make networking unforgettable",
    url: 'https://namecardai.com',
    siteName: 'NameCardAI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NameCardAI - AR-Enhanced Digital Business Cards',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NameCardAI - Your Name. Reinvented.",
    description: "AR-enhanced digital business cards that make networking unforgettable",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp',
    shortcut: 'https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp',
    apple: 'https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
