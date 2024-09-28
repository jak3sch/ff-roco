<template>
	<div v-if="showSpinner" data-uk-spinner></div>
	<Form v-else :fields="fields" :error="errorMessage" @submit="submitForm" />
</template>

<script setup>
//
// Imports
//
// ========================================================================

import Form from "@/components/molecules/Form.vue";
import { watch, ref } from "vue";
import { authorizeMflApi } from "@/js/api/mfl";
import { useMflStore } from "@/store/mfl";

//
// Constants
//
// ========================================================================

const props = defineProps({
	platform: String,
});

const fields = ref([]);
const errorMessage = ref("");
const showSpinner = ref(false);
const mflData = useMflStore();

//
// Functions
//
// ========================================================================

// Watch for change in platform prop and update fields accordingly
// ========================================================================

watch(
	() => props.platform,
	(newPlatform, oldPlatform) => {
		switch (newPlatform) {
			case "MyFantasyLeague":
				fields.value = [
					{
						type: "text",
						name: "username",
						placeholder: newPlatform + " Username",
						required: true,
						autocomplete: "mflLeagueId",
					},
					{
						type: "password",
						name: "userpassword",
						placeholder: "Password",
						required: true,
						autocomplete: "mflLeaguePassword",
					},
				];
				break;
			default:
				fields.value = [];
		}

		// if (newPlatform === "Sleeper") {
		//     fields.value = [
		//         {
		//             type: 'text',
		//             name: 'sleeperLeagueId',
		//             placeholder: 'League ID',
		//             required: true,
		//             autocomplete: 'sleeperLeagueId',
		//         },
		//     ]
		// }  else if (newPlatform === "Fleaflicker") {
		//     fields.value = [
		//         {
		//             type: 'text',
		//             name: 'fleaflickerLeagueId',
		//             placeholder: 'League ID',
		//             required: true,
		//             autocomplete: 'fleaflickerLeagueId',
		//         }
		//     ]
		// }

		fields.value.push({
			type: "submit",
			text: "Continue",
		});
	}
);

// Form submission
// ========================================================================

const submitForm = async (formData) => {
	switch (props.platform) {
		case "MyFantasyLeague":
			let response = await authorizeMflApi(
				formData.username,
				formData.userpassword
			);

			console.log(response);

			response.type === "danger"
				? (errorMessage.value = response.data)
				: (showSpinner.value = true);

			mflData.fetchUserLeagues(response.mflUserId);

			break;
		default:
			break;
	}
};
</script>

<style lang="scss"></style>
