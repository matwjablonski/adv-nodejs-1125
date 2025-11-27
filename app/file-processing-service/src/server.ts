import 'reflect-metadata';
import express from 'express';
import http from 'http';
import { registerRoutes } from './infrastructure/http/router.js';
import { createWebSocketHub } from './infrastructure/ws/ws-hub.js';

const app = express();
app.use(express.json());

registerRoutes(app);

const server = http.createServer(app);
export const wsHub = createWebSocketHub(server);

server.listen(3000, () => console.log('Server running'));
