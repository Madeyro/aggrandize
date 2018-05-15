# <center>Aggrandize</center>
### <center>Grow with control</center>
*<center>Referral Platform</center>*

## Build Setup

#### Frontend (client)

install dependencies  
`yarn install`  
or  
`npm install`  


serve with hot reload at localhost:8000  
`npm run dev`  


build for production with minification  
`npm run build`  


#### Backend (server)

install dependencies  
`yarn install`  
or  
`npm install`  


run server (the databse server must be running before startin backend)  
`npm start`  

#### Database
1. Install CouchDB 2.1.1
2. create new databse
3. edit `server/src/db/auth.js` file accordingly
4. set env variables `COUCHDB_USER` with db user login and `COUCHDB_PASS` with db admin password
5. run CouchDB from where it is installed `./couchdb/bin/couchdb`
6. create new database and within create document containing `db_views.js`

## Use Cases

See [Use Cases file](./docs/use_cases.md) for more information

## API

See [API docs](./docs/API.md) or generated [Postman docs](https://documenter.getpostman.com/view/4347332/aggrandize/RW81vD88)

## Technologies used

- Database: CouchDB
  - [Database model](./docs/database_model.md)
- Backend: Node.js
- Middleware: Koa.js
- Frontend: Vue.js
- Dependencies: Yarn

## Front-end

Template: Vue Light Bootstrap Dashboard
- [GitHub repo](https://github.com/cristijora/vue-light-bootstrap-dashboard)
- [Web Page](https://www.creative-tim.com/product/vue-light-bootstrap-dashboard)

## License

Under MIT License.  
See [license file](./LICENSE) for more information.
