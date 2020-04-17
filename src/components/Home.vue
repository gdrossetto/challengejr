<template>
  <div class="app-container" id="homepage">
    <v-app-bar fixed dense style="background-color:#fcbe03">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Blog</v-toolbar-title>
    </v-app-bar>

    <h1 style="padding:60px">Últimas Postagens</h1>

    <div>
      <v-text-field
        color="orange"
        style="width:50vw;margin:auto;display:inline-block;"
        label="Procurar postagem:"
      ></v-text-field>
      <v-btn icon color="orange">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <br />

    <v-btn to="/criar_post" outlined color="orange">
      <v-icon>mdi-plus</v-icon>Criar post
    </v-btn>

    <br />
    <br />
    <div style="width:80vw; display:inline-block">
      <div class="blog-flexcontainer">
        <div v-for="post in posts" :key="post.name">
          <v-card shaped raised class="blog-div">
            <h3 style="color:black">{{ post.name }}</h3>
            <p style="font-size:12px;font-color:light-grey">Postagem feita em {{ post.data }}</p>
            <p>{{ post.descricao }}</p>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
import Vue from "vue";

var HomePage = new Vue({
  el: "#homepage",
  data: function() {
    return {
      posts: posts
    };
  },
  methods: {
    getEventos: async function() {
      var vm = this;
      try {
        let response = await fetch("http://192.168.0.10:8080/eventos/", {
          mode: "cors"
        });
        let responseJson = await response.json();
        vm.posts = responseJson;
        console.log(this.posts[0].name);
        return responseJson;
      } catch (err) {
        console.error(err.message);
      }
    }
  },
  mounted: function() {
    this.getEventos();
  }
});
var posts = [];
export default HomePage;*/

export default {
  name: "HomePage",
  props: {
    msg: String
  },
  data: () => {
    return {
      posts: posts
    };
  },
  methods: {
    createPost(title, desc, date) {
      posts.push({ title: title, desc: desc, date: date });
    },
    async getEventos() {
      try {
        let response = await fetch("http://192.168.0.10:8080/eventos/", {
          mode: "cors"
        });
        console.log(response);
        let responseJson = await response.json();
        console.log(responseJson);
        this.posts = responseJson;
        return responseJson;
      } catch (err) {
        console.error(err.message);
      }
    }
  },
  mounted() {
    this.getEventos();
  }
};
var posts = [];
</script>

<style scoped>
.app-container {
  text-align: center;
  height: 100%;
  min-width: 100%;
}

.blog-div {
  margin-bottom: 1.5em;
  left: 0;
  right: 0;
  border-color: black;
  border-width: 1.5px; /* this allows you to adjust the thickness margin-right: auto; */
  border-style: solid;
  white-space: initial;
  padding: 1.5em;
  border-radius: 20px;
  min-height: 150px;
}

.blog-flexcontainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, 280px);
  justify-content: space-evenly;
}
</style>
