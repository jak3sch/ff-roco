<template>
	<div class="uk-container uk-container-large">
		<div class="uk-flex uk-flex-center">
			<div class="uk-width-large">
				<h1 class="uk-h3 uk-text-center">Select a Site</h1>

				<div class="uk-button-group">
					<Button
						v-for="platform in platforms"
						@click="updataSelectedPlatform(platform)"
						htmlClass="uk-button-primary"
						:text="platform"
					/>
				</div>

				<div class="uk-width-medium">
					<AddLeagueForm :platform="selectedPlatform" />
				</div>
			</div>
		</div>

		<hr />

		<table>
			<thead>
				<tr>
					<th>League</th>
					<th>Roster Sync</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
                <tr v-for="league in supabaseData.userLeagues" :key="league.id">
					<td>
                        <div class="uk-flex">
                            <img v-if="findTeamData(league.league_id, league.league_data[0]?.franchise_id)?.logo" :src="findTeamData(league.league_id, league.league_data[0].franchise_id)?.logo" alt="" width="50">

                            <div>
                                <strong>{{ league.league_data[0].name }}</strong><br>
                                <small class="uk-text-meta">
                                    {{ findTeamData(league.league_id, league.league_data[0].franchise_id)?.name }} - <a :href="league.league_data[0].url" target="_blank" title="Go to League Page">{{ league.league_data[0].platform }}</a></small>
                            </div>
                        </div>
					</td>
                    <td>
                        {{ calcDiffToLastSync(league.last_modified) }}
                    </td>
                    <td>
                        <Button htmlClass="uk-button-danger" text="Delete" />
                        <Button htmlClass="uk-button-primary" text="Sync" />
                    </td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
//
// Imports
//
// ========================================================================

import { ref, onMounted } from 'vue';
import { useSupabaseStore } from '@/store/supabase';
import AddLeagueForm from '@/components/organisms/forms/AddLeagueForm.vue';
import Button from "@/components/atoms/Button.vue";

//
// Constants
//
// ========================================================================

const platforms = ["Sleeper", "MyFantasyLeague", "Fleaflicker"]
const selectedPlatform = ref("")
const supabaseData = useSupabaseStore()

//
// State on mount
//
// ========================================================================

onMounted(async () => {
    await supabaseData.readUserLeagues().then(async() => await supabaseData.readUserTeams())
})

//
// Functions
//
// ========================================================================

const updataSelectedPlatform = (platform) => {
    selectedPlatform.value = platform
}

const findTeamData = (leagueId, teamId) => {
    return supabaseData.userTeams.find(team => team.team_id.includes(leagueId) && team.team_data.id === teamId)?.team_data
}

const calcDiffToLastSync = (lastSync) => {
	const lastSyncDate = new Date(lastSync)
	const currentDate = new Date()
	const diff = currentDate - lastSyncDate

	switch (true) {
		case diff < 60000:
			return "Just now"
		case diff < 3600000:
			return (diff / 60000).toFixed(0) + " minutes"
		case diff < 86400000:
			return (diff / 3600000).toFixed(0) + " hours"
	}
}
</script>

<style lang="scss"></style>
