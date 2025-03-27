import MyInput from '@/components/MyInput'
import useLanguage from '@/hook/useLanguage'
import { cn } from '@/utils/tailwind'
import { Form } from 'antd'
import React from 'react'

type InputFormType = {
  label?: string
  name?: any
  message?: string
  required?: boolean
  isPass?: boolean
  classFromItem?: string
  validator?: (value?: any) => string | null
  configInput?: {
    noBorder?: boolean
    borderRadius?: number
  }
  typeBtn?: 'string' | 'number' | 'area'
  disable?: boolean
  rows?: number
  maxLength?: number
  showCount?: boolean
  noPaddingBottom?: boolean
}
const InputForm = ({
  label,
  name,
  message,
  required = false,
  isPass = false,
  validator = () => '',
  classFromItem = '',
  typeBtn = 'string',
  disable = false,
  rows = 3,
  maxLength = 100000,
  showCount = false,
  noPaddingBottom = false,
}: InputFormType) => {
  const { translate } = useLanguage()
  return (
    <Form.Item
      className={cn(
        'form-item-input',
        classFromItem,
        ` ${noPaddingBottom ? 'no-' : ''}padding-bottom`
      )}
      label={label}
      name={name}
      rules={[
        {
          required: required,
          validator: (_, value) => {
            if (!required) {
              return Promise.resolve(null)
            }
            const errorCheck = validator(value)
            if (errorCheck) {
              return Promise.reject(new Error(errorCheck))
            }
            if (!value) {
              return Promise.reject(new Error(message || translate('errors.empty')))
            }

            return Promise.resolve(null)
          },
        },
      ]}
    >
      <MyInput
        disabled={disable}
        rows={rows}
        type={isPass ? 'password' : typeBtn}
        className='w-full'
        maxLength={maxLength}
        showCount={showCount}
      />
    </Form.Item>
  )
}

export default InputForm
