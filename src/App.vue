<template>
  <v-app id="app">
    <v-app-bar fixed dense style="background-color:#fcbe03">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Blog</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
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

  components: {
    //HomePage
  },

  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-home", path: "/" },
        { title: "Lista ", icon: "mdi-format-list-bulleted", path: "/lista" },
        {
          title: "Criar Post ",
          icon: "mdi-newspaper-plus",
          path: "/criar_post",
        },
      ],
    };
  },
};
</script>
