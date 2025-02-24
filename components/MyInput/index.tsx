import { Input, InputProps, InputNumber, InputNumberProps } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import React from 'react'
const { TextArea } = Input

type PropsType = {
  typeBtn?: 0 | 1
  type?: 'string' | 'area' | 'number' | 'password'
  rows?: number | 2
  onChangeText?: (value: string | number) => void
} & InputProps &
  InputNumberProps &
  TextAreaProps

const MyInput = ({
  typeBtn = 0,
  type = 'string',
  rows = 2,
  onChangeText = () => {},
  ...props
}: PropsType) => {
  switch (type) {
    case 'string':
      return (
        <Input
          onChange={(e: any) => onChangeText(e.target.value.toString())}
          {...props}
          className={`${typeBtn === 1 ? 'my-input-custom ' : ''} ${props?.className}`}
        />
      )

    case 'number':
      return (
        <InputNumber
          onChange={(e: any) => onChangeText(e)}
          {...props}
          className={`${typeBtn === 1 ? 'my-input-custom ' : ''} ${props?.className}`}
        />
      )

    case 'password':
      return (
        <Input.Password
          onChange={(e: any) => onChangeText(e.target.value.toString())}
          {...props}
          className={`${typeBtn === 1 ? 'my-input-custom ' : ''} ${props?.className}`}
        />
      )

    default:
      return (
        <TextArea
          onChange={(e: any) => onChangeText(e.target.value)}
          rows={rows}
          {...props}
          className={`${typeBtn === 1 ? 'my-input-custom ' : ''} ${props?.className}`}
        />
      )
  }
}

export default MyInput
