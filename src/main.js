import { createApp } from 'vue'
import App from './App.vue'

import router from "./router";
import VueCookies from 'vue-cookies'

// frameworks
import UIkit from "uikit";
import UIkitIcons from "uikit/dist/js/uikit-icons";
UIkit.use(UIkitIcons);

import { createPinia } from "pinia"; 

const app = createApp(App);
app.use(createPinia(), VueCookies);

app.use(router);

app.mount('#app')
