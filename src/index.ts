import * as dotenv from 'dotenv';
import express from 'express';
import configExpress from './config/express';
import configDb from './config/database';
import routes from './routes';

dotenv.config();
const port = process.env.PORT || 8085;
const app = express();

// Set config file to express
configExpress(app);
// Set config file to Mongo
configDb();
// Set server routes
routes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  