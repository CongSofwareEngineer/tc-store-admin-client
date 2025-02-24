import { Select, SelectProps } from 'antd'
import React from 'react'
import useLanguage from '@/hook/useLanguage'
import Image from 'next/image'

export type PropsSelectItem = {
  label: string | number
  value: string | number
  name?: string | number | undefined
  [key: string]: string | number | undefined
}

type PropsSelect = {
  option: Array<PropsSelectItem> | []
  classNameItem?: string
  fullImage?: boolean
} & SelectProps

interface LabelInValueType {
  label: React.ReactNode
  value: string | number
  key?: React.Key
  name?: string
}

const MySelect = ({ option, fullImage = false, ...props }: PropsSelect) => {
  const { translate } = useLanguage()
  const renderLabel = (item: LabelInValueType) => {
    return <span>{item.label || item.name || item.value}</span>
  }

  const renderItemFullImage = (item: any) => {
    return (
      <div className='flex flex-col gap-2'>
        <span className='normal-case'>{item.label || item.name}</span>
        {item?.image && (
          <Image
            fill
            className='!relative !w-[100px] !h-[100px]'
            src={item?.image?.toString()}
            alt={`select-item-${item.label || item.name}`}
          />
        )}
      </div>
    )
  }

  return (
    <Select
      className='w-max'
      labelRender={renderLabel}
      options={option}
      notFoundContent={<div className='opacity-100'>{translate('textPopular.notData')}</div>}
      optionRender={(e) => {
        return fullImage ? renderItemFullImage(e) : <span className='normal-case'>{e.label}</span>
      }}
      {...props}
    />
  )
}

export default MySelect
