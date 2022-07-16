import clientMap, { SocketIOClient } from './clients'

export default (socket: SocketIOClient) => {
  clientMap.add(socket)
  socket.client.on('disconnect', () => {
    clientMap.remove(socket)
  })
}
