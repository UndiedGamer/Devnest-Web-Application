import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
import ShinyText from "@/components/ShinyText";
import dynamic from "next/dynamic";

const SpotlightCard = dynamic(() => import("@/components/SpotlightCard"), {
	ssr: false,
});

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

interface TeamCardProps {
	member: TeamMember;
	index: number;
}

const isValidLink = (link: string | undefined): boolean => {
	return !!link && link !== "#" && link.trim() !== "";
};

export function TeamCard({ member, index }: TeamCardProps) {
	return (
		<div
			className="group relative"
			style={{
				animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
			}}
		>
			{/* Card Background Gradient - GPU Accelerated */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100" style={{ filter: 'blur(20px)', transition: 'opacity 300ms, filter 300ms', transform: 'translateZ(0)', willChange: 'opacity, filter' }} />

			{/* SpotlightCard Wrapper */}
			<SpotlightCard
				spotlightColor="rgba(0, 184, 113, 0.15)"
				className="relative rounded-xl"
			>
				{/* Card with pixelated border effect */}
				<div className="relative glass-effect rounded-xl p-5 sm:p-6 hover-lift transition-all duration-300 overflow-hidden border-2 border-primary/30 hover:border-primary/50 bg-background/80 backdrop-blur-sm">
					{/* Profile Info - Always visible on mobile, hover effect on desktop */}
					<div className="lg:group-hover:translate-y-full transition-transform duration-300">
						<div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-center">{member.image}</div>
						<h3 className="text-lg sm:text-xl font-poppins font-bold mb-1 text-center">
							<ShinyText
								text={member.name}
								speed={3}
								shineColor="#00B871"
								pauseOnHover={true}
							/>
						</h3>
						<p className="text-xs sm:text-sm text-primary font-semibold text-center mb-2">
							{member.designation}
						</p>
						<p className="text-xs text-muted-foreground text-center mb-3 sm:mb-4">
							{member.role}
						</p>
						<div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-3 sm:mb-4" />

						{/* Show bio on mobile, hide on desktop (shown on hover) */}
						<p className="text-xs sm:text-sm text-muted-foreground text-center mb-3 sm:mb-4 line-clamp-3 lg:hidden">
							{member.bio}
						</p>
						<p className="text-xs sm:text-sm text-muted-foreground text-center hidden lg:block">
							Hover to learn more
						</p>

						{/* Social Links - Always visible on mobile */}
						<div className="flex gap-2 sm:gap-3 justify-center mt-3 sm:mt-4 lg:hidden">
							{isValidLink(member.socials.github) && (
								<a
									href={member.socials.github}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 active:scale-95 transition-all"
									title="GitHub"
								>
									<Github className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
								</a>
							)}
							{isValidLink(member.socials.linkedin) && (
								<a
									href={member.socials.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 active:scale-95 transition-all"
									title="LinkedIn"
								>
									<Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
								</a>
							)}
							{isValidLink(member.socials.instagram) && (
								<a
									href={member.socials.instagram}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 active:scale-95 transition-all"
									title="Instagram"
								>
									<Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
								</a>
							)}
						</div>
					</div>

					{/* Hover State Content - Desktop only */}
					<div className="hidden lg:flex absolute inset-0 p-5 sm:p-6 flex-col bg-gradient-to-br from-primary/10 via-background/95 to-secondary/10 rounded-xl -translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-md">
						<div className="text-3xl sm:text-4xl mb-2 text-center">
							{member.image}
						</div>
						<h3 className="text-base sm:text-lg font-poppins font-bold mb-1 text-center">
							{member.name}
						</h3>
						<p className="text-xs text-primary font-semibold text-center mb-3">
							{member.designation}
						</p>
						<div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-3" />

						<div className="flex-1 overflow-y-auto custom-scrollbar">
							<p className="text-xs sm:text-sm text-muted-foreground text-center mb-4">
								{member.bio}
							</p>
						</div>

						<div className="flex gap-2 sm:gap-3 justify-center mt-3">
							{isValidLink(member.socials.github) && (
								<a
									href={member.socials.github}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 active:scale-95 transition-all hover:scale-110"
									title="GitHub"
								>
									<Github className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
								</a>
							)}
							{isValidLink(member.socials.linkedin) && (
								<a
									href={member.socials.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 active:scale-95 transition-all hover:scale-110"
									title="LinkedIn"
								>
									<Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
								</a>
							)}
							{isValidLink(member.socials.instagram) && (
								<a
									href={member.socials.instagram}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 rounded-lg bg-primary/20 hover:bg-primary/40 active:scale-95 transition-all hover:scale-110"
									title="Instagram"
								>
									<Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
								</a>
							)}
						</div>
					</div>
				</div>
			</SpotlightCard>
		</div>
	);
}
