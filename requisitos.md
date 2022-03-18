## Requisitos Funcionais
- [ ] Codificar um URL válido para um URL encurtado e devolver para o client este URL encurtado
- [ ] Salvar a URL original e abreviada no banco de dados (Campos: UUID, url - unique, short_url - unique, created_at)
- [ ] Decodificar um URL encurtado para seu URL original de acordo com o banco de dados e devolve-la para o client

## Requisitos Não Funcionais
- [] Node.js - Back-end
- [] Express.js - Framework para o servidor
- [] TypeScript - Linguagem utilizada
- [] Prisma IO - ORM para lidar com o banco de dados
- [] MySQL - Banco de dados relacional
- [] Jest - Para testes unitários
- [] Supertest - Para testes de integração
- [] Swagger - Para documentação da API

## Regras de Negócio

### Encode
- [x] Deve ser possível fazer o encode de uma URL para encurtar-la
- [] Deve ser possível salvar o short url no BD (UUID, url - unique, short_url - unique, created_at)
- [x] Não deve ser possível fazer o encode de uma URL inválida - Caso seja inválida, lançar erro 400
- [] Não deve ser possível salvar URL em duplicidade. Caso já exista a URL encurtada no BD, trazer a url.

### Decode
- [] Deve ser possível fazer o decode do URL encurtado para o URL original, buscando no banco de dados
- [] Caso não tenha a URL encurtada no banco de dados, lançar erro 404.

