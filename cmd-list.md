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

# FRONTEND

Criando o projeto:

  npx create-react-app frontend

	## executar o projeto
	> npm start

# MOBILE
