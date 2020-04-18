var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
var { Client } = require("pg");
var app = express();
app.use(serveStatic(path.join(__dirname, "dist")));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  user: "gccczwpwonzsxi",
  host: "ec2-18-233-137-77.compute-1.amazonaws.com",
  database: "dabmfpeodbug6u",
  password: "7bde3d7d5dd6c1d743fb46c8983196861f3ad1b6acc3c958d918e54810831d8b",
  port: 5432,
});

app.get("/postsMaisNovo", async (req, res) => {
  const rows = await buscarPostsPorDataDecrescente();
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(rows));
});

app.get("/postsMaisAntigo", async (req, res) => {
  const rows = await buscarPostsPorDataCrescente();
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(rows));
});

app.get("/buscaPostPorTitulo", async (req, res) => {
  const rows = await buscaPostPorTitulo(req.query.titulo);
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(rows));
});

app.get("/buscaPostPorCategoria", async (req, res) => {
  const rows = await buscaPostPorCategoria(req.query.categoria_id);
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(rows));
});

app.get("/listaCategorias", async (req, res) => {
  const rows = await listaCategorias();
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(rows));
});

app.post("/criaPost", async (req, res) => {
  let result = {};
  try {
    const reqJson = req.body;
    await criaPost(
      reqJson.titulo,
      reqJson.descricao,
      reqJson.resumo,
      reqJson.criado_em,
      reqJson.categoria_id
    );
    result.success = true;
  } catch (e) {
    console.error(e.message);
    result.success = false;
  } finally {
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(result));
  }
});

app.post("/editaPost", async (req, res) => {
  let result = {};
  try {
    const reqJson = req.body;
    await editaPost(
      reqJson.titulo,
      reqJson.descricao,
      reqJson.resumo,
      reqJson.categoria_id,
      reqJson.id
    );
    result.success = true;
  } catch (e) {
    console.error(e.message);
    result.success = false;
  } finally {
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(result));
  }
});

app.delete("/deletaPost", async (req, res) => {
  let result = {};
  try {
    //const reqJson = req.body;
    await deletaPost(req.query.id);
    result.success = true;
  } catch (e) {
    console.error(e.message);
    result.success = false;
  } finally {
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(result));
  }
});

app.post("/criaCategoria", async (req, res) => {
  let result = {};
  try {
    const reqJson = req.body;
    await criaCategoria(reqJson.nome);
    result.success = true;
  } catch (e) {
    console.error(e.message);
    result.success = false;
  } finally {
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(result));
  }
});

app.post("/editaCategoria", async (req, res) => {
  let result = {};
  try {
    const reqJson = req.body;
    await editaCategoria(reqJson.nome, reqJson.id);
    result.success = true;
  } catch (e) {
    console.error(e.message);
    result.success = false;
  } finally {
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(result));
  }
});

app.delete("/deletaCategoria", async (req, res) => {
  let result = {};
  try {
    const reqJson = req.body;
    await deletaCategoria(reqJson.id);
    result.success = true;
  } catch (e) {
    console.error(e.message);
    result.success = false;
  } finally {
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(result));
  }
});

var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
start();

async function start() {
  try {
    await client.connect();
  } catch (e) {
    console.error("Falha na conexão:  " + e);
  }
}

async function buscarPostsPorDataDecrescente() {
  try {
    const results = await client.query(
      "SELECT *, to_char( criado_em, 'DD/MM/YYYY') as criado_em from post order by id desc;"
    );
    return results.rows;
  } catch (e) {
    console.error("Falha na query: " + e.message);
    return false;
  }
}
async function buscarPostsPorDataCrescente() {
  try {
    const results = await client.query(
      "SELECT *, to_char( criado_em, 'DD/MM/YYYY') as criado_em from post order by id asc;"
    );
    return results.rows;
  } catch (e) {
    console.error("Falha na query: " + e.message);
    return false;
  }
}

async function buscaPostPorTitulo(titulo) {
  try {
    const results = await client.query(
      "SELECT *, to_char( criado_em, 'DD/MM/YYYY') as criado_em from post WHERE position(LOWER($1) in LOWER(titulo)) > 0 order by criado_em desc;",
      [titulo]
    );
    return results.rows;
  } catch (e) {
    console.error("Falha na query: " + e.message);
    return false;
  }
}

async function criaPost(titulo, descricao, resumo, data, categoria_id) {
  try {
    //await client.query(" SET datestyle = dmy;");
    await client.query(
      "INSERT INTO post (titulo,descricao,resumo,criado_em,categoria_id) VALUES ($1,$2,$3,$4,$5);",
      [titulo, descricao, resumo, data, categoria_id]
    );
    return true;
  } catch (e) {
    console.error("Falha na query: " + e.message);
    return false;
  }
}

async function editaPost(titulo, descricao, resumo, categoria_id, id) {
  try {
    await client.query(
      "UPDATE post set title = $1, descricao = $2, resumo = $3, categoria_id = $4 where id = $5;",
      [titulo, descricao, resumo, categoria_id, id]
    );
    return true;
  } catch (e) {
    console.error("Falha na query: " + e.message);
    return false;
  }
}

async function deletaPost(id) {
  try {
    await client.query("DELETE from post where id = $1;", [id]);
    return true;
  } catch (e) {
    console.error("Falha na query: " + e.message);
    return false;
  }
}

async function criaCategoria(nome) {
  try {
    await client.query("INSERT into categoria (nome) values ($1);", [nome]);
    return true;
  } catch (e) {
    console.error("Falha na query: " + e.message);
    return false;
  }
}

async function listaCategorias() {
  try {
    const results = await client.query(
      "SELECT * from categoria order by nome asc"
    );
    return results.rows;
  } catch (e) {
    console.error("Falha na query: " + e.message);
    return false;
  }
}

async function editaCategoria(nome, id) {
  try {
    await client.query("UPDATE categoria set nome = $1 where id = $2;", [
      nome,
      id,
    ]);
    return true;
  } catch (e) {
    console.error("Falha na query: " + e.message);
    return false;
  }
}

async function deletaCategoria(id) {
  try {
    await client.query("DELETE from categoria where id = $1;", [id]);
    return true;
  } catch (e) {
    console.error("Falha na query: " + e.message);
    return false;
  }
}

async function buscaPostPorCategoria(categoria_id) {
  try {
    const results = await client.query(
      "SELECT p.* from post as p inner join categoria as c on p.categoria_id = c.id where p.categoria_id = $1 order by criado_em desc;",
      [categoria_id]
    );
    return results.rows;
  } catch (e) {
    console.error("Falha na query: " + e.message);
    return false;
  }
}
