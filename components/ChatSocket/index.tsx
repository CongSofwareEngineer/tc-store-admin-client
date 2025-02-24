'use client'
import { TYPE_EVENT_SOCKET } from '@/constant/chatSocket'
import { useChatSocket } from '@/zustand/useChatSocket'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

export type DataMessage = {
  sdt: string
  date: number
  content: string
  received?: string
  room?: any
  attributes?: { [key: string]: any }
}

const ChatSocket: NextPage = () => {
  const { chatSocket, create } = useChatSocket()

  const [listMessage, setListMessage] = useState<DataMessage[]>([])

  useEffect(() => {
    create('0392225405')
  }, [create])

  useEffect(() => {
    if (chatSocket?.connected) {
      chatSocket.on(TYPE_EVENT_SOCKET.newMessage, (data: any) => {
        console.log({ newMessages: data })
        setListMessage((pre) => [...pre, data])
      })

      chatSocket.on(TYPE_EVENT_SOCKET.userLeaveRoom, (data: any) => {
        console.log({ userLeaveRoom: data })
      })

      chatSocket.on(TYPE_EVENT_SOCKET.userJoinRoom, (data: any) => {
        console.log({ joinRoom: data })
      })
    }

    return () => {
      chatSocket?.removeListener(TYPE_EVENT_SOCKET.newMessage)
      chatSocket?.removeListener(TYPE_EVENT_SOCKET.userLeaveRoom)
      chatSocket?.removeListener(TYPE_EVENT_SOCKET.userJoinRoom)
    }
  }, [chatSocket])

  useEffect(() => {
    if (chatSocket?.connected) {
      chatSocket.emit(TYPE_EVENT_SOCKET.joinRoom, {
        content: 'client join room',
        sdt: '0392225405',
        date: Date.now(),
      })

      setTimeout(() => {
        chatSocket.emit(TYPE_EVENT_SOCKET.clientSendMessage, {
          content: 'client send message',
          sdt: '0392225405',
          date: Date.now(),
        })
      }, 3000)
    }

    return () => {
      chatSocket?.disconnect()
    }
  }, [chatSocket])

  useEffect(() => {
    console.log({ listMessage })
  }, [listMessage])

  return <></>
}

export default ChatSocket
