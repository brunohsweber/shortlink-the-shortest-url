<br>

<h1 align="center">
ShortLink - The Shortest URL (API)
</h1>

<br>

<p align="center">
  <a href="#sobre-o-projeto">Sobre o Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#pushpin-como-usar">Como Usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#warning-informações-importantes">Importante!</a>
</p>

<br>

# Sobre o projeto

The Shortest URL é um projeto back-end de ShortLink, um serviço de encurtamento de URL onde você insere uma URL como https://codesubmit.io/library/react e retorna uma URL curta como http://short.est/GeAi9K.

O projeto foi proposto como desafio técnico para a empresa [Going2 Mobile](https://going2.com.br/), onde o escopo solicitava:

- Um serviço de ShortLink desenvolvido em Node.js e qualquer framework, utilizando boas práticas, com um código limpo e sustentável.
- O projeto deveria contar com apenas 2 (dois) endpoints: "/encode" e "/decode".
- O retorno desses endpoints deveriam ser num formato json.
- A lógica e o algoritmo de codificação/decodificação ficaram à minha livre escolha, porém as URL's deveriam ser persistidas num Banco de Dados relacional, preferencialmente no MySQL.
- Como bônus, realizar testes na aplicação.

<br>Após a leitura do escopo do projeto e os requisitos iniciais em pauta, fui escrevendo em um arquivo "requisitos.md" todos estes requisitos funcionais da aplicação. A partir daí já comecei a pensar de forma mais organizada como iniciar o projeto, onde cheguei na seguinte linha de raciocínio:

  - <b>Eu simplesmente deveria codificar um URL válido para um URL encurtado com um código aleatório alfanumérico, persistir a URL original em uma coluna e o código encurtado em outra coluna. E, para devolver para o cliente este URL codificado ou descodificado, eu só precisaria fazer uma busca simples no banco de dados referenciando um ou outro.</b>

  - Para isso, sem a utilização de bibliotecas criei uma regra de validação de URL de entrada utilizando RegEx. Caso essa URL não passasse na validação, retornaria um erro 400 para o cliente. Após algumas refatorações do código, coloquei esta validação em um middleware específico para deixar a aplicação mais desacoplada e delegável (ela nem passava pelo controller mais!)

  - Caso a URL que seria codificada passasse na validação, o próximo passo seria criar um código curto, onde defini apenas 5 caracteres alfanuméricos para gerar um código short URL (tipo um ID, exemplo: "aUg8i") e, com ele gerado, deveria salvá-lo no Banco de Dados juntamente com a URL original, possibilitando assim a referência desse código curto ao URL de entrada original, afim de decodificação futura.

  - Como não haviam muitos dados a serem salvos no Banco de Dados, criei uma tabela só e nela estipulei os seguintes campos: UUID, url, short_url, created_at.

  - Tanto o campo "url" quanto o campo "short_url" defini como únicos para evitar conflitos de keys nas pesquisas e gravações - apesar de que no próprio algoritmo eu desenvolvi uma lógica para que isso não acontecesse no Banco de Dados.

  - Importante salientar que eu até poderia concatenar o domínio junto ao código short URL (exemplo: "http://dominio.com/a1b2c") e salvá-lo assim no Banco de Dados diretamente mesmo. De certa maneira, isso até seria mais fácil e simples de decodificar, entretanto, poderia ocasionar problemas ou transtornos futuros caso a aplicação viesse a mudar de domínio.

  - Sendo assim, essa parte de tratar caracteres e realizar o "encode" e "decode" das URL's ficou à cargo dos próprios algoritmos da aplicação, utilizando o poder dos RegEx's juntamente com métodos de string's e array's para capturar os caracteres necessários nos casos de uso e validá-los quando necessário.

<br>Para desenvolver o projeto utilizei a metodologia TDD. Para deixar o código mais limpo, flexível e escalável, utilizei o máximo possível os princípios de SOLID e DRY.
<br><br>Boa parte do tempo dispensado no desenvolvimento do projeto foi devido à refatorações de códigos e testes, mas o investimento de tempo fazendo isso valeu a pena no fim das contas.
<br><br>Outro ponto importante que destaco aqui é que o projeto poderia sim ter ficado muito mais enxuto, porém, essa arquitetura mais extensa e "complexa" faz sentido em qualquer tipo de projeto pois é fácil de ler, de implementar coisas novas e de fazer manutenções.
<br><br>Neste quesito de analisar e decidir sobre como iniciar um projeto, parto do princípio de que nunca sabemos com exatidão quão longe pode chegar nossa aplicação.
A ideia é que, mesmo sabendo que hoje a minha aplicação pode ter 1 ou 2 rotas ou X features, a tendência é sempre aumentar. Então, que se for para dispensar tempo arquitetando o projeto, que seja no início :)


## :rocket: Para desenvolver esse projeto utilizei as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [TSyringe](https://github.com/microsoft/tsyringe)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Docker e Docker-Compose](https://docs.docker.com/compose/install/)

## :pushpin: Como Usar

1 - Para executar esta aplicação, você precisará ter instalado no seu computador:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (utilizei a v16.13.1)
- [Yarn](https://yarnpkg.com/) (opcional)
- [Docker com Docker-Compose](https://docs.docker.com/compose/install/)
- [Beekeeper](https://www.beekeeperstudio.io/)
- [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/)

2 - Para rodar a aplicação, realize cada uma das etapas abaixo no terminal:

```bash
# Clone esse repositório:
$ git clone https://github.com/brunohsweber/shortlink-the-shortest-url

# Entre no repositório:
$ cd shortlink-the-shortest-url

# Instale as dependências:
$ yarn
ou
$ npm run install

# Gere o build da aplicação
$ yarn build
ou
$ npm run build

# Instancie o container do banco de dados com o Docker-Compose:
$ docker-compose up

# Para rodar as migrations:
$ yarn prisma migration deploy
ou
$ npx prisma migration deploy

# Rode os testes:
$ yarn test
ou
$ npm run test

# Rode a aplicação em modo produção:
$ yarn start:prod
ou
$ npm run start:prod

# Para acessar a página da documentação da API do projeto:
`http://localhost:3000/api-docs`

```
**Para acessar as rotas já configuradas pelo Insomnia, é possível importar o arquivo JSON:**
[Clique aqui para acessar o arquivo JSON](https://github.com/brunohsweber/shortlink-the-shortest-url/blob/develop/Insomnia_collection.json)

<br>

## :warning: Informações Importantes

Este projeto foi desenvolvido para fins de desafio técnico.

<br>

---

Feito com ♥ por Bruno Weber :wave:
