import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import HomePage from "./components/Home.vue";
import PostList from "./components/Listagem.vue";
import CriarPost from "./components/CriarPost.vue";
Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: "/", component: HomePage },
  { path: "/list", component: PostList },
  { path: "/criar_post", component: CriarPost },
];
const router = new VueRouter({
  routes,
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
