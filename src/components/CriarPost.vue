<template>
  <div class="app-container" id="criarpost">
    <div style="margin-top:10vh">
      <v-form ref="form" lazy-validation>
        <h2>Criar post</h2>
        <v-select
          class="form-position"
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
          class="form-position"
          label="Digite um pequeno resumo do seu post aqui!"
          height="5vh"
          no-resize
        ></v-textarea>
        <v-textarea
          v-model="descricao"
          class="form-position"
          label="Digite o conteúdo do seu post aqui!"
          height="30vh"
          no-resize
        ></v-textarea>
        <v-btn
          v-on:click="criaPost(titulo, descricao, resumo, id_categoria)"
          color="success"
          class="mr-4"
          outlined
          :disabled="id_categoria != 0 ? false : true"
          >Salvar</v-btn
        >
        <v-btn to="/" color="error" class="mr-4" outlined>Cancelar</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import moment from "moment";

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
    /*checarCamposPreenchidos() {
      if (
        this.titulo != "" &&
        this.descricao != "" &&
        this.resumo != "" &&
        this.id_categoria != 0
      ) {
        return true;
      } else {
        return false;
      }
    },*/
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
    criaPost(titulo, descricao, resumo, categoria_id) {
      fetch("https://challengejr.herokuapp.com/criaPost", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: titulo,
          descricao: descricao,
          resumo: resumo,
          criado_em: moment().format("DD/MM/YYYY"),
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

.form-position {
  width: 50vw;
  margin: auto;
}
</style>
