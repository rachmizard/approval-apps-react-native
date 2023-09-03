import { config, createConfig } from "@gluestack-ui/themed";

export const extendedConfig = createConfig({
	...config.theme,
	components: {
		View: {
			theme: {
				backgroundColor: "white",
			},
		},
	},
});
