import { Layout } from "@/components/Layout";
import { TeamCard } from "@/components/TeamCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
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

export default function TeamPage() {
  const team: TeamMember[] = teamData.coreTeam;

  return (
    <Layout>
      <div className="relative min-h-screen py-20 bg-gradient-to-b from-background via-background to-muted/30 overflow-hidden">
        {/* Animated Hexagon Pattern Background */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(0, 184, 113, 0.15) 2%, transparent 0%),
              radial-gradient(circle at 75% 75%, rgba(0, 184, 113, 0.15) 2%, transparent 0%)
            `,
            backgroundSize: '60px 60px',
            animation: 'float 15s ease-in-out infinite'
          }} />
        </div>

        {/* Removed animated background - using global background from Layout */}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Image
                src="/logo.png"
                alt="DevNest"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
              <span className="text-primary text-sm font-medium">👥 Our Core Team</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-poppins font-bold mb-4 glow-text">
              Meet The Nest
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate leaders and mentors driving innovation across multiple tech domains. Together, we build the future of DevNest.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="glass-effect rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-poppins font-bold mb-4">
                Join Our Nest!
              </h3>
              <p className="text-muted-foreground mb-6">
                Are you passionate about tech and want to make a difference? We're always looking for talented individuals to join our growing community.
              </p>
              <Button
                asChild
                className="px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 neon-border hover:scale-105"
              >
                <Link href="/join">Become Part of the Team</Link>
              </Button>
            </div>
          </div>
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
      `}</style>
    </Layout>
  );
}
