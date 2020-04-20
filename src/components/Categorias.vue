<template>
  <div class="app-container">
    <div style="width:100vw; display:inline-block;margin-top:100px">
      <div style="display: inline-block">
        <v-text-field v-model="nome" style="margin:auto;" label="Crie aqui uma categoria"></v-text-field>
        <v-btn @click="criaCategoria(nome)" outlined color="#37125c">
          <v-icon>mdi-plus</v-icon>Criar categoria
        </v-btn>
        <v-list>
          <v-list-item v-for="categoria in categorias" :key="categoria.id">
            <h3 style="padding-right:10px">{{ categoria.nome }}</h3>
            <v-btn @click="setEdicao(categoria.id, categoria.nome)" icon color="blue">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="deletaCategoria(categoria.id)" icon color="red">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </div>
    </div>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card style="display:inline-block">
        <v-text-field
          v-model="nome_categoria_editada"
          style="margin:auto;width:500px;margin-top:20px"
          label="Alterar nome da categoria"
        ></v-text-field>

        <v-btn
          style="margin-left:180px;margin-right:10px;margin-bottom:20px"
          @click="editaCategoria(id_categoria_editada, nome_categoria_editada)"
          outlined
          color="green"
        >
          <v-icon>mdi-check</v-icon>Salvar
        </v-btn>
        <v-btn style="margin-bottom:20px" @click="dialog = !dialog" outlined color="red">
          <v-icon>mdi-close</v-icon>Cancelar
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ListaCategorias",

  data: () => {
    return {
      categorias: [],
      nome: "",
      dialog: false,
      id_categoria_editada: 0,
      nome_categoria_editada: ""
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
      } catch (err) {
        console.error(err.message);
      }
    },
    async criaCategoria(nome) {
      let result = await fetch("http://192.168.0.10:5000/criaCategoria", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: nome
        })
      });
      this.nome = "";
      setTimeout(() => this.listaCategorias(), 400);
      console.log(
        (await result.json())
          ? "Categoria criada com sucesso"
          : "Categoria não pode ser criada pois ja há uma categoria com esse nome!"
      );
    },
    async deletaCategoria(id) {
      let result = await fetch(
        "http://192.168.0.10:5000/deletaCategoria?id=" + id,
        {
          method: "DELETE"
        }
      );
      setTimeout(() => this.listaCategorias(), 400);
      console.log(
        (await result.json())
          ? "Categoria deletada com sucesso"
          : "Categoria não pode ser deletada pois há um ou mais posts com essa categoria!"
      );
    },
    setEdicao(id, nome) {
      //abre o modal de edição de categoria com as informações da categoria
      this.dialog = true;
      this.nome_categoria_editada = nome;
      this.id_categoria_editada = id;
    },

    editaCategoria(id, nome) {
      fetch("http://192.168.0.10:5000/editaCategoria", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id,
          nome: nome
        })
      });
      this.dialog = false;
      setTimeout(() => this.listaCategorias(), 400);
    }
  },
  mounted() {
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
</style>
