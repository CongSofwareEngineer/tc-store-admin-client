import React, { useEffect, useState } from 'react'
import { IContentChat, IInfoChat, IItemChat } from '../../type'
import { formatDateTime } from '@/utils/momentFunc'
import { ellipsisText } from '@/utils/functions'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import TextCopy from '@/components/TextCopy'

type Props = {
  data: IItemChat
  onClick: (key: string, data: IInfoChat) => void
}

const ItemChat = ({ data, onClick }: Props) => {
  const [newChat, setNewChat] = useState<IInfoChat>()

  useEffect(() => {
    if (data.content) {
      let newChat: IInfoChat
      let dateMax = ''
      Object.entries(data.content).forEach(([key, value]) => {
        if (!dateMax) {
          dateMax = key
        }
        if (!value.isAdmin && Number(dateMax) < Number(key)) {
          newChat = {
            ...value,
            key,
          }
        }
      })
      setNewChat(newChat!)
    }
  }, [data])

  return (
    <div
      onClick={() => onClick(data.key, newChat!)}
      className='flex cursor-pointer h-fit flex-col gap-2 w-full lg:border-[1px] lg:border-gray-300 border-b-[1px] lg:p-3 lg:bg-white lg:rounded-xl border-b-gray-300 pb-2'
    >
      <div className='flex w-full gap-2'>
        <div className='w-[50px] rounded-[50%] aspect-square relative overflow-hidden'>
          <MyImage src={images.icon.iconMyUser} alt='avatar' className=' !relative ' />
        </div>
        <div className='flex flex-col gap-1 flex-1'>
          <div className='flex justify-between'>
            <div className='text-medium'>
              <TextCopy value={data.key} textView={ellipsisText(data.key, 4, 3)} />
            </div>
            <div>{formatDateTime(newChat?.date)}</div>
          </div>

          <div className='flex justify-between gap-2 w-full'>
            <div
              className='w-full'
              dangerouslySetInnerHTML={{
                __html: newChat?.content || '',
              }}
            />
            {!newChat?.isSeen && (
              <div className='bg-red-300 text-xs rounded-[50%] px-2 py-1'>1</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemChat
