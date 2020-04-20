<template>
  <div class="app-container" id="criarpost">
    <div style="margin-top:10vh">
      <v-form ref="form" lazy-validation>
        <h2>Editar post</h2>
        <v-select
          class="form-position"
          v-model="post.categoria_id"
          :items="categorias"
          item-value="id"
          item-text="nome"
          label="Categoria"
        ></v-select>
        <v-text-field
          v-model="post.titulo"
          style="width:50vw;margin:auto;padding-bottom:5em"
          label="Título"
          min="0"
          max="100"
        ></v-text-field>

        <v-textarea
          v-model="post.resumo"
          class="form-position"
          label="Digite um pequeno resumo do seu post aqui!"
          height="5vh"
          no-resize
        ></v-textarea>
        <v-textarea
          v-model="post.descricao"
          class="form-position"
          label="Digite o conteúdo do seu post aqui!"
          height="30vh"
          no-resize
        ></v-textarea>
        <v-btn
          v-on:click="
            editaPost(post.titulo, post.descricao, post.resumo, post.categoria_id, post.id)
          "
          color="success"
          class="mr-4"
          outlined
        >Salvar</v-btn>
        <v-btn to="/lista" color="error" class="mr-4" outlined>Cancelar</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditarPost",
  props: {
    msg: String
  },
  data: () => {
    return {
      titulo: "",
      descricao: "",
      resumo: "",
      categorias: [],
      id_categoria: 0,
      id: 0,
      post: {}
    };
  },
  methods: {
    async listaCategorias() {
      try {
        let response = await fetch("http://192.168.0.10:5000/listaCategorias", {
          mode: "cors"
        });
        let responseJson = await response.json();
        this.categorias = responseJson;
        console.log(this.categorias);
      } catch (err) {
        console.error(err.message);
      }
    },
    criaPost(titulo, descricao, resumo, criado_em, categoria_id) {
      let data = new Date();
      let dataCriacao = data.toLocaleString();
      fetch("http://192.168.0.10:5000/criaPost", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo: titulo,
          descricao: descricao,
          resumo: resumo,
          criado_em: dataCriacao,
          categoria_id: categoria_id
        })
      }).finally(this.$router.push("/"));
    },
    async editaPost(titulo, descricao, resumo, categoria_id, id) {
      fetch("http://192.168.0.10:5000/editaPost", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo: titulo,
          descricao: descricao,
          resumo: resumo,
          categoria_id: categoria_id,
          id: id
        })
      }).finally(this.$router.push("/lista"));
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
    }
  },

  mounted() {
    this.id = this.$route.params.id;
    this.getPostPorId(this.id);
    this.listaCategorias();
  }
};
</script>

<style scoped>
.app-container {
  text-align: center;
  height: 100%;
  min-width: 100%;
}
.form-position {
  width: 50vw;
  margin: auto;
}
</style>
