import express, { Express, Request, Response } from "express";

//Swagger
import swaggerUi from 'swagger-ui-express';

//Security
import cors from 'cors';
import helmet from 'helmet';

// TODO: HTTPS

//Root Router
import rootRouter from '../routes';
import mongoose from "mongoose";

const server: Express = express();

//Swagger config and route
server.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
            explorer: true
        }
    })
);

// Define SERVER to use '/api' and use rootRouter
//http://localhost:8000/api/...
server.use(
    '/api',
    rootRouter
);

//Server static
server.use(express.static('public'));

// TODO: Moongose Connection
mongoose.connect('mongodb://localhost:27017/starwars');

//Security Config
server.use(helmet());
server.use(cors());

//Content Type Config:
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));

//http://localhost:8000/ --> http://localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api');
});

export default server;

