import http from 'http';
import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Server is Working' });
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
    ws.send(`Welcome: ${message}`);
  });
});

server.listen(443, () => {
  console.log('Server is running on port 443');
});
