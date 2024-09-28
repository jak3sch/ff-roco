import { defineStore } from "pinia";
import { supabase } from "@/js/supabase.js";
import { readMflApi } from "@/js/api/mfl.js";
import { useUserStore } from "@/store/userData.js";

export const useMflStore = defineStore("mflData", {
	state: () => {
		return {
			isAuthenticated: false,
		};
	},
	actions: {
		async fetchUserLeagues(token) {
			const userData = useUserStore();

			const response = await readMflApi("myleagues", "api.");

			// add token to each league object
			response.data.leagues.league.map((league) => {
				league.auth_token = token;
				league.platform = "mfl";
				return league;
			});

			console.log(
				"🚀 ~ fetchUserLeagues ~ response:",
				response.data.leagues.league
			);

			const { data, error } = await supabase
				.from("userLeagues")
				.insert([
					{
						// user_id: userData.currentUserId,
						leagues: "response.data.leagues.league",
					},
				])
				.select();
			console.log("🚀 ~ fetchUserLeagues ~ data:", data);
			console.log("🚀 ~ fetchUserLeagues ~ error:", error);
		},
	},
});

// TODO: settings for timezone
