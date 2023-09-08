export const toCapitalize = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toDollar = (amount: number): string => {
	return `$${amount.toFixed(2)}`;
};
