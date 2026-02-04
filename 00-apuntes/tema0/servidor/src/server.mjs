import { createServer } from 'node:http';
//import { requestListener } from './saludoEstatico.mjs';
import { requestListener } from './saludoDinamico.mjs';

const host = process.env.APP_HOST || 'localhost';
const port = parseInt(process.env.APP_PORT || 8080);

const server = createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server inicializado en http://${host}${port !== 80 ? `:${port}` : ''}`);
});