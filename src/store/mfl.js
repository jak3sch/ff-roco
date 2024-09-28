import { defineStore } from "pinia";
import { supabase } from "@/js/supabase.js";
import { readMflApi } from "@/js/api/mfl.js";
import { useUserStore } from "@/store/userData.js";
import { useSupabaseStore } from "@/store/supabase.js";

export const useMflStore = defineStore("mflData", {
	state: () => {
		return {
			isAuthenticated: false,
		};
	},
	actions: {
		async fetchUserLeagues(username, token = "") {
			const supabaseData = useSupabaseStore();
			const userData = useUserStore();

			// read existing user leagues from supabase
			await supabaseData.readUserLeagues();

			// read user leagues from mfl api
			await readMflApi("myleagues", "api.")
				// add more data to each league object
				.then((response) => {
					return response.data.leagues.league.map((league) => {
						league.auth_token = token;
						league.username = username;
						league.platform = "mfl";
						return league;
					});
				})
				.then((response) => {
					const importData = response.map((league) => {
						return {
							id: `${userData.currentUserId}-mfl-${league.league_id}`,
							last_modified: new Date(),
							league_data: [
								league,
							],
						};
					});

					// Compare importData with existingLeagues
					const dataToWrite = importData.filter((importLeague) => {
						const existingLeague = supabaseData.userLeagues.find(
							(existing) => existing.id === importLeague.id
						);

						return (
							!existingLeague ||
							JSON.stringify(Object.keys(existingLeague.league_data).sort()) !==
								JSON.stringify(Object.keys(importLeague.league_data).sort())
						);
					});

					// Write data if there are differences
					if (dataToWrite.length > 0) {
						supabaseData.writeUserLeagues(dataToWrite);
					}

					// TODO: user feedback if there are no new leagues
				});
		},
	},
});
