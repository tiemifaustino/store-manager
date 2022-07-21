

# Projeto Store Manager 🏪 🛍️


Projeto realizado no módulo de Back-end durante o curso de Desenvolvimento Web pela [Trybe](https://www.betrybe.com/), a escola que te ensina a programar, a aprender e a trabalhar.


## Descrição

Store Manage é uma API RESTful desenvolvida com a arquitetura `MSC` (model-service-controller).

Esta API é um sistema de gerenciamento de vendas no formato dropshipping em que é possível criar, visualizar, deletar e atualizar produtos e vendas utilizando o banco de dados `MySQL` para a gestão.


## 👩‍💻 Tecnologias Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)                
- ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
- ![Mocha](https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown)
- ![Chai](https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red)
- ![Sinon](https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon)
- [Joi](https://joi.dev/api/?v=17.6.0)
- [ExpressJS Async Errors](https://www.npmjs.com/package/express-async-errors)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Thunder Client](https://www.thunderclient.com/)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [Docker](https://www.docker.com/)


## 🛠️ Habilidades Utilizadas

- Criar endpoints;
- Criar uma API de um CRUD (Create, Read, Update e Delete);
- Criar middlewares e validações;
- Desenvolvimento seguindo a arquitetura MSC;
- Aderência ao padrão REST;
- Desenvolvimento de testes unitários utilizando `Mocha`, `Chai` e `Sinon`.


## 🗄️ Fornecido pela [Trybe](https://www.betrybe.com/)

- Arquivo `Dockerfile`, `docker-compose.yml`, `.vscode`, `migration.sql`, `seed.sql`, `index.js`, `.eslintrc.json`, `.eslintignore`, `.env.example`, `.editorconfig`, `erStoreManager.png`, `utils.js`.


## Banco de dados

**Diagrama de Entidade-Relacionamento**

![DER](./erStoreManager.png)

O Banco possui 3 tabelas:

- A tabela `products`, com os atributos `id` e `name`;
- A tabela `sales`, com os atributos `id` e `date`;
- A tabela `sales_products`, com os atributos `sale_id`, `product_id` e `quantity`;

#### Para criar o banco de dados e gerar as tabelas execute:
```
npm run migration
```
#### Para limpar e popular o banco de dados execute:
```
npm run seed
```


## ⌨️ Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu `.env` referenciando o seu usuário e senha do seu SQL

```
MYSQL_HOST=localhost
MYSQL_USER=seuusuario
MYSQL_PASSWORD=suasenha
MYSQL_DATABASE=StoreManager
PORT=3000
```
Caso opte por uma configuração padrão basta renomear o arquivo `.env.example` para `.env`



## ⚙️ Instalando Dependências

Para rodar esta aplicação é necessário ter o **Docker** 🐳 e **Docker Compose** instalados no seu computador.

O **Docker Compose** precisa estar na versão **1.29** ou superior.



### 1. Clone o repositório
```
git clone git@github.com:tiemifaustino/store-manager.git
```

  * Entre na pasta do repositório que você acabou de clonar:
```
cd store-manager
```


### 2. Rode os serviços `node` e `db` com o comando:
```
docker-compose up -d
```
**Esses serviços irão inicializar um container chamado `store_manager` e outro chamado `store_manager_db`**


### 3. Use o comando abaixo para ter acesso ao terminal interativo do container `store_manager` criado pelo compose, que está rodando em segundo plano.
```
docker exec -it store_manager bash
```


### 4. Dentro do terminal do container `store_manager` instale as dependências:
```
npm install
```


### 5. Dentro do terminal do container `store_manager` execute a aplicação:
```
npm start
```


### 6. Para verificar a cobertura dos testes unitários rode o seguinte comando dentro do terminal do container `store_manager` 
```
npm run test:mocha
```

### 7. Com a aplicação em execução, acesse a [documentação](http://localhost:3000/docs/) 🗂️ (em construção) através da rota:
```
http://localhost:3000/docs/
```
