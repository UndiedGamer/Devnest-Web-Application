import { initializeFirebaseAdmin } from "../src/lib/firebase-admin";

export type GuestSpeakerRegistrationRecord = {
	submittedAt: string;
	name: string;
	rollNumber: string;
	class: string;
	phoneNumber: string;
	email: string;
};

export const appendGuestSpeakerRegistration = async (
	record: GuestSpeakerRegistrationRecord,
) => {
	const { adminDb } = initializeFirebaseAdmin();

	try {
		const registrationsRef = adminDb.collection("guest-speaker-registrations");
		await registrationsRef.add({
			...record,
			createdAt: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error saving guest speaker registration:", error);
		throw new Error("Failed to save registration");
	}
};
