import { toRaw } from "vue";

export const compareDataBeforeUpload = (
	importData,
	existingData,
	sortKey,
	findKey = { importKey: "id", existingKey: "id" }
) => {
	const importSortKey =
		typeof sortKey === "string" ? sortKey : sortKey.importSortKey;
	const existingSortKey =
		typeof sortKey === "string" ? sortKey : sortKey.existingSortKey;
	const importKey = typeof findKey === "string" ? findKey : findKey.importKey;
	const existingKey =
		typeof findKey === "string" ? findKey : findKey.existingKey;

	return importData.filter((data) => {
		const foundData = existingData.find(
			(existing) => existing[existingKey] === data[importKey]
		);

		switch (true) {
			case !foundData:
				return false;

			// compare data if found
			case foundData.hasOwnProperty(existingSortKey) &&
				data.hasOwnProperty(importSortKey):
				return (
					JSON.stringify(Object.keys(foundData[existingSortKey]).sort()) !==
					JSON.stringify(Object.keys(data[importSortKey]).sort())
				);

			case foundData.hasOwnProperty(existingSortKey) ||
				data.hasOwnProperty(importSortKey):
				return true;

			default:
				return false;
		}
	});
};
