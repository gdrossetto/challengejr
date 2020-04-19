<template>
  <div class="app-container" id="homepage">
    <h1 style="padding:100px">Últimas Postagens</h1>

    <div>
      <v-text-field
        color="orange"
        class="home-searchbar"
        label="Procurar postagem:"
        v-model="searchQuery"
      ></v-text-field>
      <v-btn @click="getPostsPorTitulo(searchQuery)" icon color="orange">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn @click="getPosts()" icon color="green">
        <v-icon>mdi-reload</v-icon>
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
        <div v-for="post in posts" :key="post.id">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :to="{ path: '/post/' + post.id }"
              @click="testCard()"
              :elevation="hover ? 22 : 0"
              shaped
              raised
              class="blog-div"
            >
              <h3 style="color:black">{{ post.titulo }}</h3>
              <p style="font-size:12px;font-color:light-grey">
                Postagem feita em {{ post.criado_em }}
              </p>
              <p>{{ post.descricao }}</p>
            </v-card>
          </v-hover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  props: {
    msg: String,
  },
  data: () => {
    return {
      posts: posts,
      searchQuery: "",
    };
  },
  methods: {
    async getPosts() {
      try {
        let response = await fetch(
          "http://192.168.0.10:5000/buscaPostsMaisNovo",
          {
            mode: "cors",
          }
        );
        let responseJson = await response.json();
        this.posts = responseJson;
      } catch (err) {
        console.error(err.message);
      }
    },
    async getPostsPorTitulo(titulo) {
      try {
        let response = await fetch(
          "http://192.168.0.10:5000/buscaPostPorTitulo?titulo=" + titulo
        );
        let responseJson = await response.json();
        this.posts = responseJson;
        return responseJson;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    setTimeout(() => this.getPosts(), 400);
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
  border-width: 1.5px;
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

.home-searchbar {
  width: 50vw;
  margin: auto;
  display: inline-block;
}
</style>
