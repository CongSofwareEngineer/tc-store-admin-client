import { FILTER_BILL } from '@/constant/app'
import useLanguage from '@/hook/useLanguage'
import useQuerySearch from '@/hook/useQuerySearch'
import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'

const OptionFilter = () => {
  const [isDeliverySuccess, setIsDeliverySuccess] = useState(false)
  const [isDelivering, setIsDelivering] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const { translate } = useLanguage()
  const { queries, currentQueries, updateQuery } = useQuerySearch()

  useEffect(() => {
    if (queries?.type && queries?.type?.length > 0) {
      switch (queries?.type[0]) {
        case FILTER_BILL.Processing:
          setIsProcessing(true)
          break
        case FILTER_BILL.Delivering:
          setIsDelivering(true)
          break
        case FILTER_BILL.DeliverySuccess:
          setIsDeliverySuccess(true)
          break
        default:
          setIsDelivering(false)
          setIsDeliverySuccess(false)
          setIsProcessing(false)
          break
      }
    }
    if (!queries?.type) {
      setIsDelivering(false)
      setIsDeliverySuccess(false)
      setIsProcessing(false)
    }
    if (!queries?.date) {
      console.log({})
    }
  }, [queries, currentQueries])

  const onChangeFilter = (key: FILTER_BILL) => {
    switch (key) {
      case FILTER_BILL.All:
        setIsDelivering(false)
        setIsDeliverySuccess(false)
        setIsProcessing(false)
        updateQuery('type', FILTER_BILL.All)
        break
      case FILTER_BILL.Processing:
        setIsDelivering(false)
        setIsDeliverySuccess(false)
        setIsProcessing(true)
        updateQuery('type', FILTER_BILL.Processing)
        break
      case FILTER_BILL.Delivering:
        setIsDelivering(true)
        setIsDeliverySuccess(false)
        setIsProcessing(false)
        updateQuery('type', FILTER_BILL.Delivering)
        break
      default:
        setIsDelivering(false)
        setIsDeliverySuccess(true)
        setIsProcessing(false)
        updateQuery('type', FILTER_BILL.DeliverySuccess)
        break
    }
  }

  return (
    <div className='flex flex-wrap gap-4 align-middle   '>
      <div className='flex gap-4 flex-wrap items-center '>
        {/* <MyDatePicker onChange={(e) => setDateTime(e?.toString() || '')} /> */}
        <Checkbox
          onClick={() => onChangeFilter(FILTER_BILL.All)}
          checked={!isDelivering && !isDeliverySuccess && !isProcessing}
        >
          <div className='text-nowrap'>{translate('textPopular.all')}</div>
        </Checkbox>
        <Checkbox
          onClick={() => onChangeFilter(FILTER_BILL.DeliverySuccess)}
          checked={isDeliverySuccess}
        >
          <div className='text-nowrap'>{translate('myBill.deliverySuccess')}</div>
        </Checkbox>
        <Checkbox onClick={() => onChangeFilter(FILTER_BILL.Delivering)} checked={isDelivering}>
          <div className='text-nowrap'>{translate('myBill.delivering')}</div>
        </Checkbox>
        <Checkbox onClick={() => onChangeFilter(FILTER_BILL.Processing)} checked={isProcessing}>
          <div className='text-nowrap'>{translate('myBill.processing')}</div>
        </Checkbox>
      </div>
    </div>
  )
}

export default OptionFilter
