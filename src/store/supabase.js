import { defineStore } from "pinia";
import { supabase } from "@/js/supabase.js";
import { platform } from "@tauri-apps/api/os";

export const useSupabaseStore = defineStore("supabaseData", {
	state: () => {
		return {
			userLeagues: [],
			userTeams: [],
			selectedTeam: []
		};
	},
	actions: {
		// User Leagues
		// ========================================================================

		async readUserLeagues() {
			// fetch supabase data
			let { data: userLeagues, error } = await supabase
				.from("userLeagues")
				.select("league_id,league_data,last_modified");
			
			// set state
			this.userLeagues = userLeagues;
		},

		async insertUserLeagues(importData) {
			const { data, error } = await supabase
				.from("userLeagues")
				.insert(importData)
				.select();
			console.log("🚀 ~ insertUserLeagues ~ data:", data)

			if (error) {
				console.error(error);
			}
		},

		async upsertUserLeagues(importData) {
			const { data, error } = await supabase
				.from("userLeagues")
				.upsert(importData, { onConflict: ["league_id"] })
				.select();

			if (error) {
				console.error(error);
			}
		},

		async deleteUserLeagues(leagues) {},

		// User Teams
		// ========================================================================
		
		async readUserTeams() {
			// fetch supabase data
			let { data: userTeams, error } = await supabase
				.from("userTeams")
				.select("team_id,team_data,roster_data");

			// set state
			this.userTeams = userTeams;
		},

		async upsertUserTeams(importData) {
			const { data, error } = await supabase
				.from("userTeams")
				.upsert(importData, { onConflict: ["team_id"] })
				.select();

			if (error) {
				console.error(error);
			}
		},

		// User Rosters
		// ========================================================================
		
		async writeUserRosters(importData) {
			const { data, error } = await supabase
				.from("userTeams")
				.update({roster_data: importData.roster_data, last_modified: new Date()})
				.eq("team_id", importData.team_id)
				.select();

			if (error) {
				console.error(error);
			}
		}
	},
});

// TODO: error handling
