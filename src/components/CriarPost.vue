<template>
  <div class="app-container" id="criarpost">
    <v-app-bar fixed dense style="background-color:#fcbe03">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Criar Post</v-toolbar-title>
    </v-app-bar>
    <div style="margin-top:20vh">
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="titulo" style="width:50vw;margin:auto;" label="Título" required></v-text-field>
        <v-textarea
          v-model="desc"
          style="width:50vw;margin:auto;"
          name="input-7-1"
          label="Digite o conteúdo do seu post aqui!"
        ></v-textarea>
        <v-btn
          v-on:click="createPost(titulo,desc,20,'',new Date(),'')"
          color="success"
          class="mr-4"
        >Salvar</v-btn>
        <v-btn to="/" color="error" class="mr-4">Cancelar</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CriarPost",
  props: {
    msg: String
  },
  data: () => {
    return {
      titulo: "",
      desc: ""
    };
  },
  methods: {
    getPost(titulo, desc) {
      console.log(titulo);
      console.log(desc);
    },
    createPost(name, desc, capacidade, local, date, photo) {
      fetch("http://192.168.0.10:8080/eventos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          capacidade: capacidade,
          local: local,
          data: date,
          descricao: desc,
          foto: photo
        })
      }).finally(this.$router.push("/"));
    }
  },

  mounted() {}
};
</script>

<style scoped>
.app-container {
  text-align: center;
  height: 100%;
  min-width: 100%;
}
</style>
