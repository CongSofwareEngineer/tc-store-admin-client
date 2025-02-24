import { io } from 'socket.io-client'

class SocketServices {
  static socket = io(process.env.NEXT_PUBLIC_API_APP, {
    reconnection: true,
    reconnectionDelayMax: 10000,
    auth: {},
  })
}
export default SocketServices
