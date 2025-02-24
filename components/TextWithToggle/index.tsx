import React, { useState } from 'react'
type Props = {
  limit?: number
  text?: string
}
const TextWithToggle = ({ limit = 100, text = '' }: Props) => {
  const [isShowFull, setIsShowFull] = useState(false)

  function truncateText(text: any, limitText: number) {
    if (!text) {
      return text
    }

    if (text?.length <= limitText) {
      return text
    }
    return text.substr(0, limitText) + '...'
  }

  return (
    <div className='flex flex-wrap'>
      <span
        dangerouslySetInnerHTML={{
          __html: isShowFull ? text : truncateText(text, limit),
        }}
      />
      {text?.length > limit && (
        <div
          className='cursor-pointer ml-1 text-red-600 underline'
          onClick={() => setIsShowFull(!isShowFull)}
        >
          {isShowFull ? `Less` : `More`}
        </div>
      )}
    </div>
  )
}

export default TextWithToggle
