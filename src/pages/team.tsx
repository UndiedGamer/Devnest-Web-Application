import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
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

export default function TeamPage() {
  const team: TeamMember[] = teamData.coreTeam;

  return (
    <Layout>
      <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.id}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Card Container */}
                <div className="relative h-80 perspective">
                  {/* Front of card */}
                  <div className="absolute inset-0 glass-effect rounded-xl p-6 flex flex-col items-center justify-center text-center group-hover:opacity-0 transition-opacity duration-300">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <h3 className="text-xl font-poppins font-bold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-semibold mb-2">
                      {member.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {member.designation}
                    </p>
                  </div>

                  {/* Back of card (Bio) */}
                  <div className="absolute inset-0 glass-effect rounded-xl p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <h3 className="text-lg font-poppins font-bold mb-3 text-primary">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3 justify-center pt-4 border-t border-border/40">
                      {member.socials.github && member.socials.github !== "#" && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {member.socials.linkedin && member.socials.linkedin !== "#" && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.socials.instagram && member.socials.instagram !== "#" && (
                        <a
                          href={member.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="Instagram"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
                className="px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors"
              >
                <Link href="/join">Become Part of the Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
