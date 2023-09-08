import { BaseListResponse } from "@/interfaces/base-response";
import { Environment } from "@/utils/environment";
import { RequestAdapterService } from "../RequestAdapterService";
import {
	ReimbursementApproval,
	ReimbursementUpdateRequestPayload,
} from "./interface";
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

	public async getReimbursementApprovalDetail(
		id: string
	): Promise<ReimbursementApproval> {
		try {
			const { data } = await super.sendGetRequest<ReimbursementApproval>(
				`/reimbursement_approvals/${id}`
			);

			return data;
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

	public async updateReimbursementApproval(
		id: string,
		payload: ReimbursementUpdateRequestPayload
	) {
		try {
			const { data } = await super.sendPutRequest<
				ReimbursementApproval,
				ReimbursementUpdateRequestPayload
			>(`/reimbursement_approvals/${id}`, payload);

			return data;
		} catch (error: any) {
			if (error?.response) {
				switch (error?.response.status) {
					case 500:
						throw new GeneralException(
							error.response.data.message ||
								error.message ||
								"Something went wrong"
						);
					default:
						throw new GeneralException(
							error.response.data.message ||
								error.message ||
								"Something went wrong"
						);
				}
			}
		}
	}
}
