import { Layout } from "@/components/Layout";
import { useState } from "react";
import { ArrowLeft, Calendar, User, UserCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

type GuestSpeakerFormValues = {
	name: string;
	rollNumber: string;
	class: string;
	phoneNumber: string;
	email: string;
};

const defaultValues: GuestSpeakerFormValues = {
	name: "",
	rollNumber: "",
	class: "",
	phoneNumber: "",
	email: "",
};

export default function GuestSpeakerFebPage() {
	const { toast } = useToast();
	const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

	const form = useForm<GuestSpeakerFormValues>({
		defaultValues,
	});

	const onSubmit = async (values: GuestSpeakerFormValues) => {
		setStatus("loading");
		try {
			const payload = {
				submittedAt: new Date().toISOString(),
				name: values.name,
				rollNumber: values.rollNumber,
				class: values.class,
				phoneNumber: values.phoneNumber,
				email: values.email,
			};

			const response = await fetch("/api/guest-speaker", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to submit registration");
			}

			toast({
				title: "Registration Successful!",
				description: "You have been registered for the guest speaker event.",
			});

			form.reset();
			setStatus("success");

			// Reset success state after 3 seconds
			setTimeout(() => setStatus("idle"), 3000);
		} catch (error) {
			toast({
				title: "Submission failed",
				description:
					error instanceof Error
						? error.message
						: "Please try again or contact us for assistance.",
				variant: "destructive",
			});
			setStatus("idle");
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-b from-background to-muted/40 py-16">
				<div className="mx-auto max-w-4xl px-4 sm:px-6">
					<div className="mb-8">
						<Button asChild variant="ghost" className="gap-2">
							<Link href="/events">
								<ArrowLeft className="h-4 w-4" />
								Back to Events
							</Link>
						</Button>
					</div>

					{/* Event Header */}
					<div className="glass-effect rounded-3xl border border-border/50 p-8 mb-8 text-center">
						<div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold mb-4">
							<Calendar className="inline-block w-4 h-4 mr-1" />
							5th February 2026
						</div>
						<h1 className="text-4xl sm:text-5xl font-poppins font-bold mb-4">
							Guest Speaker Event
						</h1>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Join us for an inspiring session with <span className="font-semibold text-foreground">Amit Kumar Jaiswal</span>, IIM Bangalore graduate and founder of <span className="font-semibold text-foreground">aptitude360online</span>. Register now to secure your spot!
						</p>
					</div>

					{/* Registration Form */}
					<div className="glass-effect rounded-3xl border border-border/50 bg-background/80 p-8 shadow-2xl">
						<div className="text-center max-w-2xl mx-auto mb-8">
							<span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-semibold mb-4">
								Event Registration
							</span>
							<h2 className="text-3xl font-poppins font-bold mb-3">
								Register for the Event
							</h2>
							<p className="text-muted-foreground">
								Fill in your details to register. All fields are mandatory.
							</p>
						</div>

						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
								<div className="grid gap-6 md:grid-cols-2">
									<FormField
										control={form.control}
										name="name"
										rules={{ required: "Name is required" }}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Full Name *</FormLabel>
												<FormControl>
													<Input placeholder="John Doe" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="rollNumber"
										rules={{ required: "Roll number is required" }}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Roll Number *</FormLabel>
												<FormControl>
													<Input placeholder="241000X00XX" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									<FormField
										control={form.control}
										name="class"
										rules={{ required: "Class is required" }}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Class / Year *</FormLabel>
												<FormControl>
													<Input placeholder="CSE • 3rd Year" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="phoneNumber"
										rules={{
											required: "Phone number is required",
											pattern: {
												value: /^[0-9+\-\s]{10,}$/,
												message: "Enter a valid phone number",
											},
										}}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone Number *</FormLabel>
												<FormControl>
													<Input placeholder="+91 98765 43210" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="email"
									rules={{
										required: "Email is required",
										pattern: {
											value:
												/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
											message: "Enter a valid email address",
										},
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email Address *</FormLabel>
											<FormControl>
												<Input placeholder="you@college.edu" type="email" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="pt-4 border-t border-border/60">
									<div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
										<p className="text-sm text-muted-foreground">
											By registering, you agree to receive event updates via email and phone.
										</p>
										<Button
											type="submit"
											className="gap-2 w-full sm:w-auto"
											disabled={status === "loading" || status === "success"}
										>
											{status === "loading" ? (
												<>
													<span className="animate-spin">⏳</span>
													Submitting...
												</>
											) : status === "success" ? (
												<>
													<span>✅</span>
													Registered!
												</>
											) : (
												<>
													<UserCircle className="h-4 w-4" />
													Register Now
												</>
											)}
										</Button>
									</div>
								</div>
							</form>
						</Form>

						{/* Event Details */}
						<div className="mt-8 pt-8 border-t border-border/60">
							<h3 className="text-lg font-semibold mb-4">Event Details</h3>
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="flex items-start gap-3">
									<Calendar className="w-5 h-5 text-primary mt-0.5" />
									<div>
										<p className="font-medium">Date & Time</p>
										<p className="text-sm text-muted-foreground">
											5th February 2026 (Time TBA)
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<User className="w-5 h-5 text-primary mt-0.5" />
									<div>
										<p className="font-medium">Speaker</p>
										<p className="text-sm text-muted-foreground">
											Amit Kumar Jaiswal<br />
											<span className="text-xs">IIM Bangalore Graduate • aptitude360online</span>
										</p>
									</div>
								</div>
							</div>
							<p className="text-sm text-muted-foreground mt-4">
								For any queries, contact us at devnest.techclub@gmail.com
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
