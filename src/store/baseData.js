import { defineStore } from "pinia";
// import { useLocalStore } from "@/store/localData";

export const useBaseStore = defineStore("baseData", {
	state: () => {
		return {
			isAuthenticated: false,
			currentYear: new Date().getFullYear(),
			stats: {
				passing: {
					positions: ["QB"],
					categories: {
						epa: {
							name: "EPA",
							stats: [
								"epa_total",
								// "epa_vs_pressure",
								// "epa_vs_blitz",
								// "epa_out_of_pocket",
							],
						},
						totals: {
							name: "Passing Totals",
							stats: [
								"attempts",
								"completions",
								"bad_throws",
								"drops",
								"interceptions",
								"turnover_worthy",
								"sacks",
								"own_sacks",
								"yards",
								"touchdowns",
							],
						},
						yards: {
							name: "Passing Yards",
							stats: [
								"yards_after_catch",
								"air_yards",
								"pacr",
								"air_yards_to_sticks",
								"screens",
							],
						},
						accuracy: {
							name: "Accuracy",
							stats: [
								"cpoe",
								// "cpoe_vs_pressure",
								// "cpoe_vs_blitz",
								// "cpoe_out_of_pocket",
								"aggressiveness",
								"contested",
							],
						},
						pressure: {
							name: "vs Pressure",
							stats: ["pressured", "blitzed", "out_of_pocket"],
						},
					},
				},
				rushing: {
					positions: ["QB", "RB"],
					categories: {
						totals: {
							name: "Rushing Totals",
							stats: [
								{ key: "opportunities", positions: ["RB"] },
								"attempts",
								"yards",
								{ key: "yards_per_carry", positions: ["RB"] },
								{ key: "ryoe", positions: ["RB"] },
								"touchdowns",
							],
						},
						efficiency: {
							name: "Rushing Efficiency",
							positions: ["RB"],
							stats: [
								"efficiency",
								"tlos",
								"ybc",
								"yac",
								"att_per_broken_tackle",
							],
						},
						situations: {
							name: "Rushing Situations",
							positions: ["RB"],
							stats: ["two_min", "ldd", "sdd", "inside_five"],
						},
					},
				},
				receiving: {
					positions: ["RB", "WR", "TE"],
					categories: {
						totals: {
							name: "Receiving Totals",
							stats: [
								"targets",
								"receptions",
								{ key: "cpoe", positions: ["WR", "TE"] },
								"catchable",
								"drops",
								"contested",
								"created",
								"yards",
								"adot",
								"air_yards",
								"yacoe",
								"touchdowns",
							],
						},
						efficiency: {
							name: "Receiving Efficiency",
							positions: ["WR", "TE"],
							stats: [
								{ key: "tppp", positions: ["WR"] },
								{ key: "yppp", positions: ["WR"] },
								"wopr",
								"racr",
							],
						},
						opportunity: {
							name: "Receiving Opportunities",
							stats: [
								{ key: "first_read", positions: ["WR", "TE"] },
								"endzone_targets",
								{ key: "first_read_ez", positions: ["WR", "TE"] },
								"late_down_targets",
								// checkdowns
								// designed plays
								// screens
							],
						},
					},
				},
				defense: {
					positions: ["DT", "DE", "LB", "S", "CB"],
					categories: {
						pass_rush: {
							name: "Pressure",
							stats: [
								"pressure_conversion_ratio",
								"sacks",
								"pressures",
								"blitz",
								"hurries",
								"qb_hits",
							],
						},
						tackling: {
							name: "Tackling",
							stats: ["tackles", "missed_tackles"],
						},
						coverage: {
							name: "Coverage",
							positions: ["LB", "S", "CB"],
							stats: [
								"targets",
								"completions",
								"rec_yards",
								"air_yards",
								"racr",
								"interceptions",
								"touchdowns",
								"passer_rating",
							],
						},
					},
				},
				// snaps: {},
			},
			statsOrder: {
				4: {
					name: "Snaps",
					key: "snaps",
					positions: ["QB", "RB", "WR", "TE", "DT", "DE", "LB", "S", "CB"],
					categories: [
						{
							key: "total",
						},
						{
							key: "run",
						},
						{
							key: "pass",
						},
						{
							key: "11_personnel",
							positions: ["QB", "RB", "WR", "TE"],
							advanced: true,
						},
						{
							key: "12_personnel",
							positions: ["QB", "RB", "WR", "TE"],
							advanced: true,
						},
						{
							key: "21_personnel",
							positions: ["QB", "RB", "WR", "TE"],
							advanced: true,
						},
						{
							key: "other_offense_personnel",
							positions: ["QB", "RB", "WR", "TE"],
							advanced: true,
						},
						{
							key: "425_personnel",
							positions: ["DT", "DE", "LB", "S", "CB"],
							advanced: true,
						},
						{
							key: "335_personnel",
							positions: ["DT", "DE", "LB", "S", "CB"],
							advanced: true,
						},
						{
							key: "245_personnel",
							positions: ["DT", "DE", "LB", "S", "CB"],
							advanced: true,
						},
						{
							key: "344_personnel",
							positions: ["DT", "DE", "LB", "S", "CB"],
							advanced: true,
						},
						{
							key: "434_personnel",
							positions: ["DT", "DE", "LB", "S", "CB"],
							advanced: true,
						},
						{
							key: "236_personnel",
							positions: ["DT", "DE", "LB", "S", "CB"],
							advanced: true,
						},
						{
							key: "other_defense_personnel",
							positions: ["DT", "DE", "LB", "S", "CB"],
							advanced: true,
						},
					],
				},
			},
		};
	},
	actions: {
		checkAuth() {
			const cookie = $cookies.get("isAuthenticated");
			console.log("🚀 ~ checkAuth ~ cookie:", cookie)
			
			if (cookie) {
				this.isAuthenticated = true;
			}
		},
		setUserLeagues(leagues) {
			this.userLeagues = leagues;
		},
		// setPositionOrder() {
		// 	const localData = useLocalStore();

		// 	this.positionOrder = JSON.parse(localData.selectedLeague.starters)
		// 		.map((starter) => starter.name)
		// 		.filter((starter) => starter !== "PK" && starter !== "PN");
		// },
	},
});

// TODO: settings for timezone
