<template>
  <div class="app-container" id="postlist">
    <h1 style="padding:60px">Listagem de posts</h1>

    <div>
      <v-text-field
        color="orange"
        style="width:50vw;margin:auto;display:inline-block;"
        label="Procurar postagem:"
      ></v-text-field>
      <v-btn icon color="#37125c">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <br />

    <v-btn to="/criar_post" outlined color="#37125c">
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
            <div style="justify-content:space-evenly">
              <v-btn
                :to="{ path: '/post/' + post.id }"
                icon
                color="green"
                style="margin-right:20px"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn icon color="blue" style="margin-right:20px">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </div>
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
