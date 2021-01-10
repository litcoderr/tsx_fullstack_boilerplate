import express from 'express'
import path from 'path'
import router_init from './router/main'
import { connectDB } from './controller/databaseController'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function initApp() {
 const DIST_DIR = path.join(__dirname, '../client_dist');

 router_init(app, DIST_DIR);

 await connectDB();

 const port = process.env.PORT || 3000;
 if(process.env.NODE_ENV !== 'test'){
  app.listen(port, function () {
   console.log('App listening on port: ' + port);
  });
 }
}

initApp();

export default app;