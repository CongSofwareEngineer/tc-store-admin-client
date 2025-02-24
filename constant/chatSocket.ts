export enum TYPE_EVENT_SOCKET {
  message = 'message',
  receivedMessage = 'receivedMessage',
  sendMessage = 'sendMessage',
  clientSendMessage = 'clientSendMessage',
  newMessage = 'newMessage',
  disconnect = 'disconnect',
  connect = 'connect',
  joinRoom = 'joinRoom',
  userJoinRoom = 'userJoinRoom',
  leaveRoom = 'leaveRoom',
  userLeaveRoom = 'userLeaveRoom',
}

export enum DEFAULT_CHAT_ROOM {
  community = 'community',
  admin = 'admin',
  client = 'client',
}
