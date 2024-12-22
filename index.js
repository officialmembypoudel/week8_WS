import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Server Is working' });
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received Message = ${message}`);
    ws.send(`Server Received Message = ${message}`);
  });
});

server.listen(443, () => {
  console.log('Server is Running on port 443');
});
