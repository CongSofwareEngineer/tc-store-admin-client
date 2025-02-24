import { PropsSelectItem } from '@/components/MySelect'
import useLanguage from '@/hook/useLanguage'
import { Form, Select, SelectProps } from 'antd'
import React from 'react'

type InputFormType = {
  label?: string
  name?: string
  message?: string
  required?: boolean
  options: Array<PropsSelectItem> | undefined
  configSelect?: SelectProps
  validator?: (value?: any) => string | null
  loading?: boolean
  showSearch?: boolean
  optionFilterProp?: string
  mode?: any
  disabled?: boolean
  noPaddingBottom?: boolean
}

const SelectForm = ({
  label,
  name,
  message,
  required = false,
  options = [],
  validator = () => '',
  configSelect,
  loading = false,
  showSearch = false,
  optionFilterProp = 'any',
  mode = null,
  disabled = false,
  noPaddingBottom = false,
}: InputFormType) => {
  const { translate } = useLanguage()
  return (
    <Form.Item
      className={`form-item-select ${noPaddingBottom ? 'no-' : ''}padding-bottom`}
      label={label}
      name={name}
      rules={[
        {
          required: required,
          validator: (_, value) => {
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
      <Select
        mode={mode}
        disabled={disabled}
        showSearch={showSearch}
        optionFilterProp={optionFilterProp}
        loading={loading}
        className='w-full'
        options={options}
        {...configSelect}
      />
    </Form.Item>
  )
}

export default SelectForm
