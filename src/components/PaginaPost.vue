<template>
  <div class="app-container" id="paginapost">
    <div style="margin-top:10vh">
      <p style="text-align:center;font-size:12px">{{ post.categoria_nome }}</p>
      <h1>{{ post.titulo }}</h1>
      <v-divider style="margin:auto;width:70vw;padding-top:0.8em"></v-divider>
      <v-subheader style="display:inline-block"
        >Publicado em {{ post.criado_em }}</v-subheader
      >
      <p style="color:grey">{{ post.descricao }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginaPost",
  props: {
    msg: String,
  },
  data: () => {
    return {
      titulo: "",
      descricao: "",
      resumo: "",
      id: 0,
      post: {},
    };
  },
  methods: {
    getPost(titulo, desc) {
      console.log(titulo);
      console.log(desc);
    },
    createPost(titulo, descricao, resumo, criado_em, categoria_id) {
      fetch("http://192.168.0.10:5000/criaPost", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: name,
          descricao: descricao,
          resumo: resumo,
          criado_em: criado_em,
          categoria_id: categoria_id,
          post: {},
        }),
      }).finally(this.$router.push("/"));
    },
    async getPostPorId(id) {
      try {
        let response = await fetch(
          "http://192.168.0.10:5000/buscaPostPorId?id=" + id
        );
        let responseJson = await response.json();
        console.log(responseJson[0]);
        this.post = responseJson[0];
        return responseJson;
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.id = this.$route.params.id;
    this.getPostPorId(this.id);
  },
};
</script>

<style scoped>
.app-container {
  text-align: center;
  height: 100%;
  min-width: 100%;
}
</style>
