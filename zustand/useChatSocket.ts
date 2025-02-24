import { devtools } from 'zustand/middleware'

import { create } from 'zustand'

import { ZUSTAND } from '@/constant/zustand'
import { io, Socket } from 'socket.io-client'
import { encryptData } from '@/utils/crypto'

type ChatSocketStoreState = { [ZUSTAND.ChatSocket]: Socket | null }

type ChatSocketStoreActions = {
  create: (sdt: string) => void
}

type ChatSocketStore = ChatSocketStoreState & ChatSocketStoreActions

export const zustandLanguage = create<ChatSocketStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.ChatSocket]: null,

      create: (sdt: string) => {
        // const socket = io(process.env.NEXT_PUBLIC_API_APP, {
        //   reconnection: true,
        //   reconnectionDelayMax: 10000,
        //   auth: {
        //     token: encryptData(sdt),
        //   },
        //   autoConnect: true,
        //   secure: true,
        // })
        // socket.connect()
        // setTimeout(() => {
        //   set({ [ZUSTAND.ChatSocket]: socket })
        // }, 1000)
      },
    }),
    {
      name: `zustand-${ZUSTAND.ChatSocket}`,
      enabled: process.env.NEXT_PUBLIC_DISABLE_DEV === undefined,
    }
  )
)

export const useChatSocket = () => {
  return zustandLanguage((state) => state)
}
