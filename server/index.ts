import express from 'express'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'

// Config dotenv
import dotenv from 'dotenv'
dotenv.config()

import initAssocs from './dao/initAssocs'
initAssocs()

// Express server and SocketIO:
// Initialize Express and socket.io server with NodeJS HTTP module
const app = express()

const server = http.createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

// Init socket.io connection
import clientMap, { SocketIOClient } from './socketio/clients'
import createListeners from './socketio/createListeners'
io.on('connection', socket => {
  socket.emit('ack')

  const newSocket = new SocketIOClient(socket)
  createListeners(newSocket)
})

// Handle production builds
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/frontend-dist/'))

  // Handle Single Page Application
  app.get(/.*/, (req, res) =>
    res.sendFile(__dirname + '/frontend-dist/index.html')
  )
}

// Bind HTTP server to port (the one created with express and socket.io)
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
