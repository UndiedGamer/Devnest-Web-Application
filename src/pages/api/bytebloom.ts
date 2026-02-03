import type { NextApiRequest, NextApiResponse } from "next";

import {
	appendByteBloomSubmission,
	getExistingRollConflicts,
	type ByteBloomSubmissionRecord,
} from "../../../server/bytebloom-storage";

const requiredFields: Array<keyof ByteBloomSubmissionRecord> = [
	"submittedAt",
	"fullName",
	"rollNumber",
	"department",
	"whatsappNumber",
	"email",
	"teamName",
	"teamSize",
	"participant2",
	"participant2Roll",
	"transactionId",
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).json({ message: "Method not allowed" });
	}

	const payload = req.body as Partial<ByteBloomSubmissionRecord>;

	const missing = requiredFields.filter((field) => {
		const value = payload[field];
		return typeof value === "undefined" || value === null || value === "";
	});

	if (missing.length > 0) {
		return res.status(400).json({
			message: `Missing required fields: ${missing.join(", ")}`,
		});
	}

	const incomingRolls = [
		payload.rollNumber,
		payload.participant2Roll,
		payload.participant3Roll,
		payload.participant4Roll,
	].filter((roll) => !!roll);

	try {
		const conflicts = await getExistingRollConflicts(incomingRolls as string[]);
		if (conflicts.length > 0) {
			return res.status(409).json({
				message: "One or more roll numbers are already registered.",
				conflicts,
			});
		}

		const record: ByteBloomSubmissionRecord = {
			submittedAt: payload.submittedAt!,
			fullName: payload.fullName!,
			rollNumber: payload.rollNumber!,
			department: payload.department!,
			whatsappNumber: payload.whatsappNumber!,
			email: payload.email!,
			teamName: payload.teamName!,
			teamSize: payload.teamSize as "2" | "3" | "4",
			participant2: payload.participant2!,
			participant2Roll: payload.participant2Roll!,
			participant3: payload.participant3 ?? "",
			participant3Roll: payload.participant3Roll ?? "",
			participant4: payload.participant4 ?? "",
			participant4Roll: payload.participant4Roll ?? "",
			transactionId: payload.transactionId!,
			notes: payload.notes ?? "",
		};

		await appendByteBloomSubmission(record);

		return res.status(200).json({ message: "Submission stored" });
	} catch (error) {
		console.error("ByteBloom API error", error);
		return res.status(500).json({ message: "Failed to save submission" });
	}
}
