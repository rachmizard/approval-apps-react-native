import { router } from "expo-router";
import {
	Alert,
	AlertIcon,
	AlertText,
	Box,
	Button,
	ButtonSpinner,
	ButtonText,
	InfoIcon,
	Input,
	InputField,
} from "@gluestack-ui/themed";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useUpdateEffect } from "usehooks-ts";

import { useMutationSignIn } from "@/hooks/react-query/auth/use-mutation-sign-in";
import { useQueryGetProfile } from "@/hooks/react-query/auth/use-get-profile";

import { FormControl } from "../FormControl";

import { useAuthContext } from "@/contexts/auth/auth-context";

const DEFAULT_VALUES = {
	username: "",
	password: "",
};

type LoginFormValues = typeof DEFAULT_VALUES;

type SignInFormProps = {
	defaultValues?: LoginFormValues;
};

export function SignInForm({ defaultValues }: SignInFormProps) {
	const form = useForm<LoginFormValues>({
		defaultValues: defaultValues || DEFAULT_VALUES,
	});

	const { setLogin, token, user } = useAuthContext();

	const {
		mutateAsync: mutateSignInAsync,
		isError: isErrorMutateSignInAsync,
		isLoading: isLoadingMutateSignInAsync,
		error,
		data: dataMutateSignInAsync,
	} = useMutationSignIn();

	const { data: dataGetProfile } = useQueryGetProfile(
		dataMutateSignInAsync?.token,
		{
			enabled: !!dataMutateSignInAsync?.token,
		}
	);

	useUpdateEffect(() => {
		if (dataGetProfile && dataMutateSignInAsync?.token) {
			setLogin(dataGetProfile, dataMutateSignInAsync?.token);
			// router.replace("/");
		}
	}, [dataGetProfile, dataMutateSignInAsync?.token]);

	async function handleSignIn(values: LoginFormValues) {
		const deviceName = "iphone XR";

		await mutateSignInAsync({
			device_name: deviceName,
			username: values.username,
			password: values.password,
		});
	}

	const isShowAlert = isErrorMutateSignInAsync && !isLoadingMutateSignInAsync;

	return (
		<FormProvider {...form}>
			{isShowAlert && (
				<Alert action="warning" variant="solid">
					<AlertIcon as={InfoIcon} mr="$3" />
					<AlertText>{error?.message}</AlertText>
				</Alert>
			)}

			<Controller<LoginFormValues>
				name="username"
				render={({ field, fieldState }) => (
					<FormControl
						labelText="Username"
						helperText="Please enter your username address."
						isRequired
						isInvalid={fieldState.invalid}
						errorText={fieldState.error?.message}
						component={
							<Input>
								<InputField
									{...field}
									onChangeText={(v) => field.onChange(v)}
									type="text"
									placeholder="Input your username.."
									autoCapitalize="none"
								/>
							</Input>
						}
					/>
				)}
			/>
			<Controller
				name="password"
				rules={{
					required: "Password is required",
				}}
				render={({ field, fieldState }) => (
					<FormControl
						labelText="Password"
						isRequired
						isInvalid={fieldState.invalid}
						errorText={fieldState.error?.message}
						component={
							<Input>
								<InputField
									{...field}
									onChangeText={(v) => field.onChange(v)}
									type="password"
									defaultValue="12345"
									placeholder="password"
									autoCapitalize="none"
								/>
							</Input>
						}
					/>
				)}
			/>
			<Box>
				<Button
					width="$full"
					isDisabled={!form.formState.isValid}
					onPress={form.handleSubmit(handleSignIn)}>
					{isLoadingMutateSignInAsync && <ButtonSpinner mr="$1" />}
					<ButtonText>Sign In</ButtonText>
				</Button>
			</Box>
		</FormProvider>
	);
}
