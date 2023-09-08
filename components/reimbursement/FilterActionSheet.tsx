import {
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetDragIndicatorWrapper,
	Button,
	ButtonText,
	VStack,
} from "@gluestack-ui/themed";
import React, { FC } from "react";
import { Select } from "../forms/Select";
import { FormControl } from "../FormControl";
import { Controller, FormProvider, useForm } from "react-hook-form";

type FormValues = {
	status: "" | "approved" | "rejected";
	sortBy: "claim_date" | "employee_name" | "";
	orderBy: "asc" | "desc";
};

interface Props {
	showActionsheet: boolean;
	handleClose: () => void;
	onSubmit?: (values: FormValues) => void;
}

export const ReimbursementFilterActionSheet: FC<Props> = ({
	showActionsheet,
	handleClose,
	onSubmit,
}) => {
	const methods = useForm<FormValues>({
		defaultValues: {
			status: "",
			sortBy: "",
			orderBy: "desc",
		},
	});

	return (
		<Actionsheet
			isOpen={showActionsheet}
			onClose={handleClose}
			zIndex={999}>
			<ActionsheetBackdrop />
			<ActionsheetContent>
				<ActionsheetDragIndicatorWrapper>
					<ActionsheetDragIndicator />
				</ActionsheetDragIndicatorWrapper>

				<FormProvider {...methods}>
					<VStack flex={1} width="100%" px={10}>
						<Controller
							name="status"
							render={({ field, fieldState }) => (
								<FormControl
									size="lg"
									labelText="Status"
									component={
										<Select
											selectedValue={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isHovered={fieldState.isTouched}
											placeholder="Select status"
											options={[
												{
													label: "All",
													value: "",
												},
												{
													label: "Approved",
													value: "approved",
												},
												{
													label: "Pending",
													value: "pending",
												},
												{
													label: "Rejected",
													value: "rejected",
												},
											]}
										/>
									}
								/>
							)}
						/>
						<Controller
							name="sortBy"
							render={({ field, fieldState }) => (
								<FormControl
									labelText="Sort by"
									component={
										<Select
											selectedValue={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											placeholder="Sort by"
											options={[
												{
													label: "Default",
													value: "",
												},
												{
													label: "Claim Date",
													value: "claim_date",
												},
												{
													label: "Employee Name",
													value: "employee_name",
												},
											]}
										/>
									}
								/>
							)}
						/>

						<Controller
							name="orderBy"
							render={({ field, fieldState }) => (
								<FormControl
									labelText="Order By"
									component={
										<Select
											selectedValue={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											placeholder="Choose order"
											options={[
												{
													label: "Ascending",
													value: "asc",
												},
												{
													label: "Descending",
													value: "desc",
												},
											]}
										/>
									}
								/>
							)}
						/>

						<VStack w="$full" space="md">
							<Button
								variant="solid"
								action="secondary"
								size="lg"
								onPress={methods.handleSubmit((values) => {
									onSubmit?.(values);
									handleClose();
								})}>
								<ButtonText>Apply</ButtonText>
							</Button>
							<Button
								variant="outline"
								action="secondary"
								size="lg"
								onPress={() => methods.reset()}>
								<ButtonText>Reset</ButtonText>
							</Button>
						</VStack>
					</VStack>
				</FormProvider>
			</ActionsheetContent>
		</Actionsheet>
	);
};
