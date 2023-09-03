import { Heading, Text, VStack } from "@gluestack-ui/themed";

import { StyledSafeAreaView, StyledView } from "@/components/StyledView";
import { SignInForm } from "@/components/auth/SignInForm";

export default function LoginScreen() {
	return (
		<StyledSafeAreaView>
			<StyledView paddingHorizontal={30} paddingVertical={50}>
				<Heading>Sign In</Heading>
				<Text>Sign in to your account</Text>

				<VStack marginTop={40} gap="$1/4">
					<SignInForm />
				</VStack>
			</StyledView>
		</StyledSafeAreaView>
	);
}
