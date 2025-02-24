import { Form } from 'antd'
import React from 'react'
import MySelect from '../MySelect'
import { useLanguage } from '@/zustand/useLanguage'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'

type Props = {
  label?: string
  name?: string
  message?: string
  required?: boolean
  isPass?: boolean
  classFromItem?: string
  validator?: (value?: any) => string | null
  typeBtn?: 'string' | 'number' | 'area'
  disabled?: boolean
  noPaddingBottom?: boolean
}

const CategoryForm = ({
  noPaddingBottom = false,
  label,
  name,
  classFromItem = '',
  disabled = false,
}: Props) => {
  const { language } = useLanguage()
  const { categoryMenu } = useCategoryMenu()

  const getMenu = () => {
    const data = categoryMenu.map((e) => {
      return {
        label: e?.lang?.[language.locale || 'vn'].toString() || '',
        value: e.keyName.toString() || '',
        name: e.keyName,
      }
    })
    return [
      {
        label: 'All',
        value: 'all',
      },
      ...data,
    ]
  }

  return categoryMenu ? (
    <Form.Item
      className={`form-item-select ${noPaddingBottom ? 'no-padding-bottom' : 'padding-bottom'} ${classFromItem}`}
      label={label}
      name={name}
    >
      <MySelect disabled={disabled} option={getMenu()} className='w-full' />
    </Form.Item>
  ) : (
    <></>
  )
}

export default CategoryForm
