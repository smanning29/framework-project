import Vue from "vue";
import App from "./App.vue";
import AppButton from "@/components/UI/AppButton.vue";
import ImgButton from "@/components/UI/ImgButton.vue";

Vue.component("Button", AppButton);
Vue.component("ImageButton", ImgButton);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
