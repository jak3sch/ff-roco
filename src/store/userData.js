import { defineStore } from "pinia";
import { supabase } from "@/js/supabase.js";

export const useUserStore = defineStore("userData", {
	state: () => {
		return {
			isAuthenticated: false,
			currentUserId: "",
		};
	},
	actions: {
		async checkAuth() {
			const cookie = $cookies.get("isAuthenticated");

			if (cookie) {
				this.isAuthenticated = true;
			}

			if (!this.currentUserId) {
				const { data, error } = await supabase.auth.getSession();

				this.currentUserId = data?.session?.user?.id;
				// TODO: error handling
			}
		},
	},
});
