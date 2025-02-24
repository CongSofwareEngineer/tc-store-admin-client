import { DatePicker } from 'antd'
import React from 'react'
import { formatDatePicker } from '@/utils/momentFunc'
import dayjs from 'dayjs'
import type { DatePickerProps } from 'antd'

const DATE_START = dayjs(new Date(Date.now()).setDate(new Date().getDate() - 1))

// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

export type DatePickerProp = {
  onChange?: (param?: any) => any
  className?: string
  allowClear?: boolean
  disabled?: boolean
  defaultValue?: any
} & DatePickerProps

const MyDatePicker = ({
  className,
  onChange = () => {},
  allowClear = true,
  disabled = false,
  defaultValue = DATE_START,
  // ...props
}: DatePickerProp) => {
  return (
    <DatePicker
      inputReadOnly
      disabled={disabled}
      onChange={(e) => onChange(e)}
      defaultValue={defaultValue ? formatDatePicker(defaultValue) : null}
      className={`w-full ${className}`}
      format={'DD/MM/YYYY'}
      lang='vn'
      allowClear={allowClear}
      // {...props}
    />
  )
}

export default MyDatePicker
