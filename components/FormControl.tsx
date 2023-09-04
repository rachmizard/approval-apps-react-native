import React from "react";

import {
	AlertCircleIcon,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	FormControlHelper,
	FormControlHelperText,
	FormControlLabel,
	FormControlLabelText,
	FormControl as GluestackFormControl,
} from "@gluestack-ui/themed";

type FormControlSize = "sm" | "md" | "lg";

interface Props {
	size?: FormControlSize;
	isDisabled?: boolean;
	isInvalid?: boolean;
	isReadOnly?: boolean;
	isRequired?: boolean;
	labelText?: string;
	component?: React.ReactNode;
	helperText?: string;
	errorText?: string;
}

export function FormControl({
	size = "md",
	component,
	errorText,
	helperText,
	isDisabled,
	isInvalid,
	isReadOnly,
	isRequired,
	labelText,
}: Props) {
	return (
		<GluestackFormControl
			size={size}
			isDisabled={isDisabled}
			isInvalid={isInvalid}
			isReadOnly={isReadOnly}
			isRequired={isRequired}
			width="$full">
			<FormControlLabel mb="$2">
				<FormControlLabelText>{labelText}</FormControlLabelText>
			</FormControlLabel>
			{component}
			<FormControlHelper>
				<FormControlHelperText>{helperText}</FormControlHelperText>
			</FormControlHelper>
			<FormControlError>
				<FormControlErrorIcon as={AlertCircleIcon} />
				<FormControlErrorText>{errorText}</FormControlErrorText>
			</FormControlError>
		</GluestackFormControl>
	);
}
