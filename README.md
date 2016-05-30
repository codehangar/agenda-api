## How to Run

```shell
$ npm start
```

## Local Environment

To test locally, be sure to include a file named `.env` in the root of the project with the following settings:

```shell
# ReThink DB
DATABASE_HOST=192.168.99.100
DATABASE_PORT=32778
DATABASE_NAME=codehangar
DATABASE_KEY={{value}}

# RedisDB
REDISCLOUD_URL=redis://192.168.99.100:32769

# Slack Notifcations
SLACK_WEBHOOK=https://hooks.slack.com/services/{{value}}
SLACK_USER=Code Hangar API
SLACK_CHANNEL=#integrations

# Postmark Emails
POSTMARK_TOKEN={{value}}
POSTMARK_FROM=info@codehangar.io
POSTMARK_TO=info@codehangar.io
POSTMARK_TEMPLATE_ID={{value}}

# Remote Database
DATABASE_REMOTE_HOST=localhost
DATABASE_REMOTE_PORT=28015
DATABASE_REMOTE_KEY={{value}}
```

## Local DB Setup

This codebase is currently dependent on using RethinkDB. RethinkDB has 3 ports that it will expose:

1) 8080, Web UI Port
2) 28015, Client Driver Port
3) 29015, Intracluster port (this is for multi primary/secondary setups)

Use this tutorial to configure a tool called Kitematic
IMPORTANT!!! - Instead of using mongodb/redis like the tutorial explains use rethinkdb in Kitematic instead, everthing else will be similar.
http://codehangar.io/local-dbs-with-ease-ft-kitematic-from-docker-toolbox/

## NPM Scripts

### Setup Database

The following command will setup the database, tables, and index's needed for local development.

```shell
npm run setupdb
```

### Generate Auth Key

This command will generate and set an authkey on your current rethink database connection settings. Remember to copy and paste the output of this command to your .env file.

```shell
npm run generateauthkey
```

### Reset Auth Key

This command will set your rethinkdb authkey back to null. You must have your old auth key in your .env file before you do this. After the command has successfully been executed you can leave your DATABASE_KEY {{value}} empty.

```shell
npm run resetauthkey
```

### SSH tunnel to remote database server

This command will open up a ssh tunnel for a remote server. Running the command will prompt you for the following:

- localPort (Local port to bind ssh tunnel too)
- remotePort (Remote port to bind ssh tunnel too)
- remoteUser (Remote ssh user)
- remoteHost (Remote host ip address or domain)

```shell
npm run sshremoteserver
```

### Clone RethinkDB remote database

This command is dependant on the Remote Database .env variables. This command will connect to the remote database and prompt the user to select a remote database to clone. It will then clone down that remote database to your local database connection.

```shell
npm run cloneremotedb
```

## Coding patterns

### Versions

We are breaking up file structure and api versions by a version folder. Example folder 'v1'. Each version folder will house the swagger docs, its own validation middleware, and routes.js file along with any custom api routes needed.

### Models

Model.js is the base class that each model is based on. This model is very basic. You define all your properties as an object. Inside that object you can declare a default value for the object when a new entity is created. You can also add any string based tag to them. Examples are 'ui', 'db', 'private', ect. The tags are used for the .toJson() method, which will return a POJO filtered by a tag passed to the .toJson() method.

### Repositories (Data Layer)

Repositories are used as general class files to just help organize database code for each table. You will need one of these files to interact with the database table. Here you will register all your CRUD operations.

### Validation

Validation is housed in each versioned folder of the api. The folder should be called '_validation'. These files are middleware in nature and are used to keep the route files cleaner. Here you can handle model validation and checking to make sure entities belong to users accessing them before proceeding to the route files.

### Docs

We use swagger docs. The doc files for each api version can be found in the api version folder under '_docs'. You can edit the swaggerdoc.yml file to update the api docs accordingly. The docs can be found at /api/{{version}}/docs.

### Middleware

Besides the validation middleware, all other middleware can be placed here.

### File Names and Organization
File names should always be lowercase, and follow the below convention:
- `{function-name}.{function-role}.js` i.e.
- `user-update.handler.js`
- `authentication.middleware.js`
- `token.service.js`

File Structure Should follow:
```bash
-src
  -api
    -v1 # (All API handlers/endpoints should live here, able to be versioned)
      -users # (Group logical handlers together i.e. REST handlers matching '/api/v1/users/*')
        user.routes.js
        user-update.handler.js
      -other-module # (REST handlers matching '/api/v1/other-module/*')
        other-module.create.js
        other-module.routes.js
      routes.js # Contains route links to the module-specific routes shown above
  -middleware
  -models
  -repositories
  -services
```
- API Routes should match the file system as much as possible

### Code Style
- Use Sublime Text
- Install Sublime package: `HTML-CSS-JS Prettify`
- Use `Cmd+Shift+H` religiously to keep all code formatting consistent.
 - This plugin will obey the settings found in `.jsbeautifyrc`
- Update Sublime Settings with (`Cmd+,`):
```
{
 "draw_white_space": "all",
 "save_on_focus_lost": true,
 "tab_size": 2,
 "word_wrap": false,
 "translate_tabs_to_spaces": true
}
```