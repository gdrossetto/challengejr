<template>
  <div class="app-container" id="postlist">
    <h1 style="padding:60px">Listagem de posts</h1>

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

    <v-btn outlined color="orange">
      <v-icon>mdi-plus</v-icon>Criar postagem
    </v-btn>

    <br />
    <br />
    <div style="width:80vw; display:inline-block">
      <div class="blog-flexcontainer">
        <div v-for="post in posts" :key="post.id">
          <v-card shaped raised class="blog-div">
            <h3 style="color:black">{{ post.titulo }}</h3>
            <p style="font-size:12px;font-color:light-grey">
              Postagem feita em {{ post.criado_em }}
            </p>
            <p>{{ post.resumo }}</p>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostList",
  props: {
    msg: String,
  },
  data: () => {
    return {
      posts: posts,
    };
  },
  methods: {
    createPost(title, desc, date) {
      posts.push({ title: title, desc: desc, date: date });
    },
    async getEventos() {
      try {
        let response = await fetch(
          "http://192.168.0.10:5000/buscaPostsMaisNovo/",
          {
            mode: "cors",
          }
        );
        console.log(response);
        let responseJson = await response.json();
        console.log(responseJson);
        this.posts = responseJson;
        return responseJson;
      } catch (err) {
        console.error(err.message);
      }
    },
  },
  mounted() {
    this.getEventos();
  },
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
  min-height: 100px;
}

.blog-flexcontainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, 80vw);
  justify-content: space-evenly;
}
</style>
