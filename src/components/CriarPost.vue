<template>
  <div class="app-container" id="criarpost">
    <div style="margin-top:10vh">
      <v-form ref="form" lazy-validation>
        <h2>Criar post</h2>
        <v-select
          style="width:50vw;margin:auto;"
          v-model="id_categoria"
          :items="categorias"
          item-value="id"
          item-text="nome"
          label="Categoria"
        ></v-select>
        <v-text-field
          v-model="titulo"
          style="width:50vw;margin:auto;padding-bottom:5em"
          label="Título"
        ></v-text-field>

        <v-textarea
          v-model="resumo"
          style="width:50vw;margin:auto;"
          label="Digite um pequeno resumo do seu post aqui!"
          height="5vh"
          no-resize
        ></v-textarea>
        <v-textarea
          v-model="descricao"
          style="width:50vw;margin:auto;"
          label="Digite o conteúdo do seu post aqui!"
          height="30vh"
          no-resize
        ></v-textarea>
        <v-btn
          v-on:click="
            criaPost(titulo, descricao, resumo, new Date(), id_categoria)
          "
          color="success"
          class="mr-4"
          >Salvar</v-btn
        >
        <v-btn to="/" color="error" class="mr-4">Cancelar</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CriarPost",
  props: {
    msg: String,
  },
  data: () => {
    return {
      titulo: "",
      descricao: "",
      resumo: "",
      categorias: [],
      id_categoria: 0,
    };
  },
  methods: {
    async listaCategorias() {
      try {
        let response = await fetch("http://192.168.0.10:5000/listaCategorias", {
          mode: "cors",
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
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: titulo,
          descricao: descricao,
          resumo: resumo,
          criado_em: dataCriacao,
          categoria_id: categoria_id,
        }),
      }).finally(this.$router.push("/"));
    },
  },

  mounted() {
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
</style>
