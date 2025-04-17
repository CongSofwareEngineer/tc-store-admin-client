'use client'
import FBRealtimeUtils from '@/utils/firebaseRealtime'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { IChatRes, IContentChat, IInfoChat, IItemChat } from './type'
import ItemChat from './Components/ItemChat'
import useModalDrawer from '@/hook/useModalDrawer'
import ItemReplyChat from './Components/ItemReplyChat'
import useLanguage from '@/hook/useLanguage'
import { cloneData } from '@/utils/functions'

const ChatsAdminScreen: NextPage = () => {
  const [listChat, setListChat] = useState<IItemChat[]>([])
  const [db] = useState(new FBRealtimeUtils('Chat'))

  const { openModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()

  useEffect(() => {
    const checkIsSeen = (content: IContentChat) => {
      try {
        console.log({ content })

        // eslint-disable-next-line no-prototype-builtins
        return Object.values(content).some((item: any) => item.hasOwnProperty('isSeen'))
      } catch {
        return false
      }
    }

    db.listenerOnValue((data: IChatRes[]) => {
      const arrChat = data.map((e) => {
        const { key, date, ...res } = e
        const content = res as IItemChat['content']
        const itemTemp = {
          key: key.toString(),
          date: Number(date),
          content,
        }
        return itemTemp
      })

      arrChat.sort((a, b) => {
        const aIsSeen = checkIsSeen(a.content)
        const bIsSeen = checkIsSeen(b.content)

        // Đưa object không có `isSeen` lên đầu
        if (!aIsSeen && bIsSeen) {
          return -1
        }
        if (aIsSeen && !bIsSeen) {
          return 1
        }
        return b.date - a.date
      })

      console.log({ arrChat })

      setListChat(arrChat)
    })
  }, [db])

  useEffect(() => {
    console.log({ listChat })
  }, [listChat])

  const handleClick = (key: string, itemLast: IInfoChat) => {
    const listChatDetail = listChat.find((e) => e.key === key)

    openModalDrawer({
      content: <ItemReplyChat itemLast={itemLast} item={listChatDetail!} />,
      title: translate('common.reply'),
      useDrawer: true,
      configDrawer: {
        noPadding: true,
      },
      configModal: {
        classContent: 'min-h-[50vh]',
      },
    })
  }

  return (
    <div className='w-full h-fit max-w-[1200px] lg:grid lg:grid-cols-2 lg:gap-5  flex flex-col gap-2 overflow-y-auto'>
      {listChat.map((e) => {
        console.log({ item: e })

        return <ItemChat onClick={handleClick} data={e} key={e.key} />
      })}
    </div>
  )
}

export default ChatsAdminScreen
