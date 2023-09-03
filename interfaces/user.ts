type Role = {
	id: number;
	name: string;
};

export interface User {
	created_at: string;
	email: string;
	email_verified_at: string;
	id: 6;
	name: string;
	roles: Role[];
	status: "active" | "inactive";
	updated_at: string;
	username: string;
}
