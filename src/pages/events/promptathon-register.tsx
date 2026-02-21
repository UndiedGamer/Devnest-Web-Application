import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Layout } from "@/components/Layout";
import { PromptatonRegistrationForm } from "@/components/PromptatonRegistrationForm";

export default function PromptatonRegistrationPage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-b from-background to-muted/40 py-16">
				<div className="mx-auto max-w-4xl px-4 sm:px-6">
					<div className="mb-8">
						<Link
							href="/events/promptathon"
							className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to Event Details
						</Link>
					</div>
					<PromptatonRegistrationForm />
				</div>
			</div>
		</Layout>
	);
}
