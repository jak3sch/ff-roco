<template>
	<div class="uk-container uk-container-large">
		<nav class="uk-navbar-container uk-navbar-transparent" data-uk-navbar>
			<div class="uk-navbar-left">
				<router-link to="/" class="uk-navbar-item uk-logo uk-light"
					>Roco</router-link
				>
				<pre>{{ userData.currentUserId }}</pre>
			</div>
			<!-- <div class="uk-navbar-center">
				<ul v-if="localData.is_loaded" class="uk-navbar-nav">
					<li>
						<router-link
							:to="{
								name: 'Roster',
								params: {
									platform: localData.selectedLeague.league_platform,
									id: localData.selectedLeague.league_id,
									position: localData.selectedLeaguePositions[0].name,
								},
							}"
						>
							Roster
						</router-link>
					</li>
					<li>
						<router-link
							:to="{
								name: 'PlayerSearch',
								params: {
									platform: localData.selectedLeague.league_platform,
									id: localData.selectedLeague.league_id,
								},
							}"
						>
							Player search
						</router-link>
					</li>
				</ul>
			</div> -->
			<div class="uk-navbar-right">
				<div v-if="!userData.isAuthenticated">
					<router-link
						:to="{ name: 'signUp' }"
						class="uk-button uk-button-default uk-light"
						>Sign up</router-link
					>
					<router-link
						:to="{ name: 'signIn' }"
						class="uk-button uk-button-primary"
						>Sign in</router-link
					>
				</div>

				<UserDropdown v-else />

				<!-- <ul v-if="localData.is_loaded" class="uk-navbar-nav">
					<li>
						<FranchiseCard
							:league="localData.selectedLeague"
							:selected="true"
						/>

						<div class="uk-navbar-dropdown">
							<ul
								class="uk-nav uk-navbar-dropdown-nav uk-list-divider uk-padding-small uk-padding-remove-horizontal"
							>
								<li
									v-for="league in localData.userLeagues"
									:class="
										league.league_id == localData.selectedLeague?.league_id
											? 'is-active'
											: ''
									"
								>
									<router-link
										:to="{
											name: 'Roster',
											params: {
												platform: league.league_platform,
												id: league.league_id,
												position: localData.selectedLeaguePositions[0].name,
											},
										}"
									>
										<FranchiseCard
											:league="league"
											:selectedLeagueId="localData.selectedLeague?.league_id"
											@click="switchLeague(league)"
										/>
									</router-link>
								</li>
								<li>
									<button
										class="uk-button uk-width-1-1"
										@click="localData.showAddLeague = true"
									>
										<span data-uk-icon="plus"></span> Add League
									</button>
								</li>
							</ul>
						</div>
					</li>
				</ul> -->
			</div>
		</nav>
	</div>
</template>

<script setup>
//
// Imports
//
// ========================================================================

import { useUserStore } from "@/store/userData";
import Button from "@/components/atoms/Button.vue";
import UserDropdown from "@/components/organisms/UserDropdown.vue";

// import FranchiseCard from "@/components/Molecules/FranchiseCard.vue";

// import { useLocalStore } from "@/store/localData";
// import { useNflverseStore } from "@/store/nflverseData";
// import { useRoute } from "vue-router";
// import { nextTick } from "vue";

//
// Constants
//
// ========================================================================

// const localData = useLocalStore();
// const nflverseData = useNflverseStore();

const userData = useUserStore();

// const route = useRoute();

//
// Functions
//
// ========================================================================

// const switchLeague = async (league) => {
// 	localData.is_loaded = false;

// 	// store selected league in local db and global storage
// 	await localData.setSelectedLeague(league);

// 	// load roster from last selected roster
// 	await localData.getRoster(localData.selectedLeague.league_id);

// 	await nextTick();
// 	localData.is_loaded = true;
// };
</script>

<style lang="scss"></style>
