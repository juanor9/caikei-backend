import { Application } from 'express';
import healthcheck from './api/healthcheck';
import user from './api/user';
import authLocal from './auth/local';

function routes(app: Application):void{
    app.use('/api/healthcheck', healthcheck);
    app.use('/api/users', user);
    //auth routes
    app.use('/auth/local', authLocal);
}
  
export default routes;