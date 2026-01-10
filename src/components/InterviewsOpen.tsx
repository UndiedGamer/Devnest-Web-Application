import Image from "next/image";
import Link from "next/link";
import { Zap, CheckCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InterviewsOpen() {
  const isOpen = true; // Toggle this to change status
  const applicantPositions = [
    "📱 Mobile App Developer",
    "🎨 UI/UX Designer",
    "📊 Data Analyst",
    "🔐 Security Engineer",
  ];

  return (
    <section className="relative py-12 sm:py-16 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 overflow-hidden rounded-xl my-8 sm:my-12 mx-4 sm:mx-0">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Status Badge */}
        <div className="flex items-center justify-center mb-4 sm:mb-6 gap-2">
          {isOpen ? (
            <>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-green-500">OPEN NOW</span>
            </>
          ) : (
            <>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full" />
              <span className="text-xs sm:text-sm font-semibold text-red-500">CLOSED</span>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Image
              src="/logo.png"
              alt="DevNest"
              width={64}
              height={64}
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-3 sm:mb-4 glow-text px-2">
            🚀 Join Our Core Team!
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-2 px-2">
            We're seeking passionate innovators to become part of DevNest's leadership. As a core member, you'll lead initiatives, mentor students, and drive meaningful impact across AI, Web Development, Cloud Computing, Cybersecurity, and Data Science.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto px-2">
            Build your leadership skills, expand your network, and help shape the future of tech education.
          </p>
        </div>

        {/* Positions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {applicantPositions.map((position, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/20 hover:border-primary/50 active:scale-95 transition-all"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <span className="text-sm sm:text-base text-foreground">{position}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 gap-2 text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-auto active:scale-95 transition-transform">
            <Link href="/join-core-team">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              Register for DevNest
            </Link>
          </Button>
          <a
            href="https://www.instagram.com/devnest_tech_club/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              className="w-full border-primary/50 hover:bg-primary/10 gap-2 text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-auto active:scale-95 transition-transform"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              Follow us
            </Button>
          </a>
        </div>

        {/* Info Text */}
        <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground px-2">
          <p className="leading-relaxed">
            ✨ Core Members Get: Leadership Training • Industry Networking • DevNest Certificate • Public Recognition
          </p>
        </div>
      </div>

      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
