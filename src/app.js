import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import socketIo from 'socket.io';
import { Server } from 'http';

import './database';

import routes from './routes';

class App {
  constructor() {
    this.app = express();
    this.server = Server(this.app);
    this.io = socketIo(this.server);
    this.connectedUsers = {};

    this.io.on('connection', socket => {
      const { user } = socket.handshake.query;

      this.connectedUsers[user] = socket.id;
    });

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;

      return next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
