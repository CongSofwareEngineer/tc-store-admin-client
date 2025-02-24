'use client'
import FBRealtimeUtils from '@/utils/firebaseRealtime'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { ContentItemChatProps, ItemChatProps } from './type'
import ItemChat from './Components/ItemChat'
import useModalDrawer from '@/hook/useModalDrawer'
import ItemReplyChat from './Components/ItemReplyChat'
import useLanguage from '@/hook/useLanguage'

const ChatsAdminScreen: NextPage = () => {
  const [listChat, setListChat] = useState<ItemChatProps[]>([])
  const [db] = useState(new FBRealtimeUtils('Chat'))

  const { openModalDrawer } = useModalDrawer()
  const { translate } = useLanguage()

  useEffect(() => {
    db.listenerOnValue((data) => {
      const arr: ItemChatProps[] = data.map((e) => {
        const key = e.key
        delete e.key
        return { key, content: e }
      })

      const hasIsSeen = (content: any) => {
        try {
          console.log({ content })

          // eslint-disable-next-line no-prototype-builtins
          return Object.values(content).some((item: any) => item.hasOwnProperty('isSeen'))
        } catch (error) {
          return false
        }
      }
      const sortedData = arr.sort((a, b) => {
        const aHasIsSeen = hasIsSeen(a.content)
        const bHasIsSeen = hasIsSeen(b.content)

        // Đưa object không có `isSeen` lên đầu
        if (!aHasIsSeen && bHasIsSeen) return -1
        if (aHasIsSeen && !bHasIsSeen) return 1
        return 0 // Giữ nguyên thứ tự nếu cả hai cùng có hoặc không có `isSeen`
      })

      console.log({ arr, sortedData })

      // arr=arr.sort((a,b)=>b.content.date-a.content.date)

      setListChat(arr)
    })
  }, [db])

  useEffect(() => {
    console.log({ listChat })
  }, [listChat])

  const handleClick = (key: string, item: ContentItemChatProps | null) => {
    const listChatDetail = listChat.filter((e) => e.key === key)
    openModalDrawer({
      content: <ItemReplyChat listChats={listChatDetail} item={item} keyChat={key} />,
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
        return <ItemChat onClick={handleClick} data={e} key={e.key} />
      })}
    </div>
  )
}

export default ChatsAdminScreen
