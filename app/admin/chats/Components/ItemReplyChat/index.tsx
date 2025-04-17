import React, { useState } from 'react'
import { IContentChat, IInfoChat, IItemChat } from '../../type'
import FBRealtimeUtils from '@/utils/firebaseRealtime'
import ChatMessage from '@/components/ChatMessage'
import ItemChatDetail from '../ItemChatDetail'
import MyInput from '@/components/MyInput'
import { SendOutlined } from '@ant-design/icons'
import useModalDrawer from '@/hook/useModalDrawer'
import useLanguage from '@/hook/useLanguage'
import { showNotificationSuccess } from '@/utils/notification'

type Props = {
  item: IItemChat
  itemLast: IInfoChat
}
const ItemReplyChat = ({ item, itemLast }: Props) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  const [db] = useState(new FBRealtimeUtils(`Chat/${item.key}`))
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')

  const arrChat = Object.entries(item.content || {}).map(([date, value]) => {
    return {
      date,
      ...value,
    }
  })

  const handleSend = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    const dataUpdate = {
      [itemLast?.key?.toString()!]: {
        content: itemLast?.content,
        isSeen: true,
      },
      [Date.now()]: {
        content: text,
        isAdmin: true,
      },
      date: Date.now(),
    }

    await db.update(dataUpdate)
    closeModalDrawer()
    showNotificationSuccess(translate('success.reply'))
    setText('')
    setLoading(false)
  }

  const renderItem = () => {
    return Object.entries(item.content || {}).map(([date, content]) => {
      return <ItemChatDetail data={content} key={date} />
    })
  }
  return (
    <div className='flex flex-col h-full justify-between'>
      <div className=' relative flex flex-col flex-1 min-h-[70dvh] max-h-[70dvh] overflow-y-auto'>
        <ChatMessage isLoadMore={false} isReverse loading={false} data={arrChat}>
          {renderItem()}
        </ChatMessage>
      </div>
      <div className='flex w-full border-t-[1px] border-gray-300'>
        <div className='flex flex-1'>
          <MyInput
            onPressEnter={handleSend}
            value={text}
            placeholder={translate('placeholder.enterContent')}
            onChangeText={(text) => setText(text.toString())}
            className='w-full !pl-2'
            typeBtn={1}
          />
          <div className='h-full justify-center items-center flex px-2 bg-gray-300'>
            <SendOutlined onClick={handleSend} className='cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemReplyChat
