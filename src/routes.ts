import { Application } from 'express';
import healthcheck from './api/healthcheck';
import user from './api/user';
import authLocal from './auth/local';
import publisher from './api/publisher';
import upload from './api/upload';
import book from './api/book';

function routes(app: Application):void{
    app.use('/api/healthcheck', healthcheck);
    app.use('/api/users', user);
    app.use('/api/publishers', publisher);
    app.use('/api/books', book);
    app.use('/api/upload', upload);
    //auth routes
    app.use('/auth/local', authLocal);

}
  
export default routes;