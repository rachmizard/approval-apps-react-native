export class UserNotFoundException extends Error {
	public statusCode: number;

	constructor(message: string, statusCode = 404) {
		super(message);
		this.name = "UserNotFoundException";
		this.message = message;
		this.statusCode = statusCode;
	}
}
