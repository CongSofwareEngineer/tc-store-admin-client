import React, { useState } from 'react'
import { ContentItemChatProps, ItemChatProps } from '../../type'
import FBRealtimeUtils from '@/utils/firebaseRealtime'
import ChatMessage from '@/components/ChatMessage'
import ItemChatDetail from '../ItemChatDetail'
import MyInput from '@/components/MyInput'
import { SendOutlined } from '@ant-design/icons'
import useModalDrawer from '@/hook/useModalDrawer'
import useLanguage from '@/hook/useLanguage'
import { showNotificationSuccess } from '@/utils/notification'

type Props = {
  keyChat: string
  item: ContentItemChatProps | null
  listChats: ItemChatProps[]
}
const ItemReplyChat = ({ item, keyChat, listChats }: Props) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  const [db] = useState(new FBRealtimeUtils(`Chat/${keyChat}`))
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')

  const handleSend = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    const dataUpdate = {
      [item?.date!]: {
        ...item,
        isSeen: true,
      },
    }
    const dataReply = {
      date: Date.now(),
      content: text,
      isAdmin: true,
    }
    await db.update(dataUpdate)
    await db.update({ [dataReply.date]: dataReply })
    setLoading(false)
    closeModalDrawer()
    showNotificationSuccess(translate('success.reply'))
    setText('')
  }

  const renderItem = () => {
    const arrTemp = Object.values(listChats[0].content || {}).map((e) => {
      const item: any = e
      return item
    })
    return arrTemp.map((e) => {
      return <ItemChatDetail data={e} key={e.date} />
    })
  }
  return (
    <div className='flex flex-col h-full justify-between'>
      <div className=' relative flex flex-col flex-1 min-h-[70dvh] max-h-[70dvh] overflow-y-auto'>
        <ChatMessage isLoadMore={false} isReverse loading={false} data={listChats}>
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
