import {
	SelectTrigger,
	SelectInput,
	SelectIcon,
	SelectPortal,
	SelectBackdrop,
	SelectContent,
	SelectDragIndicatorWrapper,
	SelectDragIndicator,
	SelectItem,
	Select as SelectComponent,
	Icon,
	ChevronDownIcon,
} from "@gluestack-ui/themed";

interface Props extends SelectProps {
	options?: SelectItemOption[];
	placeholder?: string;
	size?: "sm" | "md" | "lg";
}

type SelectProps = React.ComponentProps<typeof SelectComponent>;
type SelectItemOption = {
	label: string;
	value: string;
	isDisabled?: boolean;
};

export const Select = ({
	options,
	placeholder = "Choose option",
	size = "md",
	...restProps
}: Props) => {
	return (
		<SelectComponent {...restProps} width="100%">
			<SelectTrigger variant="rounded" size={size}>
				<SelectInput
					value={
						options?.find(
							(option) => option.value === restProps.selectedValue
						)?.label
					}
					placeholder={placeholder}
				/>
				<SelectIcon mr="$3">
					<Icon as={ChevronDownIcon} />
				</SelectIcon>
			</SelectTrigger>
			<SelectPortal snapPoints={[20]}>
				<SelectBackdrop />
				<SelectContent h="100%">
					<SelectDragIndicatorWrapper>
						<SelectDragIndicator />
					</SelectDragIndicatorWrapper>

					{options?.map((option) => (
						<SelectItem
							key={option.value}
							value={option.value}
							label={option.label}
							isDisabled={option?.isDisabled}
						/>
					))}
				</SelectContent>
			</SelectPortal>
		</SelectComponent>
	);
};
