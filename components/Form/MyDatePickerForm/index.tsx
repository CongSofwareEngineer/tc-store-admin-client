import React from 'react'
import { Form } from 'antd'
import MyDatePicker, { DatePickerProp } from '@/components/MyDatePicker'

type InputFormType = {
  label?: string
  name?: string
  message?: string
  classFromItem?: string
  disabled?: boolean
  defaultValue?: any
  noPaddingBottom?: boolean
  configInput?: DatePickerProp | null
}

const MyDatePickerForm = ({
  classFromItem = '',
  disabled = false,
  label = '',
  name = '',
  defaultValue,
  noPaddingBottom = false,
  configInput = null,
}: InputFormType) => {
  return (
    <Form.Item
      label={label}
      name={name}
      className={`form-item-date-picker ${noPaddingBottom ? 'no-padding-bottom' : 'padding-bottom'} ${classFromItem}`}
    >
      <MyDatePicker defaultValue={defaultValue} disabled={disabled} {...configInput} />
    </Form.Item>
  )
}

export default MyDatePickerForm
