import useLanguage from '@/hook/useLanguage'
import { CopyOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'
type Props = {
  textView?: string
  value?: string
  isLink?: boolean
  classText?: string
  className?: string
}
const TextCopy = ({ textView = '', value = '', isLink = false, ...props }: Props) => {
  const { copyToClipboard } = useLanguage()
  return (
    <div className={`flex gap-2 ${props?.className}`}>
      {isLink ? (
        <Link target='_blank' href={value || textView}>
          {value || textView}
        </Link>
      ) : (
        <div className={props?.classText}>{textView || value}</div>
      )}
      <CopyOutlined onClick={() => copyToClipboard(value || textView)} />
    </div>
  )
}

export default TextCopy
