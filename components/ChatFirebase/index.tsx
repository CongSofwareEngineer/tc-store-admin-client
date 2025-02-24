import useLanguage from '@/hook/useLanguage'
import useMedia from '@/hook/useMedia'
import useUserData from '@/hook/useUserData'
import FBRealtimeUtils from '@/utils/firebaseRealtime'
import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { images } from '@/configs/images'
import { CloseCircleOutlined, SendOutlined } from '@ant-design/icons'
import MyInput from '../MyInput'
import ChatMessage from '../ChatMessage'

import Draggable from 'react-draggable'
import { getDataLocal, saveDataLocal } from '@/utils/functions'
import { LOCAL_STORAGE_KEY } from '@/constant/app'
import { Image } from 'antd'
import ClientApi from '@/services/clientApi'
import ItemChatDetail from '@/app/admin/chats/Components/ItemChatDetail'

export type DataMessage = {
  date: number
  content: string
  isAdmin?: boolean
  isSeen?: boolean
  attributes?: { [key: string]: any }
}

const ChatFirebase: NextPage = () => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()
  const isDragging = useRef(false)
  const dbRef = useRef<FBRealtimeUtils | null>(null)
  const idBDRef = useRef<number | string>(0)

  const [listChats, setListChats] = useState<DataMessage[]>([])
  const { userData } = useUserData()
  const [content, setContent] = useState('')
  const [enableChat, setEnableChat] = useState(false)
  const [isSendMuchMessages, setIsSendMuchMessages] = useState(false)
  const [position, setPosition] = useState({ right: 20, bottom: 20 })

  useEffect(() => {
    const createDB = (keyName: string | number) => {
      idBDRef.current = keyName
      setIsSendMuchMessages(false)
      dbRef.current = new FBRealtimeUtils(`Chat/${keyName}`)
      setTimeout(() => {
        dbRef.current?.listenerOnValue(async (message: DataMessage[]) => {
          if (message.length > 0 && message[message.length - 1]?.isAdmin) {
            setIsSendMuchMessages(false)
          }

          setListChats(message)
        })
      }, 200)
    }

    if (userData?.sdt) {
      if (dbRef.current && dbRef.current.nameDB !== `Chat/${userData?.sdt}`) {
        dbRef.current?.remove().finally(() => {
          createDB(userData?.sdt!)
        })
      } else {
        createDB(userData?.sdt!)
      }
    } else {
      const iDLocalStorage = getDataLocal(LOCAL_STORAGE_KEY.IDChatMessages)
      const timeStamp = iDLocalStorage || Date.now()
      if (!iDLocalStorage) {
        saveDataLocal(LOCAL_STORAGE_KEY.IDChatMessages, timeStamp)
      }
      createDB(timeStamp)
    }
  }, [userData])

  useEffect(() => {
    if (enableChat) {
      setListChats((pre) => {
        const obUpdate: { [key: string | number]: any } = {}
        const arrTemp: DataMessage[] = pre.map((e) => {
          const itemSeen = { ...e, isSeen: true }
          if (itemSeen.isAdmin) {
            obUpdate[itemSeen.date] = itemSeen
          }
          return itemSeen
        })
        if (dbRef.current) {
          dbRef.current.update(obUpdate)
        }
        return arrTemp
      })
    }
  }, [enableChat])

  const checkValidMess = (): boolean => {
    let isErrorSendMuchMessages = false
    let numberRequest = 0
    listChats.forEach((e) => {
      if (numberRequest === 3) {
        isErrorSendMuchMessages = true
      } else {
        if (e.isAdmin) {
          numberRequest = 0
        } else {
          numberRequest++
        }
      }
    })

    return !isErrorSendMuchMessages
  }

  const handleSend = async () => {
    const isValidSend = checkValidMess()
    if (isValidSend) {
      const text = content
      if (content?.trim()) {
        setContent('')

        const toDateNumber = Date.now()
        const body: DataMessage = {
          content: text,
          date: toDateNumber,
        }
        await dbRef.current?.create({
          [toDateNumber]: body,
        })
        ClientApi.sendNotiNewChatMessages(idBDRef.current.toString())
      }
    } else {
      setIsSendMuchMessages(true)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isMobile) {
      handleTouchMove(e)
      return
    }
    isDragging.current = true
    const right = window.innerWidth - e.clientX - 25
    const bottom = window.innerHeight - e.clientY - 25

    const checkValidPosition = (value: number, max: number) => {
      if (value > 0) {
        if (value > max - 40) {
          return max - 40
        }
        return value
      } else {
        return 0
      }
    }
    setPosition({
      right: checkValidPosition(right, window.innerWidth), // 25 là nửa width icon
      bottom: checkValidPosition(bottom, window.innerHeight), // 25 là nửa width icon
    })

    e.preventDefault()
  }

  const handleTouchMove = (e: any) => {
    isDragging.current = true
    const touch = e.touches[0]
    const right = window.innerWidth - touch.clientX - 25
    const bottom = window.innerHeight - touch.clientY - 25

    const checkValidPosition = (value: number, max: number) => {
      if (value > 0) {
        if (value > max - 40) {
          return max - 40
        }
        return value
      } else {
        return 0
      }
    }
    setPosition({
      right: checkValidPosition(right, window.innerWidth), // 25 là nửa width icon
      bottom: checkValidPosition(bottom, window.innerHeight), // 25 là nửa width icon
    })

    // Ngừng cuộn trang khi di chuyển icon
    e.preventDefault()
  }

  const handleClick = () => {
    console.log('handleClick')

    if (!isDragging.current) {
      setEnableChat(true)
    }
  }

  const renderAmountNewMessage = () => {
    const amountNew = listChats.filter((e) => !e.isSeen && e.isAdmin).length
    if (amountNew === 0) {
      return <></>
    }
    return (
      <div className='absolute top-[-10px] right-[-10px] bg-red-300 px-2 py-1   rounded-[50%] text-[10px]  '>
        {amountNew}
      </div>
    )
  }

  if (userData?.isAdmin) {
    return <></>
  }

  return (
    <div
      style={{
        right: enableChat ? 20 : position.right,
        bottom: enableChat ? 20 : position.bottom,
      }}
      className='fixed z-[11]'
    >
      {enableChat ? (
        <div
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 2px 1px',
          }}
          className='flex animate-zoom flex-col w-[300px] rounded-md relative overflow-hidden   bg-white'
        >
          <div className='flex justify-between px-3 py-1  items-center bg-green-300'>
            <div>Chat</div>

            <div className='text-black text-xl'>
              <CloseCircleOutlined
                className='cursor-pointer'
                onClick={() => setEnableChat(false)}
              />
            </div>
          </div>

          <div className=' relative flex flex-col flex-1 min-h-[400px] max-h-[400px] overflow-y-auto'>
            <ChatMessage isLoadMore={false} isReverse loading={false} data={listChats}>
              <div className='flex w-full justify-start'>
                <div
                  style={{
                    borderRadius: 8,
                    borderBottomLeftRadius: 0,
                  }}
                  className='px-3  w-max max-w-[70%] mx-3 text-xs my-2 py-2  bg-blue-200'
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: translate('chat.helloUser'),
                    }}
                  />
                </div>
              </div>

              {listChats.map((e: DataMessage) => {
                return <ItemChatDetail data={e} key={e.date} />
              })}
              {isSendMuchMessages && (
                <div className='w-full px-3 text-center text-[12px] text-red-400'>
                  {translate('errors.sendMuchMessages')}
                </div>
              )}
            </ChatMessage>
          </div>

          <div className='flex w-full border-t-[1px] border-gray-300'>
            <div className='flex flex-1'>
              <MyInput
                onPressEnter={handleSend}
                value={content}
                placeholder={translate('placeholder.enterContent')}
                onChangeText={(text) => setContent(text.toString())}
                className='w-full !pl-2'
                typeBtn={1}
              />
              <div className='h-full justify-center items-center flex px-2 bg-gray-300'>
                <SendOutlined onClick={handleSend} className='cursor-pointer' />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Draggable
          allowAnyClick
          enableUserSelectHack
          onStop={() => {
            if (isMobile && !isDragging.current) {
              handleClick()
            }

            setTimeout(() => {
              isDragging.current = false
            }, 200)
          }}
          onDrag={(e: any) => {
            handleMouseMove(e)
          }}
        >
          <div onClick={handleClick} className='relative'>
            <Image
              preview={false}
              alt='icon-message-chat'
              src={images.icon.iconMessageChat}
              className='!relative select-none !w-[40px] !h-[40px] drop-shadow-img'
            />
            {renderAmountNewMessage()}
            <div
              onClick={handleClick}
              className='absolute inset-0 w-full h-full z-10 cursor-pointer '
            />
          </div>
        </Draggable>
      )}
    </div>
  )
}

export default ChatFirebase
