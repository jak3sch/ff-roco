import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [VueDevTools(), vue(), mkcert()],
	axios: {
		proxy: true,
	},
	server: {
		proxy: {
			// with options
			"/api": {
				target: "https://mfl.bohndesverband.de/",
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"~": fileURLToPath(new URL("./node_modules", import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				// global scss data
				additionalData: `
          @import "~/uikit/src/scss/variables-theme.scss";
          @import "~/uikit/src/scss/mixins-theme.scss";
          @import "~/uikit/src/scss/uikit.scss";
        `,
			},
		},
	},
});
