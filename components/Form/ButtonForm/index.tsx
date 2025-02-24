import { Button, Form } from 'antd'
import React from 'react'

import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'

type ButtonFormType = {
  loading?: boolean
  disableClose?: boolean
  titleSubmit?: string
  titleClose?: string
  className?: string
  classNameItem?: string
  classBtnSubmit?: string
  classBtnCancel?: string
  disabledSubmit?: boolean
}
const ButtonForm = ({
  loading,
  disableClose = false,
  titleSubmit = '',
  className = '',
  titleClose = '',
  classBtnSubmit = '',
  classBtnCancel = '',
  classNameItem = '',
  disabledSubmit = false,
}: ButtonFormType) => {
  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()

  return (
    <div className={`w-full flex justify-center items-center gap-4 mt-2 ${className}`}>
      <Form.Item className={`flex flex-1 form-item-button  ${classNameItem}`}>
        <Button
          disabled={disabledSubmit}
          className={`w-full m-auto ${classBtnSubmit}`}
          loading={loading}
          htmlType='submit'
        >
          {titleSubmit || translate('cart.payment')}
        </Button>
      </Form.Item>
      {!disableClose && (
        <Button
          disabled={loading}
          className={`flex flex-1 w-[150px] ${classBtnCancel}`}
          onClick={closeModalDrawer}
          type='primary'
        >
          {titleClose || translate('common.close')}
        </Button>
      )}
    </div>
  )
}

export default ButtonForm
