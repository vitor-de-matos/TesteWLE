<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Docker Compose (Postgres)

O projeto usa o `docker-compose.yml` para subir apenas o banco Postgres (serviço `postgres`). Para rodar:

No diretório raiz do projeto (onde está o arquivo `docker-compose.yml`), rode:

```bash
docker compose up -d
```

Verifique se o container está rodando:

```bash
docker compose ps
```

Para acompanhar os logs do Postgres:

```bash
docker compose logs -f postgres
```

(para parar, use `Ctrl + C`)

Para parar/remover os containers:

```bash
docker compose down
```

Observações:

- O Postgres expõe a porta `5432` no host (`5432:5432`).
- O volume nomeado `postgres-data` é usado para persistir os dados do banco.

## Conectar a aplicação no Postgres

O Nest carrega as variáveis do arquivo `.env` (definidas no `AppModule`) e o TypeORM usa essas variáveis em `src/shared/database/postgres.config.ts`.

Obs.: o `TypeORM` está com `synchronize: true`, então ao subir o app ele tenta criar/atualizar as tabelas conforme as entidades.

Garanta que os valores de `DB_PG_*` no seu `.env` estejam compatíveis com o `docker-compose.yml`. No `docker-compose.yml` os valores padrão são:

- `POSTGRES_USER=pguser`
- `POSTGRES_PASSWORD=pgpassword`
- `POSTGRES_DB=sales_database`

No `.env` (exemplo em `exemple.env`) ajuste para:

- `DB_PG_HOST=localhost`
- `DB_PG_PORT=5432`
- `DB_PG_USERNAME=pguser`
- `DB_PG_PASSWORD=pgpassword`
- `DB_PG_DATABASE=sales_database`
- `DB_PG_SCHEMA=public`

Depois disso, você pode iniciar a aplicação normalmente:

```bash
npm run start:dev
```

## Como a API funciona (fluxo de vendas)

Quando `PRODUCTION=false`, a documentação Swagger fica disponível em `http://localhost:<PORT>/api` (ex.: `http://localhost:3003/api`).

Status atual do projeto:

- **Sem testes automatizados**: os comandos de teste listados abaixo vêm do template do NestJS e **ainda não foram implementados/ajustados** para este projeto.
- **Rodando apenas em desenvolvimento**: o uso e execução esperados hoje são via `npm run start:dev` (modo dev / watch).

### Regras de negócio principais

- **Produtos devem ser cadastrados primeiro**.
- **Produto não pode ter preço/estoque negativo** (validação no DTO e também no use-case).
- **Ao inserir um item na venda**, a API:
  - Busca o produto
  - Valida se há estoque suficiente
  - Define automaticamente `unityValue` (preço do produto) e `totalValue` do item (\(itemQuantity multiplicado por unityValue\))
  - Atualiza o `totalValue` da venda (somando o valor do item)
  - Atualiza o estoque do produto (subtraindo a quantidade vendida)
- **Se a venda “deixaria” o estoque negativo**, a API retorna erro (ex.: “Quantidade de produto insuficiente no estoque”).

### Fluxo recomendado

1. **Criar produto**

- Endpoint: `POST /product`
- Exemplo:

```bash
curl -X POST http://localhost:3003/product ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Teclado\",\"description\":\"Teclado mecânico\",\"price\":100,\"stockQuantity\":10}"
```

2. **Criar venda (sale)**: ela é criada com `totalValue=0` e o endpoint **retorna o `id`** da venda para você inserir os itens.

- Endpoint: `POST /sale`
- Exemplo:

```bash
curl -X POST http://localhost:3003/sale ^
  -H "Content-Type: application/json" ^
  -d "{}"
```

3. **Inserir itens na venda**

- Endpoint: `POST /item_sale`
- Exemplo (com `saleId` retornado no passo anterior e `productId` de um produto existente):

```bash
curl -X POST http://localhost:3003/item_sale ^
  -H "Content-Type: application/json" ^
  -d "{\"saleId\":1,\"productId\":1,\"itemQuantity\":2}"
```

4. **Consultar a venda** (para ver o `totalValue` atualizado)

- Endpoint: `GET /sale/:id`
- Exemplo:

```bash
curl http://localhost:3003/sale/1
```

### Observação sobre exclusão de item

Ao remover um item de venda, a API **devolve o estoque** ao produto e **subtrai** o `totalValue` da venda conforme o item removido.

## Compile and run the project

Obs.: no estado atual do projeto, o uso principal é em **desenvolvimento**:

```bash
npm run start:dev
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

Atualmente, o projeto **não possui testes** (unit/e2e). Esta seção veio do template do NestJS.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
