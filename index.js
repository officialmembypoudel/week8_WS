import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { state } from './model/state.js';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Server is Working' });
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received Message = ${message}`);

    try {
      const data = JSON.parse(message);

      if (data.message === 'fetch') {
        const ledState = state[0];

        ws.send(JSON.stringify(ledState));
      }
    } catch (error) {
      console.log(error.message);

      ws.send(
        JSON.stringify({
          message: error.message,
        })
      );
    }
  });
});

server.listen(443, () => {
  console.log('Server is listening on Port 443');
});
