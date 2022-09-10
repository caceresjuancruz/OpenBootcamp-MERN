/**
 * Root Router
 * Redirections to Router
 */

import express, { Request, Response } from 'express';
import helloRouter from './HelloRouter';
import { LogInfo } from '../utils/logger';
import userRouter from './UserRouter';
import authRouter from './AuthRouter';

//Server instance
let server = express();

//Router instance
let routeRouter = express.Router();

//Request to http://localhost:8000/api

// GET: http://localhost:8000/api/
routeRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api/');
    res.send("Rutita api papu :v");
});

//Redirections to Routers & Controllers
server.use('/', routeRouter); // http://localhost:8000/api/ 
server.use('/hello', helloRouter); // http://localhost:8000/api/hello -> HelloController
server.use('/users', userRouter); // http://localhost:8000/api/users -> UserController
server.use('/auth', authRouter); // http://localhost:8000/api/auth -> AuthController
//Add more routes here

export default server;
