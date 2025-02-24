import MyInput from '@/components/MyInput'
import { QUERY_KEY } from '@/constant/reactQuery'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import ClientApi from '@/services/clientApi'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { Button } from 'antd'
import React, { useState } from 'react'

const ModalCancelOrder = ({ data }: { data: any }) => {
  const [loading, setLoading] = useState(false)
  const [textWhy, setTextWhy] = useState('')

  const { translate } = useLanguage()
  const { closeModalDrawer } = useModalDrawer()
  const { refreshQuery } = useRefreshQuery()

  const handleSubmit = async () => {
    setLoading(true)
    const res = await ClientApi.deleteBill(data._id)
    if (res.data) {
      await refreshQuery(QUERY_KEY.MyBillUser)
      showNotificationSuccess(translate('myBill.cancelOrder.cancelSuccess'))
    } else {
      showNotificationError(translate('myBill.cancelOrder.cancelEror'))
    }
    closeModalDrawer()
    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-2 w-full items-center'>
      <p className='text-medium font-bold'>{translate('myBill.cancelOrder.cancelOrder')}</p>
      <div className='w-full font-medium'>{translate('textPopular.reason')}:</div>
      <MyInput type='area' rows={3} onChangeText={(e) => setTextWhy(e?.toString() || '')} />
      <div className='flex gap-3 w-full mt-4'>
        <Button disabled={!textWhy} className={'!w-full'} loading={loading} onClick={handleSubmit}>
          {translate('common.submit')}
        </Button>
        <Button className='!w-full' type='primary' onClick={closeModalDrawer}>
          {translate('common.close')}
        </Button>
      </div>
    </div>
  )
}

export default ModalCancelOrder
