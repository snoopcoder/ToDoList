# ToDoList

ToDoList with Koa + PostgreSQL and React client (Testing work)<br>
ToDoList на Koa +PostgreSQL и клиентом на React


## Config
Config for DB in \config\default.json

```js
{
  "app": {
    "name": "testingtasks",
    "version": "0.0.1"
  },  
  "database": {
    "tasklist": {
		"user": "postgres",
		"password": "TypePassThere",
      		"host": "TypeServerAddrThere",
		"port": "5432",	
      		"database":"tasklist"       		
    }
  }
}

```


## Buid
Webpack and Babel config included

Client build:

```
$ npm run build
```

## Run
```
$ npm start
```
