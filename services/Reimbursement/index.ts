import { BaseListResponse } from "@/interfaces/base-response";
import { Environment } from "@/utils/environment";
import { RequestAdapterService } from "../RequestAdapterService";
import { ReimbursementApproval } from "./interface";
import { UnauthorizedException } from "@/exceptions/auth/UnauthorizedException";
import { GeneralException } from "@/exceptions/GeneralException";
import { BaseRequestParams } from "@/interfaces/base-request";
import { generateMetaData } from "@/utils/generate-meta-data";

export class ReimbursementService extends RequestAdapterService {
	constructor() {
		super(Environment.apiUrl);
	}

	public async getReimbursementApprovals(
		params?: BaseRequestParams
	): Promise<BaseListResponse<ReimbursementApproval>> {
		try {
			const { data } = await super.sendGetRequest<
				BaseListResponse<ReimbursementApproval>
			>("/reimbursement_approvals", {
				params,
			});

			return {
				...data,
				meta_data: generateMetaData(data, params?.page, params?.limit),
			};
		} catch (error: any) {
			if (error?.response) {
				switch (error.response.status) {
					case 401:
						throw new UnauthorizedException("Unauthorized");
					default:
						throw new GeneralException(
							error.response.data.message ||
								error.message ||
								"Something went wrong"
						);
				}
			}

			throw new GeneralException(error.message || "Something went wrong");
		}
	}
}
