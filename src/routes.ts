import { Application } from 'express';
import healthcheck from './api/healthcheck';
import user from './api/user';
import authLocal from './auth/local';
import publisher from './api/publisher';
import upload from './api/upload';
import book from './api/book';
import library from './api/library';

function routes(app: Application):void{
    app.use('/api/books', book);
    app.use('/api/healthcheck', healthcheck);
    app.use('/api/libraries', library);
    app.use('/api/publishers', publisher);
    app.use('/api/upload', upload);
    app.use('/api/users', user);
    //auth routes
    app.use('/auth/local', authLocal);

}
  
export default routes;