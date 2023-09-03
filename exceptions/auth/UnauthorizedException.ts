import { GeneralException } from "../GeneralException";

export class UnauthorizedException extends GeneralException {
	constructor(message?: string) {
		super(message || "Unauthorized");

		this.name = "UnauthorizedException";
	}
}
