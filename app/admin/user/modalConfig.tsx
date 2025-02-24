import MyImage from '@/components/MyImage'
import TextCopy from '@/components/TextCopy'
import { QUERY_KEY } from '@/constant/reactQuery'
import { TYPE_USER_DATA } from '@/constant/zustand'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useCallbackToast from '@/hook/useCallbackToast'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import ClientApi from '@/services/clientApi'
import { convertBoolean, detectAvatar } from '@/utils/functions'
import { Button } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

const ModalConfig = ({ data }: { data?: TYPE_USER_DATA }) => {
  const { translate } = useLanguage()
  const { refreshQuery } = useRefreshQuery()
  const { closeModalDrawer } = useModalDrawer()
  const { updateError, updateSuccess } = useCallbackToast()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    const body = {
      isAdmin: !convertBoolean(data?.isAdmin),
    }
    const res = await ClientApi.updateUser(data?._id, body)
    if (res.data) {
      await refreshQuery(QUERY_KEY.GetUserAdmin)
      updateSuccess()
      closeModalDrawer()
    } else {
      updateError()
    }
    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-3 items-center'>
        <div className='aspect-square w-[100px] overflow-hidden'>
          <MyImage
            alt={data?.name || ''}
            src={detectAvatar(data?.avatar)}
            className='!w-full !h-auto !relative'
          />
        </div>
        <div className='flex flex-col gap-2 flex-1'>
          <div className='text-lg font-bold'>{data?.name}</div>
          <Link href={`tel:${data?.sdt}`} className='font-bold'>
            <TextCopy value={data?.sdt} textView={data?.sdt} />
          </Link>
        </div>
      </div>

      <div className='flex gap-2 w-full mt-2'>
        <Button onClick={handleSubmit} loading={loading} className='flex flex-1'>
          {translate(data?.isAdmin ? 'common.revertAdmin' : 'common.updateAdmin')}
        </Button>
      </div>
    </div>
  )
}

export default ModalConfig
