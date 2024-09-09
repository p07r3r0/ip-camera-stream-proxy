const Stream = require('node-rtsp-stream');
const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const path = require('path');
require('dotenv').config();

const RTSP_URL = process.env.RTSP_URL;
const HTTP_PORT = process.env.PORT || 3000;
const WEBSOCKET_PORT = process.env.WS_PORT || 9999;

const SERVER_IP = process.env.SERVER_IP || 'your.public.ip';

// Configuración del stream
const stream = new Stream({
  name: 'camera',
  streamUrl: RTSP_URL,
  wsPort: WEBSOCKET_PORT,
  ffmpegOptions: {
    '-stats': '',
    '-r': 30,
    '-q:v': 1
  }
});

// Configuración del servidor web
const app = express();
const server = http.createServer(app);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para proporcionar la configuración al cliente
app.get('/config', (req, res) => {
  res.json({
    wsUrl: `ws://${SERVER_IP}:${WEBSOCKET_PORT}`
  });
});

// Iniciar el servidor HTTP
server.listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`Servidor HTTP corriendo en http://${SERVER_IP}:${HTTP_PORT}`);
});

// Manejar conexiones WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Nueva conexión WebSocket');
  
  if (wss.clients.size > 30) {
    console.log('Límite de conexiones alcanzado');
    ws.close();
    return;
  }

  ws.on('close', () => {
    console.log('Conexión WebSocket cerrada');
  });
});