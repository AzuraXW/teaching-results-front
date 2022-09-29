import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./mock";
import layoutComponents from './components/layout'
import { getBanner } from "./api/banner";

import "./styles/base/base.scss"
import "normalize.css/normalize.css";

const app = createApp(App);

Object.keys(layoutComponents).forEach(key => {
  app.component(key, layoutComponents[key])
})

app.use(createPinia());
app.use(router);
app.mount("#app");
getBanner().then(res => {
  console.log(res)
})