import { defineStore } from "pinia";
import { supabase } from "@/js/supabase.js";
import { platform } from "@tauri-apps/api/os";

export const useSupabaseStore = defineStore("supabaseData", {
	state: () => {
		return {
			userLeagues: [],
		};
	},
	actions: {
		// User Leagues
		// ========================================================================

		async readUserLeagues() {
			// fetch supabase data
			let { data: userLeagues, error } = await supabase
				.from("userLeagues")
				.select("id,league_data");

			// set state
			this.userLeagues = userLeagues;
		},

		async writeUserLeagues(importData) {
			const { data, error } = await supabase
				.from("userLeagues")
				.upsert(importData, { onConflict: ["id"], ignoreDuplicates: false })
				.select();

			if (error) {
				console.error(error);
			}
		},

		async deleteUserLeagues(leagues) {},
	},
});

// TODO: error handling
