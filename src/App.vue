<template>
	<Navbar />
	<router-view></router-view>
</template>

<script setup>
//
// Imports
//
// ========================================================================

import { onBeforeMount, provide } from "vue";
import { useUserStore } from "./store/userData";

// import { useRoute, useRouter } from "vue-router";

import Navbar from "@/components/organisms/Navbar.vue";

//
// Constants
//
// ========================================================================

// const router = useRouter();
const userData = useUserStore();
provide("isAuthenticated", userData.isAuthenticated);

//
// Functions
//
// ========================================================================

onBeforeMount(async () => {
	try {
		// Check authentification cookie
		// ========================================================================

		userData.checkAuth();
	} catch (error) {
		console.error(error);
	}
});
</script>

<style lang="scss">
body {
	min-height: 100dvh;
}
</style>
