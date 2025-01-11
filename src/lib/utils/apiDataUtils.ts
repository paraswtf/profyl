// A function that extracts only the specified keys from an object
//Crazy type assertions :) It works though
//Used when data is returned from api
export function onlySpecifiedKeys<
	T extends { [key: string]: any },
	K extends (keyof T)[]
>(obj: T, keys: K) {
	return keys.reduce((acc: Partial<T>, key: K[number]) => {
		if (obj[key]) {
			acc[key] = obj[key];
		}
		return acc;
	}, {}) as Pick<T, K[number]>;
}
