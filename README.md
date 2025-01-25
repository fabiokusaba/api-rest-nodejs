## Resumo do projeto
* Desenvolvimento de uma API REST para gerenciamento de transações cujo principal objetivo foi o aprendizado das tecnologias
ora mencionadas

## Instalando dependências
* `npm i -D typescript`
* `npm i fastify`
* `npm i -D @types/node`
* `npm i -D tsx`
* `npm i -D eslint @rocketseat/eslint-config`
* `npm i knex @types/knex sqlite3`
* `npm i dotenv`
* `npm i zod`
* `npm i @fastify/cookie`

## Comandos essenciais
* Com o TypeScript instalado precisamos criar um arquivo de configurações através do comando: `npx tsc --init`
* Com o eslint devidamente configurado rode o comando `npm run lint` para formatar/padronizar o código
* Criando migrações com knex: `npx knex migrate:make <nome_da_migration>`, o nome sempre deve simbolizar uma ação que quero fazer
* Para usarmos TypeScript com knex precisamos fazer algumas configurações no arquivo package.json, feita as configurações podemos
rodar o comando `npm run knex -- migrate:make <nome_da_migration>`
* Para executarmos as migrações usamos o comando: `npm run knex -- migrate:latest`
* Para desfazermos uma migração usamos o comando: `npm run knex -- migrate:rollback`

## Requisitos funcionais
* [x] O usuário deve poder criar uma nova transação;
* [x] O usuário deve poder obter um resumo da sua conta;
* [x] O usuário deve poder listar todas as transações que já ocorreram;
* [x] O usuário deve poder visualizar uma transação única;

## Regras de negócio
* [x] A transação pode ser do tipo crédito que somará ao valor total ou débito que subtrairá;
* [x] Deve ser possível identificarmos o usuário entre as requisições;
* [x] O usuário só pode visualizar transações o qual ele criou;

## Tecnologias utilizadas
* Nodejs
* TypeScript
* Fastify
* SQLite3
* Knexjs
* Zod
