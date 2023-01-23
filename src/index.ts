import * as dotenv from 'dotenv';
import express from 'express';
import configExpress from './config/express';
import configDb from './config/database';

dotenv.config();
const port = process.env.PORT || 8080;
const app = express();

// Set config file to express
configExpress(app);
// Set config file to Mongo
configDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  