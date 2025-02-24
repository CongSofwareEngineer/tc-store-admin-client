import { Checkbox, Form } from 'antd'
import React from 'react'

type InputFormType = {
  label?: string
  name?: string
  classFromItem?: string
  validator?: (value?: any) => string | null
  noPaddingBottom?: boolean
}

const CheckBoxForm = ({
  label,
  name,
  classFromItem = '',
  noPaddingBottom = false,
}: InputFormType) => {
  return (
    <Form.Item
      valuePropName='checked'
      className={`form-item-checkbox ${noPaddingBottom ? 'no-padding-bottom' : 'padding-bottom'}  ${classFromItem}`}
      label={label}
      name={name}
    >
      <Checkbox />
    </Form.Item>
  )
}

export default CheckBoxForm
