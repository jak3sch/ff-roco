<template>
	<Form
		:fields="[
			{
				type: 'email',
				name: 'usermail',
				placeholder: 'Email',
				required: true,
				autocomplete: 'usermail',
			},
			{
				type: 'password',
				name: 'userpassword',
				placeholder: 'Password',
				required: true,
				autocomplete: 'current-password',
			},
			{
				type: 'submit',
				text: props.button,
			},
		]"
		:error="errorMessage"
		@submit="submitForm"
	/>
</template>

<script setup>
//
// Imports
//
// ========================================================================

import Form from "@/components/molecules/Form.vue";
import { ref } from "vue";
import { supabase } from "@/js/supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userData";

//
// Constants
//
// ========================================================================

const errorMessage = ref("");
const showEmailVerification = ref(false);
const router = useRouter();
const userData = useUserStore();

const props = defineProps({
	type: {
		type: String,
		required: true,
	},
	button: {
		type: String,
	},
});

//
// Functions
//
// ========================================================================

const submitForm = async (formData) => {
	let response;
	switch (props.type) {
		case "signin":
			response = await supabase.auth.signInWithPassword({
				email: formData.usermail,
				password: formData.userpassword,
			});
			break;
		case "signup":
			response = await supabase.auth.signUp({
				email: formData.usermail,
				password: formData.userpassword,
			});
			break;
		default:
			throw new Error(`Unknown form type: ${props.type}`);
	}

	const { data, error } = response;
	console.log("🚀 ~ submitForm ~ data:", data);

	if (error) {
		errorMessage.value = error.message;
	} else if (props.type === "signup" && data.user.role === "authenticated") {
		showEmailVerification.value = true;
	} else if (props.type === "signin" && data.user.role === "authenticated") {
		// set cookie
		$cookies.set(
			"isAuthenticated",
			true,
			new Date(data.session.expires_at * 1000)
		);

		// set global store
		userData.isAuthenticated = true;
		userData.currentUserId = data.user.id;

		// go to home
		router.push("/");
	}
};
</script>

<style lang="scss"></style>
