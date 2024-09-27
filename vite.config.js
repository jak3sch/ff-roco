import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
	}
})
