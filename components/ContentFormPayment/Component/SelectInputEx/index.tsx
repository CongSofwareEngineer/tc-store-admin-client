import useLanguage from '@/hook/useLanguage'
import { showNotificationError } from '@/utils/notification'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, SelectProps } from 'antd'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'

const FormItem = styled(Form.Item)`
  margin-bottom: 32px !important;
  .ant-form-item-row {
    flex-direction: column !important;
    .ant-form-item-label {
      text-align: start !important;
    }
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 0px !important;
    .ant-form-item-label {
      padding: 0px !important;
    }
    .ant-col {
      min-height: unset !important;
    }
  }
`

type SelectInputExType = {
  options: { [name: string]: any }[]
  callBackAdd?: (param?: any) => Promise<void> | void
  loadingNewAddressShip?: boolean
  label?: string
  name?: string
  message?: string
  required?: boolean
  configSelect?: SelectProps
  validator?: (value?: any) => string | null
}

const SelectInputEx = ({
  label,
  name,
  message,
  required = false,
  options,
  callBackAdd = () => {},
  validator = () => '',
  loadingNewAddressShip = false,
}: SelectInputExType) => {
  const { translate } = useLanguage()
  const inputRef = useRef(null)

  const [newValue, setNewValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAddNew = async () => {
    if (!newValue) {
      showNotificationError(translate('errors.empty'))
      return
    }
    setIsLoading(true)
    await callBackAdd(newValue)
    setNewValue('')
    setIsLoading(false)
  }

  return (
    <FormItem
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
        options={options}
        dropdownRender={(menu: any) => (
          <>
            {menu}
            <div className='flex md:flex-row flex-col gap-2 mt-2'>
              <Input
                placeholder={translate('textPopular.address')}
                ref={inputRef}
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                className='flex-1'
              />
              <Button
                loading={loadingNewAddressShip || isLoading}
                type='text'
                icon={<PlusOutlined />}
                onClick={handleAddNew}
              >
                {translate('common.addAddress')}
              </Button>
            </div>
          </>
        )}
      />
    </FormItem>
  )
}

export default SelectInputEx
