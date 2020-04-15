import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import MuseUi from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import Toast from "@/components/Toast";

Vue.use(MuseUi)
Vue.use(Toast)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
