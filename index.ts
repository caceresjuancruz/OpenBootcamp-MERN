import dotenv from 'dotenv'; 
dotenv.config();
import server from './src/server';
import { LogError, LogSuccess } from './src/utils/logger';

const port: string | number = process.env.PORT || 8000;

server.listen(port, () => {
    LogSuccess(`[SERVER ON]: Running at http://localhost:${port}/api`);
});

server.on('error', (error) => {
    LogError(`[SERVER ERROR]: ${error}`);
})