import { defineStore } from "pinia";
import { supabase } from "@/js/supabase.js";
import { readMflApi } from "@/js/api/mfl.js";
import { useUserStore } from "@/store/userData.js";
import { useSupabaseStore } from "@/store/supabase.js";
import { compareDataBeforeUpload } from "@/js/helper.js";

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

			return await readMflApi(
				"league",
				host,
				leagueData.league_id,
				leagueData.auth_token
			);
		},
		async fetchUserLeagues(token = "") {
			const supabaseData = useSupabaseStore();
			const userData = useUserStore();

			// read existing user leagues from supabase
			await supabaseData.readUserLeagues();

			// read user leagues from mfl api
			await readMflApi("myleagues", "api.", "", token)
				// add more data to each league object
				.then((response) => {
					return response.data.leagues.league.map((league) => {
						league.auth_token = token;
						return league;
					});
				})
				.then((response) => {
					if (!userData.currentUserId) return;

					const importData = response.map((league) => {
						return {
							league_id: `${userData.currentUserId}_mfl_${league.league_id}`,
							last_modified: new Date(),
							league_data: [league],
						};
					});

					const dataToWrite = compareDataBeforeUpload(
						importData,
						supabaseData.userLeagues,
						"league_data"
					);

					// Write data if there are differences
					if (dataToWrite.length === 0) return;

					supabaseData.upsertUserLeagues(dataToWrite);
					supabaseData.readUserLeagues();

					// TODO: ligen nach hinzufügen direkt anzeigen
					// TODO: user feedback if there are no new leagues
				})
				.then(async () => {
					await this.fetchUserTeamsFromLeagues();
				})
				.then(async () => {
					await this.fetchUserRostersFromTeams();
				});
			// .catch((error) => {
			// 	console.error("🚀 ~ fetchUserLeagues ~ error", error
			// 	);
			// });
		},
		async fetchUserTeamsFromLeagues() {
			const supabaseData = useSupabaseStore();

			await supabaseData.readUserTeams();
			await supabaseData.readUserLeagues().then(async () => {
				const importData = await Promise.all(
					supabaseData.userLeagues.map(async (league) => {
						// load more data for each league
						return await this.fetchLeagueInfos(league.league_data[0])
							.then((response) => {
								// find franchise of user
								return response.data.league.franchises.franchise.find(
									(franchise) =>
										franchise.id === league.league_data[0].franchise_id
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
									},
								};
							});
					})
				);

				const dataToWrite = compareDataBeforeUpload(
					importData,
					supabaseData.userTeams,
					"team_data"
				);

				if (dataToWrite.length === 0) return;

				dataToWrite.forEach((team) => {
					supabaseData.upsertUserTeams(team);
				});
			});
		},
		async fetchUserRostersFromTeams() {
			const supabaseData = useSupabaseStore();

			await supabaseData.readUserLeagues();
			await supabaseData.readUserTeams().then(async () => {
				const importData = await Promise.all(
					supabaseData.userTeams.map(async (team) => {
						const leagueData = supabaseData.userLeagues.find((league) =>
							team.team_id.includes(league.league_data[0].league_id)
						).league_data[0];

						return await readMflApi(
							"rosters",
							this.getMflHostFromUrl(leagueData.url),
							leagueData.league_id,
							encodeURIComponent(leagueData.auth_token),
							`&FRANCHISE=${team.team_data.id}`
						).then((response) => {
							const roster = response.data.rosters.franchise?.player;

							// if no players are found, return (e.g. contest leagues)
							let rosterData = [];

							if (roster) {
								rosterData = roster.map((player) => {
									return {
										id: player.id,
										status: player.status,
									};
								});
							}

							return {
								team_id: team.team_id,
								roster_data: rosterData,
							};
						});
					})
				);

				const dataToWrite = compareDataBeforeUpload(
					importData,
					// importData.filter((data) => data),
					supabaseData.userTeams,
					"roster_data",
					"team_id"
				);

				if (dataToWrite.length === 0) return;

				dataToWrite.forEach((team) => {
					supabaseData.writeUserRosters(team);
				});
			});
		},
	},
});
