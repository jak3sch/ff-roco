<template>
	<div class="uk-position-center">
		<div v-if="showEmailVerification">
			<p>
				Please check your email for a verification link. You need to verify your
				email address to complete the sign up process.
			</p>
		</div>
	
		<Form
			v-else
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
					text: 'Sign up',
				},
			]"
			:error="errorMessage"
			@submit="signUpNewUser"
		/>
	</div>
</template>

<script setup>
//
// Imports
//
// ========================================================================

import Form from "@/components/molecules/Form.vue";
import { ref } from "vue";
import { supabase } from "@/js/supabase";

//
// Constants
//
// ========================================================================

const errorMessage = ref("");
const showEmailVerification = ref(false);

//
// Functions
//
// ========================================================================

async function signUpNewUser(formData) {
	const { data, error } = await supabase.auth.signUp({
		email: formData.usermail,
		password: formData.userpassword,
	});

	if (error) {
		errorMessage.value = error.message;
	}

	if (data.user.role == "authenticated") {
		showEmailVerification.value = true;
	}
}
</script>

<style lang="scss"></style>
