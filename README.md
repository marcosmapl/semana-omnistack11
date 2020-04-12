# Be The Hero - 11ª Semana Omnistack por Rocketseat

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

> Keywords: `bethehero`, `reactjs`, `react-native`,`nodejs`, `express`, `expo.io`, `whatsapp`, `e-mail`

<!-- TABLE OF CONTENTS -->
## Sumário

- [Apresentação da Aplicação](#apresentação-da-aplicação)
- [Backend](#backend)
	- [Descrição](#descrição)
	- [Estrutura do Projeto](#estrutura-do-projeto)
	- [Executando o Projeto](#executando-o-projeto)
- [Contact](#contact)
- [License](#license)

## Apresentação da Aplicação

Be The Hero é uma aplicação voltada para gerar um impacto social! Seu foco é conectar pessoas que se propõem a ajudar, e que muitas vezes não dispõe de tempo, mas podem ajudar de uma forma monetária,  à Organizações Não Governamentias (ONGs) que muitas vezes precisam de um valor para resolver algum incidente/caso específico (compra de materiais, atividades humanitárias, doações, etc.).

## Backend

[View Code](https://github.com/marcosmapl/semana-omnistack11/tree/master/backend)

### Descrição

O Backend é uma aplicação web para que as `ONGs` possam se cadastrar e gerenciar seus `Incidentes` (casos):

- Foi construída utilizando NodeJS e o framework [Express](https://expressjs.com/pt-br/) implementando a arquitetura REST.
- O padrão [JSON](https://www.json.org/json-pt.html) foi adotado como formato de troca de mensagens entre serviços.
- Temos o [SQLite3](https://www.sqlite.org/index.html) como banco de dados (desenvolvimento e testes).
- O módulo [Knex](http://knexjs.org/) foi usado como query builder e gerenciador de `migrations`.
- Os ids únicos das `ONGS` foi gerado utilizando o módulo [uuid v4](https://github.com/uuidjs/uuid).
- Para gerenciamento de acesso à api utilizamos o módulo [cors](https://github.com/expressjs/cors).
- Para testes foi utilizado o middleware [celebrate](https://github.com/arb/celebrate) que encapsula o módulo [joi](https://github.com/hapijs/joi) do framework [happi](https://hapi.dev/), para uso dentro do Express.
- Para os testes foi utilizado o framework [jest](https://jestjs.io/) e para testes das rotas HTTP o módulo [supertest](https://github.com/visionmedia/supertest).

### Estrutura do Projeto

- `src/`
	- `controllers/`
		- [IncidentController.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/controllers/IncidentController.js) - controller de incidentes (index, create e delete).
		- [OngController.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/controllers/OngController.js) - controller de ongs (index, create e delete.
		- [ProfileController.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/controllers/ProfileController.js) - controller que recupera informações da ongs que efetuou logon na aplicação.
		- [SessionController.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/controllers/SessionController.js) - controller de autenticação de ongs (logon).
	- `database/`
		- [connection.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/database/connection.js) - arquivo que recupera a conexão com o banco de dados selecionado ([desenvolvimento](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/database/db.sqlite3) ou [teste](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/database/test.sqlite3)).
		- [db.sqlite3](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/database/db.sqlite3) - banco de dados de desenvolvimento.
		- [test.sqlite3](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/database/test.sqlite3) - banco de dados de teste.
		- `migrations/`
			- [20200328134142_create_table_ongs.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/database/migrations/20200328134142_create_table_ongs.js) - migrations da tabela ongs.
			- [20200328135725_create_table_incidents.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/database/migrations/20200328135725_create_table_incidents.js) - migrations da tabela incidents.
	- `utils/`
		- [generateUUID.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/utils/generateUUID.js) - função que gera `uuids` para as `ongs`.
	- [app.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/app.js) - arquivo de configuração do servidor express.
	- [routes.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/routes.js) - arquivo de mapeamento das rotas aos seus respectivos controllers, além de aplicar as validações de dados usando o módulo `celebrate`.
	- [server.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/server.js) - ponto de entrada da aplicação (inicia o servidor `app.js`).
- `tests/`
	- `integration/`
		- [ong.spec.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/tests/integration/ong.spec.js) - testa a rota de inclusão (create) de ongs. 
	- `unit/`
		- [generateUUID.spec.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/tests/unit/generateUUID.spec.js) - testa a função que gera de uuids para as ongs.
- [.gitignore](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/.gitignore)
- [jest.config.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/jest.config.js) - arquivo de configuração do framework jest (automação de testes).
- [knexfile.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/knexfile.js) - arquivo de configuração do módulo knex (acesso ao banco de dados).
- [package.json](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/package.json) - arquivo de configurações do projeto.

### Executando o Projeto

Para executar o servidor backend, execute o comando abaixo na pasta raiz do projeto:

	npm start

E então deve ser exibido algo parecido com:

	> backend@1.0.0 start /home/usuário/.../backend
	> nodemon src/server.js

	[nodemon] 2.0.2
	[nodemon] to restart at any time, enter `rs`
	[nodemon] watching dir(s): *.*
	[nodemon] watching extensions: js,mjs,json
	[nodemon] starting `node src/server.js`

## Frontend

[View Code](https://github.com/marcosmapl/semana-omnistack11/tree/master/frontend)


### Screenshots

![Tela Principal](img/backend-screenshot-01.png)
Tela Principal

## Mobile

[View Code](https://github.com/marcosmapl/semana-omnistack11/tree/master/mobile)

## Contact

Marcos Lima [![LinkedIn][linkedin-shield]][linkedin-url]

marcos.lima@icomp.ufam.edu.br

[See my project on GitHub](https://github.com/marcosmapl/algorithms-data-structures/)


## License

- **[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html)** [![GNU GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
- Copyright 2020 © [marcosmapl](https://github.com/marcosmapl).

<!-- Markdown link & img dfn's -->
[wiki]: https://github.com/marcosmapl/semana-omnistack11/wiki
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/marcosmapl
[contributors-shield]: https://img.shields.io/github/contributors/marcosmapl/semana-omnistack11.svg?style=flat-square
[contributors-url]: https://github.com/marcosmapl/semana-omnistack11/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/marcosmapl/semana-omnistack11.svg?style=flat-square
[forks-url]: https://github.com/marcosmapl/semana-omnistack11/network/members
[stars-shield]: https://img.shields.io/github/stars/marcosmapl/semana-omnistack11.svg?style=flat-square
[stars-url]: https://github.com/marcosmapl/semana-omnistack11/stargazers
[issues-shield]: https://img.shields.io/github/issues/marcosmapl/semana-omnistack11.svg?style=flat-square
[issues-url]: https://github.com/marcosmapl/semana-omnistack11/issues
[license-shield]: https://img.shields.io/github/license/marcosmapl/semana-omnistack11.svg?style=flat-square
[license-url]: https://github.com/marcosmapl/semana-omnistack11/blob/master/LICENSE
