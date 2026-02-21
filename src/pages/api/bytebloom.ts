import type { NextApiRequest, NextApiResponse } from "next";

import {
	appendPromptatonSubmission,
	getExistingRollConflicts,
	type PromptatonSubmissionRecord,
} from "../../../server/promptathon-storage";

const requiredFields: Array<keyof PromptatonSubmissionRecord> = [
	"submittedAt",
	"fullName",
	"rollNumber",
	"department",
	"whatsappNumber",
	"email",
	"participationType",
	"transactionId",
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).json({ message: "Method not allowed" });
	}

	const payload = req.body as Partial<PromptatonSubmissionRecord>;

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
		payload.teamMember2Roll,
	].filter((roll) => !!roll);

	try {
		const conflicts = await getExistingRollConflicts(incomingRolls as string[]);
		if (conflicts.length > 0) {
			return res.status(409).json({
				message: "One or more roll numbers are already registered.",
				conflicts,
			});
		}

		const record: PromptatonSubmissionRecord = {
			submittedAt: payload.submittedAt!,
			fullName: payload.fullName!,
			rollNumber: payload.rollNumber!,
			department: payload.department!,
			whatsappNumber: payload.whatsappNumber!,
			email: payload.email!,
			participationType: payload.participationType as "individual" | "team",
			teamName: payload.teamName ?? "",
			teamMember2: payload.teamMember2 ?? "",
			teamMember2Roll: payload.teamMember2Roll ?? "",
			transactionId: payload.transactionId!,
			notes: payload.notes ?? "",
		};

		await appendPromptatonSubmission(record);

		return res.status(200).json({ message: "Submission stored" });
	} catch (error) {
		console.error("Promptathon API error", error);
		return res.status(500).json({ message: "Failed to save submission" });
	}
}
