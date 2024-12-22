import express from 'express';
import http from 'http';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Server is Working' });
});

const server = http.createServer(app);

server.listen(443, () => {
  console.log('Server is listening on Port 443');
});
