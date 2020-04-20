<template>
  <v-app id="app">
    <v-app-bar fixed dense style="background-color:#37125c;position:absolute">
      <v-row>
        <v-col>
          <v-app-bar-nav-icon style="color:white" @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-col>
        <v-col>
          <v-toolbar-title class="titulo-appbar">Blog</v-toolbar-title>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
          <v-list-item-icon style="color:#37125c">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="color:#37125c">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-home", path: "/" },
        { title: "Lista ", icon: "mdi-format-list-text", path: "/lista" },
        {
          title: "Categorias ",
          icon: "mdi-format-list-bulleted-type",
          path: "/categorias"
        },
        {
          title: "Criar Post ",
          icon: "mdi-newspaper-plus",
          path: "/criar_post"
        }
      ]
    };
  }
};
</script>

<style scoped>
.titulo-appbar {
  color: white;
  position: relative;
  text-align: center;
  margin-top: 0.5em;
}
</style>
