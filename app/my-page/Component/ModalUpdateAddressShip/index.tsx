import OptionVnLocation from '@/components/OptionVnLocation'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import useUserData from '@/hook/useUserData'
import ClientApi from '@/services/clientApi'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { Button } from 'antd'
import React, { useRef, useState } from 'react'

const ModalUpdateAddressShip = () => {
  const { translate } = useLanguage()
  const { userData, refreshLogin } = useUserData()
  const { closeModalDrawer } = useModalDrawer()
  const address = useRef<any>(null)

  const [loading, setLoading] = useState(false)

  const onChangeAddress = (value: any) => {
    address.current = value
  }
  const handleSubmit = async () => {
    setLoading(true)
    if (address.current) {
      const res = await ClientApi.updateUser(userData?._id, {
        addressShipper: [address.current],
      })
      if (res.data) {
        await refreshLogin()
        showNotificationSuccess(translate('success.update'))
        closeModalDrawer()
      } else {
        showNotificationError(translate('error.update'))
      }
    }
    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-2'>
      <OptionVnLocation className='flex-wrap' isNew={false} callback={onChangeAddress} />
      <div className='w-full mt-5'>
        <Button onClick={handleSubmit} loading={loading} className='w-full'>
          {translate('common.save')}
        </Button>
      </div>
    </div>
  )
}

export default ModalUpdateAddressShip
