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
		// Helper
		// ========================================================================
		getMflHostFromUrl(url) {
			return url.match(/https:\/\/(.*)my/)[1];
		},
		
		async fetchLeagueInfos(leagueData) {
			const host = this.getMflHostFromUrl(leagueData.url);

			return await readMflApi("league", host, leagueData.league_id, leagueData.auth_token)
		},
		async fetchUserLeagues(token = "") {
			const supabaseData = useSupabaseStore();
			const userData = useUserStore();

			// read existing user leagues from supabase
			await supabaseData.readUserLeagues();

			// read user leagues from mfl api
			await readMflApi("myleagues", "api.", "", token)
				// add more data to each league object
				// .then((response) => {
				// 	return response.data.leagues.league.map((league) => {
				// 		league.auth_token = token;
				// 		return league;
				// 	});
				// })
				// .then((response) => {
				// 	if (!userData.currentUserId) return;

				// 	const importData = response.map((league) => {
				// 		return {
				// 			league_id: `${userData.currentUserId}_mfl_${league.league_id}`,
				// 			last_modified: new Date(),
				// 			league_data: [
				// 				league,
				// 			],
				// 		};
				// 	});

				// 	// TODO: compare data to helper function

				// 	// Compare importData with existingLeagues
				// 	const dataToWrite = importData.filter((importLeague) => {
				// 		const existingLeague = supabaseData.userLeagues.find(
				// 			(existing) => existing.id === importLeague.id
				// 		);

				// 		return (
				// 			!existingLeague ||
				// 			JSON.stringify(Object.keys(existingLeague.league_data).sort()) !==
				// 				JSON.stringify(Object.keys(importLeague.league_data).sort())
				// 		);
				// 	});

				// 	// Write data if there are differences
				// 	if (dataToWrite.length > 0) {
				// 		supabaseData.upsertUserLeagues(dataToWrite);
				// 		supabaseData.readUserLeagues();
				// 		// TODO: ligen nach hinzufügen direkt anzeigen
				// 	}

				// 	// TODO: user feedback if there are no new leagues
				// })
				// .then(async () => {
				// 	await this.fetchUserTeamsFromLeagues();
				// })
				.then(async () => {
					await this.fetchUserRostersFromTeams();
				})
				// .catch((error) => {
				// 	console.error("🚀 ~ fetchUserLeagues ~ error", error
				// 	);
				// });
		},
		async fetchUserTeamsFromLeagues() {
			const supabaseData = useSupabaseStore();
			
			await supabaseData.readUserLeagues()
				.then(() => {
					supabaseData.userLeagues.map(async (league) => {
						// load more data for each league
						const franchiseData = await this.fetchLeagueInfos(league.league_data[0]).then((response) => {
							// find franchise of user
							return response.data.league.franchises.franchise.find(
								(franchise) => franchise.id === league.league_data[0].franchise_id
							);
						})
						.then((response) => {
							return {
								team_id: `${league.league_id}_${response.id}`,
								league_id: league.league_id,
								last_modified: new Date(),
								team_data: {
									id: response.id,
									name: response.name,
									logo: response.icon ? response.icon : response.logo,
								}
							}
						})
		
						supabaseData.writeUserTeams(franchiseData);
					});
				})
		},
		async fetchUserRostersFromTeams() {
			const supabaseData = useSupabaseStore();
			
			await supabaseData.readUserLeagues();
			await supabaseData.readUserTeams()
				.then(() => {
					supabaseData.userTeams.map(async (team) => {
						const leagueData = supabaseData.userLeagues.find(
							(league) => team.team_id.includes(league.league_data[0].league_id)
						).league_data[0];
						
						const rosterData = await readMflApi(
							"rosters",
							this.getMflHostFromUrl(leagueData.url),
							leagueData.league_id,
							encodeURIComponent(leagueData.auth_token),
							`&FRANCHISE=${team.team_data.id}`
						)
						.then((response) => {
							const roster = response.data.rosters.franchise?.player;

							// if no players are found, return (e.g. contest leagues)
							if (!roster) return;

							return roster.map((player) => {
								return {
									id: player.id,
									status: player.status,
								}
							})
						});
						
						supabaseData.writeUserRosters(rosterData, team.team_id);
					})
				});
		}
	},
});
