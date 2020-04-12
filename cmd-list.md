# BACKEND

Criando o projeto:

    npm init -y

## Express

Framework minimalista para aplicações web em NodeJS:

    npm install express

## Nodemon 

Foi utilizado como dependência de desenvolvimento para monitorar as alterações no código e recarregar o servidor de forma automática.

Para instalação:

    npm install nodemon -D

Após a instalação, fazemos a configuração no arquivo `package.json`:

    ...
    "scripts": {
      "start": "nodemon index.js"
    ...

## Knex

Query builder para Postgres, MySQL, MSSQL, MariaDB, SQLite3, Oracle and Amazon Redshift:

    npm install knex

### SQLite3 drivers

Para instalar os drivers para o banco SQLite3:

    npm install sqlite3

###  Criando o arquivo de configuração da conexão com o banco de dados

Após instalar os drivers, podemos executar o comando:

    
    npx knex init

Será criado um arquivo `knex.file` onde se encontram as configurações de acesso ao banco de dados.

### Configurando o arquivo de conexão ao banco de dados

Dentro da pasta `src` foi criada uma pasta `database` que irá armazenar:

- O arquivo da conexão com o banco de dados: `connection.js`
- O banco de dados de desenvolvimento: `db.sqlite3`
- O banco de dados de teste: `test.sqlite3`
- A pasta `migrations` onde serão armazenadas as migrações do banco

Para concluir as congurações editamos o arquivo `knexfile.js` adicionando:

    ...
      development: {
        client: 'sqlite3',
        connection: {
          filename: './src/database/db.sqlite3'
        },
        migrations: {
          directory: './src/database/migrations'
        },
        useNullAsDefault: true,
      },

      test: {
        client: 'sqlite3',
        connection: {
          filename: './src/database/test.sqlite3'
        },
        migrations: {
          directory: './src/database/migrations'
        },
        useNullAsDefault: true,
      },
    ...

### Migrations

Foram criadas inicialmente duas `migrations`, a primeira para a entidade `ONGS`:

    npx knex migrate:make create_table_ongs

Que gerou o arquivo [20200328134142_create_table_ongs.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/database/migrations/20200328134142_create_table_ongs.js), onde adicionamos as funções de `create` e `drop` do schema da tabela `ongs`.

A outra `migration` para entidade `Incidente`:

    npx knex migrate:make create_table_incidents

Que gerou o arquivo [20200328135725_create_table_incidents.js](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/src/database/migrations/20200328135725_create_table_incidents.js), onde adicionamos as funções de `create` e `drop` do schema da tabela `incidents`.

#### Outros comandos

Para executar as `migrations` e atualizar o schema do banco de dados para a versão atual:

    npx knex migrate:latest

Para desfazer a execução da `migration` mais atual, e deixar o banco como estava anteriormente:

    npx knex migrate:rollback

Para verificar quais `migrations` foram executadas:

    npx knex migrate:status

## CORS

Foi adicionado ao projeto para gerenciamento do acesso à api de serviço. Porém ainda precisa ser configurado antes do projeto entrar em produção!

    npms install cors

## JEST

O [JEST](https://jestjs.io/) foi escolhido como framework de testes unitários por sua fácil intergração com React. Para fazer sua instalação basta executar o comando:

    npm install jest

Feita a instalação, podemos então iniciar a configuração utilizando o comando:

    npm jest --init

Para executar os testes criados dentro da pasta [tests](https://github.com/marcosmapl/semana-omnistack11/tree/master/backend/tests) basta executar o comando:

    npm test -D

## Cross-Env

O [cross-env](https://github.com/kentcdodds/cross-env) permite que possamos ter um único comando sem se preocupar em definir ou usar a variável de ambiente corretamente para a plataforma. Basta configurá-lo como você faria se estiver sendo executado em um sistema qualquer, e o cross-env cuidará de configurá-lo corretamente. Ele é utilizado para gerenciar o tipo de conexão com o banco de dados, tanto no ambiente de desenvolvimento como no ambiente de testes.

    npm install cross-env

Para configurar a variável de ambiente editamos o [package.json](https://github.com/marcosmapl/semana-omnistack11/blob/master/backend/package.json) modificando o script de test como consta na linha abaixo:

    ...
    "scripts": {
      "start": "nodemon src/server.js",
      "test": "cross-env NODE_ENV=test jest"
    },
    ...

Isso irá criar uma variável chamada `NODE_ENV` com o valor `test`, toda vez que o backend for executado para testes. Para ter acesso a essa variável dentro do código, podemos utilizar o objeto `process`:

    const valor = process.env.NODE_ENV;

## Supertest

A biblioteca [supertest](https://github.com/visionmedia/supertest) foi escolhida para testes de integração por ser um projeto voltado para testes de serviços HTTP em Node.js. Para fazer sua instalação como dependência de desenvolvimento basta executar o comando abaixo:

    npm install supertest -D

# FRONTEND

Criando o projeto:

    npx create-react-app frontend

Para Executar o projeto:

    npm start

## React-Icons

Vários pacotes de ícones estão disponíveis junto ao ReactJS para construção da aplicação. Para instalá-los basta executar o comando:

    npm install react-icons

## React Router DOM

A navegação entre páginas é feita utilizando o componente `Link` do módulo de rotas. Para instalar o módulo de rotas basta executar o comando:

    npm install react-router-dom

## AXIOS

Como o Backend funciona na arquitetura REST, precisamos de um client HTTP para acessar os serviços. Para as chamadas a api do backend foi utilizado o [axios](https://github.com/axios/axios), para fazer sua instalação basta executar o comando:

    npm install axios

# MOBILE

Instalando o Expo de forma global:

    npm install -g expo-cli

Para verificar se a instalação foi concluída com sucesso:

    expo -h

Criando o projeto `mobile`:

    expo init mobile
    > blank

Carregando o projeto para interface web do Expo:
  
    yarn start

Instalando o pacote [React Navigation](https://reactnavigation.org/docs/getting-started/) e dependências para o Expo:

    npm install @react-navigation/native
    expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

Instalando a biblioteca [Stack Navigator](https://reactnavigation.org/docs/hello-react-navigation/#installing-the-stack-navigator-library) para navegação por links:
    
    npm install @react-navigation/stack

Instalando o pacote [Expo Constants](https://docs.expo.io/versions/latest/sdk/constants/):

    expo install expo-constants

Instalando o [MailComposer](https://docs.expo.io/versions/latest/sdk/mail-composer/) para construção de e-mails utilizando a UI do Sistema Operacional:

    expo install expo-mail-composer

Instalando o [Intl](https://www.npmjs.com/package/intl) para internacionalização:

    npm install intl
