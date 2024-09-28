import { createRouter, createWebHistory } from "vue-router";

// import League from "@/views/League/League.vue";
// import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Signup from '@/views/Signup.vue'
import SignIn from '@/views/SignIn.vue'
import ManageLeagues from '@/views/ManageLeagues.vue'
// import Leagues from '@/views/Leagues.vue'
// import League from "@/views/league/League.vue";
// import Roster from "@/views/league/Roster.vue";
// import PlayerSearch from "@/views/league/PlayerSearch.vue";
// import LeagueFreeAgentsPosition from "@/views/league/LeagueFreeAgentsPosition.vue";
// import Error from '@/views/404.vue'
// import Portfolio from "@/views/Portfolio.vue";

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},

	// {
	//     path: '/leagues',
	//     name: 'leagues',
	//     component: Leagues,
	//     meta: {
	//         requiresAuth: true
	//     }
	// },

	{
		path: '/sign-up',
		name: 'signUp',
		component: Signup
	},
	{
		path: '/sign-in',
		name: 'signIn',
		component: SignIn
	},
	{
		path: '/manage-leagues',
		name: 'manageLeagues',
		component: ManageLeagues
	},
	// {
	// 	path: "/league/:platform/:id",
	// 	component: League,
	// 	// props: true,
	// 	// meta: {
	// 	//     requiresAuth: true
	// 	// }
	// 	children: [
	// 		{
	// 			name: "Roster",
	// 			path: "roster/:position",
	// 			component: Roster,
	// 		},
	// 		{
	// 			name: "PlayerSearch",
	// 			path: "player-search",
	// 			component: PlayerSearch,
	// 		},
	// 	],
	// },
	// {
	//     path: '/kategorie/:slug',
	//     name: 'kategorie',
	//     component: Kategorie,
	//     props: true
	// },
	// {
	//     path: '/:catchAll(.*)',
	//     name: '404',
	//     component: Error
	// }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return {
				top: 0,
				behavior: "instant",
			};
		}
	},
});

// get correct page if logged in user reloads page
// https://www.youtube.com/watch?v=xceR7mrrXsA
// const getCurrentUser = () => {
// 	return new Promise((resolve, reject) => {
// 		const removeListener = onAuthStateChanged(
// 			getAuth(),
// 			(user) => {
// 				removeListener();
// 				resolve(user);
// 			},
// 			reject
// 		);
// 	});
// };

// route only to protected views if logged in
// router.beforeEach(async (to, from, next) => {
// 	if (to.matched.some((record) => record.meta.requiresAuth)) {
// 		if (await getCurrentUser()) {
// 			next();
// 		} else {
// 			next("/");
// 		}
// 	} else {
// 		next();
// 	}
// });

export default router;
