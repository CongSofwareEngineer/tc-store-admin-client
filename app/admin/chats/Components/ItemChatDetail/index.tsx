import React from 'react'
import { ContentItemChatProps } from '../../type'
import { formatDateTime } from '@/utils/momentFunc'

const ItemChatDetail = ({ data }: { data: ContentItemChatProps }) => {
  return (
    <div
      key={data.date}
      className='flex w-full'
      style={{
        justifyContent: data.isAdmin ? 'start' : 'end',
      }}
    >
      <div
        style={{
          borderRadius: 8,
          borderBottomLeftRadius: data.isAdmin ? 0 : 8,
          borderBottomRightRadius: !data.isAdmin ? 0 : 8,
        }}
        className='px-3  w-max max-w-[70%] mx-3 text-xs my-2 py-2  bg-blue-200'
      >
        <div
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />
        <div
          style={{
            textAlign: data?.isAdmin ? 'start' : 'end',
          }}
          className='text-[9px] opacity-70 mt-1'
        >
          {formatDateTime(data.date)}
        </div>
      </div>
    </div>
  )
}

export default ItemChatDetail
