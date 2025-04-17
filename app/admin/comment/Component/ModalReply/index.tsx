import MyImage from '@/components/MyImage'
import MyInput from '@/components/MyInput'
import UploadImage, { IImgUpload } from '@/components/UploadImg'
import { QUERY_KEY } from '@/constant/reactQuery'
import useRefreshQuery from '@/hook/tank-query/useRefreshQuery'
import useCallbackToast from '@/hook/useCallbackToast'
import useLanguage from '@/hook/useLanguage'
import useModalDrawer from '@/hook/useModalDrawer'
import AdminApi from '@/services/adminApi'
import { ICommentRes } from '@/services/type'
import { CameraOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { IItemReply } from '../../type'

const ModalReply = ({ data }: { data: ICommentRes }) => {
  const { translate } = useLanguage()
  const { refreshQuery } = useRefreshQuery()
  const { closeModalDrawer } = useModalDrawer()
  const isNewReply = isEmpty(data?.listReply)
  const { updateError, createSuccess, updateSuccess, createError } = useCallbackToast()

  const [text, setText] = useState('Shop cảm ơn Bạn đã tin tưởng và ủng hộ ạ.')
  const [loading, setLoading] = useState(false)
  const [listImg, setListImg] = useState<Array<IImgUpload | string>>([])

  useEffect(() => {
    if (!isEmpty(data?.listReply) && Array.isArray(data?.listReply)) {
      const note = data?.listReply[0].note
      setText(note)
      setListImg(data?.listReply[0].listImg || [])
    }
  }, [data])

  const handleSubmit = async () => {
    setLoading(true)

    const reply: IItemReply = {
      note: text,
      like: 0,
      date: new Date().getTime().toString(),
      listImg: listImg,
    }

    const body = {
      listReply: [reply],
    }

    const res = await AdminApi.replyComment(data._id!, body)
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
            __html: data?.note!,
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
        <div className='w-full' />
      </div>
      <div className='flex w-full gap-1 items-center'>
        <div>
          <UploadImage
            maxSizeOutputKB={100}
            handleUpload={(data) => setListImg([...listImg, data])}
            maxPixelReduce={300}
          >
            <CameraOutlined />
            <div>{translate('common.uploadImage')}</div>
          </UploadImage>
        </div>
      </div>
      {listImg.length > 0 && (
        <div className='flex flex-wrap w-full overflow-hidden'>
          {listImg.map((img) => {
            const url = typeof img === 'string' ? img : img.base64
            return (
              <div className='w-[100px] m-2 h-[100px] min-w-[100px] min-h-[100px] relative overflow-hidden'>
                <MyImage alt={url} src={url} className='!w-full !h-full' />
              </div>
            )
          })}
        </div>
      )}
      <Button loading={loading} className='w-full  md:mt-5 mt-2 ' onClick={handleSubmit}>
        {translate(!isNewReply ? 'common.update' : 'common.Send')}
      </Button>
    </div>
  )
}

export default ModalReply
