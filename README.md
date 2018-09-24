# ToDoList

<a href="http://www.picshare.ru/view/8925269/" target="_blank"><img src="http://www.picshare.ru/uploads/180820/ZLA6WfK5O8.gif" border="0" width="763" height="574" title="Хостинг картинок PicShare.ru"></a>

ToDoList with Koa + PostgreSQL and React client (Testing work)<br>
ToDoList на Koa +PostgreSQL и клиентом на React

## DB create
DB create scripts in \install folder

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

or

VSCode launch config included ... Enjoy)
