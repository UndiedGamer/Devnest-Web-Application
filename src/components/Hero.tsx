import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Users, Trophy, Building2 } from "lucide-react";
import ShinyText from "@/components/ShinyText";
import TextType from "@/components/TextType";
import dynamic from "next/dynamic";

const FaultyTerminal = dynamic(() => import("@/components/FaultyTerminal"), {
  ssr: false,
});

const HERO_QUOTES = [
  '"Build something that makes a difference."',
  '"Together, we build. Together, we innovate. Together, we are DevNest."',
  '"The future belongs to those who believe in the beauty of their dreams."',
  '"Innovation is the ability to see change as an opportunity, not a threat."',
  '"Learn by doing — we provide a platform to connect with the outer tech world."',
] as const;

export function Hero() {
  const [counters, setCounters] = useState({
    members: 0,
    events: 0,
  });

  const [displayedQuote, setDisplayedQuote] = useState(
    '"Together, we build. Together, we innovate. Together, we are DevNest."',
  );

  useEffect(() => {
    const counterTargets = {
      members: 150,
      events: 1,
    };

    const duration = 2000;
    const steps = 60;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        members: Math.floor(counterTargets.members * progress),
        events: Math.floor(counterTargets.events * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters(counterTargets);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setDisplayedQuote(
        HERO_QUOTES[Math.floor(Math.random() * HERO_QUOTES.length)],
      );
    }, 8000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* FaultyTerminal Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <FaultyTerminal
          scale={0.7}
          gridMul={[12, 12]}
          digitSize={0.5}
          timeScale={1}
          scanlineIntensity={0.3}
          glitchAmount={0.2}
          flickerAmount={0.1}
          noiseAmp={0.05}
          chromaticAberration={0.002}
          tint="#00B871"
          pageLoadAnimation={false}
        />
      </div>

      {/* Animated Dot Matrix Background */}
      <div className="absolute inset-0 opacity-[0.15] z-[1]" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(0, 184, 113, 0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          animation: 'float 20s ease-in-out infinite',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }} />
      </div>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.08] z-[1]" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 184, 113, 0.08) 25%, rgba(0, 184, 113, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 184, 113, 0.08) 75%, rgba(0, 184, 113, 0.08) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 184, 113, 0.08) 25%, rgba(0, 184, 113, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 184, 113, 0.08) 75%, rgba(0, 184, 113, 0.08) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Removed animated glowing orbs - using global background from Layout instead */}

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Tagline */}
        <div className="mb-6 inline-block">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
            🚀 Google Campus Ambassador Initiative
          </span>
        </div>

        {/* Logo & Name */}
        <div className="mb-6 sm:mb-8 flex items-center justify-center gap-3 sm:gap-4">
          <Image
            src="/logo.png"
            alt="DevNest Logo"
            width={80}
            height={80}
            priority
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg shadow-primary/30 animate-bounce"
            style={{ animationDuration: "3s" }}
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-poppins font-bold">
            <ShinyText
              text="DevNest"
              className="glow-text"
              speed={3}
              shineColor="#00B871"
            />
          </h1>
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins font-bold mb-3 sm:mb-4 text-foreground px-2">
          <TextType
            text={[
              "At DevNest, we don't just learn technology — we live it",
              "Build. Innovate. Transform.",
              "Where ideas become reality"
            ]}
            typingSpeed={40}
            initialDelay={0}
            pauseDuration={1200}
            deletingSpeed={20}
            loop={true}
            className="text-foreground"
          />
        </h2>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 sm:mb-6 px-4">
          A student-driven community of innovators, creators, and tech enthusiasts — led by Google Campus Ambassadors at Lamrin Tech Skills University Punjab
        </p>

        {/* Description */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Blending creativity, innovation, and hands-on learning. We bring together passionate minds from diverse technical domains — Artificial Intelligence, Cybersecurity, Cloud Computing, Data Science, and Web Development — to collaborate, build, and grow through real-world experiences.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2 neon-border shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all"
          >
            <Link href="/join">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              Join the Nest
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary gap-2 shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            <Link href="/projects">💡 Explore Projects</Link>
          </Button>
        </div>

        {/* Rotating Quote */}
        <div className="mb-8 sm:mb-12 text-center px-4">
          <div className="glass-effect rounded-xl p-4 sm:p-6 inline-block max-w-2xl w-full">
            <p className="text-base sm:text-lg md:text-xl italic text-foreground font-manrope">
              {displayedQuote}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 mt-12 sm:mt-16 px-2 max-w-2xl mx-auto">
          <div className="glass-effect rounded-lg p-4 sm:p-6 hover-lift">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-primary mb-1">
              {counters.members}+
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Community Members</p>
          </div>

          <div className="glass-effect rounded-lg p-4 sm:p-6 hover-lift">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-primary mb-1">
              {counters.events}+
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Tech Events</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 sm:mt-16 animate-bounce">
          <div className="text-sm sm:text-base text-muted-foreground mb-2">Scroll to explore</div>
          <div className="flex justify-center">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
