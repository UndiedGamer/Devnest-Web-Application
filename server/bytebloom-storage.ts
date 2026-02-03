import { initializeFirebaseAdmin } from "../src/lib/firebase-admin";

export type ByteBloomSubmissionRecord = {
	submittedAt: string;
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
	notes: string;
};

const normalizeRoll = (roll?: string | null) => roll?.trim().toLowerCase() ?? "";

export const getExistingRollConflicts = async (rolls: string[]) => {
	const { adminDb } = initializeFirebaseAdmin();

	const normalizedIncoming = new Set(
		rolls.map(normalizeRoll).filter((roll) => roll.length > 0),
	);

	if (normalizedIncoming.size === 0) {
		return [];
	}

	try {
		const submissionsRef = adminDb.collection("bytebloom-submissions");
		const snapshot = await submissionsRef.get();
		const conflicts = new Set<string>();

		snapshot.forEach((doc) => {
			const data = doc.data();
			const existingRolls = [
				data.rollNumber,
				data.participant2Roll,
				data.participant3Roll,
				data.participant4Roll,
			]
				.map(normalizeRoll)
				.filter((roll) => roll.length > 0);

			existingRolls.forEach((roll) => {
				if (normalizedIncoming.has(roll)) {
					conflicts.add(roll);
				}
			});
		});

		return Array.from(conflicts);
	} catch (error) {
		console.error("Error checking roll conflicts:", error);
		throw new Error("Failed to check roll conflicts");
	}
};

export const appendByteBloomSubmission = async (record: ByteBloomSubmissionRecord) => {
	const { adminDb } = initializeFirebaseAdmin();

	try {
		const submissionsRef = adminDb.collection("bytebloom-submissions");
		await submissionsRef.add({
			...record,
			createdAt: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error saving submission:", error);
		throw new Error("Failed to save submission");
	}
};
