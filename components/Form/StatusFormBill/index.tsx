import MySelect from '@/components/MySelect'
import { FILTER_BILL } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import { Form } from 'antd'
import React from 'react'

type Props = {
  label?: string
  name?: string
  message?: string
  required?: boolean
  isPass?: boolean
  classFromItem?: string
  validator?: (value?: any) => string | null
  noPaddingBottom?: boolean
  typeBtn?: 'string' | 'number' | 'area'
  disabled?: boolean
}

const StatusFormBill = ({
  label,
  name,
  classFromItem = '',
  noPaddingBottom = false,
  disabled = false,
}: Props) => {
  const { translate } = useLanguage()

  const getStatus = (key: string) => {
    switch (key) {
      case FILTER_BILL.Processing:
        return translate('myBill.processing')

      case FILTER_BILL.Delivering:
        return translate('myBill.delivering')

      case FILTER_BILL.DeliverySuccess:
        return translate('myBill.deliverySuccess')

      case FILTER_BILL.Canceled:
        return translate('common.cancelOrder')

      default:
        return translate('textPopular.all')
    }
  }

  const menu = [
    {
      label: getStatus(FILTER_BILL.All),
      value: FILTER_BILL.All,
    },
    {
      label: getStatus(FILTER_BILL.DeliverySuccess),
      value: FILTER_BILL.DeliverySuccess,
    },
    {
      label: getStatus(FILTER_BILL.Delivering),
      value: FILTER_BILL.Delivering,
    },
    {
      label: getStatus(FILTER_BILL.Processing),
      value: FILTER_BILL.Processing,
    },
    {
      label: getStatus(FILTER_BILL.Canceled),
      value: FILTER_BILL.Canceled,
    },
  ]
  return (
    <Form.Item
      className={`form-item-select ${noPaddingBottom ? 'no-padding-bottom' : 'padding-bottom'} ${classFromItem}`}
      label={label}
      name={name}
    >
      <MySelect disabled={disabled} option={menu} className='w-full' />
    </Form.Item>
  )
}

export default StatusFormBill
