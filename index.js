import express from 'express';
import http from 'http';

import { WebSocketServer } from 'ws';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Server Working!' });
});

app.get('/c8', (req, res) => {
  res.json({ message: 'this is c8!' });
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received Message = ${message}`);
    ws.send(`I Received Message = ${message}`);
  });
});

server.listen(443, () => {
  console.log('Server listening on port 443');
});
