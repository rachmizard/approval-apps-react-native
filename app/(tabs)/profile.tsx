import { Button, ButtonSpinner, ButtonText, Text } from "@gluestack-ui/themed";

import { StyledView } from "@/components/StyledView";
import { useAuthContext } from "@/contexts/auth/auth-context";
import { useMutationSignOut } from "@/hooks/react-query/auth/use-mutation-sign-out";

export default function ProfileScreen() {
	const authContext = useAuthContext();
	const { mutate: mutateSignOut, isLoading: isLoadingMutateSignOut } =
		useMutationSignOut({
			onSettled: () => handlePressForceLogout(),
		});

	function handlePressForceLogout() {
		authContext.setLogout();
	}

	return (
		<StyledView flex={1} justifyContent="center" alignItems="center">
			<Text mb={10}>
				{authContext?.user?.name} | {authContext?.user?.email}
			</Text>

			<Button
				isDisabled={isLoadingMutateSignOut}
				onPress={() => mutateSignOut()}>
				{isLoadingMutateSignOut && <ButtonSpinner />}
				<ButtonText>Sign Out</ButtonText>
			</Button>
		</StyledView>
	);
}
