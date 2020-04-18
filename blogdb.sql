create table categoria
(
    id serial primary key,
    nome varchar(300) unique

);

create table post
(
    id serial primary key,
    titulo varchar(300),
    descricao varchar(300),
    criado_em date,
    constraint categoria_id_fk  foreign key (categoria_id) references categoria (id)
);


/* Para buscar todos os posts mostrando do mais novo para o mais antigo: */
select *
from post
order by criado_em desc;

/* Para buscar todos os posts mostrando do mais antigo para o mais novo: */
select *
from post
order by criado_em asc;

/* Para buscar por categoria */
select p.*
from post as p inner join categoria as c on p.categoria_id = c.id
where p.categoria_id = $1
order by criado_em desc;

/* Criar post */
insert into post
    (titulo,descricao,criado_em,categoria_id)
values
    ($1, $2, $3, $4);

/* Criar categoria */
insert into categoria
    (nome)
values
    ($1);

/* Listar categorias */
select *
from categorias
order by nome ASC;

/* Deletar post */
delete from post where id = $1;

/* Deletar categoria */
delete from categoria where id = $1;

/* Editar post */
update post set title = $1, descricao = $2, resumo = $3, categoria_id = $4 where id = $5;

/* Editar categoria */
update categoria set nome = $1 where id = $2;