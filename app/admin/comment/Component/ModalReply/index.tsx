import MyInput from '@/components/MyInput'
import { QUERY_KEY } from '@/constant/reactQuery'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useCallbackToast from '@/hook/useCallbackToast'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import AdminApi from '@/services/adminApi'
import { Button } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

const ModalReply = ({ data }: { data?: any }) => {
  const { translate } = useLanguage()
  const { refreshQuery } = useRefreshQuery()
  const { closeModalDrawer } = useModalDrawer()
  const isNewReply = isEmpty(data?.listReply)
  const { updateError, createSuccess, updateSuccess, createError } = useCallbackToast()

  const [text, setText] = useState('Shop cảm ơn Bạn đã tin tưởng và ủng hộ ạ.')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isEmpty(data?.listReply) && Array.isArray(data?.listReply)) {
      const note = data?.listReply[0].note
      setText(note)
    }
  }, [data])

  const handleSubmit = async () => {
    setLoading(true)
    const body = {
      listReply: [
        {
          note: text,
          like: 0,
          date: new Date().getTime().toString(),
        },
      ],
    }

    const res = await AdminApi.replyComment(data._id, body)
    if (res.data) {
      await refreshQuery(QUERY_KEY.GetCommentAdmin)
      if (isNewReply) {
        createSuccess(translate('success.reply'))
      } else {
        updateSuccess()
      }
      closeModalDrawer()
    } else {
      if (isNewReply) {
        createError()
      } else {
        updateError()
      }
    }
    setLoading(false)
  }
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-1 flex-col gap-2'>
        <div className='font-bold'>{translate('textPopular.comment')}:</div>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.note,
          }}
        />
        <div className='font-bold'>{translate('common.reply')}:</div>
        <MyInput
          type='area'
          rows={4}
          value={text}
          onChangeText={(e) => setText(e.toString())}
          className='!w-full'
        />
        <div className='w-full md:mt-10 mt-2' />
      </div>
      <Button loading={loading} className='w-full ' onClick={handleSubmit}>
        {translate(!isNewReply ? 'common.update' : 'common.Send')}
      </Button>
    </div>
  )
}

export default ModalReply
