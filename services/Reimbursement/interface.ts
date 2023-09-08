export type ReimbursementStatus = "approved" | "rejected" | "pending";
export type ReimbursementCategory =
	| "medical"
	| "optical"
	| "transport"
	| "dental";

export interface ReimbursementApproval {
	employee_number: number;
	employee_name: string;
	employee_avatar: string;
	claim_date: string;
	category: ReimbursementCategory;
	amount: number;
	description: string;
	status: ReimbursementStatus;
	id: string;
}

export interface ReimbursementUpdateRequestPayload {
	status: ReimbursementStatus;
	id: string;
}
