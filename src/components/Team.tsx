import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
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
    <section id="team" className="relative py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <Image
              src="/logo.png"
              alt="DevNest"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
            <span className="text-primary text-sm font-medium">Meet the Team</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold mb-4">
            Our <span className="glow-text">Core Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate leaders and mentors driving innovation across multiple tech domains
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={member.id}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />

              {/* Card */}
              <div className="relative glass-effect rounded-xl p-6 hover-lift transition-all duration-300 overflow-hidden">
                {/* Front Side - Profile Info */}
                <div className="group-hover:translate-y-full transition-transform duration-300">
                  <div className="text-5xl mb-4 text-center">{member.image}</div>
                  <h3 className="text-xl font-poppins font-bold mb-1 text-center">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-semibold text-center mb-2">
                    {member.designation}
                  </p>
                  <p className="text-xs text-muted-foreground text-center mb-4">
                    {member.role}
                  </p>
                  <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-4" />
                  <p className="text-sm text-muted-foreground text-center">
                    Hover to learn more
                  </p>
                </div>

                {/* Back Side - Bio & Socials */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm text-muted-foreground text-center mb-6 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-3 justify-center">
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 transition-colors group"
                      title="GitHub"
                    >
                      <Github className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 transition-colors group"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 transition-colors group"
                      title="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                    backgroundSize: "200% 200%",
                    animation: "shimmer 3s infinite",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground">
            Interested in joining the core team?
          </p>
          <Link href="/join" className="text-primary hover:underline font-semibold">
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
