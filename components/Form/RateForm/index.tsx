import { Form, Rate } from 'antd'
import React from 'react'

type RateFormType = {
  label?: string
  name?: string
  message?: string
  required?: boolean
  isPass?: boolean
  classFromItem?: string
  validator?: (value?: any) => string | null
  noPaddingBottom?: boolean
  typeBtn?: 'string' | 'number' | 'area'
  disable?: boolean
}

const RateForm = ({
  label,
  name,
  classFromItem = '',
  noPaddingBottom = false,
  disable = false,
}: RateFormType) => {
  return (
    <Form.Item
      className={`form-item-rate ${noPaddingBottom ? 'no-' : ''}padding-bottom  ${classFromItem}`}
      label={label}
      name={name}
    >
      <Rate disabled={disable} className='w-full' />
    </Form.Item>
  )
}

export default RateForm
