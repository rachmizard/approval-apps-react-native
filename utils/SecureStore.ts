import * as ExpoSecureStore from "expo-secure-store";

export class SecureStore {
	public static async setItem<T extends unknown>(key: string, value: T) {
		const parsedValue = JSON.stringify(value);
		await ExpoSecureStore.setItemAsync(key, parsedValue);
	}

	public static async getItem<T extends unknown>(
		key: string
	): Promise<T | null> {
		const value = await ExpoSecureStore.getItemAsync(key);
		if (!value) return null;
		return JSON.parse(value);
	}

	public static async deleteItem(key: string) {
		await ExpoSecureStore.deleteItemAsync(key);
	}

	public static async isAvailable(): Promise<boolean> {
		return await ExpoSecureStore.isAvailableAsync();
	}
}
