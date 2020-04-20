<template>
  <div class="app-container" id="homepage">
    <div style="margin-top:100px">
      <v-text-field
        class="form-position"
        color="#37125c"
        label="Procurar post por título:"
        v-model="searchQuery"
      ></v-text-field>
      <v-btn @click="getPostsPorTitulo(searchQuery)" icon color="#37125c">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-select
        class="form-position"
        v-model="idCategoria"
        :items="categorias"
        item-value="id"
        item-text="nome"
        label="Procurar post por categoria:"
      ></v-select>
      <v-btn
        @click="
          idCategoria != 0 ? getPostsPorCategoria(idCategoria) : getPosts()
        "
        icon
        color="#37125c"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-select
        class="form-position"
        v-model="tipoTempo"
        :items="queryTempo"
        item-value="tipo"
        item-text="nome"
        label="Ordenar posts por tempo"
      ></v-select>
      <v-btn @click="getPosts()" icon color="#37125c">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <br />
    <br />
    <br />
    <div style="width:80vw; display:inline-block">
      <div class="blog-gridcontainer">
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
              <p>{{ post.resumo }}</p>
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
      posts: [],
      searchQuery: "",
      categorias: [],
      queryTempo: [
        { nome: "Posts mais novos primeiro", tipo: 1 },
        { nome: "Posts mais antigos primeiro", tipo: 2 },
      ],
      tipoTempo: 1,
      idCategoria: 0,
    };
  },
  methods: {
    async getPosts() {
      let url;
      if (this.tipoTempo == 1) {
        url = "https://challengejr.herokuapp.com/buscaPostsMaisNovo/";
      } else {
        url = "https://challengejr.herokuapp.com/buscaPostsMaisAntigo/";
      }
      try {
        let response = await fetch(url);
        let responseJson = await response.json();
        this.posts = responseJson;
        return responseJson;
      } catch (err) {
        console.error(err.message);
      }
    },
    async getPostsPorTitulo(titulo) {
      try {
        let response = await fetch(
          "https://challengejr.herokuapp.com/buscaPostPorTitulo?titulo=" +
            titulo
        );
        let responseJson = await response.json();
        this.posts = responseJson;
        return responseJson;
      } catch (error) {
        console.error(error);
      }
    },
    async listaCategorias() {
      try {
        let response = await fetch(
          "https://challengejr.herokuapp.com/listaCategorias",
          {
            mode: "cors",
          }
        );
        let responseJson = await response.json();
        this.categorias = responseJson;
        console.log(this.categorias);
      } catch (err) {
        console.error(err.message);
      }
    },
    async getPostsPorCategoria(idCategoria) {
      try {
        let response = await fetch(
          "https://challengejr.herokuapp.com/buscaPostPorCategoria?categoria_id=" +
            idCategoria
        );
        let responseJson = await response.json();
        this.posts = responseJson;
        this.idCategoria = 0;
        this.tipoTempo = 1;
        return responseJson;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    setTimeout(() => {
      this.getPosts();
      this.listaCategorias();
    }, 400);
  },
};
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
.form-position {
  width: 20vw;
  margin: auto;
  display: inline-block;
}
.blog-gridcontainer {
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
