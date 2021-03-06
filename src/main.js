import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import HomePage from "./components/Home.vue";
import PostList from "./components/Listagem.vue";
import CriarPost from "./components/CriarPost.vue";
import PaginaPost from "./components/PaginaPost.vue";
import ListaCategorias from "./components/Categorias.vue";
import EditarPost from "./components/EditarPost.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  //declaração das rotas para navegação
  { path: "/", component: HomePage },
  { path: "/lista", component: PostList },
  { path: "/criar_post", component: CriarPost },
  { path: "/categorias", component: ListaCategorias },
  { path: "/post/:id", component: PaginaPost },
  { path: "/editar_post/:id", component: EditarPost },
];
const router = new VueRouter({
  scrollBehavior() {
    //ao entrar en cada pagina sempre começa no topo
    return { x: 0, y: 0 };
  },
  routes,
  mode: "history",
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
