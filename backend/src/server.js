const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

// express é um micro framework dentro do node
// ajuda na definição de rotas (req, res)
const app = express();

// pegando o servidor http e extraindo ele do express
const server = http.Server(app);
// server consegue, agora, ouvir o protocolo Web Socket
const io = socketio(server);

mongoose.connect('mongodb+srv://jvpoletti:mypassword@omnistack-gvtgd.mongodb.net/semana09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connectedUsers = {};

// toda vez que o usuario logar, vou anotar a info que ele está logado em algum lugar
io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

// use() => adiciona o funcionalidade para todas as rotas
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next(); // para continuar o fluxo normal da aplicação
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);