import {
	createRouter,
	createWebHistory,
	RouteRecordRaw,
	RouterView,
} from "vue-router";
import Index from "~/page/index.vue";
import Logs from "~/page/logs.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/:locale?",
		component: RouterView,
		// beforeEnter: Tr.routeMiddleware,
		children: [
			{
				path: "",
				name: "index",
				component: Index,
			},
			{
				path: "logs",
				name: "logs",
				component: Logs,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
