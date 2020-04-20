<template>
  <div class="app-container" id="postlist">
    <h1 style="padding:70px;display:inline-block">Listagem de posts</h1>

    <div>
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
    <v-btn to="/criar_post" outlined color="#37125c">
      <v-icon>mdi-plus</v-icon>Criar postagem
    </v-btn>
    <br />

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
              <v-btn
                :to="{ path: '/editar_post/' + post.id }"
                icon
                color="blue"
                style="margin-right:20px"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deletaPost(post.id)" icon color="red">
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

        return responseJson;
      } catch (error) {
        console.error(error);
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
        this.searchQuery = "";
        return responseJson;
      } catch (error) {
        console.error(error);
      }
    },
    async deletaPost(id) {
      let result = await fetch(
        "https://challengejr.herokuapp.com/deletaPost?id=" + id,
        {
          method: "DELETE",
        }
      );
      setTimeout(() => this.getPosts(), 400);
      console.log(
        (await result.json())
          ? "Post deletado com sucesso"
          : "Falha ao apagar o post"
      );
    },
  },
  mounted() {
    this.getPosts();
    this.listaCategorias();
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

.form-position {
  width: 20vw;
  margin: auto;
  display: inline-block;
}
</style>
