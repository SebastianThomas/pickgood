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

// USE ROUTES

import usersRouter from './routes/users'
import authRouter from './routes/auth'
import productsRouter from './routes/products'
import invoicesRouter from './routes/invoices'
import stationsRouter from './routes/stations'
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/invoices', invoicesRouter)
app.use('/api/stations', stationsRouter)

// Handle production frontend builds (configured for Docker deployment)
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
