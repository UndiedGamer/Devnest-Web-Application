import Image from "next/image";
import Link from "next/link";
import { TeamCard } from "@/components/TeamCard";
import ShinyText from "@/components/ShinyText";
import teamData from "@/data/team.json";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  designation: string;
  bio: string;
  image: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
  };
}

export function Team() {
  const team: TeamMember[] = teamData.coreTeam;

  return (
    <section id="team" className="relative py-16 sm:py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      {/* Removed animated background - using global background from Layout */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <Image
              src="/logo.png"
              alt="DevNest"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            />
            <span className="text-primary text-xs sm:text-sm font-medium">Meet the Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-3 sm:mb-4">
            Our <ShinyText text="Core Team" className="glow-text" speed={2} />
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Passionate leaders and mentors driving innovation across multiple tech domains
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg text-muted-foreground mb-2 px-4">
            Interested in joining the core team?
          </p>
          <Link href="/join" className="text-primary hover:underline font-semibold text-base sm:text-lg">
            Apply Now →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
