import Link from "next/link";
import { CheckCircle2, Clock, MapPin, ShieldCheck, Users, Zap } from "lucide-react";

import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/DAeJBINDPNI64g6zV0b2TF";
const CONTACT_EMAILS = [
	"devnest.techclub@gmail.com"
] as const;

const bytebloomFacts = [
	{ label: "Eligibility", value: "Open to all current college students" },
	{ label: "Team Size", value: "2 – 4 members (cross-department welcome)" },
	{ label: "Fee", value: "₹100 per participant" },
	{ label: "Deadline", value: "28 October 2025" },
];

const whatsInStoreList = [
	"Welcome kit + kickoff briefing at DevNest",
	"12 hours of ideation, prototyping, and mentoring",
	"Challenge statements inspired by real-world tech problems",
	"Final pitching and jury feedback to wrap up",
];

const whyJoinList = [
	"Win exciting cash prizes and showcase-ready creds",
	"Earn participation certificates for every participant",
	"Network with mentors, campus ambassadors, and partner teams",
	"Ship something meaningful in a high-energy builder marathon",
];

const heroStats = [
	{ label: "Duration", value: "12-hour sprint", icon: Clock },
	{ label: "Venue", value: "Lamrin Tech Skills University", icon: MapPin },
	{ label: "Team Size", value: "2 – 4 builders", icon: Users },
];

export default function ByteBloomEventPage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-b from-background to-muted/40 py-16">
				<div className="mx-auto max-w-6xl px-4 sm:px-6">
					<section className="text-center mb-16 space-y-6">
						<div>
							<span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
								ByteBloom hackfest | 2025 Edition
							</span>
						</div>
						<h1 className="text-4xl sm:text-5xl font-poppins font-bold">
							Build Bold at ByteBloom hackfest
						</h1>
						<p className="text-muted-foreground max-w-3xl mx-auto">
							12 hours of rapid prototyping, real real-world problem statements, campus-wide collaboration, and a purpose-built DevNest registration hub. Everything you need to get your squad signed up lives right here.
						</p>
						<div className="grid gap-4 sm:grid-cols-3">
							{heroStats.map((stat) => (
								<div
									key={stat.label}
									className="glass-effect rounded-2xl border border-border/50 px-4 py-5 flex flex-col items-center gap-2"
								>
									<stat.icon className="h-5 w-5 text-primary" />
									<p className="text-sm text-muted-foreground">{stat.label}</p>
									<p className="font-semibold">{stat.value}</p>
								</div>
							))}
						</div>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button asChild size="lg" className="gap-2 text-base sm:text-lg py-6 sm:py-7 font-semibold shadow-lg hover:shadow-xl transition-all">
								<Link href="/events/bytebloom-register">
									<Zap className="h-5 w-5" />
									Register Now
								</Link>
							</Button>
							<Button asChild variant="outline" size="lg" className="py-6 sm:py-7">
								<Link href={WHATSAPP_GROUP_LINK} target="_blank" rel="noreferrer">
									Join WhatsApp Lobby
								</Link>
							</Button>
						</div>
					</section>

					<ByteBloomDetailsSection />
				</div>
			</div>
		</Layout>
	);
}

const ByteBloomDetailsSection = () => (
	<section id="bytebloom-details" className="space-y-10">
		<div className="glass-effect rounded-3xl border border-border/40 bg-background/70 p-8 text-center">
			<p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
				ByteBloom hackfest | 2025 Edition
			</p>
			<h2 className="text-4xl font-poppins font-bold mb-4">
				Welcome to ByteBloom hackfest 2025! 🚀
			</h2>
			<p className="text-muted-foreground max-w-3xl mx-auto">
				Hosted by DevNest Technical Club, ByteBloom hackfest is a 12-hour burst of collaboration where ideas meet execution and creativity meets code. Challenge your skills, brainstorm real-world tech solutions, and build alongside fellow innovators.
			</p>
		</div>

		<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
			{bytebloomFacts.map((fact) => (
				<div
					key={fact.label}
					className="glass-effect rounded-2xl border border-border/40 p-5 text-left"
				>
					<p className="text-sm text-muted-foreground mb-1">{fact.label}</p>
					<p className="font-semibold text-lg">{fact.value}</p>
				</div>
			))}
		</div>

		<div className="grid gap-6 lg:grid-cols-2">
			<div className="glass-effect rounded-3xl border border-border/40 p-6">
				<div className="flex items-center gap-2 mb-4">
					<CheckCircle2 className="w-5 h-5 text-primary" />
					<h3 className="text-xl font-semibold">What's in store?</h3>
				</div>
				<ul className="space-y-3 text-muted-foreground">
					{whatsInStoreList.map((item) => (
						<li key={item} className="flex items-start gap-2">
							<span className="text-primary mt-1">•</span>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>

			<div className="glass-effect rounded-3xl border border-border/40 p-6">
				<div className="flex items-center gap-2 mb-4">
					<ShieldCheck className="w-5 h-5 text-secondary" />
					<h3 className="text-xl font-semibold">Why join?</h3>
				</div>
				<ul className="space-y-3 text-muted-foreground">
					{whyJoinList.map((item) => (
						<li key={item} className="flex items-start gap-2">
							<span className="text-secondary mt-1">•</span>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
		</div>

		<div className="flex justify-center">
			<Button asChild size="lg" className="gap-2 text-base sm:text-lg px-8 py-6 sm:py-7 font-semibold shadow-lg hover:shadow-xl transition-all">
				<Link href="/events/bytebloom-register">
					<Zap className="h-5 w-5" />
					Register Your Team Now
				</Link>
			</Button>
		</div>

		<div className="glass-effect rounded-3xl border border-border/40 p-6">
			<h3 className="text-xl font-semibold mb-4">Payment & Support</h3>
			<p className="text-muted-foreground mb-3">
				A registration fee of <strong>₹100 per participant</strong> applies. Keep your transaction ID handy for submitting the form. Once paid, make sure every teammate has joined the official WhatsApp group for real-time announcements.
			</p>
			<div className="flex flex-wrap gap-3 mb-4">
				<Button asChild size="lg" className="gap-2 font-semibold">
					<Link href="/events/bytebloom-register">
						<Zap className="h-4 w-4" />
						Register Now
					</Link>
				</Button>
				<Button asChild variant="outline">
					<Link href={WHATSAPP_GROUP_LINK} target="_blank" rel="noreferrer">
						Join WhatsApp Group
					</Link>
				</Button>
				<Button asChild variant="ghost">
					<Link href={`mailto:${CONTACT_EMAILS[0]}`}>
						Have a question? Email us
					</Link>
				</Button>
			</div>
			<p className="text-sm text-muted-foreground">
				For queries, reach us at {CONTACT_EMAILS[0]}.
			</p>
		</div>
	</section>
);
