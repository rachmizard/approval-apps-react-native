export const parseISODate = (date: string): string => {
	const dateObject = new Date(date);
	return dateObject.toDateString();
};

export const formatDate = (date: string): string => {
	return Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
		new Date(date)
	);
};
