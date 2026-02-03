import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/DAeJBINDPNI64g6zV0b2TF";
const CONTACT_EMAILS = [
	"devnest.techclub@gmail.com",
	"hemanthchakka2007@gmail.com",
] as const;
const PAYMENT_QR_ENDPOINT = "/api/payment-qr";

const normalizeRoll = (roll?: string | null) => roll?.trim().toLowerCase() ?? "";

export type ByteBloomFormValues = {
	fullName: string;
	rollNumber: string;
	department: string;
	whatsappNumber: string;
	email: string;
	teamName: string;
	teamSize: "2" | "3" | "4";
	participant2: string;
	participant2Roll: string;
	participant3: string;
	participant3Roll: string;
	participant4: string;
	participant4Roll: string;
	transactionId: string;
	joinedWhatsapp: boolean;
	notes: string;
};

const bytebloomDefaultValues: ByteBloomFormValues = {
	fullName: "",
	rollNumber: "",
	department: "",
	whatsappNumber: "",
	email: "",
	teamName: "",
	teamSize: "2",
	participant2: "",
	participant2Roll: "",
	participant3: "",
	participant3Roll: "",
	participant4: "",
	participant4Roll: "",
	transactionId: "",
	joinedWhatsapp: false,
	notes: "",
};

export const ByteBloomRegistrationForm = () => {
	const { toast } = useToast();
	const [status, setStatus] = useState<"idle" | "loading">("idle");
	const [qrStatus, setQrStatus] = useState<"loading" | "loaded" | "error">("loading");
	const [qrSrc, setQrSrc] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const qrObjectUrlRef = useRef<string | null>(null);
	const isMountedRef = useRef(true);

	const form = useForm<ByteBloomFormValues>({
		defaultValues: bytebloomDefaultValues,
	});

	const teamSize = useWatch({ control: form.control, name: "teamSize" });

	const numericTeamSize = Number(teamSize);

	const markRollConflicts = useCallback(
		(conflicts: string[]) => {
			const normalizedConflicts = conflicts
				.map((roll) => normalizeRoll(roll))
				.filter((roll) => roll.length > 0);

			if (!normalizedConflicts.length) {
				return;
			}

			const values = form.getValues();
			const rollFields: Array<{
				field: keyof ByteBloomFormValues;
				value: string;
			}> = [
					{ field: "rollNumber", value: values.rollNumber },
					{ field: "participant2Roll", value: values.participant2Roll },
					{ field: "participant3Roll", value: values.participant3Roll },
					{ field: "participant4Roll", value: values.participant4Roll },
				];

			rollFields.forEach(({ field, value }) => {
				if (value && normalizedConflicts.includes(normalizeRoll(value))) {
					form.setError(field, {
						type: "manual",
						message: "This roll number is already registered.",
					});
				}
			});
		},
		[form],
	);

	const loadPaymentQr = useCallback(async () => {
		try {
			setQrStatus("loading");
			setQrSrc(null);
			const response = await fetch(PAYMENT_QR_ENDPOINT);
			if (!response.ok) {
				throw new Error("Failed to fetch payment QR");
			}
			const blob = await response.blob();
			const objectUrl = URL.createObjectURL(blob);
			if (!isMountedRef.current) {
				URL.revokeObjectURL(objectUrl);
				return;
			}
			if (qrObjectUrlRef.current) {
				URL.revokeObjectURL(qrObjectUrlRef.current);
			}
			qrObjectUrlRef.current = objectUrl;
			setQrSrc(objectUrl);
			setQrStatus("loaded");
		} catch (error) {
			if (!isMountedRef.current) {
				return;
			}
			console.error("Payment QR load error", error);
			setQrStatus("error");
			setQrSrc(null);
		}
	}, []);

	useEffect(() => {
		isMountedRef.current = true;
		loadPaymentQr();

		return () => {
			isMountedRef.current = false;
			if (qrObjectUrlRef.current) {
				URL.revokeObjectURL(qrObjectUrlRef.current);
				qrObjectUrlRef.current = null;
			}
		};
	}, [loadPaymentQr]);

	useEffect(() => {
		if (numericTeamSize < 4) {
			form.setValue("participant4", "");
			form.setValue("participant4Roll", "");
		}
		if (numericTeamSize < 3) {
			form.setValue("participant3", "");
			form.setValue("participant3Roll", "");
		}
	}, [numericTeamSize, form]);

	const onSubmit = async (values: ByteBloomFormValues) => {
		setStatus("loading");
		try {
			const response = await fetch("/api/bytebloom", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...values,
					submittedAt: new Date().toISOString(),
				}),
			});

			if (!response.ok) {
				let errorMessage = "Unable to submit form";
				let handled = false;
				try {
					const errorData = await response.json();
					if (errorData?.message) {
						errorMessage = errorData.message;
					}
					if (Array.isArray(errorData?.conflicts) && errorData.conflicts.length > 0) {
						markRollConflicts(errorData.conflicts as string[]);
						handled = true;
						errorMessage = `${errorMessage} (Conflicts: ${errorData.conflicts.join(", ")})`;
					}
				} catch (parseError) {
					console.error("ByteBloom hackfest error payload parse", parseError);
				}

				if (handled) {
					toast({
						title: "Submission blocked",
						description: errorMessage,
						variant: "destructive",
					});
					return;
				}

				throw new Error(errorMessage);
			}

			toast({
				title: "Registration received!",
				description: "We will reach out with next steps soon.",
			});

			form.reset(bytebloomDefaultValues);
		} catch (error) {
			console.error("ByteBloom hackfest submission error", error);
			const fallbackMessage = "Please try again or email us at devnest.techclub@gmail.com.";
			const description =
				error instanceof Error && error.message ? error.message : fallbackMessage;
			toast({
				title: "Submission failed",
				description,
				variant: "destructive",
			});
		} finally {
			setStatus("idle");
		}
	};

	return (
		<section
			id="bytebloom-form"
			className="glass-effect rounded-3xl border border-border/50 bg-background/80 p-8 shadow-2xl"
		>
			<div className="text-center max-w-3xl mx-auto mb-10">
				<span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-semibold mb-4">
					ByteBloom hackfest | Registration
				</span>
				<h2 className="text-3xl font-poppins font-bold mb-3">
					Submit your squad details
				</h2>
				<p className="text-muted-foreground">
					Fill in the complete team roster, confirm payment, and keep the WhatsApp group joined for all event updates. Fields marked with * are mandatory.
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
					<div className="space-y-4">
						<div>
							<h3 className="text-xl font-semibold">Team Lead Details</h3>
							<p className="text-sm text-muted-foreground">
								We'll reach out to the lead for confirmations and logistics.
							</p>
						</div>
						<div className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="fullName"
								rules={{ required: "Name is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name *</FormLabel>
										<FormControl>
											<Input placeholder="Aditi Sharma" {...field} />
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
										<FormLabel>University Roll No *</FormLabel>
										<FormControl>
											<Input placeholder="241000X00XX" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="department"
								rules={{ required: "Department & year is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Department & Year *</FormLabel>
										<FormControl>
											<Input placeholder="CSE • 3rd Year" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="whatsappNumber"
								rules={{
									required: "WhatsApp number is required",
									pattern: {
										value: /^[0-9+\-\s]{10,}$/,
										message: "Enter a valid phone number",
									},
								}}
								render={({ field }) => (
									<FormItem>
										<FormLabel>WhatsApp Number *</FormLabel>
										<FormControl>
											<Input placeholder="+91 98765 43210" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
										<FormLabel>Email ID *</FormLabel>
										<FormControl>
											<Input placeholder="you@college.edu" type="email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="space-y-4 pt-8 border-t border-border/60">
						<div>
							<h3 className="text-xl font-semibold">Team Roster</h3>
							<p className="text-sm text-muted-foreground">
								Tell us about the squad you are bringing to ByteBloom hackfest and add each member's roll number for verification.
							</p>
						</div>
						<div className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="teamName"
								rules={{ required: "Team name is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Team Name *</FormLabel>
										<FormControl>
											<Input placeholder="Team Quantum" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="teamSize"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Team Size *</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select team size" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="2">2 Members</SelectItem>
												<SelectItem value="3">3 Members</SelectItem>
												<SelectItem value="4">4 Members</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="participant2"
								rules={{ required: "Participant 2 is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Participant 2 *</FormLabel>
										<FormControl>
											<Input placeholder="Second teammate" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="participant2Roll"
								rules={{ required: "Roll number for participant 2 is required" }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Participant 2 Roll No *</FormLabel>
										<FormControl>
											<Input placeholder="2410XXXXXX" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{numericTeamSize >= 3 && (
							<div className="grid gap-6 md:grid-cols-2">
								<FormField
									control={form.control}
									name="participant3"
									rules={{
										validate: (value) =>
											numericTeamSize >= 3
												? !!value?.trim() || "Participant 3 is required"
												: true,
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Participant 3 *</FormLabel>
											<FormControl>
												<Input placeholder="Third teammate" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="participant3Roll"
									rules={{
										validate: (value) =>
											numericTeamSize >= 3
												? !!value?.trim() || "Roll number for participant 3 is required"
												: true,
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Participant 3 Roll No *</FormLabel>
											<FormControl>
												<Input placeholder="2410XXXXXX" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						)}
						{numericTeamSize === 4 && (
							<div className="grid gap-6 md:grid-cols-2">
								<FormField
									control={form.control}
									name="participant4"
									rules={{
										validate: (value) =>
											numericTeamSize === 4
												? !!value?.trim() || "Participant 4 is required"
												: true,
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Participant 4 *</FormLabel>
											<FormControl>
												<Input placeholder="Fourth teammate" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="participant4Roll"
									rules={{
										validate: (value) =>
											numericTeamSize === 4
												? !!value?.trim() || "Roll number for participant 4 is required"
												: true,
									}}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Participant 4 Roll No *</FormLabel>
											<FormControl>
												<Input placeholder="2410XXXXXX" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						)}
					</div>

					<div className="space-y-6 pt-8 border-t border-border/60">
						<div>
							<h3 className="text-xl font-semibold">Payment & Confirmation</h3>
							<p className="text-sm text-muted-foreground">
								Pay ₹100 per participant, keep the transaction reference handy, and upload the proof of payment.
							</p>
						</div>
						<div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] items-start">
							<div className="space-y-6">
								<FormField
									control={form.control}
									name="transactionId"
									rules={{ required: "Transaction / UPI reference is required" }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Transaction / UPI Reference ID *</FormLabel>
											<FormControl>
												<Input placeholder="UPI12345" {...field} />
											</FormControl>
											<FormDescription>
												You will find this in your payment success screen or SMS/email notification.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="notes"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Notes / Special Requests</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Anything we should know? Dietary needs, travel info, etc."
													className="min-h-[110px]"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="joinedWhatsapp"
									rules={{ validate: (value) => (value ? true : "Please join the WhatsApp group") }}
									render={({ field }) => (
										<FormItem className="flex flex-row items-start gap-3 rounded-2xl border border-border/60 p-4">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={(checked) => field.onChange(checked === true)}
												/>
											</FormControl>
											<div className="space-y-1 text-sm leading-tight">
												<FormLabel className="font-semibold">Joined the official WhatsApp group *</FormLabel>
												<p className="text-muted-foreground">
													Tap the link to stay updated: <Link href={WHATSAPP_GROUP_LINK} target="_blank" rel="noreferrer" className="text-primary underline">ByteBloom hackfest WhatsApp Lobby</Link>
												</p>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="glass-effect rounded-3xl border border-border/40 p-6 text-center">
								<p className="text-sm text-muted-foreground mb-3">Scan & pay ₹100 / participant</p>
								<div className="mx-auto flex min-h-[320px] w-full max-w-xs items-center justify-center rounded-xl border border-primary/40 bg-muted/40 p-3">
									{qrStatus === "loading" && (
										<Loader2 className="h-6 w-6 animate-spin text-primary" />
									)}
									{qrStatus === "error" && (
										<div className="space-y-3 text-sm text-muted-foreground">
											<p>Unable to load the QR right now.</p>
											<Button size="sm" variant="outline" onClick={loadPaymentQr}>
												Try again
											</Button>
										</div>
									)}
									{qrStatus === "loaded" && qrSrc && (
										<Image
											src={qrSrc}
											alt="ByteBloom hackfest payment QR"
											width={320}
											height={320}
											className="h-auto w-full rounded-xl"
											unoptimized
										/>
									)}
								</div>
								<p className="text-xs text-muted-foreground mt-3">
									If prompted, confirm the receiver name shows DevNest Technical Club before completing the transfer.
								</p>
								<div className="mt-4 flex flex-col gap-3 text-sm">
									<Button asChild variant="outline" className="gap-2">
										<Link href={WHATSAPP_GROUP_LINK} target="_blank" rel="noreferrer">
											Join WhatsApp Lobby
										</Link>
									</Button>
									<Button asChild variant="ghost" className="gap-2">
										<Link href={`mailto:${CONTACT_EMAILS[0]}`}>
											Need help? Email us
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-4 pt-8 border-t border-border/60">
						<div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-primary">
							Uploading the wrong payment or incomplete team details may delay verification. Double-check everything before you hit submit.
						</div>
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<p className="text-sm text-muted-foreground">
								By submitting, you agree to ByteBloom hackfest guidelines and consent to DevNest contacting you via email/WhatsApp.
							</p>
							<Button type="submit" className="gap-2" disabled={status === "loading"}>
								{status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
								Submit Registration
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</section>
	);
};
