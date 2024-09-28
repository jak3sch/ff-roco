//
// MFL API Helper Functions
//
// ========================================================================

// Imports
// ========================================================================

import axios from "axios";

const currentYear = new Date().getFullYear();

// via MFL anmelden
//
// @param {string} username - MFL Username
// @param {string} password - MFL Password
// ========================================================================

export const authorizeMflApi = async (username, password) => {
	return await axios
		.post(
			import.meta.env.VITE_API_BASE_URL +
				"/api/authorize.php?YEAR=" +
				currentYear +
				"&USERNAME=" +
				username +
				"&PASSWORD=" +
				password
		)
		.then((response) => {
			return getXmlStatus(response);
		})
		.catch((error) => {
			return { type: "danger", data: error.message };
		});
};

// lese per POST die MFL API
//
// @param {string} type - MFL API Type
// @param {string} params - MFL API Params
// ========================================================================

export async function readMflApi(
	type,
	host,
	leagueId,
	params,
	debugInfo = "mfl.js ~ readMflApi"
) {
	let apiQuery =
		import.meta.env.VITE_API_BASE_URL + "/api/read.php?YEAR=" + currentYear;

	if (host) {
		apiQuery += "&HOST=" + host;
	}

	if (type) {
		apiQuery += "&TYPE=" + type;
	}

	if (leagueId) {
		apiQuery += "&LEAGUEID=" + leagueId;
	}

	if (params) {
		apiQuery += params;
	} else {
		apiQuery += "&PARAMS=''";
	}

	return await axios.post(apiQuery).then((response) => {
		const type = response.data.error ? "error" : "success";
		const data = response.data.error ? response.data.error.$t : response.data;

		if (type === "success") {
			const messageDefault = "Daten wurden erfolgreich geladen.";
			let message = debugInfo.split(".");
			message = message[message.length - 1].includes("js")
				? messageDefault
				: message[message.length - 1] + " " + messageDefault;

			console.log("🚀 ~ readMflApi ~ message:", message);
		} else {
			console.log("🚀 ~ readMflApi ~ error:", `${debugInfo}: ` + error);
		}

		return { type: type, data: data };
	});
}

// schreibe per POST die MFL API
//
// @param {string} type - MFL API Type
// @param {string} params - MFL API Params
// ========================================================================

export const writeMflApi = async (type, params) => {
	let apiQuery =
		import.meta.env.VITE_API_BASE_URL +
		"/api/write.php?HOST=" +
		import.meta.env.VITE_MFL_HOST +
		"&YEAR=" +
		import.meta.env.VITE_MFL_YEAR +
		"&TYPE=" +
		type +
		"&LEAGUEID=" +
		import.meta.env.VITE_MFL_LEAGUE_ID;

	if (params) {
		apiQuery += "&PARAMS=" + params;
	} else {
		apiQuery += "&PARAMS=''";
	}

	return await axios
		.post(apiQuery)
		.then((response) => {
			console.log("🚀 ~ writeMflApi ~ response:", response);
		})
		.catch((error) => {
			console.log("🚀 ~ writeMflApi ~ error:", error);
		});
};

// lese den MFL Chat
//
// ========================================================================

export const readMflChat = async (year = currentYear) => {
	return await axios
		.post(
			import.meta.env.VITE_API_BASE_URL +
				"/api/read-chat.php?HOST=45&LEAGUEID=" +
				import.meta.env.VITE_MFL_LEAGUE_ID +
				"&YEAR=" +
				year
		)
		.then((response) => {
			const xml = response.data;
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xml, "text/xml");
			const messages = xmlDoc.getElementsByTagName("message");

			let messagesArray = [];

			for (let i = 0; i < messages.length; i++) {
				let message = {
					id: messages[i].getAttribute("id"),
					date: messages[i].getAttribute("posted"),
					from: messages[i].getAttribute("franchise_id"),
					to: messages[i].getAttribute("to"),
					message: messages[i].getAttribute("message"),
				};

				messagesArray.push(message);
			}

			return messagesArray;
		})
		.catch((error) => {
			console.log(error);
		});
};

//
// schreibe in den MFL Chat
//
// ========================================================================

export const writeMflChat = async (message, to = "0000") => {
	let apiQuery =
		import.meta.env.VITE_API_BASE_URL +
		"/api/writeMflChat.php?HOST=" +
		import.meta.env.VITE_MFL_HOST +
		"&YEAR=" +
		import.meta.env.VITE_MFL_YEAR +
		"&LEAGUEID=" +
		import.meta.env.VITE_MFL_LEAGUE_ID +
		"&MESSAGE=" +
		message +
		"&TO=" +
		to;

	return await axios
		.post(apiQuery)
		.then((response) => {
			console.log("🚀 ~ writeMflChat ~ response:", response);
		})
		.catch((error) => {
			console.log("🚀 ~ writeMflChat ~ error:", error);
		});
};

// Helper Functions
// ========================================================================

/*
 * lese Status der Antwort der MFL API Abfrage
 *
 * @param {object} response - Response der MFL API
 */
export const getXmlStatus = (response) => {
	console.log("🚀 ~ getXmlStatus ~ response:", response);
	let xmlDoc = new DOMParser().parseFromString(response.data, "text/xml");
	let status = xmlDoc.querySelector("status")
		? xmlDoc.querySelector("status").textContent
		: xmlDoc.querySelector("error").textContent;

	if (status.includes("OK")) {
		// get MFL_USER_ID attribute from status element
		const mflUserId = xmlDoc
			.querySelector("status")
			.getAttribute("MFL_USER_ID");

		return { type: "success", data: status, mflUserId: mflUserId };
	} else {
		return { type: "danger", data: status };
	}
};
